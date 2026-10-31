import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import type { ModelTier } from './types.ts';
import { getFallbackModel } from './model-selector.ts';

const execFileAsync = promisify(execFile);

export const DEFAULT_AGENTAPI_BIN =
  process.env['AGENTAPI_PATH'] ||
  process.env['AGENTAPI_BIN'] ||
  '/home/tszuba/.gemini/antigravity/bin/agentapi';

export interface ExecResult {
  stdout: string;
  stderr: string;
}

export type CommandExecutor = (
  file: string,
  args: string[],
  options?: { cwd?: string }
) => Promise<ExecResult>;

export const defaultExecutor: CommandExecutor = async (file, args, options) => {
  return await execFileAsync(file, args, {
    maxBuffer: 10 * 1024 * 1024,
    cwd: options?.cwd,
  });
};

/**
 * Extracts a conversation ID from agentapi stdout or stderr.
 */
export function parseConversationId(output: string): string | null {
  if (!output) return null;

  // 1. Try parsing full JSON or substring JSON
  try {
    const parsed = JSON.parse(output.trim());
    if (parsed && typeof parsed === 'object') {
      if (parsed.response?.conversation_id) return String(parsed.response.conversation_id);
      if (parsed.response?.id) return String(parsed.response.id);
      if (parsed.conversation_id) return String(parsed.conversation_id);
      if (parsed.id) return String(parsed.id);
    }
  } catch {
    // Not pure JSON, check regex matches below
  }

  // 2. Look for JSON-like substring: "conversation_id": "..."
  const jsonConvMatch = output.match(/"conversation_id"\s*:\s*"([^"]+)"/);
  if (jsonConvMatch?.[1]) return jsonConvMatch[1];

  const jsonIdMatch = output.match(/"id"\s*:\s*"([a-zA-Z0-9_-]+)"/);
  if (jsonIdMatch?.[1]) return jsonIdMatch[1];

  // 3. Look for standard UUID format
  const uuidMatch = output.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i);
  if (uuidMatch?.[0]) return uuidMatch[0];

  // 4. Look for prefix patterns e.g. "conversation: 12345" or "created: 12345"
  const prefixMatch = output.match(/(?:conversation|session|id)[:\s=]+([a-zA-Z0-9_-]+)/i);
  if (prefixMatch?.[1]) return prefixMatch[1];

  return null;
}

export interface NewConversationOptions {
  prompt: string;
  model?: ModelTier | undefined;
  title?: string | undefined;
  agentapiBin?: string | undefined;
  executor?: CommandExecutor | undefined;
}

/**
 * Calls agentapi new-conversation.
 */
export async function createConversation(
  options: NewConversationOptions
): Promise<{ conversationId: string; rawOutput: string }> {
  const bin = options.agentapiBin || DEFAULT_AGENTAPI_BIN;
  const executor = options.executor || defaultExecutor;

  const args = ['new-conversation'];
  if (options.model) {
    args.push(`--model=${options.model}`);
  }
  if (options.title) {
    args.push(`--title=${options.title}`);
  }
  args.push(options.prompt);

  let stdout = '';
  let stderr = '';

  try {
    const res = await executor(bin, args);
    stdout = res.stdout;
    stderr = res.stderr;
  } catch (execErr: any) {
    const errOutput = `${execErr?.stdout || ''}\n${execErr?.stderr || ''}`.trim();
    if (errOutput) {
      try {
        const parsed = JSON.parse(errOutput);
        if (parsed?.error) {
          throw new Error(`agentapi returned error: ${parsed.error}`);
        }
      } catch (parseErr: any) {
        if (parseErr instanceof Error && parseErr.message.startsWith('agentapi returned error')) {
          throw parseErr;
        }
      }
    }
    throw execErr;
  }

  const combinedOutput = `${stdout}\n${stderr}`.trim();

  // Check if output contains an error in JSON
  try {
    const parsed = JSON.parse(stdout.trim());
    if (parsed && typeof parsed === 'object' && parsed.error) {
      throw new Error(`agentapi returned error: ${parsed.error}`);
    }
  } catch (err: unknown) {
    if (err instanceof Error && err.message.startsWith('agentapi returned error')) {
      throw err;
    }
  }

  const conversationId = parseConversationId(combinedOutput);
  if (!conversationId) {
    throw new Error(
      `Failed to parse conversation ID from agentapi output: ${combinedOutput}`
    );
  }

  return { conversationId, rawOutput: combinedOutput };
}

export interface DispatchWithFallbackOptions {
  prompt: string;
  initialModel: ModelTier;
  title?: string | undefined;
  agentapiBin?: string | undefined;
  executor?: CommandExecutor | undefined;
  log?: ((msg: string) => void) | undefined;
}

/**
 * Dispatches a conversation with automatic fallback (e.g. pro -> flash)
 * if the initial model fails.
 */
export async function dispatchWithFallback(
  options: DispatchWithFallbackOptions
): Promise<{
  conversationId: string;
  modelUsed: ModelTier;
  attempts: { model: ModelTier; error?: string | undefined }[];
}> {
  const attempts: { model: ModelTier; error?: string | undefined }[] = [];
  const log = options.log || ((msg: string) => process.stderr.write(`${msg}\n`));

  let currentModel: ModelTier | null = options.initialModel;

  while (currentModel) {
    try {
      log(`[antigravity] Attempting dispatch with model: ${currentModel}`);
      const res = await createConversation({
        prompt: options.prompt,
        model: currentModel,
        title: options.title,
        agentapiBin: options.agentapiBin,
        executor: options.executor,
      });

      attempts.push({ model: currentModel });
      log(`[antigravity] Successfully spawned session with model '${currentModel}': ${res.conversationId}`);
      return {
        conversationId: res.conversationId,
        modelUsed: currentModel,
        attempts,
      };
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : String(err);
      log(`[antigravity] Model '${currentModel}' dispatch failed: ${errMsg}`);
      attempts.push({ model: currentModel, error: errMsg });

      const nextModel = getFallbackModel(currentModel);
      if (nextModel) {
        log(`[antigravity] Falling back from '${currentModel}' to '${nextModel}'...`);
        currentModel = nextModel;
      } else {
        currentModel = null;
      }
    }
  }

  throw new Error(
    `All model dispatch attempts failed: ${attempts.map((a) => `${a.model} (${a.error})`).join(', ')}`
  );
}

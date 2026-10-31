import type { DispatchOptions, DispatchResult, NodeData } from './types.ts';
import { resolveInitialModel } from './model-selector.ts';
import { compileAntigravityPrompt } from './prompt-compiler.ts';
import { dispatchWithFallback, type CommandExecutor } from './agentapi.ts';
import {
  findNodeById,
  scanReadyNodes,
  transitionNodeToActive,
} from './node-manager.ts';
import { commitAndPush } from './git.ts';

export async function dispatchNode(
  node: NodeData,
  options: DispatchOptions = {},
  executor?: CommandExecutor
): Promise<DispatchResult> {
  const log = options.log || ((msg: string) => process.stderr.write(`${msg}\n`));
  const repoRoot = options.repoRoot || process.cwd();

  const initialModel = resolveInitialModel(node.owner_persona, options.model);
  const prompt = compileAntigravityPrompt(node);
  const title = `[${node.id}] ${node.title}`;

  log(`[dispatcher] Dispatching node ${node.id} (${node.repoPath}) assigned to '${node.owner_persona}'`);

  if (options.dryRun) {
    const mockSessionId = `agy-dryrun-${node.id}`;
    log(`[dispatcher] [DRY-RUN] Would create session with model: ${initialModel}`);
    log(`[dispatcher] [DRY-RUN] Would set jules_session_id: ${mockSessionId}`);
    return {
      nodeId: node.id,
      repoPath: node.repoPath,
      sessionId: mockSessionId,
      modelUsed: initialModel,
      attempts: [{ model: initialModel }],
      success: true,
    };
  }

  try {
    const { conversationId, modelUsed, attempts } = await dispatchWithFallback({
      prompt,
      initialModel,
      title,
      agentapiBin: options.agentapiBin,
      executor,
      log,
    });

    const sessionId = `agy-${conversationId}`;

    // Update node state in file and ACTIVE_SESSIONS.md
    transitionNodeToActive(node, sessionId, repoRoot);
    log(`[dispatcher] Node ${node.id} successfully transitioned to ACTIVE with session: ${sessionId}`);

    // Handle Git workflow if requested
    let gitStatus;
    if (options.git || options.push) {
      const commitMsg = `Foundry: Dispatch ${node.id} -> ACTIVE [${sessionId}]`;
      gitStatus = await commitAndPush(
        [node.repoPath, 'ACTIVE_SESSIONS.md'],
        commitMsg,
        {
          repoRoot,
          push: options.push !== false,
          log,
        },
        executor
      );
    }

    return {
      nodeId: node.id,
      repoPath: node.repoPath,
      sessionId,
      modelUsed,
      attempts,
      success: true,
      gitStatus,
    };
  } catch (err: any) {
    const errMsg = err instanceof Error ? err.message : String(err);
    log(`[dispatcher] Failed to dispatch node ${node.id}: ${errMsg}`);
    return {
      nodeId: node.id,
      repoPath: node.repoPath,
      sessionId: '',
      modelUsed: initialModel,
      attempts: [{ model: initialModel, error: errMsg }],
      success: false,
      error: errMsg,
    };
  }
}

export async function dispatchReadyNodes(
  options: DispatchOptions = {},
  executor?: CommandExecutor
): Promise<DispatchResult[]> {
  const log = options.log || ((msg: string) => process.stderr.write(`${msg}\n`));
  const repoRoot = options.repoRoot || process.cwd();

  if (options.nodeId) {
    const node = findNodeById(options.nodeId, repoRoot);
    if (!node) {
      throw new Error(`Node not found: ${options.nodeId}`);
    }
    const res = await dispatchNode(node, options, executor);
    return [res];
  }

  const readyNodes = scanReadyNodes(repoRoot);
  if (readyNodes.length === 0) {
    log('[dispatcher] No READY nodes available for dispatch.');
    return [];
  }

  log(`[dispatcher] Found ${readyNodes.length} READY node(s) for dispatch.`);
  const results: DispatchResult[] = [];

  for (const node of readyNodes) {
    const res = await dispatchNode(node, options, executor);
    results.push(res);
  }

  return results;
}

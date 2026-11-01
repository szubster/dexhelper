import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import type { GitOptions, GitResult } from './types.ts';
import type { CommandExecutor } from './agentapi.ts';

const execFileAsync = promisify(execFile);

export const defaultGitExecutor: CommandExecutor = async (file, args, options) => {
  return await execFileAsync(file, args, {
    maxBuffer: 10 * 1024 * 1024,
    cwd: options?.cwd,
  });
};

/**
 * Stages specified files, commits them with the given message, and optionally pulls --rebase and pushes.
 */
export async function commitAndPush(
  files: string[],
  message: string,
  options: GitOptions = {},
  executor: CommandExecutor = defaultGitExecutor
): Promise<GitResult> {
  const log = options.log || ((msg: string) => process.stderr.write(`${msg}\n`));
  const remote = options.remote || 'origin';
  const branch = options.branch || 'main';
  const execOpts = options.repoRoot ? { cwd: options.repoRoot } : undefined;

  if (options.dryRun) {
    log(`[git] [DRY-RUN] Would stage files: ${files.join(', ')}`);
    log(`[git] [DRY-RUN] Would commit: "${message}"`);
    if (options.push !== false) {
      log(`[git] [DRY-RUN] Would push to ${remote} ${branch}`);
    }
    return { committed: true, pushed: options.push !== false };
  }

  try {
    // 1. Stage files
    await executor('git', ['add', ...files], execOpts);

    // 2. Check if anything is staged
    try {
      await executor('git', ['diff', '--staged', '--quiet'], execOpts);
      // If diff --staged --quiet exits with 0, there are no changes staged
      log('[git] No staged changes detected. Skipping commit.');
      return { committed: false, pushed: false };
    } catch (diffErr: any) {
      // Non-zero exit code means there ARE staged changes, proceed with commit
      const code = Number(diffErr?.code ?? diffErr?.exitCode ?? diffErr?.status);
      if (code !== 1 && diffErr?.code !== 1 && diffErr?.exitCode !== 1) {
        throw diffErr;
      }
    }

    // 3. Commit
    await executor('git', ['commit', '-m', message], execOpts);
    log(`[git] Successfully committed: "${message}"`);

    // 4. Push if requested
    if (options.push !== false) {
      let pushed = false;
      let lastPushError: string | undefined;

      for (let attempt = 1; attempt <= 3; attempt++) {
        try {
          await executor('git', ['pull', '--rebase', remote, branch], execOpts);
          await executor('git', ['push', remote, branch], execOpts);
          pushed = true;
          log(`[git] Successfully pushed changes to ${remote}/${branch}`);
          break;
        } catch (pushErr: any) {
          lastPushError = pushErr instanceof Error ? pushErr.message : String(pushErr);
          log(`[git] Push attempt ${attempt}/3 failed: ${lastPushError}`);
          if (attempt < 3) {
            await new Promise((r) => setTimeout(r, 1500));
          }
        }
      }

      if (!pushed) {
        log(`[git] Warning: Failed to push after 3 attempts: ${lastPushError}`);
        return { committed: true, pushed: false, error: lastPushError };
      }
    }

    return { committed: true, pushed: options.push !== false };
  } catch (err: any) {
    const errMsg = err instanceof Error ? err.message : String(err);
    log(`[git] Error during commitAndPush: ${errMsg}`);
    return { committed: false, pushed: false, error: errMsg };
  }
}

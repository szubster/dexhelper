import { describe, it, expect, vi } from 'vitest';
import { commitAndPush } from './git.ts';
import type { CommandExecutor } from './agentapi.ts';

describe('git workflow', () => {
  it('skips execution in dryRun mode', async () => {
    const mockExecutor = vi.fn<CommandExecutor>();
    const logs: string[] = [];

    const res = await commitAndPush(
      ['file.md'],
      'Commit message',
      { dryRun: true, log: (m) => logs.push(m) },
      mockExecutor
    );

    expect(res.committed).toBe(true);
    expect(res.pushed).toBe(true);
    expect(mockExecutor).not.toHaveBeenCalled();
    expect(logs.some((l) => l.includes('[DRY-RUN]'))).toBe(true);
  });

  it('stages, commits, and pushes when staged changes exist', async () => {
    const executedCommands: { file: string; args: string[] }[] = [];
    const mockExecutor = vi.fn<CommandExecutor>().mockImplementation((file, args) => {
      executedCommands.push({ file, args });
      // git diff --staged --quiet returns code 1 when there ARE staged changes
      if (args[0] === 'diff') {
        const error: any = new Error('Changes staged');
        error.code = 1;
        error.exitCode = 1;
        return Promise.reject(error);
      }
      return Promise.resolve({ stdout: '', stderr: '' });
    });

    const res = await commitAndPush(
      ['.foundry/tasks/task-1.md', 'ACTIVE_SESSIONS.md'],
      'Foundry: Dispatch task-1 -> ACTIVE [agy-123]',
      { push: true },
      mockExecutor
    );

    expect(res.committed).toBe(true);
    expect(res.pushed).toBe(true);
    expect(executedCommands.map((c) => c.args[0])).toEqual([
      'add',
      'diff',
      'commit',
      'pull',
      'push',
    ]);
  });

  it('skips commit when no changes are staged', async () => {
    const mockExecutor = vi.fn<CommandExecutor>().mockResolvedValue({
      stdout: '',
      stderr: '',
    });

    const res = await commitAndPush(
      ['file.md'],
      'No change commit',
      { push: true },
      mockExecutor
    );

    expect(res.committed).toBe(false);
    expect(res.pushed).toBe(false);
  });

  it('retries push up to 3 times on transient failure', async () => {
    let pushAttempts = 0;
    const mockExecutor = vi.fn<CommandExecutor>().mockImplementation((file, args) => {
      if (args[0] === 'diff') {
        const error: any = new Error('Changes staged');
        error.code = 1;
        error.exitCode = 1;
        return Promise.reject(error);
      }
      if (args[0] === 'push') {
        pushAttempts++;
        if (pushAttempts < 2) {
          return Promise.reject(new Error('Remote connection timeout'));
        }
      }
      return Promise.resolve({ stdout: '', stderr: '' });
    });

    const res = await commitAndPush(
      ['file.md'],
      'Retry push commit',
      { push: true },
      mockExecutor
    );

    expect(res.committed).toBe(true);
    expect(res.pushed).toBe(true);
    expect(pushAttempts).toBe(2);
  });
});

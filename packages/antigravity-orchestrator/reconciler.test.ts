import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as os from 'node:os';
import { reconcileActiveSessions } from './reconciler.ts';
import { parseNodeFile } from './node-manager.ts';
import type { NodeData } from './types.ts';
import type { CommandExecutor } from './agentapi.ts';

describe('reconciler', () => {
  let tempDir: string;
  let foundryDir: string;

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'agy-reconcile-test-'));
    foundryDir = path.join(tempDir, '.foundry', 'tasks');
    fs.mkdirSync(foundryDir, { recursive: true });
  });

  afterEach(() => {
    fs.rmSync(tempDir, { recursive: true, force: true });
  });

  function createActiveNode(id: string, sessionId: string, prNumber?: number): NodeData {
    const filePath = path.join(foundryDir, `${id}.md`);
    const content = `---
id: ${id}
type: TASK
title: Test Node ${id}
status: ACTIVE
owner_persona: coder
jules_session_id: "${sessionId}"
${prNumber ? `pr_number: ${prNumber}` : ''}
rejection_count: 0
created_at: "2026-10-31"
updated_at: "2026-10-31"
---

## Description
Active node body.
`;
    fs.writeFileSync(filePath, content, 'utf-8');
    return parseNodeFile(filePath, tempDir)!;
  }

  it('transitions active node to COMPLETED when PR is merged', async () => {
    const node = createActiveNode('task-merge', 'agy-conv-101');

    const mockPrOutput = JSON.stringify([
      {
        number: 101,
        title: '[task-merge] Test Node task-merge',
        headRefName: 'antigravity/task-merge',
        state: 'MERGED',
        mergedAt: '2026-10-31T00:00:00Z',
      },
    ]);

    const mockExecutor = vi.fn<CommandExecutor>().mockImplementation((file, args) => {
      if (file === 'gh' && args[0] === 'pr') {
        return Promise.resolve({ stdout: mockPrOutput, stderr: '' });
      }
      return Promise.resolve({ stdout: '', stderr: '' });
    });

    const results = await reconcileActiveSessions({ repoRoot: tempDir }, mockExecutor);

    expect(results.length).toBe(1);
    expect(results[0]?.nodeId).toBe('task-merge');
    expect(results[0]?.newStatus).toBe('COMPLETED');
    expect(results[0]?.prNumber).toBe(101);

    const updatedNode = parseNodeFile(node.filePath, tempDir);
    expect(updatedNode?.status).toBe('COMPLETED');
    expect(updatedNode?.pr_number).toBe(101);
  });

  it('transitions active node to READY when PR is closed unmerged', async () => {
    const node = createActiveNode('task-closed', 'agy-conv-202');

    const mockPrOutput = JSON.stringify([
      {
        number: 202,
        title: '[task-closed] Test Node task-closed',
        headRefName: 'antigravity/task-closed',
        state: 'CLOSED',
        mergedAt: null,
      },
    ]);

    const mockExecutor = vi.fn<CommandExecutor>().mockImplementation((file, args) => {
      if (file === 'gh' && args[0] === 'pr') {
        return Promise.resolve({ stdout: mockPrOutput, stderr: '' });
      }
      return Promise.resolve({ stdout: '', stderr: '' });
    });

    const results = await reconcileActiveSessions({ repoRoot: tempDir }, mockExecutor);

    expect(results.length).toBe(1);
    expect(results[0]?.newStatus).toBe('READY');

    const updatedNode = parseNodeFile(node.filePath, tempDir);
    expect(updatedNode?.status).toBe('READY');
    expect(updatedNode?.rejection_count).toBe(1);
  });

  it('links PR number to active node when PR is open', async () => {
    const node = createActiveNode('task-open', 'agy-conv-303');

    const mockPrOutput = JSON.stringify([
      {
        number: 303,
        title: '[task-open] Test Node task-open',
        headRefName: 'antigravity/task-open',
        state: 'OPEN',
      },
    ]);

    const mockExecutor = vi.fn<CommandExecutor>().mockImplementation((file, args) => {
      if (file === 'gh' && args[0] === 'pr') {
        return Promise.resolve({ stdout: mockPrOutput, stderr: '' });
      }
      return Promise.resolve({ stdout: '', stderr: '' });
    });

    const results = await reconcileActiveSessions({ repoRoot: tempDir }, mockExecutor);

    expect(results.length).toBe(1);
    expect(results[0]?.newStatus).toBe('ACTIVE');
    expect(results[0]?.prNumber).toBe(303);

    const updatedNode = parseNodeFile(node.filePath, tempDir);
    expect(updatedNode?.status).toBe('ACTIVE');
    expect(updatedNode?.pr_number).toBe(303);
  });

  it('transitions active node to FAILED when rejection_count reaches 3', async () => {
    const node = createActiveNode('task-closed-3', 'agy-conv-999');
    // Bump existing rejection count to 2
    const raw = fs.readFileSync(node.filePath, 'utf-8').replace('rejection_count: 0', 'rejection_count: 2');
    fs.writeFileSync(node.filePath, raw, 'utf-8');

    const mockPrOutput = JSON.stringify([
      {
        number: 999,
        title: '[task-closed-3] Test Node',
        headRefName: 'antigravity/task-closed-3',
        state: 'CLOSED',
        mergedAt: null,
      },
    ]);

    const mockExecutor = vi.fn<CommandExecutor>().mockImplementation((file, args) => {
      if (file === 'gh' && args[0] === 'pr') {
        return Promise.resolve({ stdout: mockPrOutput, stderr: '' });
      }
      return Promise.resolve({ stdout: '', stderr: '' });
    });

    const results = await reconcileActiveSessions({ repoRoot: tempDir }, mockExecutor);

    expect(results.length).toBe(1);
    expect(results[0]?.newStatus).toBe('FAILED');
    expect(results[0]?.reason).toBe('Max rejection count reached');

    const updatedNode = parseNodeFile(node.filePath, tempDir);
    expect(updatedNode?.status).toBe('FAILED');
    expect(updatedNode?.rejection_count).toBe(3);
    expect(updatedNode?.rejection_reason).toBe('Max rejection count reached');
  });

  it('commits and pushes updates when git flag is enabled', async () => {
    createActiveNode('task-merge-git', 'agy-conv-777');

    const mockPrOutput = JSON.stringify([
      {
        number: 777,
        title: '[task-merge-git] Test Node',
        headRefName: 'antigravity/task-merge-git',
        state: 'MERGED',
        mergedAt: '2026-10-31T00:00:00Z',
      },
    ]);

    const executedGitCommands: string[] = [];
    const mockExecutor = vi.fn<CommandExecutor>().mockImplementation((file, args) => {
      if (file === 'gh' && args[0] === 'pr') {
        return Promise.resolve({ stdout: mockPrOutput, stderr: '' });
      }
      if (file === 'git') {
        executedGitCommands.push(args[0]!);
        if (args[0] === 'diff') {
          const error: any = new Error('Changes staged');
          error.code = 1;
          error.exitCode = 1;
          return Promise.reject(error);
        }
      }
      return Promise.resolve({ stdout: '', stderr: '' });
    });

    const results = await reconcileActiveSessions(
      { repoRoot: tempDir, git: true, push: true },
      mockExecutor
    );

    expect(results.length).toBe(1);
    expect(results[0]?.newStatus).toBe('COMPLETED');
    expect(executedGitCommands).toEqual(['add', 'diff', 'commit', 'pull', 'push']);
  });
});

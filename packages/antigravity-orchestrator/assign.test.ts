import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as os from 'node:os';
import { assignNode } from './assign.ts';
import { parseNodeFile } from './node-manager.ts';
import type { CommandExecutor } from './agentapi.ts';

describe('assign command', () => {
  let tempDir: string;
  let foundryDir: string;

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'agy-assign-test-'));
    foundryDir = path.join(tempDir, '.foundry', 'tasks');
    fs.mkdirSync(foundryDir, { recursive: true });
  });

  afterEach(() => {
    fs.rmSync(tempDir, { recursive: true, force: true });
  });

  it('assigns node to human and sets agy-human- session ID', async () => {
    const filePath = path.join(foundryDir, 'task-assign-1.md');
    fs.writeFileSync(
      filePath,
      `---
id: task-assign-1
type: TASK
title: Assignable Task
status: READY
owner_persona: coder
jules_session_id: null
created_at: "2026-10-31"
updated_at: "2026-10-31"
---

Body content
`,
      'utf-8'
    );

    const res = await assignNode('task-assign-1', { repoRoot: tempDir });
    expect(res.success).toBe(true);
    expect(res.persona).toBe('human');
    expect(res.sessionId).toMatch(/^agy-human-\d+$/);

    const node = parseNodeFile(filePath, tempDir);
    expect(node?.status).toBe('ACTIVE');
    expect(node?.owner_persona).toBe('human');
    expect(node?.jules_session_id).toBe(res.sessionId);
  });

  it('throws error when node is not found', async () => {
    await expect(assignNode('non-existent-task', { repoRoot: tempDir })).rejects.toThrow(
      'Node not found: non-existent-task'
    );
  });

  it('commits and pushes when git flag is enabled', async () => {
    const filePath = path.join(foundryDir, 'task-assign-git.md');
    fs.writeFileSync(
      filePath,
      `---
id: task-assign-git
type: TASK
title: Assignable Git Task
status: READY
owner_persona: coder
jules_session_id: null
created_at: "2026-10-31"
updated_at: "2026-10-31"
---

Body content
`,
      'utf-8'
    );

    const mockExecutor = vi.fn<CommandExecutor>().mockImplementation((file, args) => {
      if (args[0] === 'diff') {
        const error: any = new Error('Changes staged');
        error.code = 1;
        error.exitCode = 1;
        return Promise.reject(error);
      }
      return Promise.resolve({ stdout: '', stderr: '' });
    });

    const res = await assignNode(
      'task-assign-git',
      { repoRoot: tempDir, git: true, push: true },
      mockExecutor
    );

    expect(res.success).toBe(true);
    expect(res.gitStatus?.committed).toBe(true);
  });
});

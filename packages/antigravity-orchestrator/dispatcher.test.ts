import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as os from 'node:os';
import { dispatchNode, dispatchReadyNodes } from './dispatcher.ts';
import { parseNodeFile } from './node-manager.ts';
import type { NodeData } from './types.ts';
import type { CommandExecutor } from './agentapi.ts';

describe('dispatcher', () => {
  let tempDir: string;
  let foundryDir: string;

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'agy-dispatch-test-'));
    foundryDir = path.join(tempDir, '.foundry', 'tasks');
    fs.mkdirSync(foundryDir, { recursive: true });
  });

  afterEach(() => {
    fs.rmSync(tempDir, { recursive: true, force: true });
  });

  function createTestNode(id: string, status: string, persona: string = 'coder'): NodeData {
    const filePath = path.join(foundryDir, `${id}.md`);
    const content = `---
id: ${id}
type: TASK
title: Test Node ${id}
status: ${status}
owner_persona: ${persona}
jules_session_id: null
rejection_count: 0
created_at: "2026-10-31"
updated_at: "2026-10-31"
---

## Description
Instructions for ${id}.
`;
    fs.writeFileSync(filePath, content, 'utf-8');
    return parseNodeFile(filePath, tempDir)!;
  }

  it('dispatches coder node using pro model by default', async () => {
    const node = createTestNode('task-coder', 'READY', 'coder');

    const mockExecutor = vi.fn<CommandExecutor>().mockResolvedValue({
      stdout: JSON.stringify({ conversation_id: 'conv-111' }),
      stderr: '',
    });

    const res = await dispatchNode(
      node,
      { repoRoot: tempDir, agentapiBin: '/bin/agentapi' },
      mockExecutor
    );

    expect(res.success).toBe(true);
    expect(res.sessionId).toBe('agy-conv-111');
    expect(res.modelUsed).toBe('pro');

    const updatedNode = parseNodeFile(node.filePath, tempDir);
    expect(updatedNode?.status).toBe('ACTIVE');
    expect(updatedNode?.jules_session_id).toBe('agy-conv-111');
  });

  it('dispatches researcher node using flash model by default', async () => {
    const node = createTestNode('task-research', 'READY', 'researcher');

    const mockExecutor = vi.fn<CommandExecutor>().mockResolvedValue({
      stdout: JSON.stringify({ conversation_id: 'conv-222' }),
      stderr: '',
    });

    const res = await dispatchNode(
      node,
      { repoRoot: tempDir, agentapiBin: '/bin/agentapi' },
      mockExecutor
    );

    expect(res.success).toBe(true);
    expect(res.modelUsed).toBe('flash');
  });

  it('falls back to flash when pro fails during dispatch', async () => {
    const node = createTestNode('task-coder-fallback', 'READY', 'coder');

    const mockExecutor = vi
      .fn<CommandExecutor>()
      .mockRejectedValueOnce(new Error('Capacity limit exceeded for model pro'))
      .mockResolvedValueOnce({
        stdout: JSON.stringify({ conversation_id: 'conv-flash-333' }),
        stderr: '',
      });

    const res = await dispatchNode(
      node,
      { repoRoot: tempDir, agentapiBin: '/bin/agentapi' },
      mockExecutor
    );

    expect(res.success).toBe(true);
    expect(res.modelUsed).toBe('flash');
    expect(res.sessionId).toBe('agy-conv-flash-333');
    expect(res.attempts.length).toBe(2);
    expect(res.attempts[0]?.model).toBe('pro');
    expect(res.attempts[1]?.model).toBe('flash');
  });

  it('commits and pushes when git flag is enabled', async () => {
    const node = createTestNode('task-git', 'READY', 'coder');

    const mockExecutor = vi.fn<CommandExecutor>().mockImplementation((file, args) => {
      if (file === '/bin/agentapi') {
        return Promise.resolve({
          stdout: JSON.stringify({ conversation_id: 'conv-git-444' }),
          stderr: '',
        });
      }
      if (args[0] === 'diff') {
        const error: any = new Error('Changes staged');
        error.code = 1;
        error.exitCode = 1;
        return Promise.reject(error);
      }
      return Promise.resolve({ stdout: '', stderr: '' });
    });

    const res = await dispatchNode(
      node,
      { repoRoot: tempDir, git: true, push: true, agentapiBin: '/bin/agentapi' },
      mockExecutor
    );

    expect(res.success).toBe(true);
    expect(res.gitStatus?.committed).toBe(true);
    expect(res.gitStatus?.pushed).toBe(true);
  });

  it('scans and dispatches all ready nodes via dispatchReadyNodes', async () => {
    createTestNode('task-1', 'READY', 'coder');
    createTestNode('task-2', 'READY', 'researcher');

    let counter = 1;
    const mockExecutor = vi.fn<CommandExecutor>().mockImplementation((file) => {
      if (file === '/bin/agentapi') {
        return Promise.resolve({
          stdout: JSON.stringify({ conversation_id: `conv-batch-${counter++}` }),
          stderr: '',
        });
      }
      return Promise.resolve({ stdout: '', stderr: '' });
    });

    const results = await dispatchReadyNodes(
      { repoRoot: tempDir, agentapiBin: '/bin/agentapi' },
      mockExecutor
    );

    expect(results.length).toBe(2);
    expect(results[0]?.sessionId).toBe('agy-conv-batch-1');
    expect(results[1]?.sessionId).toBe('agy-conv-batch-2');
  });
});

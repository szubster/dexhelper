import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as os from 'node:os';
import {
  parseNodeFile,
  transitionNodeToActive,
  transitionNodeToCompleted,
  transitionNodeToReady,
  assignNodeToHuman,
  scanReadyNodes,
  scanActiveNodes,
  findNodeById,
} from './node-manager.ts';
import type { NodeData } from './types.ts';

describe('node-manager', () => {
  let tempDir: string;
  let foundryDir: string;

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'agy-node-test-'));
    foundryDir = path.join(tempDir, '.foundry', 'tasks');
    fs.mkdirSync(foundryDir, { recursive: true });
  });

  afterEach(() => {
    fs.rmSync(tempDir, { recursive: true, force: true });
  });

  function createTestNode(id: string, status: string, persona: string = 'coder', sessionId: string | null = null): NodeData {
    const filePath = path.join(foundryDir, `${id}.md`);
    const content = `---
id: ${id}
type: TASK
title: Test Node ${id}
status: ${status}
owner_persona: ${persona}
jules_session_id: ${sessionId ? `"${sessionId}"` : 'null'}
rejection_count: 0
created_at: "2026-10-31"
updated_at: "2026-10-31"
---

## Description
This is test body for ${id}.
`;
    fs.writeFileSync(filePath, content, 'utf-8');
    const parsed = parseNodeFile(filePath, tempDir);
    expect(parsed).not.toBeNull();
    return parsed!;
  }

  it('scans ready and active nodes accurately', () => {
    createTestNode('task-ready-1', 'READY', 'coder');
    createTestNode('task-ready-2', 'READY', 'architect');
    createTestNode('task-active-1', 'ACTIVE', 'coder', 'agy-conv-1');

    const ready = scanReadyNodes(tempDir);
    const active = scanActiveNodes(tempDir);

    expect(ready.length).toBe(2);
    expect(ready.map((r) => r.id)).toEqual(['task-ready-1', 'task-ready-2']);
    expect(active.length).toBe(1);
    expect(active[0]?.id).toBe('task-active-1');
  });

  it('finds node by id or file path', () => {
    createTestNode('task-lookup', 'READY');
    const foundById = findNodeById('task-lookup', tempDir);
    expect(foundById).not.toBeNull();
    expect(foundById?.id).toBe('task-lookup');

    const foundByPath = findNodeById('.foundry/tasks/task-lookup.md', tempDir);
    expect(foundByPath).not.toBeNull();
    expect(foundByPath?.id).toBe('task-lookup');
  });

  it('transitions node to ACTIVE and updates ACTIVE_SESSIONS.md', () => {
    const node = createTestNode('task-to-active', 'READY');
    transitionNodeToActive(node, 'agy-conv-999', tempDir);

    const reloaded = parseNodeFile(node.filePath, tempDir);
    expect(reloaded?.status).toBe('ACTIVE');
    expect(reloaded?.jules_session_id).toBe('agy-conv-999');

    const tableContent = fs.readFileSync(path.join(tempDir, 'ACTIVE_SESSIONS.md'), 'utf-8');
    expect(tableContent).toContain('task-to-active');
    expect(tableContent).toContain('agy-conv-999');
  });

  it('transitions node to COMPLETED and records PR number', () => {
    const node = createTestNode('task-to-completed', 'ACTIVE', 'coder', 'agy-conv-999');
    transitionNodeToCompleted(node, 456, tempDir);

    const reloaded = parseNodeFile(node.filePath, tempDir);
    expect(reloaded?.status).toBe('COMPLETED');
    expect(reloaded?.pr_number).toBe(456);
  });

  it('transitions node to READY, clears session ID, and increments rejection_count', () => {
    const node = createTestNode('task-to-ready', 'ACTIVE', 'coder', 'agy-conv-999');
    const res = transitionNodeToReady(node, 'PR closed without merging', tempDir);

    expect(res.status).toBe('READY');
    expect(res.rejectionCount).toBe(1);

    const reloaded = parseNodeFile(node.filePath, tempDir);
    expect(reloaded?.status).toBe('READY');
    expect(reloaded?.rejection_count).toBe(1);
    expect(reloaded?.rejection_reason).toBe('PR closed without merging');
    expect(reloaded?.jules_session_id).toBeNull();
  });

  it('transitions node to FAILED when rejection_count reaches 3', () => {
    const node = createTestNode('task-to-fail', 'ACTIVE', 'coder', 'agy-conv-999');
    // Simulate node already rejected twice
    const raw = fs.readFileSync(node.filePath, 'utf-8').replace('rejection_count: 0', 'rejection_count: 2');
    fs.writeFileSync(node.filePath, raw, 'utf-8');
    const parsed = parseNodeFile(node.filePath, tempDir)!;

    const res = transitionNodeToReady(parsed, 'Third failure', tempDir);
    expect(res.status).toBe('FAILED');
    expect(res.rejectionCount).toBe(3);

    const reloaded = parseNodeFile(node.filePath, tempDir);
    expect(reloaded?.status).toBe('FAILED');
    expect(reloaded?.rejection_count).toBe(3);
    expect(reloaded?.rejection_reason).toBe('Max rejection count reached');
    expect(reloaded?.jules_session_id).toBeNull();
  });

  it('assigns node to human with agy-human- timestamp session ID', () => {
    const node = createTestNode('task-human', 'READY', 'coder');
    const { sessionId } = assignNodeToHuman(node, tempDir);

    expect(sessionId).toMatch(/^agy-human-\d+$/);
    const reloaded = parseNodeFile(node.filePath, tempDir);
    expect(reloaded?.status).toBe('ACTIVE');
    expect(reloaded?.owner_persona).toBe('human');
    expect(reloaded?.jules_session_id).toBe(sessionId);
  });
});

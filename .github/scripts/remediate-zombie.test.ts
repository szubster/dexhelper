import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as os from 'node:os';
import { remediateZombieNode } from './remediate-zombie.ts';
import { createValidTestNode } from './foundry-test-utils.ts';

describe('remediateZombieNode', () => {
  let tmpDir: string;

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'remediate-test-'));
    fs.mkdirSync(path.join(tmpDir, '.foundry', 'tasks'), { recursive: true });
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
    vi.restoreAllMocks();
  });

  it('successfully updates an ACTIVE node to FAILED with rejection_reason', () => {
    const nodePath = '.foundry/tasks/task-001.md';
    createValidTestNode(tmpDir, nodePath, {
      id: 'task-001',
      type: 'TASK',
      title: 'Task 1',
      status: 'ACTIVE',
      owner_persona: 'coder',
      created_at: '2026-06-28',
      updated_at: '2026-06-28',
      depends_on: [],
      jules_session_id: 'sess-123'
    }, '# Body content\\n- [ ] Unchecked');

    const result = remediateZombieNode(tmpDir, nodePath, 'Zombie detected by engine');
    expect(result).toBe(true);

    const fileContent = fs.readFileSync(path.join(tmpDir, nodePath), 'utf-8');
    expect(fileContent).toContain('status: FAILED');
    expect(fileContent).toContain('rejection_reason: Zombie detected by engine');
    expect(fileContent).toContain('# Body content');
    expect(fileContent).toContain('id: task-001'); // Preserves other frontmatter
  });

  it('fails if the file does not exist', () => {
    const nodePath = '.foundry/tasks/non-existent.md';
    const result = remediateZombieNode(tmpDir, nodePath);
    expect(result).toBe(false);
    expect(console.warn).toHaveBeenCalledWith(`File not found: ${path.join(tmpDir, nodePath)}`);
  });

  it('fails if the node has malformed YAML frontmatter', () => {
    const nodePath = '.foundry/tasks/malformed.md';
    const fullPath = path.join(tmpDir, nodePath);
    fs.writeFileSync(fullPath, '---\\ninvalid yaml:\\n  - - -\\n---\\n# Content', 'utf-8');

    const result = remediateZombieNode(tmpDir, nodePath);
    expect(result).toBe(false);
    expect(console.warn).toHaveBeenCalledWith(`Malformed YAML frontmatter in: ${fullPath}`);
  });

  it('fails if the node is not ACTIVE', () => {
    const nodePath = '.foundry/tasks/task-002.md';
    const fullPath = path.join(tmpDir, nodePath);
    createValidTestNode(tmpDir, nodePath, {
      id: 'task-002',
      type: 'TASK',
      title: 'Task 2',
      status: 'PENDING',
      owner_persona: 'coder',
      created_at: '2026-06-28',
      updated_at: '2026-06-28',
      depends_on: [],
      jules_session_id: null
    });

    const result = remediateZombieNode(tmpDir, nodePath);
    expect(result).toBe(false);
    expect(console.warn).toHaveBeenCalledWith(`Node is not ACTIVE: ${fullPath}`);
  });

  it('handles write errors gracefully', () => {
    const nodePath = '.foundry/tasks/task-003.md';
    const fullPath = path.join(tmpDir, nodePath);
    createValidTestNode(tmpDir, nodePath, {
      id: 'task-003',
      type: 'TASK',
      title: 'Task 3',
      status: 'ACTIVE',
      owner_persona: 'coder',
      created_at: '2026-06-28',
      updated_at: '2026-06-28',
      depends_on: [],
      jules_session_id: 'sess-123'
    });

    // Change file permissions to read-only so writeFileSync throws
    fs.chmodSync(fullPath, 0o444);

    try {
      const result = remediateZombieNode(tmpDir, nodePath);
      expect(result).toBe(false);
      expect(console.error).toHaveBeenCalled();
    } finally {
      // Restore permissions so cleanup works
      fs.chmodSync(fullPath, 0o666);
    }
  });
});

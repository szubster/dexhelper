import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { sweepActiveNodes } from './sweep-active-nodes.ts';
import { createValidTestNode } from './foundry-test-utils.ts';

describe('sweepActiveNodes', () => {
  let testEnvPath: string;

  beforeEach(() => {
    testEnvPath = path.join(process.cwd(), 'temp-test-dir-' + Math.random().toString(36).substring(7));
    fs.mkdirSync(testEnvPath, { recursive: true });
  });

  afterEach(() => {
    if (fs.existsSync(testEnvPath)) {
      fs.rmSync(testEnvPath, { recursive: true, force: true });
    }
  });

  it('should return empty array if .foundry does not exist', () => {
    const result = sweepActiveNodes(path.join(testEnvPath, 'non-existent'));
    expect(result).toEqual([]);
  });

  it('should find active nodes within .foundry', () => {
    createValidTestNode(testEnvPath, '.foundry/ideas/active-node.md', { status: 'ACTIVE', type: 'IDEA' });
    createValidTestNode(testEnvPath, '.foundry/ideas/pending-node.md', { status: 'PENDING', type: 'IDEA' });

    // Invalid node
    fs.writeFileSync(path.join(testEnvPath, '.foundry/ideas/invalid-node.md'), 'not a valid frontmatter', 'utf-8');

    const result = sweepActiveNodes(testEnvPath);
    expect(result).toHaveLength(1);
    expect(result[0]).toBe(path.join('.foundry', 'ideas', 'active-node.md'));
  });

  it('should find nested active nodes', () => {
    createValidTestNode(testEnvPath, '.foundry/tasks/nested/active-task.md', { status: 'ACTIVE', type: 'TASK' });

    const result = sweepActiveNodes(testEnvPath);
    expect(result).toHaveLength(1);
    expect(result[0]).toBe(path.join('.foundry', 'tasks', 'nested', 'active-task.md'));
  });

  it('should archive COMPLETED and CANCELLED nodes', () => {
    createValidTestNode(testEnvPath, '.foundry/ideas/completed-node.md', { status: 'COMPLETED', type: 'IDEA' });
    createValidTestNode(testEnvPath, '.foundry/ideas/cancelled-node.md', { status: 'CANCELLED', type: 'IDEA' });
    createValidTestNode(testEnvPath, '.foundry/ideas/active-node.md', { status: 'ACTIVE', type: 'IDEA' });
    createValidTestNode(testEnvPath, '.foundry/ideas/pending-node.md', { status: 'PENDING', type: 'IDEA' });

    // Invalid node
    fs.writeFileSync(path.join(testEnvPath, '.foundry/ideas/invalid-node.md'), 'not a valid frontmatter', 'utf-8');

    const result = sweepActiveNodes(testEnvPath);

    // Result should only contain ACTIVE nodes
    expect(result).toHaveLength(1);
    expect(result[0]).toBe(path.join('.foundry', 'ideas', 'active-node.md'));

    // Check that files were moved
    expect(fs.existsSync(path.join(testEnvPath, '.foundry/ideas/completed-node.md'))).toBe(false);
    expect(fs.existsSync(path.join(testEnvPath, '.foundry/ideas/cancelled-node.md'))).toBe(false);
    expect(fs.existsSync(path.join(testEnvPath, '.foundry/archive/ideas/completed-node.md'))).toBe(true);
    expect(fs.existsSync(path.join(testEnvPath, '.foundry/archive/ideas/cancelled-node.md'))).toBe(true);

    // Check that non-archived files were NOT moved
    expect(fs.existsSync(path.join(testEnvPath, '.foundry/ideas/active-node.md'))).toBe(true);
    expect(fs.existsSync(path.join(testEnvPath, '.foundry/ideas/pending-node.md'))).toBe(true);
  });

  it('should preserve nested directories when archiving', () => {
    createValidTestNode(testEnvPath, '.foundry/tasks/nested/completed-task.md', { status: 'COMPLETED', type: 'TASK' });

    const result = sweepActiveNodes(testEnvPath);
    expect(result).toHaveLength(0); // Should return empty since it's COMPLETED

    expect(fs.existsSync(path.join(testEnvPath, '.foundry/tasks/nested/completed-task.md'))).toBe(false);
    expect(fs.existsSync(path.join(testEnvPath, '.foundry/archive/tasks/nested/completed-task.md'))).toBe(true);
  });
});

import { describe, it, expect } from 'vitest';
import * as path from 'path';
import { parseNodeFile } from './foundry-orchestrator';

const rootDir = path.resolve(__dirname, '../../');
const fixturesDir = path.join(rootDir, '.foundry/fixtures');

describe('Zod Schema E2E Test Suite', () => {
  it('orchestrator accepts valid node fixtures', () => {
    const validTask = parseNodeFile(path.join(fixturesDir, 'task-001-valid.md'), rootDir);
    expect(validTask).not.toBeNull();
    expect(validTask?.frontmatter.id).toBe('task-001-valid');

    const validIdea = parseNodeFile(path.join(fixturesDir, 'idea-001-valid.md'), rootDir);
    expect(validIdea).not.toBeNull();
    expect(validIdea?.frontmatter.id).toBe('idea-001-valid');

    const validEpic = parseNodeFile(path.join(fixturesDir, 'epic-001-valid.md'), rootDir);
    expect(validEpic).not.toBeNull();
    expect(validEpic?.frontmatter.id).toBe('epic-001-valid');

    const validLocks = parseNodeFile(path.join(fixturesDir, 'task-003-locks-valid.md'), rootDir);
    expect(validLocks).not.toBeNull();
    expect(validLocks?.frontmatter.id).toBe('task-003-locks-valid');
    expect(validLocks?.frontmatter.locks).toEqual(['lock1', 'lock2']);
  });

  it('orchestrator rejects invalid node fixtures gracefully', () => {
    const invalidTask = parseNodeFile(path.join(fixturesDir, 'task-002-invalid.md'), rootDir);
    expect(invalidTask).toBeNull();

    const invalidIdea = parseNodeFile(path.join(fixturesDir, 'idea-002-invalid.md'), rootDir);
    expect(invalidIdea).toBeNull();

    const invalidEpic = parseNodeFile(path.join(fixturesDir, 'epic-002-invalid.md'), rootDir);
    expect(invalidEpic).toBeNull();

    const invalidLocks = parseNodeFile(path.join(fixturesDir, 'task-003-locks-invalid.md'), rootDir);
    expect(invalidLocks).toBeNull();
  });
});

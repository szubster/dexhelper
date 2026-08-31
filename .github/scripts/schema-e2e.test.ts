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
  });

  it('orchestrator rejects invalid node fixtures gracefully', () => {
    const invalidTask = parseNodeFile(path.join(fixturesDir, 'task-002-invalid.md'), rootDir);
    expect(invalidTask).toBeNull();

    const invalidIdea = parseNodeFile(path.join(fixturesDir, 'idea-002-invalid.md'), rootDir);
    expect(invalidIdea).toBeNull();

    const invalidEpic = parseNodeFile(path.join(fixturesDir, 'epic-002-invalid.md'), rootDir);
    expect(invalidEpic).toBeNull();
  });

  it('orchestrator rejects malformed YAML gracefully', () => {
    const malformed = parseNodeFile(path.join(fixturesDir, 'malformed-001-invalid.md'), rootDir);
    expect(malformed).toBeNull();
  });

  it('orchestrator rejects missing fields gracefully', () => {
    const missingFields = parseNodeFile(path.join(fixturesDir, 'missing-fields-001-invalid.md'), rootDir);
    expect(missingFields).toBeNull();
  });

  it('orchestrator accepts pending promotion state', () => {
    const pending = parseNodeFile(path.join(fixturesDir, 'promotion-pending-valid.md'), rootDir);
    expect(pending).not.toBeNull();
    expect(pending?.frontmatter.status).toBe('PENDING');
  });

  it('orchestrator accepts active promotion state', () => {
    const active = parseNodeFile(path.join(fixturesDir, 'promotion-active-valid.md'), rootDir);
    expect(active).not.toBeNull();
    expect(active?.frontmatter.status).toBe('ACTIVE');
  });
});

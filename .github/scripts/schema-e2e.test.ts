import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import { parseNodeFile, main } from './foundry-orchestrator';

const rootDir = path.resolve(__dirname, '../../');
const fixturesDir = path.join(rootDir, '.foundry/fixtures');

describe('Zod Schema E2E Test Suite', () => {
  beforeEach(() => {
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

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

  it('asserts that error scenarios log well-formed, actionable messages', () => {
    const stderrSpy = vi.spyOn(process.stderr, 'write').mockImplementation(() => true);
    parseNodeFile(path.join(fixturesDir, 'task-002-invalid.md'), rootDir);

    expect(stderrSpy).toHaveBeenCalled();
    const calls = stderrSpy.mock.calls.map(call => call[0] as string).join('');

    expect(calls).toContain('[orchestrator] WARN');
    expect(calls).toContain('Schema validation failed in:');
    expect(calls).toContain('task-002-invalid.md');
    expect(calls).toContain('Errors:');
    expect(calls).toContain('`status`: Invalid option: expected one of');
  });

  it('asserts that malformed files are rejected without breaking the orchestration loop', () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'fuzzing-orchestrator-e2e-'));
    vi.spyOn(process, 'cwd').mockReturnValue(tmpDir);

    fs.mkdirSync(path.join(tmpDir, '.foundry/tasks'), { recursive: true });
    fs.copyFileSync(path.join(fixturesDir, 'task-001-valid.md'), path.join(tmpDir, '.foundry/tasks/task-001-valid.md'));
    fs.copyFileSync(path.join(fixturesDir, 'malformed-001-invalid.md'), path.join(tmpDir, '.foundry/tasks/malformed-001-invalid.md'));
    fs.copyFileSync(path.join(fixturesDir, 'task-003-locks-valid.md'), path.join(tmpDir, '.foundry/tasks/task-003-locks-valid.md'));

    const stderrSpy = vi.spyOn(process.stderr, 'write').mockImplementation(() => true);

    let errorThrown = false;
    try {
        main();
    } catch {
        errorThrown = true;
    }

    expect(errorThrown).toBe(false);

    const calls = stderrSpy.mock.calls.map(call => call[0] as string).join('');
    expect(calls).toContain('[orchestrator] WARN');

    // matter throws error if there is an error but returns no YAML if format is invalid, we'll check both
    // Actually the parser code uses "Malformed YAML frontmatter in:" when gray-matter throws or "No YAML frontmatter found in:" if missing
    expect(calls).toMatch(/Malformed YAML frontmatter in:|No YAML frontmatter found in:/);
    expect(calls).toContain('malformed-001-invalid.md');

    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  it('asserts that node promotion operates correctly with Zod', () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'fuzzing-orchestrator-e2e-'));
    vi.spyOn(process, 'cwd').mockReturnValue(tmpDir);

    fs.mkdirSync(path.join(tmpDir, '.foundry/tasks'), { recursive: true });

    const pendingFile = path.join(tmpDir, '.foundry/tasks/promotion-pending-valid.md');
    fs.copyFileSync(path.join(fixturesDir, 'promotion-pending-valid.md'), pendingFile);

    vi.spyOn(process.stderr, 'write').mockImplementation(() => true);

    main();

    const parsed = parseNodeFile(pendingFile, tmpDir);
    expect(parsed?.frontmatter.status).toBe('READY');

    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

});

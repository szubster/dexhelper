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

    const validCurator = parseNodeFile(path.join(fixturesDir, 'task-004-curator-valid.md'), rootDir);
    expect(validCurator).not.toBeNull();
    expect(validCurator?.frontmatter.id).toBe('task-004-curator-valid');
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

    expect(calls).toMatch(/\[orchestrator\] (\[.*\] )?WARN/);
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
    expect(calls).toMatch(/\[orchestrator\] (\[.*\] )?WARN/);

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

  it('asserts that priority fields are parsed and validated correctly', () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'fuzzing-orchestrator-e2e-'));
    vi.spyOn(process, 'cwd').mockReturnValue(tmpDir);
    fs.mkdirSync(path.join(tmpDir, '.foundry/tasks'), { recursive: true });

    // 1. Missing priority (defaults or undefined)
    const noPriorityPath = path.join(tmpDir, '.foundry/tasks/task-no-priority.md');
    fs.writeFileSync(noPriorityPath, "---\nid: task-no-priority\ntype: TASK\ntitle: No Priority Task\nstatus: READY\nowner_persona: coder\ncreated_at: '2026-08-01'\nupdated_at: '2026-08-01'\ndepends_on: []\njules_session_id: '123'\n---\n# Content");

    // 2. Valid priority
    const validPriorityPath = path.join(tmpDir, '.foundry/tasks/task-valid-priority.md');
    fs.writeFileSync(validPriorityPath, "---\nid: task-valid-priority\ntype: TASK\ntitle: Valid Priority Task\nstatus: READY\nowner_persona: coder\ncreated_at: '2026-08-01'\nupdated_at: '2026-08-01'\ndepends_on: []\njules_session_id: '123'\npriority: 10\n---\n# Content");

    // 3. Invalid priority (string instead of int)
    const invalidPriorityPath = path.join(tmpDir, '.foundry/tasks/task-invalid-priority.md');
    fs.writeFileSync(invalidPriorityPath, "---\nid: task-invalid-priority\ntype: TASK\ntitle: Invalid Priority Task\nstatus: READY\nowner_persona: coder\ncreated_at: '2026-08-01'\nupdated_at: '2026-08-01'\ndepends_on: []\njules_session_id: '123'\npriority: \"high\"\n---\n# Content");


    const stderrSpy = vi.spyOn(process.stderr, 'write').mockImplementation(() => true);

    const noPriorityNode = parseNodeFile(noPriorityPath, tmpDir);
    expect(noPriorityNode).not.toBeNull();
    expect(noPriorityNode?.frontmatter.priority).toBeUndefined();

    const validPriorityNode = parseNodeFile(validPriorityPath, tmpDir);
    expect(validPriorityNode).not.toBeNull();
    expect(validPriorityNode?.frontmatter.priority).toBe(10);

    const invalidPriorityNode = parseNodeFile(invalidPriorityPath, tmpDir);
    expect(invalidPriorityNode).toBeNull();

    expect(stderrSpy).toHaveBeenCalled();
    const calls = stderrSpy.mock.calls.map(call => call[0] as string).join('');
    expect(calls).toContain('task-invalid-priority.md');
    expect(calls).toContain('`priority`: Invalid input: expected number, received string');

    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  it('asserts orchestrator output sorts by priority', () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'fuzzing-orchestrator-e2e-'));
    vi.spyOn(process, 'cwd').mockReturnValue(tmpDir);
    fs.mkdirSync(path.join(tmpDir, '.foundry/tasks'), { recursive: true });

    // Task 1: Priority 10 (Lowest)
    fs.writeFileSync(path.join(tmpDir, '.foundry/tasks/task-p10.md'), "---\nid: task-p10\ntype: TASK\ntitle: P10 Task\nstatus: READY\nowner_persona: coder\ncreated_at: '2026-08-01'\nupdated_at: '2026-08-01'\ndepends_on: []\njules_session_id: null\npriority: 10\n---");

    // Task 2: No Priority (Defaults to 50)
    fs.writeFileSync(path.join(tmpDir, '.foundry/tasks/task-p50-default.md'), "---\nid: task-p50-default\ntype: TASK\ntitle: P50 Task\nstatus: READY\nowner_persona: coder\ncreated_at: '2026-08-01'\nupdated_at: '2026-08-01'\ndepends_on: []\njules_session_id: null\n---");

    // Task 3: Priority 90 (Highest)
    fs.writeFileSync(path.join(tmpDir, '.foundry/tasks/task-p90.md'), "---\nid: task-p90\ntype: TASK\ntitle: P90 Task\nstatus: READY\nowner_persona: coder\ncreated_at: '2026-08-01'\nupdated_at: '2026-08-01'\ndepends_on: []\njules_session_id: null\npriority: 90\n---");

    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    main();

    expect(consoleSpy).toHaveBeenCalled();
    const lastCall = consoleSpy.mock.calls[consoleSpy.mock.calls.length - 1][0];
    const readyNodes = JSON.parse(lastCall);

    expect(readyNodes).toHaveLength(3);
    expect(readyNodes[0].id).toBe('task-p90');
    expect(readyNodes[1].id).toBe('task-p50-default');
    expect(readyNodes[2].id).toBe('task-p10');

    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

});

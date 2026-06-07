import { expect, test, describe, vi, beforeEach, afterEach } from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as os from 'node:os';
import { main } from './foundry-orchestrator';
import { createValidTestNode } from './foundry-test-utils';

describe('foundry-orchestrator', () => {
  let tmpDir: string;
  let foundryDir: string;

  beforeEach(() => {
    // Create a fresh temporary directory for each test
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'foundry-test-'));
    foundryDir = path.join(tmpDir, '.foundry');
    fs.mkdirSync(foundryDir);
    fs.mkdirSync(path.join(foundryDir, 'ideas'));
    fs.mkdirSync(path.join(foundryDir, 'epics'));
    fs.mkdirSync(path.join(foundryDir, 'stories'));
    fs.mkdirSync(path.join(foundryDir, 'tasks'));

    // Mock process context
    vi.spyOn(process, 'cwd').mockReturnValue(tmpDir);
    vi.spyOn(process, 'exit').mockImplementation(() => undefined as never);
    vi.spyOn(process.stderr, 'write').mockImplementation(() => true);
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
    vi.restoreAllMocks();
  });



  test('Happy Path: promotes PENDING to READY when all dependencies are COMPLETED', () => {
    createValidTestNode(tmpDir, '.foundry/ideas/idea-001.md', {
      id: "idea-001",
      type: "IDEA",
      title: "Idea 1",
      status: "COMPLETED",
      owner_persona: "product_manager",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: [],
      jules_session_id: null,

    });

    createValidTestNode(tmpDir, '.foundry/epics/epic-001.md', {
      id: "epic-001",
      type: "EPIC",
      title: "Epic 1",
      status: "PENDING",
      owner_persona: "story_owner",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: [".foundry/ideas/idea-001.md"],
      jules_session_id: null,

    });

    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    main();

    // Verify file mutation
    const epicChar = fs.readFileSync(path.join(tmpDir, '.foundry/epics/epic-001.md'), 'utf-8');
    expect(epicChar).toContain('status: READY');

    // Verify console output (JSON array of READY nodes)
    expect(logSpy).toHaveBeenCalled();
    const lastCall = logSpy.mock.calls[logSpy.mock.calls.length - 1][0];
    const output = JSON.parse(lastCall);
    expect(output).toHaveLength(1);
    expect(output[0].id).toBe('epic-001');
    expect(output[0].status).toBe('READY');
  });

  test('Blocking: remains PENDING if a dependency is not COMPLETED', () => {
    createValidTestNode(tmpDir, '.foundry/ideas/idea-001.md', {
      id: "idea-001",
      type: "IDEA",
      title: "Idea 1",
      status: "FAILED",
      owner_persona: "product_manager",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: [],
      jules_session_id: "sess-123",

    });

    createValidTestNode(tmpDir, '.foundry/epics/epic-001.md', {
      id: "epic-001",
      type: "EPIC",
      title: "Epic 1",
      status: "PENDING",
      owner_persona: "story_owner",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: [".foundry/ideas/idea-001.md"],
      jules_session_id: null,

    });

    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    main();

    const epicChar = fs.readFileSync(path.join(tmpDir, '.foundry/epics/epic-001.md'), 'utf-8');
    expect(epicChar).toContain('status: PENDING');
    
    // Output should be empty since nothing is READY
    expect(logSpy).toHaveBeenCalled();
    const lastCall = logSpy.mock.calls[logSpy.mock.calls.length - 1][0];
    expect(JSON.parse(lastCall)).toHaveLength(0);
  });

  test('Validation: skips nodes with multiple owners (comma separated)', () => {
    createValidTestNode(tmpDir, '.foundry/tasks/task-multi-owner.md', {
      id: "task-multi-owner",
      type: "TASK",
      title: "Task with multiple owners",
      status: "PENDING",
      owner_persona: "coder, qa",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: [],
      jules_session_id: null,
    });

    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    main();

    expect(logSpy).toHaveBeenCalled();
    const lastCall = logSpy.mock.calls[logSpy.mock.calls.length - 1][0];
    expect(JSON.parse(lastCall)).toHaveLength(0);
  });

  test('Validation: skips nodes with array owners', () => {
    createValidTestNode(tmpDir, '.foundry/tasks/task-array-owner.md', {
      id: "task-array-owner",
      type: "TASK",
      title: "Task with array owners",
      status: "PENDING",
      owner_persona: ["coder","qa"] as unknown as string,
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: [],
      jules_session_id: null,
    });

    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    main();

    expect(logSpy).toHaveBeenCalled();
    const lastCall = logSpy.mock.calls[logSpy.mock.calls.length - 1][0];
    expect(JSON.parse(lastCall)).toHaveLength(0);
  });

  test('Resilience: skips malformed YAML gracefully', () => {
    const filePath = path.join(tmpDir, '.foundry/epics/bad-node.md');
    fs.writeFileSync(filePath, `---\nid: bad\nstatus: PENDING\n---`, 'utf-8'); // Missing required fields

    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    main();

    // Should not crash. stderr should have warned.
    expect(logSpy).toHaveBeenCalled();
    const lastCall = logSpy.mock.calls[logSpy.mock.calls.length - 1][0];
    expect(JSON.parse(lastCall)).toHaveLength(0);
  });

  test('Indegree Zero: promotes immediately if depends_on is empty', () => {
    createValidTestNode(tmpDir, '.foundry/ideas/idea-001.md', {
      id: "idea-001",
      type: "IDEA",
      title: "Idea 1",
      status: "PENDING",
      owner_persona: "product_manager",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: [],
      jules_session_id: null,

    });

    main();

    const result = fs.readFileSync(path.join(tmpDir, '.foundry/ideas/idea-001.md'), 'utf-8');
    expect(result).toContain('status: READY');
  });

  test('Unresolvable: logs warning and remains PENDING if dep is missing', () => {
    createValidTestNode(tmpDir, '.foundry/epics/epic-001.md', {
      id: "epic-001",
      type: "EPIC",
      title: "Epic 1",
      status: "PENDING",
      owner_persona: "story_owner",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: [".foundry/missing/ghost.md"],
      jules_session_id: null,
    });

    main();

    const epicChar = fs.readFileSync(path.join(tmpDir, '.foundry/epics/epic-001.md'), 'utf-8');
    expect(epicChar).toContain('status: PENDING');
  });

  test('Hierarchical Completion: blocks external dependent if dependency has incomplete children', () => {
    // Story 1: COMPLETED (Planned)
    createValidTestNode(tmpDir, '.foundry/stories/story-001.md', {
      id: "story-001",
      type: "STORY",
      title: "Story 1",
      status: "COMPLETED",
      owner_persona: "tech_lead",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: [],
      jules_session_id: null,
    });

    // Task 1: Child of Story 1, PENDING
    createValidTestNode(tmpDir, '.foundry/tasks/task-001.md', {
      id: "task-001",
      type: "TASK",
      title: "Task 1",
      status: "PENDING",
      owner_persona: "coder",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: [".foundry/stories/story-001.md"],
      parent: ".foundry/stories/story-001.md",
      jules_session_id: null,
    });

    // Story 2: Depends on Story 1, PENDING (External dependent)
    createValidTestNode(tmpDir, '.foundry/stories/story-002.md', {
      id: "story-002",
      type: "STORY",
      title: "Story 2",
      status: "PENDING",
      owner_persona: "tech_lead",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: [".foundry/stories/story-001.md"],
      jules_session_id: null,
    });

    main();

    // Task 1 SHOULD be promoted to READY (it's a child)
    const taskContent = fs.readFileSync(path.join(tmpDir, '.foundry/tasks/task-001.md'), 'utf-8');
    expect(taskContent).toContain('status: READY');

    // Story 2 SHOULD NOT be promoted (it waits for Story 1's children)
    const story2Content = fs.readFileSync(path.join(tmpDir, '.foundry/stories/story-002.md'), 'utf-8');
    expect(story2Content).toContain('status: PENDING');
  });

  test('Late-Binding: allows child of PENDING parent to proceed if parent already has children', () => {
    // Epic 1: PENDING (Waiting for children)
    createValidTestNode(tmpDir, '.foundry/epics/epic-001.md', {
      id: "epic-001",
      type: "EPIC",
      title: "Epic 1",
      status: "PENDING",
      owner_persona: "story_owner",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: [],
      jules_session_id: null,
    });

    // Story 1: Child of Epic 1, PENDING
    createValidTestNode(tmpDir, '.foundry/stories/story-001.md', {
      id: "story-001",
      type: "STORY",
      title: "Story 1",
      status: "PENDING",
      owner_persona: "tech_lead",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: [],
      parent: ".foundry/epics/epic-001.md",
      jules_session_id: null,
    });

    main();

    // Story 1 SHOULD be promoted to READY because Epic 1 is PENDING but has children
    const storyContent = fs.readFileSync(path.join(tmpDir, '.foundry/stories/story-001.md'), 'utf-8');
    expect(storyContent).toContain('status: READY');
  });

  test('Late-Binding: Parent wakes up when children are COMPLETED', () => {
    // Epic 1: PENDING (Waiting for children)
    createValidTestNode(tmpDir, '.foundry/epics/epic-001.md', {
      id: "epic-001",
      type: "EPIC",
      title: "Epic 1",
      status: "PENDING",
      owner_persona: "story_owner",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: [],
      jules_session_id: null,
    });

    // Story 1: Child of Epic 1, COMPLETED
    createValidTestNode(tmpDir, '.foundry/stories/story-001.md', {
      id: "story-001",
      type: "STORY",
      title: "Story 1",
      status: "COMPLETED",
      owner_persona: "tech_lead",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: [],
      parent: ".foundry/epics/epic-001.md",
      jules_session_id: null,
    });

    main();

    const epicContent = fs.readFileSync(path.join(tmpDir, '.foundry/epics/epic-001.md'), 'utf-8');
    expect(epicContent).toContain('status: COMPLETED');
  });

  test('Late-Binding: Parent wakes up to READY if it has unchecked tasks', () => {
    // Epic 1: PENDING (Waiting for children)
    createValidTestNode(tmpDir, '.foundry/epics/epic-001.md', {
      id: "epic-001",
      type: "EPIC",
      title: "Epic 1",
      status: "PENDING",
      owner_persona: "story_owner",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: [],
      jules_session_id: null,
    }, `# Title

## Acceptance Criteria

- [ ] Unchecked task`);

    // Story 1: Child of Epic 1, COMPLETED
    createValidTestNode(tmpDir, '.foundry/stories/story-001.md', {
      id: "story-001",
      type: "STORY",
      title: "Story 1",
      status: "COMPLETED",
      owner_persona: "tech_lead",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: [],
      parent: ".foundry/epics/epic-001.md",
      jules_session_id: null,
    });

    main();

    const epicContent = fs.readFileSync(path.join(tmpDir, '.foundry/epics/epic-001.md'), 'utf-8');
    expect(epicContent).toContain('status: READY');
  });

  test('Late-Binding: Parent wakes up to ACTIVE if owned by human and it has unchecked tasks', () => {
    createValidTestNode(tmpDir, '.foundry/epics/epic-001.md', {
      id: "epic-001",
      type: "EPIC",
      title: "Epic 1",
      status: "PENDING",
      owner_persona: "human",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: [],
      jules_session_id: null,
    }, `# Title

## Acceptance Criteria

- [ ] Unchecked task`);

    createValidTestNode(tmpDir, '.foundry/stories/story-001.md', {
      id: "story-001",
      type: "STORY",
      title: "Story 1",
      status: "COMPLETED",
      owner_persona: "tech_lead",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: [],
      parent: ".foundry/epics/epic-001.md",
      jules_session_id: null,
    });

    main();

    const epicContent = fs.readFileSync(path.join(tmpDir, '.foundry/epics/epic-001.md'), 'utf-8');
    expect(epicContent).toContain('status: ACTIVE');
  });

  test('Late-Binding: Parent does not wake up if dependencies are unresolvable', () => {
    createValidTestNode(tmpDir, '.foundry/epics/epic-001.md', {
      id: "epic-001",
      type: "EPIC",
      title: "Epic 1",
      status: "PENDING",
      owner_persona: "story_owner",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: [".foundry/prds/missing-prd.md"],
      jules_session_id: null,
    }, `# Title

## Acceptance Criteria

- [ ] Unchecked task`);

    createValidTestNode(tmpDir, '.foundry/stories/story-001.md', {
      id: "story-001",
      type: "STORY",
      title: "Story 1",
      status: "COMPLETED",
      owner_persona: "tech_lead",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: [],
      parent: ".foundry/epics/epic-001.md",
      jules_session_id: null,
    });

    main();

    const epicContent = fs.readFileSync(path.join(tmpDir, '.foundry/epics/epic-001.md'), 'utf-8');
    expect(epicContent).toContain('status: PENDING');
  });

  test('Hierarchical Completion: suspends ACTIVE parent to PENDING if it has incomplete children', () => {
    // Epic 1: ACTIVE (started work, but child isn't done)
    createValidTestNode(tmpDir, '.foundry/epics/epic-001.md', {
      id: "epic-001",
      type: "EPIC",
      title: "Epic 1",
      status: "ACTIVE",
      owner_persona: "story_owner",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: [],
      jules_session_id: "sess-123",
    });

    // Story 1: Child of Epic 1, PENDING
    createValidTestNode(tmpDir, '.foundry/stories/story-001.md', {
      id: "story-001",
      type: "STORY",
      title: "Story 1",
      status: "PENDING",
      owner_persona: "tech_lead",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: [],
      parent: ".foundry/epics/epic-001.md",
      jules_session_id: null,
    });

    main();

    // Epic 1 SHOULD be suspended back to PENDING because its child is incomplete
    const epicContent = fs.readFileSync(path.join(tmpDir, '.foundry/epics/epic-001.md'), 'utf-8');
    expect(epicContent).toContain('status: PENDING');

    // Story 1 SHOULD become READY because it has no dependencies
    const storyContent = fs.readFileSync(path.join(tmpDir, '.foundry/stories/story-001.md'), 'utf-8');
    expect(storyContent).toContain('status: READY');
  });

  test('Cascade Cancellation: cancels child nodes of CANCELLED parent recursively', () => {
    createValidTestNode(tmpDir, '.foundry/epics/epic-001.md', {
      id: "epic-001",
      type: "EPIC",
      title: "Cancelled Epic",
      status: "CANCELLED",
      owner_persona: "story_owner",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: [],
      jules_session_id: null,
    });

    createValidTestNode(tmpDir, '.foundry/stories/story-001.md', {
      id: "story-001",
      type: "STORY",
      title: "Story of Cancelled Epic",
      status: "PENDING",
      owner_persona: "tech_lead",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: [],
      parent: ".foundry/epics/epic-001.md",
      jules_session_id: null,
    });

    createValidTestNode(tmpDir, '.foundry/tasks/task-001.md', {
      id: "task-001",
      type: "TASK",
      title: "Task of Story",
      status: "READY",
      owner_persona: "coder",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: [],
      parent: ".foundry/stories/story-001.md",
      jules_session_id: null,
    });

    createValidTestNode(tmpDir, '.foundry/tasks/task-002.md', {
      id: "task-002",
      type: "TASK",
      title: "Completed Task of Story",
      status: "COMPLETED",
      owner_persona: "coder",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: [],
      parent: ".foundry/stories/story-001.md",
      jules_session_id: null,
    });

    main();

    const storyResult = fs.readFileSync(path.join(tmpDir, '.foundry/stories/story-001.md'), 'utf-8');
    expect(storyResult).toContain('status: CANCELLED');

    const task1Result = fs.readFileSync(path.join(tmpDir, '.foundry/tasks/task-001.md'), 'utf-8');
    expect(task1Result).toContain('status: CANCELLED');

    // Should not overwrite COMPLETED
    const task2Result = fs.readFileSync(path.join(tmpDir, '.foundry/tasks/task-002.md'), 'utf-8');
    expect(task2Result).toContain('status: COMPLETED');
  });

  test('Deep Hierarchical Completion: blocks external dependent if dependency has deep incomplete children', () => {
    // Story 1: COMPLETED
    createValidTestNode(tmpDir, '.foundry/stories/story-001.md', {
      id: "story-001",
      type: "STORY",
      title: "Story 1",
      status: "COMPLETED",
      owner_persona: "tech_lead",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: [],
      jules_session_id: null,
    });

    // Task 1: Child of Story 1, COMPLETED
    createValidTestNode(tmpDir, '.foundry/tasks/task-001.md', {
      id: "task-001",
      type: "TASK",
      title: "Task 1",
      status: "COMPLETED",
      owner_persona: "coder",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: [".foundry/stories/story-001.md"],
      parent: ".foundry/stories/story-001.md",
      jules_session_id: null,
    });

    // Subtask 1: Child of Task 1, PENDING
    createValidTestNode(tmpDir, '.foundry/tasks/subtask-001.md', {
      id: "subtask-001",
      type: "TASK",
      title: "Subtask 1",
      status: "PENDING",
      owner_persona: "coder",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: [".foundry/tasks/task-001.md"],
      parent: ".foundry/tasks/task-001.md",
      jules_session_id: null,
    });

    // Story 2: Depends on Story 1, PENDING
    createValidTestNode(tmpDir, '.foundry/stories/story-002.md', {
      id: "story-002",
      type: "STORY",
      title: "Story 2",
      status: "PENDING",
      owner_persona: "tech_lead",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: [".foundry/stories/story-001.md"],
      jules_session_id: null,
    });

    main();

    // Story 2 SHOULD NOT be promoted (it waits for Subtask 1)
    const story2Content = fs.readFileSync(path.join(tmpDir, '.foundry/stories/story-002.md'), 'utf-8');
    expect(story2Content).toContain('status: PENDING');
  });

  test('Human Task Bypass: PENDING human task promotes directly to ACTIVE', () => {
    createValidTestNode(tmpDir, '.foundry/tasks/task-001.md', {
      id: "task-001",
      type: "TASK",
      title: "Human Task 1",
      status: "PENDING",
      owner_persona: "human",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: [],
      jules_session_id: null,
    });

    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    main();

    // Verify it promoted directly to ACTIVE
    const taskContent = fs.readFileSync(path.join(tmpDir, '.foundry/tasks/task-001.md'), 'utf-8');
    expect(taskContent).toContain('status: ACTIVE');

    // Verify it was NOT included in the JSON matrix output (Phase 6 only collects READY)
    expect(logSpy).toHaveBeenCalled();
    const lastCall = logSpy.mock.calls[logSpy.mock.calls.length - 1][0];
    const output = JSON.parse(lastCall);
    expect(output).toHaveLength(0);
  });

  test('Human Task Bypass: existing READY human task upgrades to ACTIVE', () => {
    // Already READY, but owned by human
    createValidTestNode(tmpDir, '.foundry/tasks/task-002.md', {
      id: "task-002",
      type: "TASK",
      title: "Human Task 2",
      status: "READY",
      owner_persona: "human",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: [],
      jules_session_id: null,
    });

    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    main();

    // Verify Phase 5.1 upgraded it
    const taskContent = fs.readFileSync(path.join(tmpDir, '.foundry/tasks/task-002.md'), 'utf-8');
    expect(taskContent).toContain('status: ACTIVE');

    // Verify it was NOT included in the JSON matrix output
    expect(logSpy).toHaveBeenCalled();
    const lastCall = logSpy.mock.calls[logSpy.mock.calls.length - 1][0];
    const output = JSON.parse(lastCall);
    expect(output).toHaveLength(0);
  });

  test('Schema Compatibility: works with Parent-Linked Distributed ID Schema', () => {
    createValidTestNode(tmpDir, '.foundry/epics/epic-001-002-feature.md', {
      id: "epic-001-002-feature",
      type: "EPIC",
      title: "Epic 2",
      status: "COMPLETED",
      owner_persona: "story_owner",
      created_at: "2026-04-24",
      updated_at: "2026-04-24",
      depends_on: [],
      jules_session_id: null,
    });

    createValidTestNode(tmpDir, '.foundry/stories/story-002-005-impl.md', {
      id: "story-002-005-impl",
      type: "STORY",
      title: "Story 5",
      status: "PENDING",
      owner_persona: "tech_lead",
      created_at: "2026-04-24",
      updated_at: "2026-04-24",
      depends_on: [".foundry/epics/epic-001-002-feature.md"],
      jules_session_id: null,
    });

    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    main();

    const storyChar = fs.readFileSync(path.join(tmpDir, '.foundry/stories/story-002-005-impl.md'), 'utf-8');
    expect(storyChar).toContain('status: READY');

    expect(logSpy).toHaveBeenCalled();
    const lastCall = logSpy.mock.calls[logSpy.mock.calls.length - 1][0];
    const output = JSON.parse(lastCall);
    expect(output).toHaveLength(1);
    expect(output[0].id).toBe('story-002-005-impl');
    expect(output[0].status).toBe('READY');
  });

  test('Parent-ID Resolution: resolves parent relationship using node ID', () => {
    createValidTestNode(tmpDir, '.foundry/ideas/idea-001.md', {
      id: "idea-001",
      type: "IDEA",
      title: "Idea 1",
      status: "COMPLETED",
      owner_persona: "product_manager",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: [],
      jules_session_id: null,
    });

    createValidTestNode(tmpDir, '.foundry/prds/prd-001.md', {
      id: "prd-001",
      type: "PRD",
      title: "PRD 1",
      status: "PENDING",
      owner_persona: "epic_planner",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      parent: "idea-001",
      depends_on: [],
      jules_session_id: null,
    });

    main();

    const prdContent = fs.readFileSync(path.join(tmpDir, '.foundry/prds/prd-001.md'), 'utf-8');
    expect(prdContent).toContain('status: READY');
  });

  test('Parent-ID Resolution: Late-Binding wakes up parent identified by ID', () => {
    createValidTestNode(tmpDir, '.foundry/ideas/idea-001.md', {
      id: "idea-001",
      type: "IDEA",
      title: "Idea 1",
      status: "PENDING",
      owner_persona: "product_manager",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: [],
      jules_session_id: null,
    }, `# Title
## Acceptance Criteria

- [ ] Unchecked task
`);

    createValidTestNode(tmpDir, '.foundry/prds/prd-001.md', {
      id: "prd-001",
      type: "PRD",
      title: "PRD 1",
      status: "COMPLETED",
      owner_persona: "epic_planner",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      parent: "idea-001",
      depends_on: [],
      jules_session_id: null,
    });

    main();

    const ideaContent = fs.readFileSync(path.join(tmpDir, '.foundry/ideas/idea-001.md'), 'utf-8');
    expect(ideaContent).toContain('status: READY');
  });


  test('Wait and Wake: Suspends ACTIVE node if dependencies are unresolvable', () => {
    createValidTestNode(tmpDir, '.foundry/tasks/task-active.md', {
      id: "task-active",
      type: "TASK",
      title: "Active Task",
      status: "ACTIVE",
      owner_persona: "coder",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: [".foundry/tasks/task-missing.md"],
      jules_session_id: null,
    });

    main();

    const result = fs.readFileSync(path.join(tmpDir, '.foundry/tasks/task-active.md'), 'utf-8');
    expect(result).toContain('status: PENDING');
  });

  test('Wait and Wake: Suspends ACTIVE node if its descendant is incomplete', () => {
    createValidTestNode(tmpDir, '.foundry/epics/epic-001.md', {
      id: "epic-001",
      type: "EPIC",
      title: "Epic 1",
      status: "ACTIVE",
      owner_persona: "epic_planner",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: [],
      jules_session_id: "sess-1",
    });

    createValidTestNode(tmpDir, '.foundry/stories/story-001.md', {
      id: "story-001",
      type: "STORY",
      title: "Story 1",
      status: "PENDING",
      owner_persona: "story_owner",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: [],
      parent: ".foundry/epics/epic-001.md",
      jules_session_id: null,
    });

    main();

    const result = fs.readFileSync(path.join(tmpDir, '.foundry/epics/epic-001.md'), 'utf-8');
    expect(result).toContain('status: PENDING');
  });

  test('Wait and Wake: Suspends ACTIVE node if dependency is incomplete', () => {
    createValidTestNode(tmpDir, '.foundry/tasks/task-incomplete.md', {
      id: "task-incomplete",
      type: "TASK",
      title: "Incomplete Task",
      status: "PENDING",
      owner_persona: "coder",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: [],
      jules_session_id: null,
    });

    createValidTestNode(tmpDir, '.foundry/tasks/task-active.md', {
      id: "task-active",
      type: "TASK",
      title: "Active Task",
      status: "ACTIVE",
      owner_persona: "coder",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: [".foundry/tasks/task-incomplete.md"],
      jules_session_id: null,
    });

    main();

    const result = fs.readFileSync(path.join(tmpDir, '.foundry/tasks/task-active.md'), 'utf-8');
    expect(result).toContain('status: PENDING');
  });

  test('Wait and Wake: Suspends ACTIVE node if dependency is hierarchically incomplete', () => {
    createValidTestNode(tmpDir, '.foundry/stories/story-001.md', {
      id: "story-001",
      type: "STORY",
      title: "Story",
      status: "COMPLETED",
      owner_persona: "tech_lead",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: [],
      jules_session_id: null,
    });

    createValidTestNode(tmpDir, '.foundry/tasks/task-child.md', {
      id: "task-child",
      type: "TASK",
      title: "Child Task",
      status: "PENDING",
      owner_persona: "coder",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: [],
      parent: ".foundry/stories/story-001.md",
      jules_session_id: null,
    });

    createValidTestNode(tmpDir, '.foundry/tasks/task-active.md', {
      id: "task-active",
      type: "TASK",
      title: "Active Task",
      status: "ACTIVE",
      owner_persona: "coder",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: [".foundry/stories/story-001.md"],
      jules_session_id: null,
    });

    main();

    const result = fs.readFileSync(path.join(tmpDir, '.foundry/tasks/task-active.md'), 'utf-8');
    expect(result).toContain('status: PENDING');
  });

  test('Wait and Wake: Does not suspend ACTIVE node if all dependencies are COMPLETED', () => {
    createValidTestNode(tmpDir, '.foundry/tasks/task-complete.md', {
      id: "task-complete",
      type: "TASK",
      title: "Complete Task",
      status: "COMPLETED",
      owner_persona: "coder",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: [],
      jules_session_id: null,
    });

    createValidTestNode(tmpDir, '.foundry/tasks/task-active.md', {
      id: "task-active",
      type: "TASK",
      title: "Active Task",
      status: "ACTIVE",
      owner_persona: "coder",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: [".foundry/tasks/task-complete.md"],
      jules_session_id: null,
    });

    main();

    const result = fs.readFileSync(path.join(tmpDir, '.foundry/tasks/task-active.md'), 'utf-8');
    expect(result).toContain('status: ACTIVE');
  });


  test('Wait and Wake: Wakes PENDING node to READY if new dependency is COMPLETED', () => {
    createValidTestNode(tmpDir, '.foundry/tasks/task-complete.md', {
      id: "task-complete",
      type: "TASK",
      title: "Complete Task",
      status: "COMPLETED",
      owner_persona: "coder",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: [],
      jules_session_id: null,
    });

    createValidTestNode(tmpDir, '.foundry/tasks/task-pending.md', {
      id: "task-pending",
      type: "TASK",
      title: "Pending Task",
      status: "PENDING",
      owner_persona: "coder",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: [".foundry/tasks/task-complete.md"],
      jules_session_id: null,
    });

    main();

    const result = fs.readFileSync(path.join(tmpDir, '.foundry/tasks/task-pending.md'), 'utf-8');
    expect(result).toContain('status: READY');
  });

  test('Depends-On-ID Resolution: resolves dependencies using node ID', () => {
    createValidTestNode(tmpDir, '.foundry/tasks/task-001.md', {
      id: "task-001",
      type: "TASK",
      title: "Task 1",
      status: "COMPLETED",
      owner_persona: "coder",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: [],
      jules_session_id: null,
    });

    createValidTestNode(tmpDir, '.foundry/tasks/task-002.md', {
      id: "task-002",
      type: "TASK",
      title: "Task 2",
      status: "PENDING",
      owner_persona: "coder",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: ["task-001"],
      jules_session_id: null,
    });

    main();

    const task2Content = fs.readFileSync(path.join(tmpDir, '.foundry/tasks/task-002.md'), 'utf-8');
    expect(task2Content).toContain('status: READY');
  });


  test('Wait and Wake: ACTIVE node transitions to PENDING when new incomplete dependency is added', () => {
    createValidTestNode(tmpDir, '.foundry/tasks/task-incomplete.md', {
      id: "task-incomplete",
      type: "TASK",
      title: "Incomplete Task",
      status: "PENDING",
      owner_persona: "coder",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: [],
      jules_session_id: null,
    });

    createValidTestNode(tmpDir, '.foundry/tasks/task-active.md', {
      id: "task-active",
      type: "TASK",
      title: "Active Task",
      status: "ACTIVE",
      owner_persona: "coder",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: [".foundry/tasks/task-incomplete.md"],
      jules_session_id: "session-123",
    });

    main();

    const result = fs.readFileSync(path.join(tmpDir, '.foundry/tasks/task-active.md'), 'utf-8');
    expect(result).toContain('status: PENDING');
  });

  test('Impossible Loop: wakes up parent if impossible child is FAILED with rejection_reason', () => {
    createValidTestNode(tmpDir, '.foundry/stories/story-001.md', {
      id: "story-001",
      type: "STORY",
      title: "Story",
      status: "PENDING",
      owner_persona: "tech_lead",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: [],
      jules_session_id: null,
    });

    createValidTestNode(tmpDir, '.foundry/tasks/task-impossible.md', {
      id: "task-impossible",
      type: "TASK",
      title: "Impossible Task",
      status: "FAILED",
      owner_persona: "coder",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      parent: ".foundry/stories/story-001.md",
      depends_on: [".foundry/stories/story-001.md"],
      jules_session_id: null,
      rejection_reason: "impossible error",
    });

    main();

    const result = fs.readFileSync(path.join(tmpDir, '.foundry/stories/story-001.md'), 'utf-8');
    expect(result).toContain('status: READY');
  });


  test('Impossible Loop: ignores COMPLETED nodes during permanent failure cancellation cascade', () => {
    createValidTestNode(tmpDir, '.foundry/stories/story-001.md', {
      id: "story-001",
      type: "STORY",
      title: "Story",
      status: "PENDING",
      owner_persona: "tech_lead",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: [],
      jules_session_id: null,
    });

    createValidTestNode(tmpDir, '.foundry/tasks/task-impossible.md', {
      id: "task-impossible",
      type: "TASK",
      title: "Impossible Task",
      status: "FAILED",
      owner_persona: "coder",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      parent: ".foundry/stories/story-001.md",
      depends_on: [".foundry/stories/story-001.md"],
      jules_session_id: null,
      rejection_reason: "Max rejection count reached",
    });

    createValidTestNode(tmpDir, '.foundry/tasks/task-completed.md', {
      id: "task-completed",
      type: "TASK",
      title: "Completed Task",
      status: "COMPLETED",
      owner_persona: "coder",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      parent: ".foundry/stories/story-001.md",
      depends_on: [".foundry/tasks/task-impossible.md"],
      jules_session_id: null,
    });

    main();

    const parentResult = fs.readFileSync(path.join(tmpDir, '.foundry/stories/story-001.md'), 'utf-8');
    expect(parentResult).toContain('status: READY');

    const completedResult = fs.readFileSync(path.join(tmpDir, '.foundry/tasks/task-completed.md'), 'utf-8');
    expect(completedResult).toContain('status: COMPLETED');
    expect(completedResult).not.toContain('status: CANCELLED');
  });

  test('Impossible Loop: Auto-cancels PENDING nodes depending indirectly on permanently failed node', () => {
    createValidTestNode(tmpDir, '.foundry/stories/story-001.md', {
      id: "story-001",
      type: "STORY",
      title: "Story",
      status: "PENDING",
      owner_persona: "tech_lead",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: [],
      jules_session_id: null,
    });

    createValidTestNode(tmpDir, '.foundry/tasks/task-impossible.md', {
      id: "task-impossible",
      type: "TASK",
      title: "Impossible Task",
      status: "FAILED",
      owner_persona: "coder",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      parent: ".foundry/stories/story-001.md",
      depends_on: [".foundry/stories/story-001.md"],
      jules_session_id: null,
      rejection_reason: "Max rejection count reached",
    });

    createValidTestNode(tmpDir, '.foundry/tasks/task-orphaned-qa.md', {
      id: "task-orphaned-qa",
      type: "TASK",
      title: "Orphaned QA Task",
      status: "PENDING",
      owner_persona: "qa",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      parent: ".foundry/stories/story-001.md",
      depends_on: [".foundry/tasks/task-impossible.md"],
      jules_session_id: null,
    });

    createValidTestNode(tmpDir, '.foundry/tasks/task-orphaned-auditor.md', {
      id: "task-orphaned-auditor",
      type: "TASK",
      title: "Orphaned Auditor Task",
      status: "PENDING",
      owner_persona: "auditor",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      parent: ".foundry/stories/story-001.md",
      depends_on: [".foundry/tasks/task-orphaned-qa.md"],
      jules_session_id: null,
    });

    main();

    const parentResult = fs.readFileSync(path.join(tmpDir, '.foundry/stories/story-001.md'), 'utf-8');
    expect(parentResult).toContain('status: READY');

    const qaResult = fs.readFileSync(path.join(tmpDir, '.foundry/tasks/task-orphaned-qa.md'), 'utf-8');
    expect(qaResult).toContain('status: CANCELLED');
    expect(qaResult).toContain("rejection_reason: 'Cancelled due to permanent failure of dependency: task-impossible'");

    const auditorResult = fs.readFileSync(path.join(tmpDir, '.foundry/tasks/task-orphaned-auditor.md'), 'utf-8');
    expect(auditorResult).toContain('status: CANCELLED');
    expect(auditorResult).toContain("rejection_reason: 'Cancelled due to permanent failure of dependency: task-impossible'");
  });

  test('Impossible Loop: Auto-cancels without infinite loop on circular dependency', () => {
    createValidTestNode(tmpDir, '.foundry/stories/story-001.md', {
      id: "story-001",
      type: "STORY",
      title: "Story",
      status: "PENDING",
      owner_persona: "tech_lead",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: [],
      jules_session_id: null,
    });

    createValidTestNode(tmpDir, '.foundry/tasks/task-impossible.md', {
      id: "task-impossible",
      type: "TASK",
      title: "Impossible Task",
      status: "FAILED",
      owner_persona: "coder",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      parent: ".foundry/stories/story-001.md",
      depends_on: [".foundry/stories/story-001.md"],
      jules_session_id: null,
      rejection_reason: "Max rejection count reached",
    });

    createValidTestNode(tmpDir, '.foundry/tasks/task-orphaned-qa.md', {
      id: "task-orphaned-qa",
      type: "TASK",
      title: "Orphaned QA Task",
      status: "PENDING",
      owner_persona: "qa",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      parent: ".foundry/stories/story-001.md",
      depends_on: [".foundry/tasks/task-impossible.md", ".foundry/tasks/task-orphaned-auditor.md"],
      jules_session_id: null,
    });

    createValidTestNode(tmpDir, '.foundry/tasks/task-orphaned-auditor.md', {
      id: "task-orphaned-auditor",
      type: "TASK",
      title: "Orphaned Auditor Task",
      status: "PENDING",
      owner_persona: "auditor",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      parent: ".foundry/stories/story-001.md",
      depends_on: [".foundry/tasks/task-orphaned-qa.md"],
      jules_session_id: null,
    });

    main();

    const qaResult = fs.readFileSync(path.join(tmpDir, '.foundry/tasks/task-orphaned-qa.md'), 'utf-8');
    expect(qaResult).toContain('status: CANCELLED');

    const auditorResult = fs.readFileSync(path.join(tmpDir, '.foundry/tasks/task-orphaned-auditor.md'), 'utf-8');
    expect(auditorResult).toContain('status: CANCELLED');
  });

  test('Impossible Loop: Auto-cancels orphaned PENDING nodes depending on permanently failed node', () => {
    createValidTestNode(tmpDir, '.foundry/stories/story-001.md', {
      id: "story-001",
      type: "STORY",
      title: "Story",
      status: "PENDING",
      owner_persona: "tech_lead",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: [],
      jules_session_id: null,
    });

    createValidTestNode(tmpDir, '.foundry/tasks/task-impossible.md', {
      id: "task-impossible",
      type: "TASK",
      title: "Impossible Task",
      status: "FAILED",
      owner_persona: "coder",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      parent: ".foundry/stories/story-001.md",
      depends_on: [".foundry/stories/story-001.md"],
      jules_session_id: null,
      rejection_reason: "Max rejection count reached",
    });

    createValidTestNode(tmpDir, '.foundry/tasks/task-orphaned-qa.md', {
      id: "task-orphaned-qa",
      type: "TASK",
      title: "Orphaned QA Task",
      status: "PENDING",
      owner_persona: "coder",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      parent: ".foundry/stories/story-001.md",
      depends_on: [".foundry/tasks/task-impossible.md"],
      jules_session_id: null,
    });

    main();

    const parentResult = fs.readFileSync(path.join(tmpDir, '.foundry/stories/story-001.md'), 'utf-8');
    expect(parentResult).toContain('status: READY');

    const qaResult = fs.readFileSync(path.join(tmpDir, '.foundry/tasks/task-orphaned-qa.md'), 'utf-8');
    expect(qaResult).toContain('status: CANCELLED');
    expect(qaResult).toContain("rejection_reason: 'Cancelled due to permanent failure of dependency: task-impossible'");
  });

  test('Impossible Loop: flags node for tpm if no parent exists', () => {
    createValidTestNode(tmpDir, '.foundry/tasks/task-impossible-no-parent.md', {
      id: "task-impossible-no-parent",
      type: "TASK",
      title: "Impossible Task No Parent",
      status: "FAILED",
      owner_persona: "coder",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: [],
      rejection_reason: "Feature not supported",
      jules_session_id: null,
    });

    main();

    const result = fs.readFileSync(path.join(tmpDir, '.foundry/tasks/task-impossible-no-parent.md'), 'utf-8');
    expect(result).toContain('status: BLOCKED');
    expect(result).toContain('owner_persona: tpm');
  });

  test('Mapping Validation: Enforces type to persona mappings before dispatch', () => {
    createValidTestNode(tmpDir, '.foundry/ideas/idea-001.md', { id: "idea-001", type: "IDEA", title: "Idea", status: "PENDING", owner_persona: "product_manager", created_at: "2026-04-20", updated_at: "2026-04-20", depends_on: [], jules_session_id: null });
    createValidTestNode(tmpDir, '.foundry/prds/prd-invalid.md', { id: "prd-invalid", type: "PRD", title: "Invalid PRD", status: "PENDING", owner_persona: "coder", created_at: "2026-04-20", updated_at: "2026-04-20", depends_on: [], jules_session_id: null });
    createValidTestNode(tmpDir, '.foundry/tasks/task-human.md', { id: "task-human", type: "TASK", title: "Human Task", status: "PENDING", owner_persona: "human", created_at: "2026-04-20", updated_at: "2026-04-20", depends_on: [], jules_session_id: null });
    createValidTestNode(tmpDir, '.foundry/research/research-001.md', { id: "research-001", type: "RESEARCH", title: "Research Task", status: "PENDING", owner_persona: "researcher", created_at: "2026-04-20", updated_at: "2026-04-20", depends_on: [], jules_session_id: null });
    createValidTestNode(tmpDir, '.foundry/prds/prd-architect.md', { id: "prd-architect", type: "PRD", title: "Architect PRD", status: "PENDING", owner_persona: "architect", created_at: "2026-04-20", updated_at: "2026-04-20", depends_on: [], jules_session_id: null });
    createValidTestNode(tmpDir, '.foundry/tasks/task-tech-lead.md', { id: "task-tech-lead", type: "TASK", title: "Tech Lead Task", status: "PENDING", owner_persona: "tech_lead", created_at: "2026-04-20", updated_at: "2026-04-20", depends_on: [], jules_session_id: null });
    createValidTestNode(tmpDir, '.foundry/tasks/task-architect.md', { id: "task-architect", type: "TASK", title: "Architect Task", status: "PENDING", owner_persona: "architect", created_at: "2026-04-20", updated_at: "2026-04-20", depends_on: [], jules_session_id: null });

    main();

    const ideaResult = fs.readFileSync(path.join(tmpDir, '.foundry/ideas/idea-001.md'), 'utf-8');
    expect(ideaResult).toContain('status: READY');

    const prdResult = fs.readFileSync(path.join(tmpDir, '.foundry/prds/prd-invalid.md'), 'utf-8');
    expect(prdResult).toContain('status: FAILED');
    expect(prdResult).toContain('rejection_reason: Invalid owner_persona mapping');
    expect(prdResult).toContain('owner_persona: coder');

    const humanResult = fs.readFileSync(path.join(tmpDir, '.foundry/tasks/task-human.md'), 'utf-8');
    expect(humanResult).toContain('status: ACTIVE');

    const researchResult = fs.readFileSync(path.join(tmpDir, '.foundry/research/research-001.md'), 'utf-8');
    expect(researchResult).toContain('status: READY');

    const prdArchitectResult = fs.readFileSync(path.join(tmpDir, '.foundry/prds/prd-architect.md'), 'utf-8');
    expect(prdArchitectResult).toContain('status: FAILED');
    expect(prdArchitectResult).toContain('rejection_reason: Invalid owner_persona mapping');

    const taskTechLeadResult = fs.readFileSync(path.join(tmpDir, '.foundry/tasks/task-tech-lead.md'), 'utf-8');
    expect(taskTechLeadResult).toContain('status: READY');

    const taskArchitectResult = fs.readFileSync(path.join(tmpDir, '.foundry/tasks/task-architect.md'), 'utf-8');
    expect(taskArchitectResult).toContain('status: READY');
  });

  test('Atomic Handoffs: resolves dependencies across single-persona atomic tasks', () => {
    createValidTestNode(tmpDir, '.foundry/tasks/task-atomic-1.md', {
      id: "task-atomic-1",
      type: "TASK",
      title: "Tech Lead Task",
      status: "COMPLETED",
      owner_persona: "tech_lead",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: [],
      jules_session_id: null,
    });

    createValidTestNode(tmpDir, '.foundry/tasks/task-atomic-2.md', {
      id: "task-atomic-2",
      type: "TASK",
      title: "Coder Task",
      status: "PENDING",
      owner_persona: "coder",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: [".foundry/tasks/task-atomic-1.md"],
      jules_session_id: null,
    });

    createValidTestNode(tmpDir, '.foundry/tasks/task-atomic-3.md', {
      id: "task-atomic-3",
      type: "TASK",
      title: "QA Task",
      status: "PENDING",
      owner_persona: "coder",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: [".foundry/tasks/task-atomic-2.md"],
      jules_session_id: null,
    });

    main();

    const coderResult = fs.readFileSync(path.join(tmpDir, '.foundry/tasks/task-atomic-2.md'), 'utf-8');
    expect(coderResult).toContain('status: READY');

    const qaResult = fs.readFileSync(path.join(tmpDir, '.foundry/tasks/task-atomic-3.md'), 'utf-8');
    expect(qaResult).toContain('status: PENDING');
  });

test('Full Lifecycle: IDEA -> PRD -> EPIC -> STORY -> TASK', () => {
fs.mkdirSync(path.join(foundryDir, 'prds'));

fs.writeFileSync(path.join(tmpDir, '.foundry/ideas/idea-001.md'), `---\nid: idea-001\ntype: IDEA\ntitle: "Idea 1"\nstatus: COMPLETED\nowner_persona: product_manager\ncreated_at: "2026-04-20"\nupdated_at: "2026-04-20"\ndepends_on: []\njules_session_id: null\n---\n\n# Title`);
fs.writeFileSync(path.join(tmpDir, '.foundry/prds/prd-001-002.md'), `---\nid: prd-001-002\ntype: PRD\ntitle: "PRD 2"\nstatus: PENDING\nowner_persona: epic_planner\ncreated_at: "2026-04-20"\nupdated_at: "2026-04-20"\nparent: .foundry/ideas/idea-001.md\ndepends_on: [.foundry/ideas/idea-001.md]\njules_session_id: null\n---\n\n# Title`);

main();
expect(fs.readFileSync(path.join(tmpDir, '.foundry/prds/prd-001-002.md'), 'utf-8')).toContain('status: READY');

fs.writeFileSync(path.join(tmpDir, '.foundry/prds/prd-001-002.md'), `---\nid: prd-001-002\ntype: PRD\ntitle: "PRD 2"\nstatus: COMPLETED\nowner_persona: epic_planner\ncreated_at: "2026-04-20"\nupdated_at: "2026-04-20"\nparent: .foundry/ideas/idea-001.md\ndepends_on: [.foundry/ideas/idea-001.md]\njules_session_id: null\n---\n\n# Title`);
fs.writeFileSync(path.join(tmpDir, '.foundry/epics/epic-002-003.md'), `---\nid: epic-002-003\ntype: EPIC\ntitle: "EPIC 3"\nstatus: PENDING\nowner_persona: story_owner\ncreated_at: "2026-04-20"\nupdated_at: "2026-04-20"\nparent: .foundry/prds/prd-001-002.md\ndepends_on: [.foundry/prds/prd-001-002.md]\njules_session_id: null\n---\n\n# Title`);

main();
expect(fs.readFileSync(path.join(tmpDir, '.foundry/epics/epic-002-003.md'), 'utf-8')).toContain('status: READY');

fs.writeFileSync(path.join(tmpDir, '.foundry/epics/epic-002-003.md'), `---\nid: epic-002-003\ntype: EPIC\ntitle: "EPIC 3"\nstatus: COMPLETED\nowner_persona: story_owner\ncreated_at: "2026-04-20"\nupdated_at: "2026-04-20"\nparent: .foundry/prds/prd-001-002.md\ndepends_on: [.foundry/prds/prd-001-002.md]\njules_session_id: null\n---\n\n# Title`);
fs.writeFileSync(path.join(tmpDir, '.foundry/stories/story-003-004.md'), `---\nid: story-003-004\ntype: STORY\ntitle: "STORY 4"\nstatus: PENDING\nowner_persona: tech_lead\ncreated_at: "2026-04-20"\nupdated_at: "2026-04-20"\nparent: .foundry/epics/epic-002-003.md\ndepends_on: [.foundry/epics/epic-002-003.md]\njules_session_id: null\n---\n\n# Title`);

main();
expect(fs.readFileSync(path.join(tmpDir, '.foundry/stories/story-003-004.md'), 'utf-8')).toContain('status: READY');

fs.writeFileSync(path.join(tmpDir, '.foundry/stories/story-003-004.md'), `---\nid: story-003-004\ntype: STORY\ntitle: "STORY 4"\nstatus: COMPLETED\nowner_persona: tech_lead\ncreated_at: "2026-04-20"\nupdated_at: "2026-04-20"\nparent: .foundry/epics/epic-002-003.md\ndepends_on: [.foundry/epics/epic-002-003.md]\njules_session_id: null\n---\n\n# Title`);
fs.writeFileSync(path.join(tmpDir, '.foundry/tasks/task-004-005.md'), `---\nid: task-004-005\ntype: TASK\ntitle: "TASK 5"\nstatus: PENDING\nowner_persona: coder\ncreated_at: "2026-04-20"\nupdated_at: "2026-04-20"\nparent: .foundry/stories/story-003-004.md\ndepends_on: [.foundry/stories/story-003-004.md]\njules_session_id: null\n---\n\n# Title`);

main();
expect(fs.readFileSync(path.join(tmpDir, '.foundry/tasks/task-004-005.md'), 'utf-8')).toContain('status: READY');
});


  test('Enforce Acceptance Criteria: preflight fails leaf tasks with unchecked boxes', () => {
    createValidTestNode(tmpDir, '.foundry/tasks/task-unchecked-leaf.md', {
      id: "task-unchecked-leaf",
      type: "TASK",
      title: "Leaf Task",
      status: "PENDING",
      owner_persona: "coder",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: [],
      jules_session_id: null,
    }, `## Acceptance Criteria
- [ ] Unchecked
Target artifact: [.foundry/tasks/task-completed.md](.foundry/tasks/task-completed.md)
`);

    createValidTestNode(tmpDir, '.foundry/tasks/task-completed.md', {
      id: "task-completed",
      type: "TASK",
      title: "Completed Task",
      status: "COMPLETED",
      owner_persona: "coder",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: [],
      jules_session_id: null,
    });

    main();

    const content = fs.readFileSync(path.join(tmpDir, '.foundry/tasks/task-unchecked-leaf.md'), 'utf-8');
    expect(content).toContain('status: FAILED');
    expect(content).toContain('rejection_reason: Merged with unfulfilled acceptance criteria');
  });

  test('Preflight: bypasses dispatch and marks COMPLETED if target artifacts exist and are valid', () => {
    createValidTestNode(tmpDir, '.foundry/epics/epic-preflight-1.md', {
      id: "epic-preflight-1",
      type: "EPIC",
      title: "Epic 1",
      status: "PENDING",
      owner_persona: "story_owner",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: [],
      jules_session_id: null,
    });

    createValidTestNode(tmpDir, '.foundry/stories/story-preflight-1.md', {
      id: "story-preflight-1",
      type: "STORY",
      title: "Story 1",
      status: "COMPLETED",
      owner_persona: "tech_lead",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: [],
      parent: ".foundry/epics/epic-preflight-1.md",
      jules_session_id: null,
    });

    const filePath = path.join(tmpDir, '.foundry/epics/epic-preflight-1.md');
    fs.appendFileSync(filePath, '\nTarget artifact: [.foundry/stories/story-preflight-1.md](.foundry/stories/story-preflight-1.md)');

    main();

    const epicContent = fs.readFileSync(filePath, 'utf-8');
    expect(epicContent).toContain('status: COMPLETED');
  });

  test('Preflight: does not bypass if target artifacts exist but are invalid', () => {
    createValidTestNode(tmpDir, '.foundry/epics/epic-preflight-2.md', {
      id: "epic-preflight-2",
      type: "EPIC",
      title: "Epic 2",
      status: "PENDING",
      owner_persona: "story_owner",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: [],
      jules_session_id: null,
    });

    // Invalid story (missing required fields)
    const invalidStoryPath = path.join(tmpDir, '.foundry/stories/story-preflight-2-invalid.md');
    fs.mkdirSync(path.dirname(invalidStoryPath), { recursive: true });
    fs.writeFileSync(invalidStoryPath, `---\nid: story-preflight-2-invalid\nstatus: PENDING\n---\n\n# Title`, 'utf-8');

    const filePath = path.join(tmpDir, '.foundry/epics/epic-preflight-2.md');
    fs.appendFileSync(filePath, '\nTarget artifact: [.foundry/stories/story-preflight-2-invalid.md](.foundry/stories/story-preflight-2-invalid.md)');

    main();

    const epicContent = fs.readFileSync(filePath, 'utf-8');
    expect(epicContent).toContain('status: READY'); // Promoted, not bypassed
  });

  test('Late-Binding: Parent with unchecked tasks and completed children is promoted exactly once', () => {
    createValidTestNode(tmpDir, '.foundry/ideas/idea-001.md', {
      id: "idea-001",
      type: "IDEA",
      title: "Idea 1",
      status: "PENDING",
      owner_persona: "product_manager",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: [],
      jules_session_id: null,
    }, `# Title
## Acceptance Criteria

- [ ] Unchecked task
- Spawned: [.foundry/prds/prd-001.md](.foundry/prds/prd-001.md)
`);

    createValidTestNode(tmpDir, '.foundry/prds/prd-001.md', {
      id: "prd-001",
      type: "PRD",
      title: "PRD 1",
      status: "COMPLETED",
      owner_persona: "epic_planner",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: [],
      parent: ".foundry/ideas/idea-001.md",
      jules_session_id: null,
    });

    const stderrSpy = vi.spyOn(process.stderr, 'write');
    main();

    const output = stderrSpy.mock.calls.map(call => call[0] as string).join('');
    const warnings = output.split('\n').filter(line => line.includes('WARN'));

    if (warnings.length > 0) {
      console.log('Captured warnings:', warnings);
    }

    // Verify "Cannot promote status" warning is NOT present
    const doublePromotionWarning = warnings.find(w => w.includes('Cannot promote status') && w.includes('idea-001.md'));
    expect(doublePromotionWarning).toBeUndefined();

    const ideaContent = fs.readFileSync(path.join(tmpDir, '.foundry/ideas/idea-001.md'), 'utf-8');
    expect(ideaContent).toContain('status: READY');
  });

  test('Mapping Validation: allows architect to own TASK nodes', () => {
    createValidTestNode(tmpDir, '.foundry/tasks/task-architect.md', {
      id: "task-architect",
      type: "TASK",
      title: "Architect Task",
      status: "PENDING",
      owner_persona: "architect",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: [],
      jules_session_id: null,
    });

    main();

    const result = fs.readFileSync(path.join(tmpDir, '.foundry/tasks/task-architect.md'), 'utf-8');
    expect(result).toContain('status: READY');
    expect(result).toContain('owner_persona: architect');
  });

  test('VERIFYING state: collected with auditor persona and acts as hierarchical block', () => {
    createValidTestNode(tmpDir, '.foundry/tasks/task-verifying.md', {
      id: "task-verifying",
      type: "TASK",
      title: "Verifying Task",
      status: "VERIFYING",
      owner_persona: "coder",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: [],
      jules_session_id: null,
    });

    createValidTestNode(tmpDir, '.foundry/tasks/task-blocked.md', {
      id: "task-blocked",
      type: "TASK",
      title: "Blocked Task",
      status: "PENDING",
      owner_persona: "coder",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: [".foundry/tasks/task-verifying.md"],
      jules_session_id: null,
    });

    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    main();

    const blockedResult = fs.readFileSync(path.join(tmpDir, '.foundry/tasks/task-blocked.md'), 'utf-8');
    expect(blockedResult).toContain('status: PENDING'); // Should be blocked by VERIFYING

    // Should include the VERIFYING node in the matrix output but mapped to auditor
    const stdoutArgs = consoleSpy.mock.calls[0][0];
    const parsedOutput = JSON.parse(stdoutArgs);

    expect(parsedOutput).toHaveLength(1);
    expect(parsedOutput[0].id).toBe('task-verifying');
    expect(parsedOutput[0].owner_persona).toBe('auditor');

    // Original file should NOT be modified
    const verifyingResult = fs.readFileSync(path.join(tmpDir, '.foundry/tasks/task-verifying.md'), 'utf-8');
    expect(verifyingResult).toContain('owner_persona: coder');
  });

});

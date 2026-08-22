import { expect, test, describe, vi, beforeEach, afterEach } from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as os from 'node:os';
import { main } from './foundry-orchestrator';
import { createValidTestNode } from './foundry-test-utils';

describe('foundry-orchestrator', () => {
  let tmpDir: string;
vi.doMock('node:url', async (importOriginal) => {
  const actual = await importOriginal() as Record<string, any>;
  return {
    ...actual,
    fileURLToPath: () => require('path').join(tmpDir, '.github/scripts/file.ts')
  };
});
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

    // @ts-ignore
    vi.doMock('node:url', async (importOriginal) => {
      const actual = await importOriginal() as Record<string, any>;
      return {
        ...actual,
        fileURLToPath: () => require('path').join(process.cwd(), '.github/scripts/file.ts')
      };
    });

    vi.spyOn(process, 'exit').mockImplementation(() => undefined as never);
    vi.spyOn(process.stderr, 'write').mockImplementation(() => true);
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
    vi.restoreAllMocks();
  });



  test('PromoteNodeStatus: clears rejection_reason on valid transition', () => {
    createValidTestNode(tmpDir, '.foundry/tasks/task-001.md', {
      id: "task-001",
      type: "TASK",
      title: "Task 1",
      status: "PENDING",
      owner_persona: "coder",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: [],
      jules_session_id: null,
      rejection_reason: "Previous failure reason"
    });

    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    main();

    const output = consoleSpy.mock.calls[0][0];
    const readyNodes = JSON.parse(output);

    expect(readyNodes).toHaveLength(1);
    expect(readyNodes[0].id).toBe('task-001');

    const fileContent = fs.readFileSync(path.join(tmpDir, '.foundry/tasks/task-001.md'), 'utf-8');
    expect(fileContent).toContain('status: READY');
    expect(fileContent).toContain("rejection_reason: ''");
  });

  test('Late-Binding Parent fails to COMPLETED if EPIC lacks E2E story', () => {
    createValidTestNode(tmpDir, '.foundry/epics/epic-e2e.md', {
      id: "epic-e2e",
      type: "EPIC",
      title: "Epic E2E",
      status: "PENDING",
      owner_persona: "story_owner",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: [],
      jules_session_id: null
    }, "## Acceptance Criteria\n- [x] Task\n");

    createValidTestNode(tmpDir, '.foundry/stories/story-no-e2e.md', {
      id: "story-no-e2e",
      type: "STORY",
      title: "Story No E2E",
      status: "COMPLETED",
      owner_persona: "story_owner",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: [],
      parent: "epic-e2e",
      tags: ["frontend"],
      jules_session_id: null
    });

    vi.spyOn(console, 'log').mockImplementation(() => {});
    main();
    const fileContent = fs.readFileSync(path.join(tmpDir, '.foundry/epics/epic-e2e.md'), 'utf-8');
    expect(fileContent).toContain('status: FAILED');
    expect(fileContent).toContain('Missing E2E/integration story');
  });

  test('Late-Binding Parent promotes to COMPLETED if EPIC has E2E story', () => {
    createValidTestNode(tmpDir, '.foundry/epics/epic-with-e2e.md', {
      id: "epic-with-e2e",
      type: "EPIC",
      title: "Epic E2E",
      status: "PENDING",
      owner_persona: "story_owner",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: [],
      jules_session_id: null
    }, "## Acceptance Criteria\n- [x] Task\n");

    createValidTestNode(tmpDir, '.foundry/stories/story-e2e.md', {
      id: "story-e2e",
      type: "STORY",
      title: "Story E2E",
      status: "COMPLETED",
      owner_persona: "story_owner",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: [],
      parent: "epic-with-e2e",
      tags: ["e2E", "frontend"],
      jules_session_id: null
    });

    vi.spyOn(console, 'log').mockImplementation(() => {});
    main();
    const fileContent = fs.readFileSync(path.join(tmpDir, '.foundry/epics/epic-with-e2e.md'), 'utf-8');
    expect(fileContent).toContain('status: COMPLETED');
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
      owner_persona: "coder, qa" as any,
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
      owner_persona: ["coder","qa"] as any,
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


  test('Implicit Dependency: PENDING node remains PENDING if an unresolvable dependency exists', () => {
    createValidTestNode(tmpDir, '.foundry/tasks/task-with-unresolvable.md', {
      id: "task-with-unresolvable",
      type: "TASK",
      title: "Task with Unresolvable",
      status: "PENDING",
      owner_persona: "coder",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: [".foundry/missing/missing.md"],
      jules_session_id: null,
    });

    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    main();

    const result = fs.readFileSync(path.join(tmpDir, '.foundry/tasks/task-with-unresolvable.md'), 'utf-8');
    expect(result).toContain('status: PENDING');
    const parsedOutput = JSON.parse(consoleSpy.mock.calls[0][0]);
    expect(parsedOutput).toHaveLength(0);
  });


  test('Implicit Dependency: ACTIVE node suspends to PENDING if an unresolvable dependency is added', () => {
    createValidTestNode(tmpDir, '.foundry/tasks/task-active-unresolvable.md', {
      id: "task-active-unresolvable",
      type: "TASK",
      title: "Active Task Unresolvable",
      status: "ACTIVE",
      owner_persona: "coder",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: [".foundry/missing/missing.md"],
      jules_session_id: "sess-123",
    });

    main();

    const result = fs.readFileSync(path.join(tmpDir, '.foundry/tasks/task-active-unresolvable.md'), 'utf-8');
    expect(result).toContain('status: PENDING');
  });


  test('Implicit Dependency: PENDING node with sequential sibling dependencies waits for prerequisite', () => {
    // Sibling 1
    createValidTestNode(tmpDir, '.foundry/tasks/task-sibling-1.md', {
      id: "task-sibling-1",
      type: "TASK",
      title: "Task Sibling 1",
      status: "PENDING",
      owner_persona: "coder",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: [],
      parent: ".foundry/stories/story-001.md",
      jules_session_id: null,
    });

    // Sibling 2 depends on Sibling 1 explicitly
    createValidTestNode(tmpDir, '.foundry/tasks/task-sibling-2.md', {
      id: "task-sibling-2",
      type: "TASK",
      title: "Task Sibling 2",
      status: "PENDING",
      owner_persona: "coder",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: [".foundry/tasks/task-sibling-1.md"],
      parent: ".foundry/stories/story-001.md",
      jules_session_id: null,
    });

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

    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    main();

    const result1 = fs.readFileSync(path.join(tmpDir, '.foundry/tasks/task-sibling-1.md'), 'utf-8');
    expect(result1).toContain('status: READY');

    const result2 = fs.readFileSync(path.join(tmpDir, '.foundry/tasks/task-sibling-2.md'), 'utf-8');
    expect(result2).toContain('status: PENDING');

    const parsedOutput = JSON.parse(consoleSpy.mock.calls[0][0]);
    expect(parsedOutput).toHaveLength(1);
    expect(parsedOutput[0].id).toBe('task-sibling-1');
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

  test('Hierarchical Completion: considers CANCELLED nodes as complete', () => {
    createValidTestNode(tmpDir, '.foundry/tasks/task-001.md', {
      id: "task-001",
      type: "TASK",
      title: "Task 1",
      status: "CANCELLED",
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
      depends_on: [".foundry/tasks/task-001.md"],
      jules_session_id: null,
    });

    main();

    const result = fs.readFileSync(path.join(tmpDir, '.foundry/tasks/task-002.md'), 'utf-8');
    expect(result).toContain('status: READY');
  });

  test('Hierarchical Completion: considers CANCELLED child nodes as complete', () => {
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

    // Story 1: Child of Epic 1, CANCELLED
    createValidTestNode(tmpDir, '.foundry/stories/story-001.md', {
      id: "story-001",
      type: "STORY",
      title: "Story 1",
      status: "CANCELLED",
      owner_persona: "tech_lead",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: [],
      parent: ".foundry/epics/epic-001.md",
      tags: ["integration"],
      jules_session_id: null,
    });

    main();

    // Epic 1 SHOULD be promoted to COMPLETED because its child is CANCELLED (which counts as completed)
    const epicContent = fs.readFileSync(path.join(tmpDir, '.foundry/epics/epic-001.md'), 'utf-8');
    expect(epicContent).toContain('status: COMPLETED');
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
      tags: ["e2e"],
      jules_session_id: null,
    });

    main();

    // Story 1 SHOULD be promoted to READY because Epic 1 is PENDING but has children
    const storyContent = fs.readFileSync(path.join(tmpDir, '.foundry/stories/story-001.md'), 'utf-8');
    expect(storyContent).toContain('status: READY');
  });

  test('Late-Binding: Parent wakes up when some children are CANCELLED and others COMPLETED', () => {
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
      jules_session_id: null,
      parent: "epic-001"
    });

    // Story 2: Child of Epic 1, CANCELLED
    createValidTestNode(tmpDir, '.foundry/stories/story-002.md', {
      id: "story-002",
      type: "STORY",
      title: "Story 2",
      status: "CANCELLED",
      owner_persona: "tech_lead",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: [],
      jules_session_id: null,
      parent: "epic-001",
      rejection_reason: "Feature deprecated"
    });

    fs.appendFileSync(path.join(tmpDir, '.foundry/epics/epic-001.md'), '\n\n## Acceptance Criteria\n- [ ] Create child nodes');

    main();

    const epicContent = fs.readFileSync(path.join(tmpDir, '.foundry/epics/epic-001.md'), 'utf-8');
    expect(epicContent).toContain('status: READY'); // Because it has an unchecked box
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
      tags: ["integration"],
      jules_session_id: null,
    });

    main();

    const epicContent = fs.readFileSync(path.join(tmpDir, '.foundry/epics/epic-001.md'), 'utf-8');
    expect(epicContent).toContain('status: COMPLETED');
  });

  test('Late-Binding: Parent auto-remediates to COMPLETED if it has unchecked tasks and completed children', () => {
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
      tags: ["e2e"],
    });

    main();

    const epicContent = fs.readFileSync(path.join(tmpDir, '.foundry/epics/epic-001.md'), 'utf-8');
    expect(epicContent).toContain('status: COMPLETED');
    expect(epicContent).toContain('- [x] Unchecked task');
  });

  test('Late-Binding: Human-owned parent auto-remediates to COMPLETED when children are completed', () => {
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
      tags: ["e2e"],
    });

    main();

    const epicContent = fs.readFileSync(path.join(tmpDir, '.foundry/epics/epic-001.md'), 'utf-8');
    expect(epicContent).toContain('status: COMPLETED');
    expect(epicContent).toContain('- [x] Unchecked task');
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

  test('Hierarchical Completion: suspends VERIFYING parent to PENDING if it has incomplete children', () => {
    createValidTestNode(tmpDir, '.foundry/epics/epic-001.md', {
      id: "epic-001",
      type: "EPIC",
      title: "Epic 1",
      status: "VERIFYING",
      owner_persona: "story_owner",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: [],
      jules_session_id: "sess-123",
    });

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

    const epicContent = fs.readFileSync(path.join(tmpDir, '.foundry/epics/epic-001.md'), 'utf-8');
    expect(epicContent).toContain('status: PENDING');
  });

  test('Hierarchical Completion: suspends READY parent to PENDING if it has incomplete children', () => {
    createValidTestNode(tmpDir, '.foundry/epics/epic-001.md', {
      id: "epic-001",
      type: "EPIC",
      title: "Epic 1",
      status: "READY",
      owner_persona: "story_owner",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: [],
      jules_session_id: "sess-123",
    });

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

    const epicContent = fs.readFileSync(path.join(tmpDir, '.foundry/epics/epic-001.md'), 'utf-8');
    expect(epicContent).toContain('status: PENDING');
  });

  test('Hierarchical Completion: considers VERIFYING child as incomplete and suspends ACTIVE parent', () => {
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

    createValidTestNode(tmpDir, '.foundry/stories/story-001.md', {
      id: "story-001",
      type: "STORY",
      title: "Story 1",
      status: "VERIFYING",
      owner_persona: "tech_lead",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: [],
      parent: ".foundry/epics/epic-001.md",
      jules_session_id: "sess-456",
    });

    main();

    const epicContent = fs.readFileSync(path.join(tmpDir, '.foundry/epics/epic-001.md'), 'utf-8');
    expect(epicContent).toContain('status: PENDING');
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

  test('Hierarchical completeness considers CANCELLED nodes as complete', () => {
    createValidTestNode(tmpDir, '.foundry/epics/epic-cancelled.md', {
      id: "epic-cancelled",
      type: "EPIC",
      title: "Cancelled Epic",
      status: "CANCELLED",
      owner_persona: "story_owner",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: [],
      jules_session_id: null
    });

    createValidTestNode(tmpDir, '.foundry/stories/story-dependent.md', {
      id: "story-dependent",
      type: "STORY",
      title: "Story Dependent on Cancelled Epic",
      status: "PENDING",
      owner_persona: "tech_lead",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: ["epic-cancelled"],
      jules_session_id: null
    });

    main();

    const storyResult = fs.readFileSync(path.join(tmpDir, '.foundry/stories/story-dependent.md'), 'utf-8');
    expect(storyResult).toContain('status: READY');
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

  test('Parent-ID Resolution: Late-Binding completes parent identified by ID when child is COMPLETED', () => {
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
    expect(ideaContent).toContain('status: COMPLETED');
    expect(ideaContent).toContain('- [x] Unchecked task');
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

  test('Wait and Wake: Suspends ACTIVE node if dependency is incomplete (CANCELLED counts as complete)', () => {
    createValidTestNode(tmpDir, '.foundry/tasks/task-cancelled.md', {
      id: "task-cancelled",
      type: "TASK",
      title: "Cancelled Task",
      status: "CANCELLED",
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
      depends_on: [".foundry/tasks/task-cancelled.md"],
      jules_session_id: null,
    });

    main();

    // Since the dependency is CANCELLED (which counts as complete),
    // the ACTIVE node should NOT be suspended to PENDING.
    const result = fs.readFileSync(path.join(tmpDir, '.foundry/tasks/task-active.md'), 'utf-8');
    expect(result).toContain('status: ACTIVE');
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

  test('Impossible Loop: Wakes up parent if child is CANCELLED due to max rejections', () => {
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
      status: "CANCELLED",
      owner_persona: "coder",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      parent: ".foundry/stories/story-001.md",
      depends_on: [".foundry/stories/story-001.md"],
      jules_session_id: null,
      rejection_reason: "Max rejection count reached",
    });

    main();

    const result = fs.readFileSync(path.join(tmpDir, '.foundry/stories/story-001.md'), 'utf-8');
    expect(result).toContain('status: READY');
  });

  test('Phase 3.6 E2E: Lifecycle from max rejection to node cancellation and parent awakening', () => {
    createValidTestNode(tmpDir, '.foundry/stories/story-e2e.md', {
      id: "story-e2e",
      type: "STORY",
      title: "Story E2E",
      status: "PENDING",
      owner_persona: "tech_lead",
    }, "- [ ] .foundry/tasks/task-e2e-1.md");

    createValidTestNode(tmpDir, '.foundry/tasks/task-e2e-1.md', {
      id: "task-e2e-1",
      type: "TASK",
      title: "Task E2E 1",
      status: "FAILED",
      owner_persona: "coder",
      parent: "story-e2e",
      rejection_reason: "Failed a lot",
      rejection_count: 3
    });

    main();

    const task1Content = fs.readFileSync(path.join(tmpDir, '.foundry/tasks/task-e2e-1.md'), 'utf-8');
    expect(task1Content).toContain('status: CANCELLED');
    expect(task1Content).toContain("rejection_reason: '[ACKNOWLEDGED] Max rejection count reached'");

    const storyContent = fs.readFileSync(path.join(tmpDir, '.foundry/stories/story-e2e.md'), 'utf-8');
    expect(storyContent).toContain('status: READY');
  });

  test('Impossible Loop: Auto-cancels node when max rejection count is reached', async () => {
    createValidTestNode(tmpDir, '.foundry/stories/story-001.md', {
      id: "story-001",
      type: "STORY",
      title: "Story",
      status: "PENDING",
      owner_persona: "tech_lead",
    }, "- [ ] .foundry/tasks/task-001.md\n- [ ] .foundry/tasks/task-002.md");

    createValidTestNode(tmpDir, '.foundry/tasks/task-001.md', {
      id: "task-001",
      type: "TASK",
      title: "Task 1",
      status: "FAILED",
      owner_persona: "coder",
      parent: ".foundry/stories/story-001.md",
      rejection_reason: "Failed a lot",
      rejection_count: 3
    });

    createValidTestNode(tmpDir, '.foundry/tasks/task-002.md', {
      id: "task-002",
      type: "TASK",
      title: "Task 2",
      status: "PENDING",
      owner_persona: "coder",
      depends_on: [".foundry/tasks/task-001.md"],
      parent: ".foundry/stories/story-001.md"
    });

    const orchestratorPath = path.resolve(__dirname, 'foundry-orchestrator.ts');
    require('child_process').execSync(`node --experimental-strip-types "${orchestratorPath}"`, { cwd: tmpDir }).toString();

    const task1Content = fs.readFileSync(path.join(tmpDir, '.foundry/tasks/task-001.md'), 'utf-8');
    expect(task1Content).toContain('status: CANCELLED');
    expect(task1Content).toContain("rejection_reason: '[ACKNOWLEDGED] Max rejection count reached'");

    const task2Content = fs.readFileSync(path.join(tmpDir, '.foundry/tasks/task-002.md'), 'utf-8');
    expect(task2Content).toContain('status: CANCELLED');
    const storyContent = fs.readFileSync(path.join(tmpDir, '.foundry/stories/story-001.md'), 'utf-8');
    expect(storyContent).toContain('status: READY');
    expect(task2Content).toContain('rejection_reason: \'Cancelled due to permanent failure of dependency: task-001\'');
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
      owner_persona: "coder",
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
      owner_persona: "coder",
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
    createValidTestNode(tmpDir, '.foundry/adrs/adr-architect.md', { id: "adr-architect", type: "ADR", title: "Architect PRD", status: "PENDING", owner_persona: "architect", created_at: "2026-04-20", updated_at: "2026-04-20", depends_on: [], jules_session_id: null });
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

    const adrArchitectResult = fs.readFileSync(path.join(tmpDir, '.foundry/adrs/adr-architect.md'), 'utf-8');
    expect(adrArchitectResult).toContain('status: READY');

    const taskTechLeadResult = fs.readFileSync(path.join(tmpDir, '.foundry/tasks/task-tech-lead.md'), 'utf-8');
    expect(taskTechLeadResult).toContain('status: READY');

    const taskArchitectResult = fs.readFileSync(path.join(tmpDir, '.foundry/tasks/task-architect.md'), 'utf-8');
    expect(taskArchitectResult).toContain('status: READY');
  });

  test('RESEARCH/ADR nodes with >200 chars and unchecked tasks are promoted to READY, not auto-completed', () => {
    const longBody = '## Acceptance Criteria\n- [ ] Task 1\n- [ ] Task 2\n' + 'a'.repeat(250);
    createValidTestNode(tmpDir, '.foundry/research/research-long.md', {
      id: "research-long",
      type: "RESEARCH",
      title: "Long Research",
      status: "PENDING",
      owner_persona: "researcher",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: [],
      jules_session_id: null
    }, longBody);

    main();

    const researchResult = fs.readFileSync(path.join(tmpDir, '.foundry/research/research-long.md'), 'utf-8');
    expect(researchResult).toContain('status: READY');
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

  test('Leaf task: bypasses dispatch and marks COMPLETED if all acceptance criteria checkboxes are checked', () => {
    createValidTestNode(tmpDir, '.foundry/tasks/task-checked-leaf.md', {
      id: "task-checked-leaf",
      type: "TASK",
      title: "Leaf Task with Checked Criteria",
      status: "PENDING",
      owner_persona: "coder",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: [],
      jules_session_id: null,
    }, `## Acceptance Criteria
- [x] Task 1 completed
- [X] Task 2 completed
`);

    main();

    const content = fs.readFileSync(path.join(tmpDir, '.foundry/tasks/task-checked-leaf.md'), 'utf-8');
    expect(content).toContain('status: COMPLETED');
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
    expect(ideaContent).toContain('status: COMPLETED');
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

  test('ADR Resolution: resolves dependencies pointing to ADRs in .foundry/docs/adrs/', () => {
    // 1. Create COMPLETED ADR in .foundry/docs/adrs/
    createValidTestNode(tmpDir, '.foundry/docs/adrs/021-hof-parsing.md', {
      id: "adr-044-021-hof-parsing",
      type: "ADR",
      title: "ADR 021",
      status: "COMPLETED",
      owner_persona: "architect",
      created_at: "2026-06-10",
      updated_at: "2026-06-10",
      depends_on: [],
      jules_session_id: null,
    });

    // 2. Create PENDING Epic depending on ADR ID
    createValidTestNode(tmpDir, '.foundry/epics/epic-001.md', {
      id: "epic-001",
      type: "EPIC",
      title: "Epic 1",
      status: "PENDING",
      owner_persona: "story_owner",
      created_at: "2026-06-10",
      updated_at: "2026-06-10",
      depends_on: ["adr-044-021-hof-parsing"],
      jules_session_id: null,
    });

    main();

    // 3. Verify Epic promoted to READY
    const epicContent = fs.readFileSync(path.join(tmpDir, '.foundry/epics/epic-001.md'), 'utf-8');
    expect(epicContent).toContain('status: READY');
  });

  test('Late-Binding: Child of PENDING parent should be blocked if parent dependencies are incomplete', () => {
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

    createValidTestNode(tmpDir, '.foundry/epics/epic-002.md', {
      id: "epic-002",
      type: "EPIC",
      title: "Epic 2",
      status: "PENDING",
      owner_persona: "story_owner",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: [".foundry/epics/epic-001.md"], // Parent depends on Epic 1
      jules_session_id: null,
    });

    createValidTestNode(tmpDir, '.foundry/stories/story-001.md', {
      id: "story-001",
      type: "STORY",
      title: "Story 1",
      status: "PENDING",
      owner_persona: "tech_lead",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: [],
      parent: ".foundry/epics/epic-002.md",
      jules_session_id: null,
    });

    main();

    const storyResult = fs.readFileSync(path.join(tmpDir, '.foundry/stories/story-001.md'), 'utf-8');
    expect(storyResult).toContain('status: PENDING'); // Should be blocked
  });


  test('Markdown Link Child: suspends ACTIVE parent to PENDING if markdown-linked child is incomplete', () => {
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
    }, `## Acceptance Criteria\n- [ ] Child task: [.foundry/stories/story-001.md](.foundry/stories/story-001.md)\n`);

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
      jules_session_id: null,
    });

    main();

    const epicContent = fs.readFileSync(path.join(tmpDir, '.foundry/epics/epic-001.md'), 'utf-8');
    expect(epicContent).toContain('status: PENDING');

    const storyContent = fs.readFileSync(path.join(tmpDir, '.foundry/stories/story-001.md'), 'utf-8');
    expect(storyContent).toContain('status: READY');
  });

  test('Late-Binding with Markdown ID references: suspends ACTIVE parent to PENDING if child referenced by ID is incomplete', () => {
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
    }, `## Acceptance Criteria\n- [ ] story-001\n`);

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
      jules_session_id: null,
    });

    main();

    const epicContent = fs.readFileSync(path.join(tmpDir, '.foundry/epics/epic-001.md'), 'utf-8');
    expect(epicContent).toContain('status: PENDING');

    const storyContent = fs.readFileSync(path.join(tmpDir, '.foundry/stories/story-001.md'), 'utf-8');
    expect(storyContent).toContain('status: READY');
  });

  test('Late-Binding with Markdown ID references: Parent auto-remediates to COMPLETED when children referenced by ID are completed', () => {
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
    }, `# Title\n## Acceptance Criteria\n\n- [ ] Unchecked task\n- [x] prd-001\n`);

    createValidTestNode(tmpDir, '.foundry/prds/prd-001.md', {
      id: "prd-001",
      type: "PRD",
      title: "PRD 1",
      status: "COMPLETED",
      owner_persona: "epic_planner",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: [],
      jules_session_id: null,
    });

    main();

    const ideaContent = fs.readFileSync(path.join(tmpDir, '.foundry/ideas/idea-001.md'), 'utf-8');
    expect(ideaContent).toContain('status: COMPLETED');
    expect(ideaContent).toContain('- [x] Unchecked task');
  });

  test('Late-Binding with Markdown Link: Parent auto-remediates to COMPLETED when markdown-linked children are completed', () => {
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
    }, `# Title\n## Acceptance Criteria\n\n- [ ] Unchecked task\n- Spawned via link: [.foundry/prds/prd-001.md](.foundry/prds/prd-001.md)\n`);

    createValidTestNode(tmpDir, '.foundry/prds/prd-001.md', {
      id: "prd-001",
      type: "PRD",
      title: "PRD 1",
      status: "COMPLETED",
      owner_persona: "epic_planner",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: [],
      jules_session_id: null,
    });

    main();

    const ideaContent = fs.readFileSync(path.join(tmpDir, '.foundry/ideas/idea-001.md'), 'utf-8');
    expect(ideaContent).toContain('status: COMPLETED');
    expect(ideaContent).toContain('- [x] Unchecked task');
  });

  test('Impossible Loop: Wakes up parent even if FAILED child has incomplete sub-children', () => {
    // Epic 1: PENDING
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

    // Story 1: Child of Epic 1, FAILED
    createValidTestNode(tmpDir, '.foundry/stories/story-001.md', {
      id: "story-001",
      type: "STORY",
      title: "Story 1",
      status: "FAILED",
      owner_persona: "tech_lead",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: [],
      parent: "epic-001",
      rejection_reason: "Manual rejection",
      jules_session_id: "sess-1",
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
      depends_on: [],
      parent: "story-001",
      tags: ["e2e"],
      jules_session_id: null,
    });

    main();

    const epicContent = fs.readFileSync(path.join(tmpDir, '.foundry/epics/epic-001.md'), 'utf-8');
    // Epic 1 SHOULD be promoted to READY so that story_owner can fix Story 1
    expect(epicContent).toContain('status: READY');
  });

  test('Impossible Loop: Wakes up parent even if CANCELLED child has incomplete sub-children', () => {
    // Epic 1: PENDING
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

    // Story 1: Child of Epic 1, CANCELLED
    createValidTestNode(tmpDir, '.foundry/stories/story-001.md', {
      id: "story-001",
      type: "STORY",
      title: "Story 1",
      status: "CANCELLED",
      owner_persona: "tech_lead",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: [],
      parent: "epic-001",
      rejection_reason: "Max rejection count reached",
      jules_session_id: "sess-1",
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
      depends_on: [],
      parent: "story-001",
      jules_session_id: null,
    });

    main();

    const epicContent = fs.readFileSync(path.join(tmpDir, '.foundry/epics/epic-001.md'), 'utf-8');
    expect(epicContent).toContain('status: READY');
  });

  test("Impossible Loop: does not wake up parent if child was cancelled due to cascading cancellation", () => {
    createValidTestNode(tmpDir, ".foundry/prds/prd-001.md", {
      id: "prd-001",
      type: "PRD",
      title: "Pending PRD",
      status: "PENDING",
      owner_persona: "epic_planner",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: [],
      jules_session_id: null,
    });
    createValidTestNode(tmpDir, ".foundry/epics/epic-001.md", {
      id: "epic-001",
      type: "EPIC",
      title: "Cancelled Epic",
      status: "CANCELLED",
      owner_persona: "story_owner",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      parent: "prd-001",
      depends_on: [],
      jules_session_id: null,
      rejection_reason: "Cancelled due to cascading cancellation from parent",
    });
    createValidTestNode(tmpDir, ".foundry/epics/epic-002.md", {
      id: "epic-002",
      type: "EPIC",
      title: "Incomplete Epic",
      status: "PENDING",
      owner_persona: "story_owner",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      parent: "prd-001",
      depends_on: [],
      jules_session_id: null,
    });
    main();
    const prdContent = fs.readFileSync(path.join(tmpDir, ".foundry/prds/prd-001.md"), "utf-8");
    expect(prdContent).toContain("status: PENDING");
  });

  test("Impossible Loop: does not wake up parent if child was cancelled due to permanent failure of dependency", () => {
    // Parent: STORY - PENDING
    createValidTestNode(tmpDir, ".foundry/stories/story-001.md", {
      id: "story-001",
      type: "STORY",
      title: "Pending Story",
      status: "PENDING",
      owner_persona: "tech_lead",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: [],
      jules_session_id: null,
    });

    // Task 1: Child of Story 1, CANCELLED due to permanent failure of dependency (rejection_reason matches the check)
    createValidTestNode(tmpDir, ".foundry/tasks/task-001.md", {
      id: "task-001",
      type: "TASK",
      title: "Cancelled Task",
      status: "CANCELLED",
      owner_persona: "coder",
      parent: "story-001",
      depends_on: [],
      jules_session_id: null,
      rejection_reason: "Cancelled due to permanent failure of dependency: task-impossible"
    });

    // Task 2: Another child of Story 1, PENDING (incomplete) to prevent Story 1 from completing in Phase 4.1
    createValidTestNode(tmpDir, ".foundry/tasks/task-002.md", {
      id: "task-002",
      type: "TASK",
      title: "Pending Task 2",
      status: "PENDING",
      owner_persona: "coder",
      parent: "story-001",
      depends_on: [],
      jules_session_id: null,
    });

    main();

    // Story 1 should NOT be awakened to READY/ACTIVE because Task 1 was cancelled due to a permanent dependency failure elsewhere
    const storyContent = fs.readFileSync(path.join(tmpDir, ".foundry/stories/story-001.md"), "utf-8");
    expect(storyContent).toContain("status: PENDING");
  });

  test('Deadlock Prevention: Handles circular dependencies safely and correctly prevents deadlocks', () => {
    createValidTestNode(tmpDir, '.foundry/tasks/task-a.md', {
      id: "task-a",
      type: "TASK",
      title: "Task A",
      status: "PENDING",
      owner_persona: "coder",
      depends_on: [".foundry/tasks/task-b.md"],
    });

    createValidTestNode(tmpDir, '.foundry/tasks/task-b.md', {
      id: "task-b",
      type: "TASK",
      title: "Task B",
      status: "PENDING",
      owner_persona: "coder",
      depends_on: [".foundry/tasks/task-c.md"],
    });

    createValidTestNode(tmpDir, '.foundry/tasks/task-c.md', {
      id: "task-c",
      type: "TASK",
      title: "Task C",
      status: "PENDING",
      owner_persona: "coder",
      depends_on: [".foundry/tasks/task-a.md"],
    });

    main();

    const aContent = fs.readFileSync(path.join(tmpDir, ".foundry/tasks/task-a.md"), "utf-8");
    const bContent = fs.readFileSync(path.join(tmpDir, ".foundry/tasks/task-b.md"), "utf-8");
    const cContent = fs.readFileSync(path.join(tmpDir, ".foundry/tasks/task-c.md"), "utf-8");

    expect(aContent).toContain("status: FAILED");
    expect(aContent).toContain("rejection_reason: Circular dependency detected");
    expect(bContent).toContain("status: FAILED");
    expect(bContent).toContain("rejection_reason: Circular dependency detected");
    expect(cContent).toContain("status: FAILED");
    expect(cContent).toContain("rejection_reason: Circular dependency detected");
  });

  test('Deadlock Prevention: Handles direct circular dependencies (A -> B -> A) safely', () => {
    createValidTestNode(tmpDir, '.foundry/tasks/task-a.md', {
      id: "task-a",
      type: "TASK",
      title: "Task A",
      status: "PENDING",
      owner_persona: "coder",
      depends_on: [".foundry/tasks/task-b.md"],
    });

    createValidTestNode(tmpDir, '.foundry/tasks/task-b.md', {
      id: "task-b",
      type: "TASK",
      title: "Task B",
      status: "PENDING",
      owner_persona: "coder",
      depends_on: [".foundry/tasks/task-a.md"],
    });

    const stderrSpy = vi.spyOn(process.stderr, 'write');

    main();

    const output = stderrSpy.mock.calls.map(call => call[0] as string).join('');

    // It should explicitly output the cycle format
    expect(output).toContain('Detected circular dependency: .foundry/tasks/task-a.md -> .foundry/tasks/task-b.md -> .foundry/tasks/task-a.md');

    const aContent = fs.readFileSync(path.join(tmpDir, ".foundry/tasks/task-a.md"), "utf-8");
    const bContent = fs.readFileSync(path.join(tmpDir, ".foundry/tasks/task-b.md"), "utf-8");

    expect(aContent).toContain("status: FAILED");
    expect(aContent).toContain("rejection_reason: Circular dependency detected");
    expect(bContent).toContain("status: FAILED");
    expect(bContent).toContain("rejection_reason: Circular dependency detected");
  });

  test('Deadlock Prevention: Correctly isolates cycle and doesn\'t fail innocent nodes pointing to cycle', () => {
    // Task A points to B, but is not in the cycle
    createValidTestNode(tmpDir, '.foundry/tasks/task-a.md', {
      id: "task-a",
      type: "TASK",
      title: "Task A",
      status: "PENDING",
      owner_persona: "coder",
      depends_on: [".foundry/tasks/task-b.md"],
    });

    // Task B and Task C form a cycle
    createValidTestNode(tmpDir, '.foundry/tasks/task-b.md', {
      id: "task-b",
      type: "TASK",
      title: "Task B",
      status: "PENDING",
      owner_persona: "coder",
      depends_on: [".foundry/tasks/task-c.md"],
    });

    createValidTestNode(tmpDir, '.foundry/tasks/task-c.md', {
      id: "task-c",
      type: "TASK",
      title: "Task C",
      status: "PENDING",
      owner_persona: "coder",
      depends_on: [".foundry/tasks/task-b.md"],
    });

    const stderrSpy = vi.spyOn(process.stderr, 'write');

    main();

    const output = stderrSpy.mock.calls.map(call => call[0] as string).join('');

    // It should explicitly output the cycle format
    expect(output).toContain('Detected circular dependency: .foundry/tasks/task-b.md -> .foundry/tasks/task-c.md -> .foundry/tasks/task-b.md');

    const aContent = fs.readFileSync(path.join(tmpDir, ".foundry/tasks/task-a.md"), "utf-8");
    const bContent = fs.readFileSync(path.join(tmpDir, ".foundry/tasks/task-b.md"), "utf-8");
    const cContent = fs.readFileSync(path.join(tmpDir, ".foundry/tasks/task-c.md"), "utf-8");

    // Task A should not fail from cycle
    expect(aContent).toContain("status: PENDING");
    expect(bContent).toContain("status: FAILED");
    expect(bContent).toContain("rejection_reason: Circular dependency detected");
    expect(cContent).toContain("status: FAILED");
    expect(cContent).toContain("rejection_reason: Circular dependency detected");
  });

  test('Hierarchical Deadlock: warns when child depends on parent and parent has unchecked checkbox for child', () => {
    createValidTestNode(tmpDir, '.foundry/ideas/idea-001.md', {
      id: "idea-001",
      type: "IDEA",
      title: "Idea A",
      status: "PENDING",
      owner_persona: "product_manager",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: [],
      jules_session_id: null,
    }, `# Title
## Acceptance Criteria
- [ ] Child Story: [.foundry/stories/story-001.md](.foundry/stories/story-001.md)`);

    createValidTestNode(tmpDir, '.foundry/stories/story-001.md', {
      id: "story-001",
      type: "STORY",
      title: "Story 1",
      status: "PENDING",
      owner_persona: "tech_lead",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: ["idea-001"],
      parent: "idea-001",
      jules_session_id: null,
    });

    const stderrSpy = vi.spyOn(process.stderr, 'write');
    main();

    const output = stderrSpy.mock.calls.map(call => call[0] as string).join('');
    expect(output).toContain("Hierarchical deadlock detected: Parent 'idea-001'");
    expect(output).toContain("has unchecked/incomplete child 'story-001'");
  });

  test('Strict Mode: sets process.exitCode = 1 and logs GitHub Actions warning workflow command when DAG resolution warning occurs', () => {
    createValidTestNode(tmpDir, '.foundry/ideas/idea-001.md', {
      id: "idea-001",
      type: "IDEA",
      title: "Idea A",
      status: "PENDING",
      owner_persona: "product_manager",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: [],
      jules_session_id: null,
    }, `# Title\n## Acceptance Criteria\n- [ ] Child Story: [.foundry/stories/story-001.md](.foundry/stories/story-001.md)`);

    createValidTestNode(tmpDir, '.foundry/stories/story-001.md', {
      id: "story-001",
      type: "STORY",
      title: "Story 1",
      status: "PENDING",
      owner_persona: "tech_lead",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: ["idea-001"],
      parent: "idea-001",
      jules_session_id: null,
    });

    const stderrSpy = vi.spyOn(process.stderr, 'write');
    process.argv.push('--strict');
    main();
    process.argv.splice(process.argv.indexOf('--strict'), 1);

    const output = stderrSpy.mock.calls.map(call => call[0] as string).join('');
    expect(output).toContain('::warning::[orchestrator]');
    expect(output).toContain('Exiting with code 1: DAG resolution warnings');
    expect(process.exitCode).toBe(1);
    process.exitCode = 0;
  });

  test('Late-Binding Completion: EPIC fails if it lacks E2E story', () => {
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

    createValidTestNode(tmpDir, '.foundry/stories/story-001.md', {
      id: "story-001",
      type: "STORY",
      title: "Story 1",
      status: "COMPLETED",
      owner_persona: "tech_lead",
      parent: "epic-001",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: [],
      jules_session_id: null,
    });

    main();

    const epicContent = fs.readFileSync(path.join(tmpDir, '.foundry/epics/epic-001.md'), 'utf-8');
    expect(epicContent).toContain('status: FAILED');
    expect(epicContent).toContain('Missing E2E/integration story');
  });

  test('Late-Binding Completion: EPIC completes if it has E2E story', () => {
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

    createValidTestNode(tmpDir, '.foundry/stories/story-001.md', {
      id: "story-001",
      type: "STORY",
      title: "Story 1",
      status: "COMPLETED",
      owner_persona: "tech_lead",
      parent: "epic-001",
      tags: ["e2e"],
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: [],
      jules_session_id: null,
    });

    main();

    const epicContent = fs.readFileSync(path.join(tmpDir, '.foundry/epics/epic-001.md'), 'utf-8');
    expect(epicContent).toContain('status: COMPLETED');
  });

  test('Archived Dependency: resolves dependency pointing to archived task path', () => {
    createValidTestNode(tmpDir, '.foundry/archive/tasks/task-completed.md', {
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

    createValidTestNode(tmpDir, '.foundry/tasks/task-dependent.md', {
      id: "task-dependent",
      type: "TASK",
      title: "Dependent Task",
      status: "PENDING",
      owner_persona: "coder",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: [".foundry/tasks/task-completed.md"],
      jules_session_id: null,
    });

    main();

    const dependentContent = fs.readFileSync(path.join(tmpDir, '.foundry/tasks/task-dependent.md'), 'utf-8');
    expect(dependentContent).toContain('status: READY');
  });

  test('Archived Child Path Link: resolves child linked via raw original path when child is archived', () => {
    createValidTestNode(tmpDir, '.foundry/epics/epic-parent.md', {
      id: "epic-parent",
      type: "EPIC",
      title: "Epic Parent",
      status: "PENDING",
      owner_persona: "story_owner",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: [],
      jules_session_id: null,
    }, `# Epic Parent
## Acceptance Criteria
- [ ] Child Story: [.foundry/stories/story-child.md](.foundry/stories/story-child.md)`);

    createValidTestNode(tmpDir, '.foundry/archive/stories/story-child.md', {
      id: "story-child",
      type: "STORY",
      title: "Story Child",
      status: "COMPLETED",
      owner_persona: "tech_lead",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: [],
      parent: "epic-parent",
      tags: ["e2e"],
      jules_session_id: null,
    });

    main();

    const parentContent = fs.readFileSync(path.join(tmpDir, '.foundry/epics/epic-parent.md'), 'utf-8');
    // Completed child checkbox is auto-checked, so parent auto-completes to COMPLETED
    expect(parentContent).toContain('status: COMPLETED');
  });

  test('Regression: Idempotent generation check bypasses dispatch of parent with completed children', () => {
    createValidTestNode(tmpDir, '.foundry/epics/epic-parent.md', {
      id: "epic-parent",
      type: "EPIC",
      title: "Epic Parent",
      status: "PENDING",
      owner_persona: "story_owner",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: [],
      jules_session_id: null,
    }, `# Epic Parent
## Acceptance Criteria
- [x] Child Story: [.foundry/stories/story-child.md](.foundry/stories/story-child.md)`);

    createValidTestNode(tmpDir, '.foundry/stories/story-child.md', {
      id: "story-child",
      type: "STORY",
      title: "Story Child",
      status: "COMPLETED",
      owner_persona: "tech_lead",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: [],
      parent: ".foundry/epics/epic-parent.md",
      tags: ["e2e"],
      jules_session_id: null,
    });

    main();

    const parentContent = fs.readFileSync(path.join(tmpDir, '.foundry/epics/epic-parent.md'), 'utf-8');
    // It should be promoted to COMPLETED directly, bypassing READY/ACTIVE dispatch!
    expect(parentContent).toContain('status: COMPLETED');
  });

  test('Archived Child ID Resolution: resolves child ID when child is archived and not in ID map', () => {
    createValidTestNode(tmpDir, '.foundry/epics/epic-parent.md', {
      id: "epic-parent",
      type: "EPIC",
      title: "Epic Parent",
      status: "PENDING",
      owner_persona: "story_owner",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: [],
      jules_session_id: null,
    }, `# Epic Parent
## Acceptance Criteria
- [x] story-child-archived`);

    // Archived child that the orchestrator will explicitly skip during discovery
    createValidTestNode(tmpDir, '.foundry/archive/stories/story-child-archived.md', {
      id: "story-child-archived",
      type: "STORY",
      title: "Archived Story Child",
      status: "COMPLETED",
      owner_persona: "tech_lead",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: [],
      parent: "epic-parent",
      tags: ["e2e"],
      jules_session_id: null,
    });

    main();

    const parentContent = fs.readFileSync(path.join(tmpDir, '.foundry/epics/epic-parent.md'), 'utf-8');
    // Because the child was successfully resolved to COMPLETED, the parent should be promoted to COMPLETED directly.
    expect(parentContent).toContain('status: COMPLETED');
  });

  test('Prompt Compilation: compiles a multi-layered prompt with generic, specific, and core policies', () => {
    // Ensure the directories exist
    fs.mkdirSync(path.join(tmpDir, '.github/agents/specific'), { recursive: true });
    fs.mkdirSync(path.join(tmpDir, '.github/agents/generic'), { recursive: true });
    fs.mkdirSync(path.join(tmpDir, '.foundry/docs/knowledge_base/agents'), { recursive: true });

    // Write mock persona, specific layer and core policy files
    fs.writeFileSync(path.join(tmpDir, '.github/agents/coder.md'), 'CODER_GENERIC_PROMPT_CONTENT');
    fs.writeFileSync(path.join(tmpDir, '.github/agents/specific/typescript.md'), 'TYPESCRIPT_SPECIFIC_CONTENT');
    fs.writeFileSync(path.join(tmpDir, '.github/agents/specific/react.md'), 'REACT_SPECIFIC_CONTENT');
    fs.writeFileSync(path.join(tmpDir, '.foundry/docs/knowledge_base/agents/core_policies.md'), 'CORE_POLICIES_CONTENT');

    createValidTestNode(tmpDir, '.foundry/tasks/task-001.md', {
      id: "task-001",
      type: "TASK",
      title: "Task with Layers",
      status: "PENDING",
      owner_persona: "coder",
      created_at: "2026-04-20",
      updated_at: "2026-04-20",
      depends_on: [],
      tags: ["typescript", "react"],
      jules_session_id: null,
    });

    // Mock console.log to intercept orchestrator stdout output
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    // Pass --include-prompt to the main orchestrator test to run exactly as before
    process.argv.push('--include-prompt');
    main();
    process.argv.splice(process.argv.indexOf('--include-prompt'), 1);

    expect(logSpy).toHaveBeenCalled();
    const lastCall = logSpy.mock.calls[logSpy.mock.calls.length - 1][0];
    const parsedOutput = JSON.parse(lastCall);

    expect(parsedOutput).toHaveLength(1);
    expect(parsedOutput[0].id).toBe('task-001');
    expect(parsedOutput[0].compiled_prompt).toContain('CODER_GENERIC_PROMPT_CONTENT');
    expect(parsedOutput[0].compiled_prompt).toContain('TYPESCRIPT_SPECIFIC_CONTENT');
    expect(parsedOutput[0].compiled_prompt).toContain('REACT_SPECIFIC_CONTENT');
    expect(parsedOutput[0].compiled_prompt).toContain('CORE_POLICIES_CONTENT');

    logSpy.mockRestore();
  });

  test('Regression: Downstream ADR referencing research node ID in body while depending on it does not deadlock research node', () => {
    fs.mkdirSync(path.join(foundryDir, 'research'), { recursive: true });
    fs.mkdirSync(path.join(foundryDir, 'docs/adrs'), { recursive: true });

    // Idea 145
    createValidTestNode(tmpDir, '.foundry/ideas/idea-145-component-variants-theming-consolidation.md', {
      id: "idea-145-component-variants-theming-consolidation",
      type: "IDEA",
      title: "Component Variants and Theming Consolidation",
      status: "PENDING",
      owner_persona: "product_manager",
      created_at: "2026-08-11",
      updated_at: "2026-08-11",
      depends_on: [],
      jules_session_id: null
    }, `## Acceptance Criteria
- [ ] Create deep-dive research evaluating component-variant management libraries.
- [ ] Draft an Architecture Decision Record (ADR) presenting multiple architecture paths.

### Downstream Graph Nodes
- [ ] .foundry/research/research-145-001-component-variant-libraries.md
- [ ] .foundry/docs/adrs/adr-145-031-component-variant-theming.md
`);

    // Research 145-001
    createValidTestNode(tmpDir, '.foundry/research/research-145-001-component-variant-libraries.md', {
      id: "research-145-001-component-variant-libraries",
      type: "RESEARCH",
      title: "Research Component Variant Libraries",
      status: "PENDING",
      owner_persona: "researcher",
      created_at: "2026-08-11",
      updated_at: "2026-08-11",
      depends_on: [],
      parent: "idea-145-component-variants-theming-consolidation",
      jules_session_id: null
    }, `# Objective\nResearch on variant libraries...\n## Acceptance Criteria\n- [ ] Complete research report\n`);

    // ADR 145-031 depending on Research 145-001 AND mentioning research-145-001-component-variant-libraries in body
    createValidTestNode(tmpDir, '.foundry/docs/adrs/adr-145-031-component-variant-theming.md', {
      id: "adr-145-031-component-variant-theming",
      type: "ADR",
      title: "ADR 031: Unified Component Variants and Theming",
      status: "PENDING",
      owner_persona: "architect",
      created_at: "2026-08-11",
      updated_at: "2026-08-11",
      depends_on: [".foundry/research/research-145-001-component-variant-libraries.md"],
      parent: "idea-145-component-variants-theming-consolidation",
      jules_session_id: null
    }, `# Context\nWe conducted research across component variant libraries (research-145-001-component-variant-libraries) and decided...\n## Acceptance Criteria\n- [ ] Complete ADR\n`);

    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    main();

    // Research 145-001 SHOULD be promoted to READY because it has no dependencies,
    // and ADR 145-031 should NOT be treated as its parent despite mentioning its ID in body.
    const researchContent = fs.readFileSync(path.join(tmpDir, '.foundry/research/research-145-001-component-variant-libraries.md'), 'utf-8');
    expect(researchContent).toContain('status: READY');

    // ADR 145-031 SHOULD remain PENDING waiting for research-145-001 to complete
    const adrContent = fs.readFileSync(path.join(tmpDir, '.foundry/docs/adrs/adr-145-031-component-variant-theming.md'), 'utf-8');
    expect(adrContent).toContain('status: PENDING');

    // Matrix output should contain research-145-001
    const lastCall = consoleSpy.mock.calls[consoleSpy.mock.calls.length - 1][0];
    const readyNodes = JSON.parse(lastCall);
    expect(readyNodes.some((n: any) => n.id === 'research-145-001-component-variant-libraries')).toBe(true);

    consoleSpy.mockRestore();
  });

  test('Archive Bypass: orchestrator skips archive/ directories during discovery', () => {
    // Create an active node
    createValidTestNode(tmpDir, '.foundry/tasks/task-active.md', {
      id: "task-active",
      type: "TASK",
      title: "Active Task",
      status: "READY",
      owner_persona: "coder",
      created_at: "2026-08-20",
      updated_at: "2026-08-20",
      depends_on: [],
      jules_session_id: null,
    });

    // Create an archived node
    createValidTestNode(tmpDir, '.foundry/archive/tasks/task-archived.md', {
      id: "task-archived",
      type: "TASK",
      title: "Archived Task",
      status: "READY",
      owner_persona: "coder",
      created_at: "2026-08-20",
      updated_at: "2026-08-20",
      depends_on: [],
      jules_session_id: null,
    });

    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    main();

    // Verify matrix output contains active task but not archived task
    const lastCall = consoleSpy.mock.calls[consoleSpy.mock.calls.length - 1][0];
    const readyNodes = JSON.parse(lastCall);

    expect(readyNodes.some((n: any) => n.id === 'task-active')).toBe(true);
    expect(readyNodes.some((n: any) => n.id === 'task-archived')).toBe(false);

    consoleSpy.mockRestore();
  });
});

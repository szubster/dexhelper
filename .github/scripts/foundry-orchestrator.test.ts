import { expect, test, describe, vi, beforeEach, afterEach } from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as os from 'node:os';
import { main } from './foundry-orchestrator';

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

  function createNode(relPath: string, frontmatter: string) {
    const fullPath = path.join(tmpDir, relPath);
    const dir = path.dirname(fullPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(fullPath, `---\n${frontmatter}\n---\n\n# Title`, 'utf-8');
  }

  test('Happy Path: promotes PENDING to READY when all dependencies are COMPLETED', () => {
    createNode('.foundry/ideas/idea-001.md', `
id: idea-001
type: IDEA
title: "Idea 1"
status: COMPLETED
owner_persona: product_manager
created_at: "2026-04-20"
updated_at: "2026-04-20"
depends_on: []
jules_session_id: null
pr_number: null
`);

    createNode('.foundry/epics/epic-001.md', `
id: epic-001
type: EPIC
title: "Epic 1"
status: PENDING
owner_persona: epic_planner
created_at: "2026-04-20"
updated_at: "2026-04-20"
depends_on:
  - .foundry/ideas/idea-001.md
jules_session_id: null
pr_number: null
`);

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
    createNode('.foundry/ideas/idea-001.md', `
id: idea-001
type: IDEA
title: "Idea 1"
status: ACTIVE
owner_persona: product_manager
created_at: "2026-04-20"
updated_at: "2026-04-20"
depends_on: []
jules_session_id: "sess-123"
pr_number: null
`);

    createNode('.foundry/epics/epic-001.md', `
id: epic-001
type: EPIC
title: "Epic 1"
status: PENDING
owner_persona: epic_planner
created_at: "2026-04-20"
updated_at: "2026-04-20"
depends_on:
  - .foundry/ideas/idea-001.md
jules_session_id: null
pr_number: null
`);

    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    main();

    const epicChar = fs.readFileSync(path.join(tmpDir, '.foundry/epics/epic-001.md'), 'utf-8');
    expect(epicChar).toContain('status: PENDING');
    
    // Output should be empty since nothing is READY
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
    createNode('.foundry/ideas/idea-001.md', `
id: idea-001
type: IDEA
title: "Idea 1"
status: PENDING
owner_persona: product_manager
created_at: "2026-04-20"
updated_at: "2026-04-20"
depends_on: []
jules_session_id: null
pr_number: null
`);

    main();

    const result = fs.readFileSync(path.join(tmpDir, '.foundry/ideas/idea-001.md'), 'utf-8');
    expect(result).toContain('status: READY');
  });

  test('Unresolvable: logs warning and remains PENDING if dep is missing', () => {
    createNode('.foundry/epics/epic-001.md', `
id: epic-001
type: EPIC
title: "Epic 1"
status: PENDING
owner_persona: epic_planner
created_at: "2026-04-20"
updated_at: "2026-04-20"
depends_on:
  - .foundry/missing/ghost.md
jules_session_id: null
`);

    main();

    const epicChar = fs.readFileSync(path.join(tmpDir, '.foundry/epics/epic-001.md'), 'utf-8');
    expect(epicChar).toContain('status: PENDING');
  });

  test('Hierarchical Completion: blocks external dependent if dependency has incomplete children', () => {
    // Story 1: COMPLETED (Planned)
    createNode('.foundry/stories/story-001.md', `
id: story-001
type: STORY
title: "Story 1"
status: COMPLETED
owner_persona: story_owner
created_at: "2026-04-20"
updated_at: "2026-04-20"
depends_on: []
jules_session_id: null
`);

    // Task 1: Child of Story 1, PENDING
    createNode('.foundry/tasks/task-001.md', `
id: task-001
type: TASK
title: "Task 1"
status: PENDING
owner_persona: coder
created_at: "2026-04-20"
updated_at: "2026-04-20"
depends_on:
  - .foundry/stories/story-001.md
parent: .foundry/stories/story-001.md
jules_session_id: null
`);

    // Story 2: Depends on Story 1, PENDING (External dependent)
    createNode('.foundry/stories/story-002.md', `
id: story-002
type: STORY
title: "Story 2"
status: PENDING
owner_persona: story_owner
created_at: "2026-04-20"
updated_at: "2026-04-20"
depends_on:
  - .foundry/stories/story-001.md
jules_session_id: null
`);

    main();

    // Task 1 SHOULD be promoted to READY (it's a child)
    const taskContent = fs.readFileSync(path.join(tmpDir, '.foundry/tasks/task-001.md'), 'utf-8');
    expect(taskContent).toContain('status: READY');

    // Story 2 SHOULD NOT be promoted (it waits for Story 1's children)
    const story2Content = fs.readFileSync(path.join(tmpDir, '.foundry/stories/story-002.md'), 'utf-8');
    expect(story2Content).toContain('status: PENDING');
  });

  test('Deep Hierarchical Completion: blocks external dependent if dependency has deep incomplete children', () => {
    // Story 1: COMPLETED
    createNode('.foundry/stories/story-001.md', `
id: story-001
type: STORY
title: "Story 1"
status: COMPLETED
owner_persona: story_owner
created_at: "2026-04-20"
updated_at: "2026-04-20"
depends_on: []
jules_session_id: null
`);

    // Task 1: Child of Story 1, COMPLETED
    createNode('.foundry/tasks/task-001.md', `
id: task-001
type: TASK
title: "Task 1"
status: COMPLETED
owner_persona: coder
created_at: "2026-04-20"
updated_at: "2026-04-20"
depends_on:
  - .foundry/stories/story-001.md
parent: .foundry/stories/story-001.md
jules_session_id: null
`);

    // Subtask 1: Child of Task 1, PENDING
    createNode('.foundry/tasks/subtask-001.md', `
id: subtask-001
type: TASK
title: "Subtask 1"
status: PENDING
owner_persona: coder
created_at: "2026-04-20"
updated_at: "2026-04-20"
depends_on:
  - .foundry/tasks/task-001.md
parent: .foundry/tasks/task-001.md
jules_session_id: null
`);

    // Story 2: Depends on Story 1, PENDING
    createNode('.foundry/stories/story-002.md', `
id: story-002
type: STORY
title: "Story 2"
status: PENDING
owner_persona: story_owner
created_at: "2026-04-20"
updated_at: "2026-04-20"
depends_on:
  - .foundry/stories/story-001.md
jules_session_id: null
`);

    main();

    // Story 2 SHOULD NOT be promoted (it waits for Subtask 1)
    const story2Content = fs.readFileSync(path.join(tmpDir, '.foundry/stories/story-002.md'), 'utf-8');
    expect(story2Content).toContain('status: PENDING');
  });

});

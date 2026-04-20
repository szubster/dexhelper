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

    // Mock process context
    vi.spyOn(process, 'cwd').mockReturnValue(tmpDir);
    vi.spyOn(process, 'exit').mockImplementation(() => undefined as never);
    vi.spyOn(process.stderr, 'write').mockImplementation(() => true);
    vi.spyOn(console, 'log').mockImplementation(() => {});
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

    main();

    // Verify file mutation
    const epicChar = fs.readFileSync(path.join(tmpDir, '.foundry/epics/epic-001.md'), 'utf-8');
    expect(epicChar).toContain('status: READY');

    // Verify console output (JSON array of READY nodes)
    const logSpy = vi.spyOn(console, 'log');
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

    main();

    const epicChar = fs.readFileSync(path.join(tmpDir, '.foundry/epics/epic-001.md'), 'utf-8');
    expect(epicChar).toContain('status: PENDING');
    
    // Output should be empty since nothing is READY
    const logSpy = vi.spyOn(console, 'log');
    const lastCall = logSpy.mock.calls[logSpy.mock.calls.length - 1][0];
    expect(JSON.parse(lastCall)).toHaveLength(0);
  });

  test('Resilience: skips malformed YAML gracefully', () => {
    const filePath = path.join(tmpDir, '.foundry/epics/bad-node.md');
    fs.writeFileSync(filePath, `---\nid: bad\nstatus: PENDING\n---`, 'utf-8'); // Missing required fields

    main();

    // Should not crash. stderr should have warned.
    const logSpy = vi.spyOn(console, 'log');
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
pr_number: null
    `);

    main();

    const epicChar = fs.readFileSync(path.join(tmpDir, '.foundry/epics/epic-001.md'), 'utf-8');
    expect(epicChar).toContain('status: PENDING');
  });
});

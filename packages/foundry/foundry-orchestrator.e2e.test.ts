import { expect, test, describe, vi, beforeEach, afterEach } from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as os from 'node:os';
import { fileURLToPath } from 'node:url';
import { main } from './foundry-orchestrator';
import { createValidTestNode } from './foundry-test-utils';

describe('Foundry Orchestrator E2E Telemetry', () => {
  let tmpDir: string;
  let repoRoot: string;
  let telemetryDir: string;
  let logPath: string;

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'foundry-e2e-telemetry-'));
    vi.spyOn(process, 'cwd').mockReturnValue(tmpDir);

    repoRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), '../..');
    telemetryDir = path.join(repoRoot, '.foundry', 'telemetry');
    logPath = path.join(telemetryDir, 'cycle-detection.log');

    if (!fs.existsSync(telemetryDir)) {
      fs.mkdirSync(telemetryDir, { recursive: true });
    }
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
    vi.restoreAllMocks();
  });

  test('Cycle Telemetry: Appends to cycle-detection.log on cycle', async () => {
    let appendedFile: string | null = null;
    let appendedContent: string | null = null;

    vi.spyOn(fs.promises, 'appendFile').mockImplementation(async (file, content) => {
        appendedFile = file as string;
        appendedContent = content as string;
    });

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

    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(process.stderr, 'write').mockImplementation(() => true);

    main();

    await new Promise(resolve => setImmediate(resolve));

    expect(appendedFile).toBe(logPath);
    expect(appendedContent).not.toBeNull();
    const parsed = JSON.parse(appendedContent!.trim().split('\n').pop()!);
    expect(parsed).toHaveProperty('timestamp');
    expect(parsed).toHaveProperty('cycleNodes');
    expect(parsed.cycleNodes).toContain('.foundry/tasks/task-a.md');
    expect(parsed.cycleNodes).toContain('.foundry/tasks/task-b.md');
  });

  test('Cycle Telemetry: Appends to cycle-detection.log on hierarchical deadlock', async () => {
    let appendedFile: string | null = null;
    let appendedContent: string | null = null;

    vi.spyOn(fs.promises, 'appendFile').mockImplementation(async (file, content) => {
        appendedFile = file as string;
        appendedContent = content as string;
    });

    createValidTestNode(tmpDir, '.foundry/ideas/idea-001.md', {
      id: "idea-001",
      type: "IDEA",
      title: "Idea A",
      status: "PENDING",
      owner_persona: "product_manager",
      depends_on: [],
    }, `# Title\n## Acceptance Criteria\n- [ ] Child Story: [.foundry/stories/story-001.md](.foundry/stories/story-001.md)`);

    createValidTestNode(tmpDir, '.foundry/stories/story-001.md', {
      id: "story-001",
      type: "STORY",
      title: "Story 1",
      status: "PENDING",
      owner_persona: "tech_lead",
      depends_on: ["idea-001"],
      parent: "idea-001",
    });

    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(process.stderr, 'write').mockImplementation(() => true);

    main();
    await new Promise(resolve => setImmediate(resolve));

    expect(appendedFile).toBe(logPath);
    expect(appendedContent).not.toBeNull();
    const parsed = JSON.parse(appendedContent!.trim().split('\n').pop()!);
    expect(parsed).toHaveProperty('timestamp');
    expect(parsed).toHaveProperty('cycleNodes');
    expect(parsed.cycleNodes).toContain('.foundry/ideas/idea-001.md');
    expect(parsed.cycleNodes).toContain('.foundry/stories/story-001.md');
  });
});

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as os from 'node:os';
import { runCli } from './cli.ts';

describe('CLI interface', () => {
  let tempDir: string;
  let foundryDir: string;

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'agy-cli-test-'));
    foundryDir = path.join(tempDir, '.foundry', 'tasks');
    fs.mkdirSync(foundryDir, { recursive: true });
  });

  afterEach(() => {
    fs.rmSync(tempDir, { recursive: true, force: true });
  });

  it('prints help message with --help and returns 0', async () => {
    const logs: string[] = [];
    const code = await runCli(['node', 'cli.ts', '--help'], {
      log: (m) => logs.push(m),
    });

    expect(code).toBe(0);
    expect(logs.some((l) => l.includes('Antigravity Orchestrator for Foundry'))).toBe(true);
    expect(logs.some((l) => l.includes('Commands:'))).toBe(true);
  });

  it('runs status command and returns 0', async () => {
    const logs: string[] = [];
    const code = await runCli(['node', 'cli.ts', 'status'], {
      repoRoot: tempDir,
      log: (m) => logs.push(m),
    });

    expect(code).toBe(0);
    expect(logs.some((l) => l.includes('FOUNDRY ORCHESTRATION STATUS'))).toBe(true);
  });

  it('runs dispatch command with dry-run and returns 0', async () => {
    const logs: string[] = [];
    const code = await runCli(['node', 'cli.ts', 'dispatch', '--dry-run'], {
      repoRoot: tempDir,
      log: (m) => logs.push(m),
    });

    expect(code).toBe(0);
    expect(logs.some((l) => l.includes('[cli] Dispatch completed'))).toBe(true);
  });

  it('runs reconcile command with dry-run and returns 0', async () => {
    const logs: string[] = [];
    const code = await runCli(['node', 'cli.ts', 'reconcile', '--dry-run'], {
      repoRoot: tempDir,
      log: (m) => logs.push(m),
    });

    expect(code).toBe(0);
    expect(logs.some((l) => l.includes('[cli] Reconcile completed'))).toBe(true);
  });

  it('runs assign command and returns 0', async () => {
    const taskPath = path.join(foundryDir, 'task-cli-assign.md');
    fs.writeFileSync(
      taskPath,
      `---
id: task-cli-assign
type: TASK
title: Cli Assign Task
status: READY
owner_persona: coder
jules_session_id: null
created_at: "2026-10-31"
updated_at: "2026-10-31"
---

Body
`,
      'utf-8'
    );

    const logs: string[] = [];
    const code = await runCli(['node', 'cli.ts', 'assign', 'task-cli-assign', 'human'], {
      repoRoot: tempDir,
      log: (m) => logs.push(m),
    });

    expect(code).toBe(0);
    expect(logs.some((l) => l.includes('Successfully assigned task-cli-assign to human'))).toBe(true);
  });

  it('returns 1 when assign command is missing node id', async () => {
    const logs: string[] = [];
    const code = await runCli(['node', 'cli.ts', 'assign'], {
      repoRoot: tempDir,
      log: (m) => logs.push(m),
    });

    expect(code).toBe(1);
    expect(logs.some((l) => l.includes('assign command requires a node-id'))).toBe(true);
  });

  it('runs dispatch with flag before node-id and parses node-id correctly', async () => {
    const taskPath = path.join(foundryDir, 'task-single-dispatch.md');
    fs.writeFileSync(
      taskPath,
      `---
id: task-single-dispatch
type: TASK
title: Single Dispatch Task
status: READY
owner_persona: coder
jules_session_id: null
created_at: "2026-10-31"
updated_at: "2026-10-31"
---

Body
`,
      'utf-8'
    );

    const logs: string[] = [];
    const code = await runCli(['node', 'cli.ts', 'dispatch', '--dry-run', 'task-single-dispatch'], {
      repoRoot: tempDir,
      log: (m) => logs.push(m),
    });

    expect(code).toBe(0);
    expect(logs.some((l) => l.includes('task-single-dispatch'))).toBe(true);
  });

  it('runs dispatch with space-separated --model flag', async () => {
    const taskPath = path.join(foundryDir, 'task-model-flag.md');
    fs.writeFileSync(
      taskPath,
      `---
id: task-model-flag
type: TASK
title: Model Flag Task
status: READY
owner_persona: coder
jules_session_id: null
created_at: "2026-10-31"
updated_at: "2026-10-31"
---

Body
`,
      'utf-8'
    );

    const logs: string[] = [];
    const code = await runCli(['node', 'cli.ts', 'dispatch', '--dry-run', '--model', 'flash', 'task-model-flag'], {
      repoRoot: tempDir,
      log: (m) => logs.push(m),
    });

    expect(code).toBe(0);
    expect(logs.some((l) => l.includes('Would create session with model: flash'))).toBe(true);
  });

  it('runs assign with flag before node-id and parses node-id correctly', async () => {
    const taskPath = path.join(foundryDir, 'task-cli-assign-flag.md');
    fs.writeFileSync(
      taskPath,
      `---
id: task-cli-assign-flag
type: TASK
title: Cli Assign Flag Task
status: READY
owner_persona: coder
jules_session_id: null
created_at: "2026-10-31"
updated_at: "2026-10-31"
---

Body
`,
      'utf-8'
    );

    const logs: string[] = [];
    const code = await runCli(['node', 'cli.ts', 'assign', '--dry-run', 'task-cli-assign-flag', 'human'], {
      repoRoot: tempDir,
      log: (m) => logs.push(m),
    });

    expect(code).toBe(0);
    expect(logs.some((l) => l.includes('Successfully assigned task-cli-assign-flag to human'))).toBe(true);
  });

  it('returns 1 for unknown command', async () => {
    const logs: string[] = [];
    const code = await runCli(['node', 'cli.ts', 'unknown-cmd'], {
      repoRoot: tempDir,
      log: (m) => logs.push(m),
    });

    expect(code).toBe(1);
    expect(logs.some((l) => l.includes('Unknown command: unknown-cmd'))).toBe(true);
  });
});

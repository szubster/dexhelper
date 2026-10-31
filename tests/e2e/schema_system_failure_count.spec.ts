import { spawnSync } from 'node:child_process';
import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { expect, test } from '@playwright/test';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '../../');
const orchestratorScript = path.join(repoRoot, 'packages/foundry/foundry-orchestrator.ts');

test.describe('Foundry Orchestrator - system_failure_count validation', () => {
  let tmpDir: string;
  let foundryDir: string;
  let tasksDir: string;

  test.beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'foundry-schema-test-'));
    foundryDir = path.join(tmpDir, '.foundry');
    tasksDir = path.join(foundryDir, 'tasks');
    fs.mkdirSync(tasksDir, { recursive: true });
  });

  test.afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  test('parses node with valid system_failure_count successfully', () => {
    const filePath = path.join(tasksDir, 'task-000-001-valid.md');
    fs.writeFileSync(
      filePath,
      `---
id: task-000-001-valid
type: TASK
title: Valid Task
status: PENDING
owner_persona: coder
created_at: '2023-01-01'
updated_at: '2023-01-01'
depends_on: []
rejection_count: 0
jules_session_id: null
system_failure_count: 5
---
# Content`,
    );

    const result = spawnSync('node', ['--experimental-strip-types', orchestratorScript, '--dry-run'], {
      cwd: tmpDir,
      encoding: 'utf-8',
      env: { ...process.env, VITEST: '1' },
    });

    expect(result.stderr).toContain('Successfully parsed 1 valid node');
  });

  test('fails if system_failure_count is invalid', () => {
    const filePath = path.join(tasksDir, 'task-000-002-invalid.md');
    fs.writeFileSync(
      filePath,
      `---
id: task-000-002-invalid
type: TASK
title: Invalid Task
status: PENDING
owner_persona: coder
created_at: '2023-01-01'
updated_at: '2023-01-01'
depends_on: []
rejection_count: 0
jules_session_id: null
system_failure_count: "five"
---
# Content`,
    );

    const result = spawnSync('node', ['--experimental-strip-types', orchestratorScript, '--dry-run'], {
      cwd: tmpDir,
      encoding: 'utf-8',
      env: { ...process.env, VITEST: '1' },
    });

    expect(result.stderr).toContain('Schema validation failed in');
    expect(result.stderr).toContain('expected number, received string');
  });
});

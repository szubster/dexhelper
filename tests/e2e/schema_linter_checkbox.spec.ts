import { spawnSync } from 'node:child_process';
import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { expect, test } from '@playwright/test';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '../../');
const linterScript = path.join(repoRoot, 'scripts/validate-foundry-schema.ts');

test.describe('validate-foundry-schema - Checkbox validation E2E', () => {
  let tmpDir: string;
  let foundryDir: string;
  let tasksDir: string;

  test.beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'foundry-checkbox-test-'));
    foundryDir = path.join(tmpDir, '.foundry');
    tasksDir = path.join(foundryDir, 'tasks');
    fs.mkdirSync(tasksDir, { recursive: true });
  });

  test.afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  const getFrontmatter = (id: string) => `---
id: ${id}
type: TASK
title: Test Task
status: READY
owner_persona: coder
created_at: '2023-01-01'
updated_at: '2023-01-01'
depends_on: []
rejection_count: 0
jules_session_id: null
---
`;

  test('passes validation for valid checkbox syntax and valid sections', () => {
    const filePath = path.join(tasksDir, 'task-000-001-valid-checkbox.md');
    fs.writeFileSync(
      filePath,
      `${getFrontmatter('task-000-001-valid-checkbox')}
## Acceptance Criteria
- [ ] Unchecked item
- [x] Checked item
`,
    );

    const result = spawnSync('node', ['--experimental-strip-types', linterScript, filePath], {
      cwd: tmpDir,
      encoding: 'utf-8',
    });

    expect(result.status).toBe(0);
    expect(result.stdout).toContain('All Foundry nodes passed schema validation.');
  });

  test('fails validation for missing space in checkbox syntax', () => {
    const filePath = path.join(tasksDir, 'task-000-002-invalid-syntax.md');
    fs.writeFileSync(
      filePath,
      `${getFrontmatter('task-000-002-invalid-syntax')}
## Acceptance Criteria
-[] Invalid syntax
`,
    );

    const result = spawnSync('node', ['--experimental-strip-types', linterScript, filePath], {
      cwd: tmpDir,
      encoding: 'utf-8',
    });

    expect(result.status).toBe(1);
    expect(result.stderr).toContain('Error: Invalid checkbox syntax');
  });

  test('fails validation when checkbox is outside allowed sections', () => {
    const filePath = path.join(tasksDir, 'task-000-003-invalid-section.md');
    fs.writeFileSync(
      filePath,
      `${getFrontmatter('task-000-003-invalid-section')}
## Random Section
- [ ] Valid syntax but wrong section
`,
    );

    const result = spawnSync('node', ['--experimental-strip-types', linterScript, filePath], {
      cwd: tmpDir,
      encoding: 'utf-8',
    });

    expect(result.status).toBe(1);
    expect(result.stderr).toContain("Error: Checkbox found outside of allowed sections ('Random Section')");
  });
});

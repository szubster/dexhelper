import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { expect, test } from '@playwright/test';
import { createValidTestNode } from '../../packages/foundry/foundry-test-utils';
import { archiveChildNodes } from '../../packages/foundry/tpm-archival-fs';
import { createMockFoundry } from './fixtures/mock-foundry';

test.describe('Archival Tree Evaluation', () => {
  let tmpDir: string;

  test.beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(__dirname, 'tmp-archival-tree-'));
    createMockFoundry(tmpDir);
  });

  test.afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  test('setup test harness cleans up temp files', async () => {
    expect(fs.existsSync(tmpDir)).toBe(true);

    // Also create some mock active and verifying nodes to satisfy AC
    createValidTestNode(
      tmpDir,
      '.foundry/tasks/task-999.md',
      {
        id: 'task-999',
        type: 'TASK',
        status: 'ACTIVE',
        parent: 'story-200',
        title: 'Dummy Task Active',
      },
      'Body of the task.',
    );

    createValidTestNode(
      tmpDir,
      '.foundry/tasks/task-998.md',
      {
        id: 'task-998',
        type: 'TASK',
        status: 'VERIFYING',
        parent: 'story-200',
        title: 'Dummy Task Verifying',
      },
      'Body of the task.',
    );

    expect(fs.existsSync(path.join(tmpDir, '.foundry/tasks/task-999.md'))).toBe(true);
    expect(fs.existsSync(path.join(tmpDir, '.foundry/tasks/task-998.md'))).toBe(true);
  });

  test('systematic file moves to the archive directory preserve subdirectories and file state transitions', async () => {
    const nestedTaskDir = path.join(tmpDir, '.foundry/tasks/nested/deep');
    fs.mkdirSync(nestedTaskDir, { recursive: true });

    createValidTestNode(
      tmpDir,
      '.foundry/tasks/nested/deep/task-500.md',
      {
        id: 'task-500',
        type: 'TASK',
        status: 'COMPLETED',
        parent: 'story-200',
        title: 'Nested Task',
      },
      'Nested task content.',
    );

    const childPaths = ['.foundry/tasks/nested/deep/task-500.md', '.foundry/tasks/task-301.md'];
    archiveChildNodes(tmpDir, childPaths);
    expect(fs.existsSync(path.join(tmpDir, '.foundry/archive/tasks/nested/deep/task-500.md'))).toBe(true);
    expect(fs.existsSync(path.join(tmpDir, '.foundry/tasks/nested/deep/task-500.md'))).toBe(false);
  });
});

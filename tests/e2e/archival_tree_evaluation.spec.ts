import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { expect, test } from '@playwright/test';
import { createValidTestNode } from '../../packages/foundry/foundry-test-utils';
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
});

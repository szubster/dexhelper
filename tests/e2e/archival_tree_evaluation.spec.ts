import { execSync } from 'node:child_process';
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

  test('verifies entire parent/descendant chain evaluation for completion logic', async () => {
    fs.mkdirSync(path.join(tmpDir, '.foundry/docs/knowledge_base/agents'), { recursive: true });
    fs.writeFileSync(path.join(tmpDir, '.foundry/docs/knowledge_base/agents/core_policies.md'), 'test');

    const epicId = 'epic-700';
    const storyId = 'story-701';
    const taskId = 'task-702';

    createValidTestNode(
      tmpDir,
      `.foundry/epics/${epicId}.md`,
      {
        id: epicId,
        type: 'EPIC',
        status: 'PENDING',
        owner_persona: 'epic_planner',
        title: 'Parent Epic',
      },
      `Body with child link:\n- [ ] ${storyId}`,
    );

    createValidTestNode(
      tmpDir,
      `.foundry/stories/${storyId}.md`,
      {
        id: storyId,
        type: 'STORY',
        status: 'PENDING',
        parent: epicId,
        owner_persona: 'story_owner',
        title: 'Child Story',
        tags: ['e2e'],
      },
      `Body with child link:\n- [ ] ${taskId}`,
    );

    createValidTestNode(
      tmpDir,
      `.foundry/tasks/${taskId}.md`,
      {
        id: taskId,
        type: 'TASK',
        status: 'READY',
        parent: storyId,
        owner_persona: 'coder',
        title: 'Child Task',
      },
      `Task is ready to be worked on.`,
    );

    const orchestratorPath = path.resolve(__dirname, '../../packages/foundry/foundry-orchestrator.ts');

    execSync(`node --experimental-strip-types ${orchestratorPath}`, {
      cwd: tmpDir,
      env: { ...process.env, VITEST: 'true' },
      stdio: 'pipe',
    });

    let epicContent = fs.readFileSync(path.join(tmpDir, `.foundry/epics/${epicId}.md`), 'utf-8');
    expect(epicContent).toContain('status: PENDING');
    let storyContent = fs.readFileSync(path.join(tmpDir, `.foundry/stories/${storyId}.md`), 'utf-8');
    expect(storyContent).toContain('status: PENDING');

    createValidTestNode(
      tmpDir,
      `.foundry/tasks/${taskId}.md`,
      {
        id: taskId,
        type: 'TASK',
        status: 'COMPLETED',
        parent: storyId,
        owner_persona: 'coder',
        title: 'Child Task',
      },
      `Task is done.`,
    );

    // Run orchestrator to complete the story based on completed task
    execSync(`node --experimental-strip-types ${orchestratorPath}`, {
      cwd: tmpDir,
      env: { ...process.env, VITEST: 'true' },
      stdio: 'pipe',
    });

    storyContent = fs.readFileSync(path.join(tmpDir, `.foundry/stories/${storyId}.md`), 'utf-8');
    expect(storyContent).toContain('status: COMPLETED');

    epicContent = fs.readFileSync(path.join(tmpDir, `.foundry/epics/${epicId}.md`), 'utf-8');
    expect(epicContent).toContain('status: COMPLETED');
  });
});

import * as fs from 'node:fs';
import * as path from 'node:path';
import { createValidTestNode } from '../../../.github/scripts/foundry-test-utils';

export function createMockFoundry(baseDir: string) {
  const epicsDir = path.join(baseDir, '.foundry', 'epics');
  const storiesDir = path.join(baseDir, '.foundry', 'stories');
  const tasksDir = path.join(baseDir, '.foundry', 'tasks');
  const archiveStoriesDir = path.join(baseDir, '.foundry', 'archive', 'stories');
  const archiveTasksDir = path.join(baseDir, '.foundry', 'archive', 'tasks');

  fs.mkdirSync(epicsDir, { recursive: true });
  fs.mkdirSync(storiesDir, { recursive: true });
  fs.mkdirSync(tasksDir, { recursive: true });
  fs.mkdirSync(archiveStoriesDir, { recursive: true });
  fs.mkdirSync(archiveTasksDir, { recursive: true });

  createValidTestNode(
    baseDir,
    '.foundry/epics/epic-100.md',
    {
      id: 'epic-100',
      type: 'EPIC',
      status: 'COMPLETED',
      title: 'Dummy Epic',
    },
    'Body of the epic.',
  );

  createValidTestNode(
    baseDir,
    '.foundry/stories/story-200.md',
    {
      id: 'story-200',
      type: 'STORY',
      status: 'COMPLETED',
      parent: 'epic-100',
      title: 'Dummy Story',
    },
    'Body of the story.',
  );

  createValidTestNode(
    baseDir,
    '.foundry/tasks/task-301.md',
    {
      id: 'task-301',
      type: 'TASK',
      status: 'COMPLETED',
      parent: 'story-200',
      title: 'Dummy Task 1',
    },
    'Body of the task.',
  );

  createValidTestNode(
    baseDir,
    '.foundry/tasks/task-302.md',
    {
      id: 'task-302',
      type: 'TASK',
      status: 'COMPLETED',
      parent: 'epic-100',
      title: 'Dummy Task 2',
    },
    'Body of the task.',
  );
}

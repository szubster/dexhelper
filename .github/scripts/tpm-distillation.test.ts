import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { getCompletedEpics, getChildNodesForEpic, generateChangelogAndLearnings } from './tpm-distillation.ts';

const tmpDir = path.join(__dirname, 'tmp-tpm-distillation');

describe('TPM Distillation', () => {
  beforeEach(() => {
    fs.mkdirSync(tmpDir, { recursive: true });

    // Create folders
    const epicsDir = path.join(tmpDir, '.foundry', 'epics');
    const storiesDir = path.join(tmpDir, '.foundry', 'stories');
    const tasksDir = path.join(tmpDir, '.foundry', 'tasks');
    fs.mkdirSync(epicsDir, { recursive: true });
    fs.mkdirSync(storiesDir, { recursive: true });
    fs.mkdirSync(tasksDir, { recursive: true });

    // Completed Epic
    fs.writeFileSync(path.join(epicsDir, 'epic-1.md'), `---\n` +
      `id: epic-1\n` +
      `type: EPIC\n` +
      `title: "Completed Epic"\n` +
      `status: COMPLETED\n` +
      `owner_persona: epic_planner\n` +
      `created_at: '2026-09-01'\n` +
      `updated_at: '2026-09-01'\n` +
      `depends_on: []\n` +
      `jules_session_id: null\n` +
      `---\n\nBody`);

    // Child Story
    fs.writeFileSync(path.join(storiesDir, 'story-1.md'), `---\n` +
      `id: story-1\n` +
      `type: STORY\n` +
      `title: "Child Story"\n` +
      `status: COMPLETED\n` +
      `owner_persona: tech_lead\n` +
      `created_at: '2026-09-01'\n` +
      `updated_at: '2026-09-01'\n` +
      `depends_on: []\n` +
      `parent: epic-1\n` +
      `notes: "Story note"\n` +
      `jules_session_id: null\n` +
      `---\n\nBody`);

    // Child Task 1
    fs.writeFileSync(path.join(tasksDir, 'task-1.md'), `---\n` +
      `id: task-1\n` +
      `type: TASK\n` +
      `title: "Child Task 1"\n` +
      `status: COMPLETED\n` +
      `owner_persona: coder\n` +
      `created_at: '2026-09-01'\n` +
      `updated_at: '2026-09-01'\n` +
      `depends_on: []\n` +
      `parent: story-1\n` +
      `notes: "Task note"\n` +
      `jules_session_id: null\n` +
      `---\n\nBody`);

    // Child Task 2 (Direct Epic child)
    fs.writeFileSync(path.join(tasksDir, 'task-2.md'), `---\n` +
      `id: task-2\n` +
      `type: TASK\n` +
      `title: "Child Task 2"\n` +
      `status: COMPLETED\n` +
      `owner_persona: coder\n` +
      `created_at: '2026-09-01'\n` +
      `updated_at: '2026-09-01'\n` +
      `depends_on: []\n` +
      `parent: epic-1\n` +
      `jules_session_id: null\n` +
      `---\n\nBody`);

  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  it('should find completed epics', () => {
    const epics = getCompletedEpics(tmpDir);
    expect(epics.length).toBe(1);
    expect(epics[0].frontmatter.id).toBe('epic-1');
    expect(epics[0].repoPath).toContain('epic-1.md');
  });

  it('should find child nodes for epic', () => {
    const children = getChildNodesForEpic(tmpDir, 'epic-1');
    expect(children.length).toBe(3);
    const ids = children.map(c => c.frontmatter.id);
    expect(ids).toContain('story-1');
    expect(ids).toContain('task-1');
    expect(ids).toContain('task-2');
  });

  it('should generate changelog and learnings', () => {
      const children = getChildNodesForEpic(tmpDir, 'epic-1');
      const changelog = generateChangelogAndLearnings(children);

      expect(changelog).toContain('## Changelog & Learnings');
      expect(changelog).toContain('- **[story-1]** Child Story (COMPLETED)');
      expect(changelog).toContain('  - **[task-1]** Child Task 1 (COMPLETED)');
      expect(changelog).toContain('- **[task-2]** Child Task 2 (COMPLETED)');
      expect(changelog).toContain('- **story-1:** Story note');
      expect(changelog).toContain('- **task-1:** Task note');
  });
});

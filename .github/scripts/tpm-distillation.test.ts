import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { getCompletedEpics } from './tpm-distillation.ts';

const tmpDir = path.join(__dirname, 'tmp-tpm-distillation');

describe('TPM Distillation', () => {
  beforeEach(() => {
    fs.mkdirSync(tmpDir, { recursive: true });
    const epicsDir = path.join(tmpDir, '.foundry', 'epics');
    fs.mkdirSync(epicsDir, { recursive: true });

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

    // Active Epic
    fs.writeFileSync(path.join(epicsDir, 'epic-2.md'), `---\n` +
      `id: epic-2\n` +
      `type: EPIC\n` +
      `title: "Active Epic"\n` +
      `status: ACTIVE\n` +
      `owner_persona: epic_planner\n` +
      `created_at: '2026-09-01'\n` +
      `updated_at: '2026-09-01'\n` +
      `depends_on: []\n` +
      `jules_session_id: null\n` +
      `---\n\nBody`);

    // Completed Task (wrong type)
    fs.writeFileSync(path.join(epicsDir, 'task-1.md'), `---\n` +
      `id: task-1\n` +
      `type: TASK\n` +
      `title: "Completed Task"\n` +
      `status: COMPLETED\n` +
      `owner_persona: coder\n` +
      `created_at: '2026-09-01'\n` +
      `updated_at: '2026-09-01'\n` +
      `depends_on: []\n` +
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
});

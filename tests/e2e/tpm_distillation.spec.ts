import * as fs from 'node:fs';
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { expect, test } from '@playwright/test';
import {
  appendSummaryToEpic,
  archiveChildNodes,
  generateChangelogAndLearnings,
  getChildNodesForEpic,
  getCompletedEpics,
} from '../../.github/scripts/tpm-distillation';
import { createMockFoundry } from './fixtures/mock-foundry';

test.describe('TPM Distillation', () => {
  let tmpDir: string;

  test.beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(__dirname, 'tmp-tpm-distillation-'));
    createMockFoundry(tmpDir);
  });

  test.afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  test('should run TPM distillation logic correctly on dummy EPIC and child nodes', async () => {
    const completedEpics = getCompletedEpics(tmpDir);
    expect(completedEpics.length).toBe(1);
    const epic = completedEpics[0];
    if (!epic) throw new Error('Epic not found');
    expect(epic.frontmatter.id).toBe('epic-100');

    const childNodes = getChildNodesForEpic(tmpDir, epic.frontmatter.id);
    expect(childNodes.length).toBe(3);

    const changelog = generateChangelogAndLearnings(childNodes);
    appendSummaryToEpic(tmpDir, epic, changelog);
    archiveChildNodes(tmpDir, childNodes);

    const updatedEpicContent = fs.readFileSync(path.join(tmpDir, epic.repoPath), 'utf-8');
    expect(updatedEpicContent).toContain('## Changelog & Learnings');
    expect(updatedEpicContent).toContain('- **[story-200]** Dummy Story (COMPLETED)');
    expect(updatedEpicContent).toContain('  - **[task-301]** Dummy Task 1 (COMPLETED)');
    expect(updatedEpicContent).toContain('- **[task-302]** Dummy Task 2 (COMPLETED)');

    expect(fs.existsSync(path.join(tmpDir, '.foundry/stories/story-200.md'))).toBe(false);
    expect(fs.existsSync(path.join(tmpDir, '.foundry/tasks/task-301.md'))).toBe(false);
    expect(fs.existsSync(path.join(tmpDir, '.foundry/tasks/task-302.md'))).toBe(false);

    expect(fs.existsSync(path.join(tmpDir, '.foundry/archive/stories/story-200.md'))).toBe(true);
    expect(fs.existsSync(path.join(tmpDir, '.foundry/archive/tasks/task-301.md'))).toBe(true);
    expect(fs.existsSync(path.join(tmpDir, '.foundry/archive/tasks/task-302.md'))).toBe(true);
  });
});

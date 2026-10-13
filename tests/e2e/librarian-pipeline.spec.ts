import * as fs from 'node:fs/promises';
import os from 'node:os';
import * as path from 'node:path';
import { expect, test } from '@playwright/test';
import { ingestJournals } from '../../.github/scripts/librarian-ingestion';
import { sweepJournals } from '../../.github/scripts/sweep-journals';
import { updateKnowledgeBase } from '../../.github/scripts/update-knowledge-base';

test.describe('Librarian Pipeline E2E Integration', () => {
  let tmpDir: string;
  let repoRoot: string;

  test.beforeEach(async () => {
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'librarian-e2e-'));
    repoRoot = tmpDir;

    // Set up dummy directory structure
    await fs.mkdir(path.join(repoRoot, '.foundry/journals/test_persona'), { recursive: true });
    await fs.mkdir(path.join(repoRoot, '.jules'), { recursive: true });
    await fs.mkdir(path.join(repoRoot, '.foundry/docs/knowledge_base/agents'), { recursive: true });

    // Create some initial files
    const journalPath = path.join(repoRoot, '.foundry/journals/test_persona/entry1.md');
    await fs.writeFile(journalPath, 'Test journal entry');

    const kbPath = path.join(repoRoot, '.foundry/docs/knowledge_base/agents/core_policies.md');
    await fs.writeFile(kbPath, '# Core Policies\n\n');
  });

  test.afterEach(async () => {
    await fs.rm(tmpDir, { recursive: true, force: true });
  });

  test('executes the full librarian pipeline successfully', async () => {
    // 1. Ingestion
    const journalsDir = path.join(repoRoot, '.foundry/journals');
    const entries = await ingestJournals(journalsDir);
    expect(entries).toHaveLength(1);
    expect(entries[0]?.persona).toBe('test_persona');
    expect(entries[0]?.content).toBe('Test journal entry');

    // 2. Synthesis (simulated, as it was cancelled/moved to scheduled agent)
    // We mock the extracted rules that the scheduled agent would provide.
    const extractedRules = [{ description: 'E2E Extracted Rule 1' }, { description: 'E2E Extracted Rule 2' }];

    // 3. Documentation Update
    updateKnowledgeBase(repoRoot, extractedRules);

    const kbPath = path.join(repoRoot, '.foundry/docs/knowledge_base/agents/core_policies.md');
    const kbContent = await fs.readFile(kbPath, 'utf-8');
    expect(kbContent).toContain('## Librarian Extracted Rules');
    expect(kbContent).toContain('- E2E Extracted Rule 1');
    expect(kbContent).toContain('- E2E Extracted Rule 2');

    // 4. Garbage Collection
    // Mark file as processed for sweeping
    const journalPath = path.join(repoRoot, '.foundry/journals/test_persona/entry1.md');
    await fs.writeFile(journalPath, '---\nprocessed: true\n---\nTest journal entry');

    const swept = sweepJournals(repoRoot, { dryRun: false });
    expect(swept).toHaveLength(1);

    // Verify it was moved
    const oldExists = await fs
      .access(journalPath)
      .then(() => true)
      .catch(() => false);
    expect(oldExists).toBe(false);

    const archivePath = path.join(repoRoot, '.foundry/archive/journals/test_persona/entry1.md');
    const archivedExists = await fs
      .access(archivePath)
      .then(() => true)
      .catch(() => false);
    expect(archivedExists).toBe(true);
  });
});

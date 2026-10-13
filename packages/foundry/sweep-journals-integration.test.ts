import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import os from 'node:os';
import { sweepJournals } from './sweep-journals.ts';

describe('sweepJournals integration', () => {
    let tmpDir: string;

    beforeEach(async () => {
        tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'sweep-journals-test-'));
        await fs.mkdir(path.join(tmpDir, '.foundry', 'journals'), { recursive: true });
        await fs.mkdir(path.join(tmpDir, '.jules'), { recursive: true });
    });

    afterEach(async () => {
        await fs.rm(tmpDir, { recursive: true, force: true });
    });

    it('should actually move files to archive directory', async () => {
        // Create an old file
        const oldFile = path.join(tmpDir, '.foundry', 'journals', 'old.md');
        await fs.writeFile(oldFile, 'old content');

        // Mock the mtime to be 40 days ago
        const date = new Date();
        date.setDate(date.getDate() - 40);
        await fs.utimes(oldFile, date, date);

        // Create a processed file
        const processedFile = path.join(tmpDir, '.jules', 'processed.md');
        await fs.writeFile(processedFile, '---\nprocessed: true\n---\nprocessed content');

        // Create an active file
        const activeFile = path.join(tmpDir, '.foundry', 'journals', 'active.md');
        await fs.writeFile(activeFile, 'active content');

        const swept = sweepJournals(tmpDir, { dryRun: false });

        expect(swept).toHaveLength(2);
        expect(swept).toContain(oldFile);
        expect(swept).toContain(processedFile);

        // Check if files were moved
        const archiveFoundry = path.join(tmpDir, '.foundry', 'archive', 'journals');
        const archiveJules = path.join(tmpDir, '.foundry', 'archive', 'jules');

        const oldArchivedExists = await fs.access(path.join(archiveFoundry, 'old.md')).then(() => true).catch(() => false);
        expect(oldArchivedExists).toBe(true);

        const processedArchivedExists = await fs.access(path.join(archiveJules, 'processed.md')).then(() => true).catch(() => false);
        expect(processedArchivedExists).toBe(true);

        const activeExists = await fs.access(activeFile).then(() => true).catch(() => false);
        expect(activeExists).toBe(true);

        const oldExists = await fs.access(oldFile).then(() => true).catch(() => false);
        expect(oldExists).toBe(false);

        const processedExists = await fs.access(processedFile).then(() => true).catch(() => false);
        expect(processedExists).toBe(false);
    });

    it('should handle missing directories gracefully', async () => {
         const nonExistent = path.join(tmpDir, 'does-not-exist');
         const swept = sweepJournals(nonExistent);
         expect(swept).toHaveLength(0);
    });

    it('should handle permission errors gracefully by ignoring the file', async () => {
        // Create a file and remove read permissions
        const unreadableFile = path.join(tmpDir, '.foundry', 'journals', 'unreadable.md');
        await fs.writeFile(unreadableFile, '---\nprocessed: true\n---\ncontent');
        await fs.chmod(unreadableFile, 0o000);

        const swept = sweepJournals(tmpDir, { dryRun: true });
        // Since we can't read it to check frontmatter, and it's new, it shouldn't sweep it (and shouldn't crash)
        expect(swept).not.toContain(unreadableFile);

        await fs.chmod(unreadableFile, 0o644); // cleanup
    });
});

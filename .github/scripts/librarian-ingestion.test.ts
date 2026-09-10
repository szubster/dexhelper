import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import * as path from 'node:path';
import * as fs from 'node:fs/promises';
import { ingestJournals } from './librarian-ingestion.ts';
import os from 'node:os';

describe('librarian-ingestion', () => {
    let tmpDir: string;

    beforeEach(async () => {
        tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'librarian-test-'));
        await fs.mkdir(path.join(tmpDir, 'coder'), { recursive: true });
        await fs.mkdir(path.join(tmpDir, 'pm'), { recursive: true });
    });

    afterEach(async () => {
        await fs.rm(tmpDir, { recursive: true, force: true });
    });

    it('should ingest journals from subdirectories', async () => {
        const coderDir = path.join(tmpDir, 'coder');
        await fs.writeFile(path.join(coderDir, 'entry1.md'), 'Coder entry 1');
        await fs.writeFile(path.join(coderDir, 'entry2.md'), 'Coder entry 2');

        const pmDir = path.join(tmpDir, 'pm');
        await fs.writeFile(path.join(pmDir, 'entry1.md'), 'PM entry 1');
        await fs.writeFile(path.join(pmDir, 'not-md.txt'), 'Text file');

        const entries = await ingestJournals(tmpDir);

        expect(entries).toHaveLength(3);

        const coderEntries = entries.filter(e => e.persona === 'coder');
        expect(coderEntries).toHaveLength(2);
        expect(coderEntries[0].content).toBe('Coder entry 1');
        expect(coderEntries[1].content).toBe('Coder entry 2');

        const pmEntries = entries.filter(e => e.persona === 'pm');
        expect(pmEntries).toHaveLength(1);
        expect(pmEntries[0].content).toBe('PM entry 1');
    });

    it('should handle empty directory gracefully', async () => {
         const entries = await ingestJournals(tmpDir);
         expect(entries).toHaveLength(0);
    });

    it('should handle non-existent directory gracefully', async () => {
         const nonExistent = path.join(tmpDir, 'does-not-exist');
         const entries = await ingestJournals(nonExistent);
         expect(entries).toHaveLength(0);
    });

    it('should handle non-directory entries gracefully', async () => {
         await fs.writeFile(path.join(tmpDir, 'not-a-dir.txt'), 'some text');
         const entries = await ingestJournals(tmpDir);
         expect(entries).toHaveLength(0);
    });
});

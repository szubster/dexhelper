import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import * as path from 'node:path';
import * as fs from 'node:fs/promises';
import { exec } from 'node:child_process';
import { promisify } from 'node:util';
import os from 'node:os';

const execAsync = promisify(exec);
const SCRIPT_PATH = path.join(__dirname, 'aggregate-journals.ts');

describe('aggregate-journals', () => {
    let tmpDir: string;

    beforeEach(async () => {
        tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'journal-test-'));
        // create mock environment
        await fs.mkdir(path.join(tmpDir, '.foundry/journals/coder'), { recursive: true });
        await fs.mkdir(path.join(tmpDir, '.foundry/archive/journals'), { recursive: true });
        await fs.mkdir(path.join(tmpDir, '.jules/coder'), { recursive: true });
        await fs.mkdir(path.join(tmpDir, '.foundry/archive/jules'), { recursive: true });
    });

    afterEach(async () => {
        await fs.rm(tmpDir, { recursive: true, force: true });
    });

    it('should aggregate journals and archive original files', async () => {
        // Setup mock data
        const foundryJournalDir = path.join(tmpDir, '.foundry/journals/coder');
        await fs.writeFile(path.join(foundryJournalDir, 'master.md'), '# Master Log\n');
        await fs.writeFile(path.join(foundryJournalDir, '123.md'), 'Entry 123');
        await fs.writeFile(path.join(foundryJournalDir, '124.md'), 'Entry 124');

        const julesJournalDir = path.join(tmpDir, '.jules/coder');
        await fs.writeFile(path.join(julesJournalDir, 'master.md'), '# Jules Master\n');
        await fs.writeFile(path.join(julesJournalDir, '202.md'), 'Jules Entry 202');

        // Run the script. Since it uses process.cwd(), we need to execute it with cwd set to tmpDir
        await execAsync(`node --experimental-strip-types ${SCRIPT_PATH}`, { cwd: tmpDir });

        // Verify foundry journals
        const masterContent = await fs.readFile(path.join(foundryJournalDir, 'master.md'), 'utf-8');
        expect(masterContent).toContain('Entry 123');
        expect(masterContent).toContain('Entry 124');
        expect(masterContent).toContain('\n\n---\n\nEntry 123\n\n---\n\nEntry 124'); // Check separator

        // Verify files were deleted
        const remainingFoundryFiles = await fs.readdir(foundryJournalDir);
        expect(remainingFoundryFiles).toEqual(['master.md']);

        // Verify jules journals
        const julesMasterContent = await fs.readFile(path.join(julesJournalDir, 'master.md'), 'utf-8');
        expect(julesMasterContent).toContain('Jules Entry 202');
        expect(julesMasterContent).toContain('\n\n---\n\nJules Entry 202');

        // Verify jules files were deleted
        const remainingJulesFiles = await fs.readdir(julesJournalDir);
        expect(remainingJulesFiles).toEqual(['master.md']);

        // Verify archive directories were created
        const archiveDir = path.join(tmpDir, '.foundry/archive/journals/coder');
        const stats = await fs.stat(archiveDir);
        expect(stats.isDirectory()).toBe(true);
    });

    it('should skip directories with no md files', async () => {
        const emptyDir = path.join(tmpDir, '.foundry/journals/empty_persona');
        await fs.mkdir(emptyDir, { recursive: true });

        await execAsync(`node --experimental-strip-types ${SCRIPT_PATH}`, { cwd: tmpDir });

        const archiveDir = path.join(tmpDir, '.foundry/archive/journals/empty_persona');

        // Check that the archive dir was NOT created
        await expect(fs.stat(archiveDir)).rejects.toThrow('ENOENT');
    });

    it('should handle missing base directories gracefully', async () => {
         const emptyTmp = await fs.mkdtemp(path.join(os.tmpdir(), 'empty-'));

         // Should run without error even if .foundry/journals and .jules don't exist
         await expect(execAsync(`node --experimental-strip-types ${SCRIPT_PATH}`, { cwd: emptyTmp })).resolves.not.toThrow();

         await fs.rm(emptyTmp, { recursive: true, force: true });
    });

    it('should handle non-directory entries gracefully', async () => {
         await fs.writeFile(path.join(tmpDir, '.foundry/journals/not-a-dir.txt'), 'some text');
         await expect(execAsync(`node --experimental-strip-types ${SCRIPT_PATH}`, { cwd: tmpDir })).resolves.not.toThrow();
    });
});

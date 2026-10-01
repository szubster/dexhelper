import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { main } from './foundry-orchestrator.ts';
import * as flexsearchUtils from './flexsearch-utils.ts';

// Mock the imported flexsearchUtils module
vi.mock('./flexsearch-utils.ts', async (importOriginal) => {
    const actual = await importOriginal<typeof import('./flexsearch-utils.ts')>();
    return {
        ...actual,
        buildDocumentationIndex: vi.fn<(repoRoot: string) => any>(),
    };
});

describe('foundry-orchestrator integration', () => {
    let tmpDir: string;
    let spy: any;

    beforeEach(() => {
        tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'orchestrator-test-'));
        vi.spyOn(process, 'cwd').mockReturnValue(tmpDir);
        vi.spyOn(console, 'log').mockImplementation(() => {});
        vi.spyOn(console, 'error').mockImplementation(() => {});

        fs.mkdirSync(path.join(tmpDir, '.foundry'));

        // The real orchestrator exits early when it encounters empty dirs
        vi.spyOn(fs, 'readdirSync').mockReturnValue([] as any);

        vi.spyOn(process, 'exit').mockImplementation(() => undefined as never);

        spy = vi.mocked(flexsearchUtils.buildDocumentationIndex);
    });

    afterEach(() => {
        vi.restoreAllMocks();
        try {
            fs.rmSync(tmpDir, { recursive: true, force: true });
        } catch {
            // ignore
        }
    });

    test('should build documentation index on orchestrator start', () => {
        // Run main
        main();

        // Verify the mocked buildDocumentationIndex was called with the repo root
        expect(spy).toHaveBeenCalledWith(tmpDir);
    });
});

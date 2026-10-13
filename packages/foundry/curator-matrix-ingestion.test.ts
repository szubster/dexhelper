import { test, expect, describe, vi, beforeEach, afterEach } from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as os from 'node:os';
import { createValidTestNode } from './foundry-test-utils';
import { main } from './foundry-orchestrator';

describe('Curator Historical Mapping Ingestion', () => {
    let tmpDir: string;

    beforeEach(() => {
        tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'curator-matrix-ingestion-'));
        vi.spyOn(process, 'cwd').mockReturnValue(tmpDir);
        vi.spyOn(console, 'error').mockImplementation(() => {});
        process.env.VITEST = 'true';
    });

    afterEach(() => {
        fs.rmSync(tmpDir, { recursive: true, force: true });
        vi.restoreAllMocks();
    });

    test('validates inclusion of idea_dependency_matrix.md in curator node prompt', () => {
        fs.mkdirSync(path.join(tmpDir, '.github/agents/generic'), { recursive: true });
        fs.mkdirSync(path.join(tmpDir, '.foundry/docs/architecture'), { recursive: true });
        fs.mkdirSync(path.join(tmpDir, '.foundry/docs/knowledge_base/agents'), { recursive: true });

        fs.writeFileSync(path.join(tmpDir, '.github/agents/generic/curator.md'), 'CURATOR_BASE_PROMPT');
        fs.writeFileSync(path.join(tmpDir, '.foundry/docs/architecture/idea_dependency_matrix.md'), 'IDEA_DEPENDENCY_MATRIX_CONTENT');
        fs.writeFileSync(path.join(tmpDir, '.foundry/docs/knowledge_base/agents/core_policies.md'), 'CORE_POLICIES_CONTENT');

        createValidTestNode(tmpDir, '.foundry/tasks/task-001.md', {
            id: 'task-001',
            type: 'TASK',
            title: 'Curator Task',
            status: 'READY',
            owner_persona: 'curator',
            created_at: '2026-09-14',
            updated_at: '2026-09-14',
            depends_on: [],
            jules_session_id: null
        });

        const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

        process.argv.push('--include-prompt');
        main();
        process.argv.splice(process.argv.indexOf('--include-prompt'), 1);

        expect(logSpy).toHaveBeenCalled();

        let parsedOutput: any[] = [];
        for (const call of logSpy.mock.calls) {
            if (typeof call[0] === 'string' && call[0].startsWith('[')) {
                try {
                    const parsed = JSON.parse(call[0]);
                    if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].id) {
                        parsedOutput = parsed;
                        break;
                    }
                } catch {
                }
            }
        }

        expect(parsedOutput).toHaveLength(1);
        const compiledPrompt = parsedOutput[0].compiled_prompt;

        expect(compiledPrompt).toContain('CURATOR_BASE_PROMPT');
        expect(compiledPrompt).toContain('IDEA_DEPENDENCY_MATRIX_CONTENT');
    });

    test('validates inclusion of idea_dependency_matrix.md in curator scheduled prompt', () => {
        fs.mkdirSync(path.join(tmpDir, '.github/agents/generic'), { recursive: true });
        fs.mkdirSync(path.join(tmpDir, '.foundry/docs/architecture'), { recursive: true });
        fs.mkdirSync(path.join(tmpDir, '.foundry/docs/knowledge_base/agents'), { recursive: true });

        fs.writeFileSync(path.join(tmpDir, '.github/agents/generic/curator.md'), 'CURATOR_BASE_PROMPT');
        fs.writeFileSync(path.join(tmpDir, '.foundry/docs/architecture/idea_dependency_matrix.md'), 'IDEA_DEPENDENCY_MATRIX_CONTENT');
        fs.writeFileSync(path.join(tmpDir, '.foundry/docs/knowledge_base/agents/core_policies.md'), 'CORE_POLICIES_CONTENT');

        const stdoutSpy = vi.spyOn(process.stdout, 'write').mockImplementation(() => true);

        process.argv.push('--compile-scheduled', 'curator');
        main();
        process.argv.splice(process.argv.indexOf('--compile-scheduled'), 2);

        expect(stdoutSpy).toHaveBeenCalled();
        const compiledPrompt = stdoutSpy.mock.calls.map(call => call[0] as string).join('');

        expect(compiledPrompt).toContain('CURATOR_BASE_PROMPT');
        expect(compiledPrompt).toContain('IDEA_DEPENDENCY_MATRIX_CONTENT');
    });
});

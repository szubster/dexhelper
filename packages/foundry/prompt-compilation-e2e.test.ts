import { test, expect, describe, vi, beforeEach, afterEach } from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as os from 'node:os';
import { createValidTestNode } from './foundry-test-utils';
import { loadPromptFixture } from './prompt-compilation-fixtures';
import { main } from './foundry-orchestrator';

describe('Prompt Compilation E2E', () => {
    let tmpDir: string;

    beforeEach(() => {
        tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'prompt-compilation-e2e-'));
        vi.spyOn(process, 'cwd').mockReturnValue(tmpDir);
        vi.spyOn(console, 'error').mockImplementation(() => {});
        process.env.VITEST = 'true';
    });

    afterEach(() => {
        fs.rmSync(tmpDir, { recursive: true, force: true });
        vi.restoreAllMocks();
    });

    test('validates removal of redundant information and inclusion of necessary context', async () => {
        // Setup directories
        fs.mkdirSync(path.join(tmpDir, '.github/agents/generic'), { recursive: true });
        fs.mkdirSync(path.join(tmpDir, '.github/agents/specific'), { recursive: true });
        fs.mkdirSync(path.join(tmpDir, '.foundry/docs/knowledge_base/agents'), { recursive: true });

        // Write mock agent prompts
        fs.writeFileSync(path.join(tmpDir, '.github/agents/generic/coder.md'), loadPromptFixture('valid-base-persona.md'));
        fs.writeFileSync(path.join(tmpDir, '.github/agents/specific/react.md'), loadPromptFixture('specific-context-layer.md'));
        fs.writeFileSync(path.join(tmpDir, '.github/agents/specific/typescript.md'), 'TYPESCRIPT_SPECIFIC_CONTEXT');
        fs.writeFileSync(path.join(tmpDir, '.foundry/docs/knowledge_base/agents/core_policies.md'), loadPromptFixture('core-policies.md'));

        // Create a mock node with redundant tags/layers
        createValidTestNode(tmpDir, '.foundry/tasks/task-001.md', {
            id: 'task-001',
            type: 'TASK',
            title: 'Test Task',
            status: 'READY',
            owner_persona: 'coder',
            created_at: '2026-09-14',
            updated_at: '2026-09-14',
            depends_on: [],
            tags: ['React', 'react', 'TYPESCRIPT', 'typescript'],
            layers: ['react', 'TypeScript'],
            jules_session_id: null
        });

        const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

        process.argv.push('--include-prompt');
        main();
        process.argv.splice(process.argv.indexOf('--include-prompt'), 1);

        expect(logSpy).toHaveBeenCalled();

        // Find the log call that contains the expected JSON payload
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

        // Verify inclusion of necessary context
        expect(compiledPrompt).toContain(loadPromptFixture('valid-base-persona.md'));
        expect(compiledPrompt).toContain(loadPromptFixture('specific-context-layer.md'));
        expect(compiledPrompt).toContain('TYPESCRIPT_SPECIFIC_CONTEXT');
        expect(compiledPrompt).toContain(loadPromptFixture('core-policies.md'));

        // Verify removal of redundant information
        const reactMatches = compiledPrompt.match(/Specific Context Layer/g);
        expect(reactMatches).toHaveLength(1);

        const tsMatches = compiledPrompt.match(/TYPESCRIPT_SPECIFIC_CONTEXT/g);
        expect(tsMatches).toHaveLength(1);
    });

    test('validates fallback behavior for missing generic persona prompt', async () => {
        fs.mkdirSync(path.join(tmpDir, '.github/agents/generic'), { recursive: true });
        fs.mkdirSync(path.join(tmpDir, '.foundry/docs/knowledge_base/agents'), { recursive: true });

        fs.writeFileSync(path.join(tmpDir, '.foundry/docs/knowledge_base/agents/core_policies.md'), loadPromptFixture('core-policies.md'));

        // Write the missing fragment fixture into the fallback path to verify it gets picked up
        fs.writeFileSync(path.join(tmpDir, '.github/agents/coder.md'), loadPromptFixture('missing-fragment.md'));

        createValidTestNode(tmpDir, '.foundry/tasks/task-002.md', {
            id: 'task-002',
            type: 'TASK',
            title: 'Test Task 2',
            status: 'READY',
            owner_persona: 'coder',
            created_at: '2026-09-14',
            updated_at: '2026-09-14',
            depends_on: [],
            tags: [],
            jules_session_id: null
        });

        const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
        vi.spyOn(console, 'warn').mockImplementation(() => {});

        process.argv.push('--include-prompt');
        main();
        process.argv.splice(process.argv.indexOf('--include-prompt'), 1);

        let parsedOutput: any[] = [];
        for (const call of logSpy.mock.calls) {
            if (typeof call[0] === 'string' && call[0].startsWith('[')) {
                try {
                    const parsed = JSON.parse(call[0]);
                    if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].id === 'task-002') {
                        parsedOutput = parsed;
                        break;
                    }
                } catch {
                }
            }
        }

        expect(parsedOutput).toHaveLength(1);
        const compiledPrompt = parsedOutput[0].compiled_prompt;

        // Since generic/coder.md is missing, it falls back to coder.md which contains missing-fragment
        expect(compiledPrompt).toContain(loadPromptFixture('missing-fragment.md'));
    });

    test('validates fallback behavior for completely missing persona prompt', async () => {
        fs.mkdirSync(path.join(tmpDir, '.github/agents/generic'), { recursive: true });
        fs.mkdirSync(path.join(tmpDir, '.foundry/docs/knowledge_base/agents'), { recursive: true });
        fs.writeFileSync(path.join(tmpDir, '.foundry/docs/knowledge_base/agents/core_policies.md'), loadPromptFixture('core-policies.md'));

        createValidTestNode(tmpDir, '.foundry/tasks/task-missing-persona.md', {
            id: 'task-missing-persona',
            type: 'TASK',
            title: 'Missing Persona Task',
            status: 'READY',
            owner_persona: 'tpm',
            created_at: '2026-09-14',
            updated_at: '2026-09-14',
            depends_on: [],
            tags: [],
            jules_session_id: null
        });

        const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
        const stderrSpy = vi.spyOn(process.stderr, 'write').mockImplementation(() => true);

        process.argv.push('--include-prompt');
        main();
        process.argv.splice(process.argv.indexOf('--include-prompt'), 1);

        expect(stderrSpy).toHaveBeenCalledWith(expect.stringContaining('::warning::Base persona prompt not found for: tpm, using default generic prompt.'));

        let parsedOutput: any[] = [];
        for (const call of logSpy.mock.calls) {
            if (typeof call[0] === 'string' && call[0].startsWith('[')) {
                try {
                    const parsed = JSON.parse(call[0]);
                    if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].id === 'task-missing-persona') {
                        parsedOutput = parsed;
                        break;
                    }
                } catch {
                }
            }
        }

        expect(parsedOutput).toHaveLength(1);
        const compiledPrompt = parsedOutput[0].compiled_prompt;
        expect(compiledPrompt).toContain('As the tpm of The Foundry, your task is described in the provided node file.');
    });

    test('validates graceful handling of missing specific context layers', async () => {
        fs.mkdirSync(path.join(tmpDir, '.github/agents/generic'), { recursive: true });
        fs.mkdirSync(path.join(tmpDir, '.github/agents/specific'), { recursive: true });
        fs.mkdirSync(path.join(tmpDir, '.foundry/docs/knowledge_base/agents'), { recursive: true });

        fs.writeFileSync(path.join(tmpDir, '.github/agents/generic/coder.md'), loadPromptFixture('valid-base-persona.md'));
        fs.writeFileSync(path.join(tmpDir, '.foundry/docs/knowledge_base/agents/core_policies.md'), loadPromptFixture('core-policies.md'));

        createValidTestNode(tmpDir, '.foundry/tasks/task-missing-layer.md', {
            id: 'task-missing-layer',
            type: 'TASK',
            title: 'Missing Layer Task',
            status: 'READY',
            owner_persona: 'coder',
            created_at: '2026-09-14',
            updated_at: '2026-09-14',
            depends_on: [],
            tags: ['nonexistenttag'],
            layers: ['nonexistentlayer'],
            jules_session_id: null
        });

        const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

        process.argv.push('--include-prompt');
        main();
        process.argv.splice(process.argv.indexOf('--include-prompt'), 1);

        let parsedOutput: any[] = [];
        for (const call of logSpy.mock.calls) {
            if (typeof call[0] === 'string' && call[0].startsWith('[')) {
                try {
                    const parsed = JSON.parse(call[0]);
                    if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].id === 'task-missing-layer') {
                        parsedOutput = parsed;
                        break;
                    }
                } catch {
                }
            }
        }

        expect(parsedOutput).toHaveLength(1);
        const compiledPrompt = parsedOutput[0].compiled_prompt;

        // Verify base prompt still loaded
        expect(compiledPrompt).toContain(loadPromptFixture('valid-base-persona.md'));

        // Verify we didn't crash and debug was called or logged appropriately, the code doesn't actually call console.debug but debug function from the logger which might use console.log or just return, but we can verify it doesn't crash and compiles correctly.
        // If debug is not mocked properly, the test passing means it didn't crash.
        // Actually, we can just assert that the specific tags are missing.
        expect(compiledPrompt).not.toContain('nonexistenttag');
    });
});

import { test, expect, describe, vi, beforeEach, afterEach } from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as os from 'node:os';
import { createValidTestNode } from './foundry-test-utils';
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
        fs.writeFileSync(path.join(tmpDir, '.github/agents/generic/coder.md'), 'GENERIC_CODER_BASE_PROMPT');
        fs.writeFileSync(path.join(tmpDir, '.github/agents/specific/react.md'), 'REACT_SPECIFIC_CONTEXT');
        fs.writeFileSync(path.join(tmpDir, '.github/agents/specific/typescript.md'), 'TYPESCRIPT_SPECIFIC_CONTEXT');
        fs.writeFileSync(path.join(tmpDir, '.foundry/docs/knowledge_base/agents/core_policies.md'), 'CORE_POLICIES_CONTENT');

        // Create a mock node with redundant tags/layers
        createValidTestNode(tmpDir, '.foundry/tasks/task-001.md', {
            id: 'task-001',
            type: 'TASK',
            title: 'Test Task',
            status: 'READY', // Use READY so orchestrator can schedule it
            owner_persona: 'coder',
            created_at: '2026-09-14',
            updated_at: '2026-09-14',
            depends_on: [],
            tags: ['React', 'react', 'TYPESCRIPT', 'typescript'], // Redundant information
            layers: ['react', 'TypeScript'], // More redundancy
            jules_session_id: null
        });

        const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

        process.argv.push('--include-prompt');
        await main();
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
                } catch (e) {
                    // ignore parse errors for normal logs
                }
            }
        }

        expect(parsedOutput).toHaveLength(1);
        const compiledPrompt = parsedOutput[0].compiled_prompt;

        // Verify inclusion of necessary context
        expect(compiledPrompt).toContain('GENERIC_CODER_BASE_PROMPT');
        expect(compiledPrompt).toContain('REACT_SPECIFIC_CONTEXT');
        expect(compiledPrompt).toContain('TYPESCRIPT_SPECIFIC_CONTEXT');
        expect(compiledPrompt).toContain('CORE_POLICIES_CONTENT');

        // Verify removal of redundant information (only one instance of specific context)
        const reactMatches = compiledPrompt.match(/REACT_SPECIFIC_CONTEXT/g);
        expect(reactMatches).toHaveLength(1);

        const tsMatches = compiledPrompt.match(/TYPESCRIPT_SPECIFIC_CONTEXT/g);
        expect(tsMatches).toHaveLength(1);
    });
});

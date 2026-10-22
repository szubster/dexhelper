import { test, expect, describe, vi, beforeEach, afterEach } from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as os from 'node:os';
import { createValidTestNode } from './foundry-test-utils';
import { main } from './foundry-orchestrator';

describe('WIP Awareness E2E', () => {
    let tmpDir: string;

    beforeEach(() => {
        tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'wip-awareness-e2e-'));
        vi.spyOn(process, 'cwd').mockReturnValue(tmpDir);
        vi.spyOn(console, 'error').mockImplementation(() => {});
        process.env.VITEST = 'true';
    });

    afterEach(() => {
        fs.rmSync(tmpDir, { recursive: true, force: true });
        vi.restoreAllMocks();
    });

    test('validates that agents avoid depending on Draft/WIP artifacts when parsing nodes', async () => {
        fs.mkdirSync(path.join(tmpDir, '.foundry/docs/knowledge_base/agents'), { recursive: true });
        fs.writeFileSync(path.join(tmpDir, '.foundry/docs/knowledge_base/agents/core_policies.md'), 'CORE_POLICIES_CONTENT');

        fs.mkdirSync(path.join(tmpDir, '.github/agents/generic'), { recursive: true });
        fs.writeFileSync(path.join(tmpDir, '.github/agents/generic/coder.md'), 'GENERIC_CODER_BASE_PROMPT');

        createValidTestNode(tmpDir, '.foundry/stories/story-wip.md', {
            id: 'story-wip',
            type: 'STORY',
            title: 'WIP Story',
            status: 'WIP',
            owner_persona: 'tech_lead'
        });
        createValidTestNode(tmpDir, '.foundry/stories/story-draft.md', {
            id: 'story-draft',
            type: 'STORY',
            title: 'DRAFT Story',
            status: 'DRAFT',
            owner_persona: 'tech_lead'
        });

        // Test Phase 3.5: Checking ACTIVE/VERIFYING/READY nodes for suspension...
        createValidTestNode(tmpDir, '.foundry/tasks/task-ready-wip.md', {
            id: 'task-ready-wip',
            type: 'TASK',
            title: 'Ready Task depending on WIP',
            status: 'READY',
            owner_persona: 'coder',
            depends_on: ['story-wip']
        });

        createValidTestNode(tmpDir, '.foundry/tasks/task-active-draft.md', {
            id: 'task-active-draft',
            type: 'TASK',
            title: 'Active Task depending on DRAFT',
            status: 'ACTIVE',
            owner_persona: 'coder',
            depends_on: ['story-draft']
        });

        // Phase 4: Resolving DAG — finding eligible PENDING nodes
        createValidTestNode(tmpDir, '.foundry/tasks/task-pending-wip.md', {
            id: 'task-pending-wip',
            type: 'TASK',
            title: 'Pending Task depending on WIP',
            status: 'PENDING',
            owner_persona: 'coder',
            depends_on: ['story-wip']
        });

        const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

        main();

        let parsedOutput: any[] = [];
        for (const call of logSpy.mock.calls) {
            if (typeof call[0] === 'string' && call[0].startsWith('[')) {
                try {
                    const parsed = JSON.parse(call[0]);
                    if (Array.isArray(parsed)) {
                        parsedOutput = parsed;
                        break;
                    }
                } catch {
                }
            }
        }

        // Output shouldn't have any of the task nodes as they are blocked or suspended by WIP/DRAFT deps
        expect(parsedOutput.some((n: any) => n.id === 'task-ready-wip')).toBe(false);
        expect(parsedOutput.some((n: any) => n.id === 'task-active-draft')).toBe(false);
        expect(parsedOutput.some((n: any) => n.id === 'task-pending-wip')).toBe(false);

        // Verify state changes
        const readyWipNodeContent = fs.readFileSync(path.join(tmpDir, '.foundry/tasks/task-ready-wip.md'), 'utf-8');
        expect(readyWipNodeContent).toContain('status: PENDING');

        const activeDraftNodeContent = fs.readFileSync(path.join(tmpDir, '.foundry/tasks/task-active-draft.md'), 'utf-8');
        expect(activeDraftNodeContent).toContain('status: PENDING');

        const pendingWipNodeContent = fs.readFileSync(path.join(tmpDir, '.foundry/tasks/task-pending-wip.md'), 'utf-8');
        expect(pendingWipNodeContent).toContain('status: PENDING');
    });
});

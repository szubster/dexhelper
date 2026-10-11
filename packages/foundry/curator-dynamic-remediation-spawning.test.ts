import { test, expect, describe, vi, beforeEach, afterEach } from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as os from 'node:os';
import { createValidTestNode } from './foundry-test-utils';
import { main } from './foundry-orchestrator';

describe('Curator Dynamic Remediation Spawning', () => {
    let tmpDir: string;

    beforeEach(() => {
        tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'curator-dynamic-remediation-spawning-'));
        vi.spyOn(process, 'cwd').mockReturnValue(tmpDir);
        vi.spyOn(console, 'error').mockImplementation(() => {});
        process.env.VITEST = 'true';
    });

    afterEach(() => {
        fs.rmSync(tmpDir, { recursive: true, force: true });
        vi.restoreAllMocks();
    });

    test('validates orchestrator handles late-bound dynamic remediation nodes correctly', () => {
        fs.mkdirSync(path.join(tmpDir, '.foundry/tasks'), { recursive: true });
        fs.mkdirSync(path.join(tmpDir, '.foundry/research'), { recursive: true });

        // Simulate a scenario where a regression is identified and a curator node spawns a remediation node
        // The curator node is currently ACTIVE (working) and appends a late-bound checkbox to itself.

        // 1. Create the late-bound remediation node spawned by the curator
        const remediationNodeId = 'research-999-remediation-legacy-conflict';
        createValidTestNode(tmpDir, `.foundry/research/${remediationNodeId}.md`, {
            id: remediationNodeId,
            type: 'RESEARCH',
            title: 'Remediate Legacy Conflict',
            status: 'PENDING',
            owner_persona: 'researcher',
            created_at: '2026-09-14',
            updated_at: '2026-09-14',
            depends_on: [],
            parent: 'task-curator-review-01',
            jules_session_id: null
        });

        // 2. Create the curator node that identified the regression and appended the remediation node
        createValidTestNode(tmpDir, '.foundry/tasks/task-curator-review-01.md', {
            id: 'task-curator-review-01',
            type: 'TASK',
            title: 'Curator Review',
            status: 'READY',
            owner_persona: 'curator',
            created_at: '2026-09-14',
            updated_at: '2026-09-14',
            depends_on: [],
            jules_session_id: null
        }, `## Acceptance Criteria\n- [ ] ${remediationNodeId}\n`);

        const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

        main();

        expect(logSpy).toHaveBeenCalled();

        let parsedOutput: any[] = [];
        for (const call of logSpy.mock.calls) {
            if (typeof call[0] === 'string' && call[0].startsWith('[')) {
                try {
                    const parsed = JSON.parse(call[0]);
                    if (Array.isArray(parsed) && parsed.length > 0) {
                        parsedOutput = parsed;
                        break;
                    }
                } catch {
                }
            }
        }

        // The orchestrator should:
        // 1. Demote the curator task to PENDING because it has an unchecked checkbox for the remediation node.
        // 2. Promote the remediation node to READY (or at least consider it in the DAG).

        const curatorTaskOutput = parsedOutput.find(node => node.id === 'task-curator-review-01');
        const remediationTaskOutput = parsedOutput.find(node => node.id === remediationNodeId);

        // Since the curator task has an unchecked child, it should NOT be in the READY output
        expect(curatorTaskOutput).toBeUndefined();

        // The remediation task should be promoted to READY because it has no dependencies
        expect(remediationTaskOutput).toBeDefined();
        expect(remediationTaskOutput.status).toBe('READY');
        expect(remediationTaskOutput.owner_persona).toBe('researcher');
    });
});

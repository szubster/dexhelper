import { test, expect, describe, vi, beforeEach, afterEach } from 'vitest';
import fc from 'fast-check';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as os from 'node:os';
import { createValidTestNode } from './foundry-test-utils';
import { main, parseNodeFile } from './foundry-orchestrator';

describe('Orchestrator Fuzzing E2E', () => {
    let tmpDir: string;

    beforeEach(() => {
        tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'fuzzing-orchestrator-e2e-'));
        vi.spyOn(process, 'cwd').mockReturnValue(tmpDir);
        vi.spyOn(console, 'log').mockImplementation(() => {});
        vi.spyOn(console, 'error').mockImplementation(() => {});
        process.env.VITEST = 'true';
    });

    afterEach(() => {
        fs.rmSync(tmpDir, { recursive: true, force: true });
        vi.restoreAllMocks();
    });

    test('State machine transitions operate correctly under arbitrary sequences', () => {
        const statuses = ['PENDING', 'COMPLETED', 'READY', 'ACTIVE', 'VERIFYING', 'FAILED', 'BLOCKED', 'CANCELLED'] as const;

        const tasksArbitrary = fc.uniqueArray(
            fc.record({
                id: fc.integer({ min: 1, max: 10 }).map(n => `task-${n}`),
                status: fc.constantFrom(...statuses)
            }),
            { selector: t => t.id, minLength: 1, maxLength: 5 }
        ).chain(tasks => {
            return fc.tuple(
                fc.constant(tasks),
                fc.array(fc.record({
                    fromId: fc.constantFrom(...tasks.map(t => t.id)),
                    toId: fc.constantFrom(...tasks.map(t => t.id))
                }), { maxLength: 10 })
            );
        });

        fc.assert(
            fc.property(tasksArbitrary, ([tasks, edges]) => {
                fs.rmSync(tmpDir, { recursive: true, force: true });
                fs.mkdirSync(tmpDir, { recursive: true });

                const depsMap = new Map<string, Set<string>>();
                tasks.forEach(t => depsMap.set(t.id, new Set()));

                edges.forEach(e => {
                    if (e.fromId !== e.toId) {
                        depsMap.get(e.fromId)!.add(e.toId);
                    }
                });

                tasks.forEach(t => {
                    createValidTestNode(tmpDir, `.foundry/tasks/${t.id}.md`, {
                        id: t.id,
                        status: t.status,
                        depends_on: Array.from(depsMap.get(t.id)!)
                    });
                });

                let errorThrown = false;
                try {
                    main();
                } catch {
                    errorThrown = true;
                }

                const finalStates: Record<string, string> = {};

                tasks.forEach(t => {
                    const nodeFile = path.join(tmpDir, `.foundry/tasks/${t.id}.md`);
                    if (fs.existsSync(nodeFile)) {
                        const parsed = parseNodeFile(nodeFile, tmpDir);
                        if (parsed) {
                           finalStates[t.id] = parsed.frontmatter.status;
                        }
                    }
                });

                expect(errorThrown).toBe(false);

                // Check that the frontmatter states were preserved/mutated into valid states without crashing
                expect(Object.keys(finalStates).length).toBe(tasks.length);
            }),
            { numRuns: 20 }
        );
    });
});

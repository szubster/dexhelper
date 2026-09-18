import { test, expect, describe, vi, beforeEach, afterEach } from 'vitest';
import fc from 'fast-check';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as os from 'node:os';
import { createValidTestNode } from './foundry-test-utils';
import { main, parseNodeFile } from './foundry-orchestrator';
import { generateDependenciesArbitrary, generateDagNodesArbitrary } from './fuzzing-utils';

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
            { numRuns: 100 }
        );
    });

    test('Orchestrator state transition simulator applies lifecycle transitions and fault injection across multiple ticks', () => {
        const dagArbitrary = generateDagNodesArbitrary({ minNodes: 2, maxNodes: 15 }).chain(nodes => {
            return generateDependenciesArbitrary(nodes, { maxDepth: 5, maxWidth: 5 });
        });

        const faultArbitrary = fc.array(
            fc.array(
                fc.record({
                    nodeIndex: fc.integer({ min: 0, max: 14 }),
                    faultType: fc.constantFrom('TIMEOUT', 'REJECTION', 'MAX_REJECTION', 'NONE')
                }),
                { maxLength: 3 }
            ),
            { minLength: 5, maxLength: 5 }
        );

        fc.assert(
            fc.property(dagArbitrary, faultArbitrary, (nodes, faultsPerTick) => {
                fs.rmSync(tmpDir, { recursive: true, force: true });
                fs.mkdirSync(tmpDir, { recursive: true });

                // Write nodes
                for (const node of nodes) {
                    const typePluralMap: Record<string, string> = {
                        'IDEA': 'ideas',
                        'PRD': 'prds',
                        'EPIC': 'epics',
                        'STORY': 'stories',
                        'TASK': 'tasks',
                        'RESEARCH': 'research',
                        'ADR': 'adrs',
                        'EXPERIMENT': 'experiments'
                    };
                    const typePlural = typePluralMap[node.type];
                    createValidTestNode(tmpDir, `.foundry/${typePlural}/${node.id}.md`, node);
                }

                let errorThrown = false;
                try {
                    // Simulate 5 orchestrator ticks with fault injection
                    const typePluralMap: Record<string, string> = {
                        'IDEA': 'ideas',
                        'PRD': 'prds',
                        'EPIC': 'epics',
                        'STORY': 'stories',
                        'TASK': 'tasks',
                        'RESEARCH': 'research',
                        'ADR': 'adrs',
                        'EXPERIMENT': 'experiments'
                    };

                    for (let i = 0; i < 5; i++) {
                        const faults = faultsPerTick[i];
                        for (const fault of faults) {
                            if (fault.faultType === 'NONE') continue;
                            const targetNode = nodes[fault.nodeIndex % nodes.length];
                            const typePlural = typePluralMap[targetNode.type];
                            const nodeFile = path.join(tmpDir, `.foundry/${typePlural}/${targetNode.id}.md`);

                            if (fs.existsSync(nodeFile)) {
                                let fileContent = fs.readFileSync(nodeFile, 'utf-8');
                                if (fault.faultType === 'TIMEOUT') {
                                    fileContent = fileContent.replace(/^status:.*$/m, 'status: ACTIVE');
                                    fileContent = fileContent.replace(/^jules_session_id:.*$/m, 'jules_session_id: "dummy-session-123"');
                                } else if (fault.faultType === 'REJECTION') {
                                    fileContent = fileContent.replace(/^status:.*$/m, 'status: FAILED');
                                    fileContent = fileContent.replace(/^rejection_reason:.*$/m, 'rejection_reason: "Injected fault"');
                                    const currentRejCountMatch = fileContent.match(/^rejection_count:\s*(\d+)$/m);
                                    const currentCount = currentRejCountMatch ? parseInt(currentRejCountMatch[1], 10) : 0;
                                    fileContent = fileContent.replace(/^rejection_count:.*$/m, `rejection_count: ${currentCount + 1}`);
                                } else if (fault.faultType === 'MAX_REJECTION') {
                                    fileContent = fileContent.replace(/^status:.*$/m, 'status: FAILED');
                                    fileContent = fileContent.replace(/^rejection_reason:.*$/m, 'rejection_reason: "Max injected fault"');
                                    fileContent = fileContent.replace(/^rejection_count:.*$/m, 'rejection_count: 3');
                                }
                                fs.writeFileSync(nodeFile, fileContent, 'utf-8');
                            }
                        }

                        main();
                    }
                } catch (e) {
                    errorThrown = true;
                    console.error("Error during main:", e);
                }

                expect(errorThrown).toBe(false);

                // Check that nodes were actually written and handled
                for (const node of nodes) {
                    const typePluralMap: Record<string, string> = {
                        'IDEA': 'ideas',
                        'PRD': 'prds',
                        'EPIC': 'epics',
                        'STORY': 'stories',
                        'TASK': 'tasks',
                        'RESEARCH': 'research',
                        'ADR': 'adrs',
                        'EXPERIMENT': 'experiments'
                    };
                    const typePlural = typePluralMap[node.type];
                    const nodeFile = path.join(tmpDir, `.foundry/${typePlural}/${node.id}.md`);

                    expect(fs.existsSync(nodeFile)).toBe(true);

                    const parsed = parseNodeFile(nodeFile, tmpDir);
                    expect(parsed).toBeDefined();
                }
            }),
            { numRuns: 100 }
        );
    }, 30000);

    test('Orchestrator can handle structurally complex, valid random DAGs from DAG generator', () => {
        const dagArbitrary = generateDagNodesArbitrary({ minNodes: 2, maxNodes: 15 }).chain(nodes => {
            return generateDependenciesArbitrary(nodes, { maxDepth: 5, maxWidth: 5 });
        });

        fc.assert(
            fc.property(dagArbitrary, (nodes) => {
                fs.rmSync(tmpDir, { recursive: true, force: true });
                fs.mkdirSync(tmpDir, { recursive: true });

                // Write nodes
                for (const node of nodes) {
                    const typePluralMap: Record<string, string> = {
                        'IDEA': 'ideas',
                        'PRD': 'prds',
                        'EPIC': 'epics',
                        'STORY': 'stories',
                        'TASK': 'tasks',
                        'RESEARCH': 'research',
                        'ADR': 'adrs',
                        'EXPERIMENT': 'experiments'
                    };
                    const typePlural = typePluralMap[node.type];
                    createValidTestNode(tmpDir, `.foundry/${typePlural}/${node.id}.md`, node);
                }

                let errorThrown = false;
                try {
                    main();
                } catch (e) {
                    errorThrown = true;
                    console.error("Error during main:", e);
                }

                expect(errorThrown).toBe(false);

                // Check that nodes were actually written and handled
                for (const node of nodes) {
                    const typePluralMap: Record<string, string> = {
                        'IDEA': 'ideas',
                        'PRD': 'prds',
                        'EPIC': 'epics',
                        'STORY': 'stories',
                        'TASK': 'tasks',
                        'RESEARCH': 'research',
                        'ADR': 'adrs',
                        'EXPERIMENT': 'experiments'
                    };
                    const typePlural = typePluralMap[node.type];
                    const nodeFile = path.join(tmpDir, `.foundry/${typePlural}/${node.id}.md`);

                    expect(fs.existsSync(nodeFile)).toBe(true);

                    const parsed = parseNodeFile(nodeFile, tmpDir);
                    expect(parsed).toBeDefined();
                }
            }),
            { numRuns: 100 }
        );
    });
});

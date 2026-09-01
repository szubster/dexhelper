import * as fs from 'node:fs';

const content = fs.readFileSync('.github/scripts/fuzzing-orchestrator-e2e.test.ts', 'utf-8');

const diff = `<<<<<<< SEARCH
    test('Orchestrator can handle structurally complex, valid random DAGs from DAG generator', () => {
=======
    test('Orchestrator state transition simulator applies lifecycle transitions across multiple ticks', () => {
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
                    createValidTestNode(tmpDir, \`.foundry/\${typePlural}/\${node.id}.md\`, node);
                }

                let errorThrown = false;
                try {
                    // Simulate 5 orchestrator ticks
                    for (let i = 0; i < 5; i++) {
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
                    const nodeFile = path.join(tmpDir, \`.foundry/\${typePlural}/\${node.id}.md\`);

                    expect(fs.existsSync(nodeFile)).toBe(true);

                    const parsed = parseNodeFile(nodeFile, tmpDir);
                    expect(parsed).toBeDefined();
                }
            }),
            { numRuns: 100 }
        );
    });

    test('Orchestrator can handle structurally complex, valid random DAGs from DAG generator', () => {
>>>>>>> REPLACE`;

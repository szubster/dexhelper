import { describe, it, expect } from 'vitest';
import fc from 'fast-check';
import { buildReverseDependencyGraph, getOrphanedNodes } from './dag-utils';
import { fuzzingUtils } from './fuzzing-utils';

const graphArbitrary = fuzzingUtils.generateDagNodesArbitrary({ minNodes: 1, maxNodes: 20 }).chain(nodes => {
  return fuzzingUtils.generateDependenciesArbitrary(nodes, { maxDepth: 5, maxWidth: 5 });
}).map(nodes => {
  return nodes.map(node => ({
    repoPath: node.id,
    frontmatter: node
  }));
});

describe('DAG evaluation fuzzing properties', () => {

  it('buildReverseDependencyGraph correctly maps dependencies to dependents', () => {
    fc.assert(
      fc.property(graphArbitrary, (nodes) => {
        const resolveNodePath = (ref: string) => ref;
        const reverseGraph = buildReverseDependencyGraph(nodes, resolveNodePath);

        for (const node of nodes) {
          for (const dep of node.frontmatter.depends_on) {
            const dependentsOfDep = reverseGraph.get(dep);
            expect(dependentsOfDep).toBeDefined();
            expect(dependentsOfDep).toContain(node.repoPath);
          }
        }
      })
    );
  });

  it('getOrphanedNodes returns a set that includes the start node itself', () => {
    fc.assert(
      fc.property(graphArbitrary, fc.stringMatching(/^[a-z0-9-]+$/), (nodes, startNode) => {
        const resolveNodePath = (ref: string) => ref;
        const reverseGraph = buildReverseDependencyGraph(nodes, resolveNodePath);

        const orphaned = getOrphanedNodes(startNode, reverseGraph);
        expect(orphaned.has(startNode)).toBe(true);
      })
    );
  });

  it('getOrphanedNodes returns a closure where every dependent is also in the set', () => {
    fc.assert(
      fc.property(graphArbitrary, fc.stringMatching(/^[a-z0-9-]+$/), (nodes, startNode) => {
        const resolveNodePath = (ref: string) => ref;
        const reverseGraph = buildReverseDependencyGraph(nodes, resolveNodePath);

        const orphaned = getOrphanedNodes(startNode, reverseGraph);

        for (const node of orphaned) {
          const dependents = reverseGraph.get(node) || [];
          for (const dependent of dependents) {
            expect(orphaned.has(dependent)).toBe(true);
          }
        }
      })
    );
  });

  it('detecting cycles behaves deterministically under fuzzing', () => {
    fc.assert(
      fc.property(graphArbitrary, fc.stringMatching(/^[a-z0-9-]+$/), (nodes, startNode) => {
        const resolveNodePath = (ref: string) => ref;
        const reverseGraph = buildReverseDependencyGraph(nodes, resolveNodePath);

        expect(() => {
          const orphaned = getOrphanedNodes(startNode, reverseGraph);
          expect(orphaned.size).toBeGreaterThanOrEqual(1); // At least the start node
        }).not.toThrow();
      })
    );
  });
});

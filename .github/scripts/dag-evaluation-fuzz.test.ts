import { describe, it, expect } from 'vitest';
import fc from 'fast-check';
import { buildReverseDependencyGraph, getOrphanedNodes } from './dag-utils';

// Helper to generate a random DAG (or graph with cycles)
// A node is an object with repoPath (string) and frontmatter.depends_on (string[])
const graphNodeArbitrary = fc.record({
  repoPath: fc.stringMatching(/^[a-z0-9-]+$/),
  frontmatter: fc.record({
    depends_on: fc.array(fc.stringMatching(/^[a-z0-9-]+$/))
  })
});

const graphArbitrary = fc.array(graphNodeArbitrary, { maxLength: 20 });

describe('DAG evaluation fuzzing properties', () => {

  it('buildReverseDependencyGraph correctly maps dependencies to dependents', () => {
    fc.assert(
      fc.property(graphArbitrary, (nodes) => {
        const resolveNodePath = (ref: string) => ref;
        const reverseGraph = buildReverseDependencyGraph(nodes, resolveNodePath);

        // Property 1: If A depends on B, then A must be in the dependents list of B in the reverse graph
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

        // Property: For every node in 'orphaned', all of its dependents must also be in 'orphaned'
        for (const node of orphaned) {
          const dependents = reverseGraph.get(node) || [];
          for (const dependent of dependents) {
            expect(orphaned.has(dependent)).toBe(true);
          }
        }
      })
    );
  });

});

  it('detecting cycles behaves deterministically under fuzzing', () => {
    // A simplified cycle detection check: if we traverse the reverse graph and find our start node again,
    // there's a cycle. But since getOrphanedNodes uses a Set to prevent infinite loops,
    // we just want to assert that getOrphanedNodes NEVER throws an error (e.g. stack overflow)
    // even for highly connected or cyclic graphs.
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

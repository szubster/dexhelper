import { expect, test } from 'vitest';
import fc from 'fast-check';
import { fuzzingUtils } from './fuzzing-utils';
import { NodeFrontmatterSchema } from './schema.ts';

test('fuzzingUtils basic fuzzer works', () => {
  expect(() => fuzzingUtils.basicFuzzer()).not.toThrowError(/Assertion failed/);
});

test('fuzzingUtils.validNodeFrontmatter generates valid schema instances', () => {
  fc.assert(
    fc.property(fuzzingUtils.validNodeFrontmatter, (frontmatter) => {
      expect(() => NodeFrontmatterSchema.parse(frontmatter)).not.toThrow();
    })
  );
});

test('generateDagNodesArbitrary generates arrays of nodes', () => {
  fc.assert(
    fc.property(fuzzingUtils.generateDagNodesArbitrary({ minNodes: 2, maxNodes: 5 }), (nodes: any) => {
      expect(Array.isArray(nodes)).toBe(true);
      expect(nodes.length).toBeGreaterThanOrEqual(2);
      expect(nodes.length).toBeLessThanOrEqual(5);
    })
  );
});

test('generateDagNodesArbitrary generates nodes adhering to NodeFrontmatterSchema', () => {
  fc.assert(
    fc.property(fuzzingUtils.generateDagNodesArbitrary({ minNodes: 1, maxNodes: 5 }), (nodes: any) => {
      for (const node of nodes) {
        expect(() => NodeFrontmatterSchema.parse(node)).not.toThrow();
      }
    })
  );
});

test('generateDagNodesArbitrary generates DAGs with no forward dependencies or self-references', () => {
  fc.assert(
    fc.property(fuzzingUtils.generateDagNodesArbitrary({ minNodes: 3, maxNodes: 8 }), (nodes: any) => {
      const generatedIds = nodes.map((n: any) => n.id);

      nodes.forEach((node: any, index: number) => {
        const allowedDependencies = generatedIds.slice(0, index);

        for (const dep of node.depends_on) {
          expect(allowedDependencies).toContain(dep);
          expect(dep).not.toBe(node.id);
        }
      });
    })
  );
});

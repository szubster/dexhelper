import { describe, it, expect } from 'vitest';
import { detectCycle } from './cycle-detection';
import type { DAGNode, DAGEdge } from '../dag-utils';

describe('cycle-detection algorithm', () => {
  it('should return null when there are no cycles', () => {
    const nodes: DAGNode[] = [
      { id: 'a' },
      { id: 'b' },
      { id: 'c' },
    ];
    const edges: DAGEdge[] = [
      { source: 'a', target: 'b' },
      { source: 'b', target: 'c' },
    ];

    const result = detectCycle(nodes, edges);
    expect(result).toBeNull();
  });

  it('should detect a simple cycle', () => {
    const nodes: DAGNode[] = [
      { id: 'a' },
      { id: 'b' },
      { id: 'c' },
    ];
    const edges: DAGEdge[] = [
      { source: 'a', target: 'b' },
      { source: 'b', target: 'c' },
      { source: 'c', target: 'a' },
    ];

    const result = detectCycle(nodes, edges);
    expect(result).not.toBeNull();
    // It could be a->b->c->a or b->c->a->b depending on start node,
    // but its length should be 4 and first and last element should match.
    expect(result).toHaveLength(4);
    expect(result![0]).toBe(result![3]);
  });

  it('should detect a cycle in a disjoint subgraph', () => {
    const nodes: DAGNode[] = [
      { id: 'a' },
      { id: 'b' }, // disjoint cycle b <-> c
      { id: 'c' },
    ];
    const edges: DAGEdge[] = [
      { source: 'b', target: 'c' },
      { source: 'c', target: 'b' },
    ];

    const result = detectCycle(nodes, edges);
    expect(result).not.toBeNull();
    expect(result).toHaveLength(3);
    expect(result![0]).toBe(result![2]);
  });

  it('should handle undefined references / missing nodes gracefully', () => {
    const nodes: DAGNode[] = [
      { id: 'a' },
    ];
    // Edge points to node 'b' which is not in the nodes array
    const edges: DAGEdge[] = [
      { source: 'a', target: 'b' },
      // Edge from unknown node to unknown node
      { source: 'c', target: 'd' },
    ];

    const result = detectCycle(nodes, edges);
    expect(result).toBeNull();
  });

  it('should detect self-loops', () => {
    const nodes: DAGNode[] = [
      { id: 'a' },
    ];
    const edges: DAGEdge[] = [
      { source: 'a', target: 'a' },
    ];

    const result = detectCycle(nodes, edges);
    expect(result).toEqual(['a', 'a']);
  });
});

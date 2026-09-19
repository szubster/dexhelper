import { describe, it, expect } from 'vitest';
import { filterArchivalNodes } from './archival-filtering.ts';
import { type NodeFrontmatter } from './schema.ts';

function createNode(overrides: Partial<NodeFrontmatter>): NodeFrontmatter {
  return {
    id: 'test-node',
    type: 'TASK',
    title: 'Test Node',
    status: 'COMPLETED',
    owner_persona: 'coder',
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z',
    depends_on: [],
    rejection_reason: '',
    locks: [],
    ...overrides,
  } as NodeFrontmatter;
}

describe('filterArchivalNodes', () => {
  const referenceDate = new Date('2023-04-02T00:00:00Z'); // Approx 91 days after Jan 1, 2023

  it('correctly parses node age from file frontmatter (updated_at)', () => {
    const oldNode = createNode({ updated_at: '2023-01-01T00:00:00Z' }); // 91 days
    const recentNode = createNode({ updated_at: '2023-04-01T00:00:00Z' }); // 1 day

    const result = filterArchivalNodes([oldNode, recentNode], referenceDate);

    expect(result).toHaveLength(1);
    expect(result[0]).toBe(oldNode);
  });

  it('identifies transient nodes exceeding the 90-day threshold', () => {
    const transientTypes = ['TASK', 'STORY', 'EPIC', 'IDEA'] as const;
    const oldNodes = transientTypes.map(type =>
      createNode({ type, updated_at: '2022-12-01T00:00:00Z' }) // > 90 days
    );
    const recentNodes = transientTypes.map(type =>
      createNode({ type, updated_at: '2023-03-15T00:00:00Z' }) // < 90 days
    );

    const result = filterArchivalNodes([...oldNodes, ...recentNodes], referenceDate);

    expect(result).toHaveLength(4);
    oldNodes.forEach(node => {
      expect(result).toContainEqual(node);
    });
  });

  it('verifies that high-value records are permanently retained', () => {
    const highValueTypes = ['ADR', 'PRD', 'RESEARCH'] as const;
    const oldHighValueNodes = highValueTypes.map(type =>
      createNode({ type, updated_at: '2020-01-01T00:00:00Z' }) // Very old
    );

    const result = filterArchivalNodes(oldHighValueNodes, referenceDate);

    // High value records should be retained, meaning they are NOT returned in the archival list
    expect(result).toHaveLength(0);
  });
});

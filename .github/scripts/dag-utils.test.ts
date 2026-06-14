import { describe, it, expect } from 'vitest';
import { todayISO, buildReverseDependencyGraph, getOrphanedNodes } from './dag-utils';

describe('dag-utils', () => {
  it('todayISO format', () => {
    const iso = todayISO();
    expect(iso).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it('buildReverseDependencyGraph', () => {
    const nodes = [
      { repoPath: 'a', frontmatter: { depends_on: [] } },
      { repoPath: 'b', frontmatter: { depends_on: ['a'] } },
      { repoPath: 'c', frontmatter: { depends_on: ['a'] } },
      { repoPath: 'd', frontmatter: { depends_on: ['b'] } },
    ];

    const resolveNodePath = (ref: string) => ref;

    const graph = buildReverseDependencyGraph(nodes, resolveNodePath);
    expect(graph.get('a')).toEqual(['b', 'c']);
    expect(graph.get('b')).toEqual(['d']);
  });

  it('buildReverseDependencyGraph - empty graph', () => {
    const graph = buildReverseDependencyGraph([], () => null);
    expect(graph.size).toBe(0);
  });

  it('buildReverseDependencyGraph - missing dependencies & undefined depends_on', () => {
    const nodes = [
      { repoPath: 'a', frontmatter: { depends_on: ['missing', 'resolved'] } },
      { repoPath: 'b', frontmatter: {} }, // no depends_on
    ];

    const resolveNodePath = (ref: string) => (ref === 'resolved' ? 'resolved_path' : null);

    const graph = buildReverseDependencyGraph(nodes, resolveNodePath);
    expect(graph.get('resolved_path')).toEqual(['a']);
    expect(graph.get('missing')).toBeUndefined();
    expect(graph.size).toBe(1);
  });

  it('getOrphanedNodes', () => {
    const graph = new Map([
      ['a', ['b', 'c']],
      ['b', ['d']],
    ]);

    const orphaned = getOrphanedNodes('a', graph);
    expect(orphaned.has('a')).toBe(true);
    expect(orphaned.has('b')).toBe(true);
    expect(orphaned.has('c')).toBe(true);
    expect(orphaned.has('d')).toBe(true);

    const orphanedB = getOrphanedNodes('b', graph);
    expect(orphanedB.has('b')).toBe(true);
    expect(orphanedB.has('d')).toBe(true);
    expect(orphanedB.has('a')).toBe(false);
  });

  it('getOrphanedNodes - node with no dependents', () => {
    const graph = new Map([
      ['a', []]
    ]);
    const orphaned = getOrphanedNodes('a', graph);
    expect(orphaned.has('a')).toBe(true);
    expect(orphaned.size).toBe(1);
  });

  it('getOrphanedNodes - cycle/diamond dependency graph', () => {
    const graph = new Map([
      ['a', ['b', 'c']],
      ['b', ['d']],
      ['c', ['d']],
      ['d', ['a']], // Cycle back to 'a'
    ]);

    const orphaned = getOrphanedNodes('a', graph);
    expect(orphaned.has('a')).toBe(true);
    expect(orphaned.has('b')).toBe(true);
    expect(orphaned.has('c')).toBe(true);
    expect(orphaned.has('d')).toBe(true);
    expect(orphaned.size).toBe(4); // Ensure it didn't infinite loop and found all 4
  });
});

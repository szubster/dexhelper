import { describe, expect, it, vi, beforeEach } from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';
import {
  todayISO,
  logToJournal,
  buildReverseDependencyGraph,
  getOrphanedNodes
} from './dag-utils.ts';

vi.mock('node:fs', () => ({
  existsSync: vi.fn<() => boolean>(),
  mkdirSync: vi.fn<() => void>(),
  appendFileSync: vi.fn<() => void>(),
}));

describe('dag-utils', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('todayISO', () => {
    it('returns the current date in YYYY-MM-DD format', () => {
      const iso = todayISO();
      expect(iso).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });
  });

  describe('logToJournal', () => {
    it('creates directory and appends log entry', () => {
      vi.mocked(fs.existsSync).mockReturnValue(false);
      logToJournal('/repo', 'test entry');

      expect(fs.mkdirSync).toHaveBeenCalledWith(path.join('/repo', '.foundry', 'journals'), { recursive: true });
      expect(fs.appendFileSync).toHaveBeenCalledWith(path.join('/repo', '.foundry', 'journals', 'tpm.md'), 'test entry', 'utf-8');
    });

    it('appends log entry without creating directory if it exists', () => {
      vi.mocked(fs.existsSync).mockReturnValue(true);
      logToJournal('/repo', 'test entry');

      expect(fs.mkdirSync).not.toHaveBeenCalled();
      expect(fs.appendFileSync).toHaveBeenCalledWith(path.join('/repo', '.foundry', 'journals', 'tpm.md'), 'test entry', 'utf-8');
    });
  });

  describe('buildReverseDependencyGraph', () => {
    it('correctly maps dependencies to dependents', () => {
      const nodes = [
        { repoPath: 'a.md', frontmatter: { depends_on: ['b.md'] } },
        { repoPath: 'b.md', frontmatter: { depends_on: ['c.md'] } },
        { repoPath: 'c.md', frontmatter: { depends_on: [] } },
        { repoPath: 'd.md', frontmatter: { depends_on: ['b.md'] } }
      ];
      const resolveNodePath = (dep: string) => dep;

      const graph = buildReverseDependencyGraph(nodes, resolveNodePath);

      expect(graph.get('b.md')).toEqual(['a.md', 'd.md']);
      expect(graph.get('c.md')).toEqual(['b.md']);
      expect(graph.get('a.md')).toBeUndefined();
    });

    it('ignores unresolvable dependencies', () => {
       const nodes = [
        { repoPath: 'a.md', frontmatter: { depends_on: ['b.md'] } }
      ];
      const resolveNodePath = (_dep: string) => null;

      const graph = buildReverseDependencyGraph(nodes, resolveNodePath);

      expect(graph.size).toBe(0);
    });
  });

  describe('getOrphanedNodes', () => {
    it('traverses the reverse graph to find all orphaned nodes', () => {
      const reverseGraph = new Map([
        ['start.md', ['child1.md', 'child2.md']],
        ['child1.md', ['grandchild1.md']],
        ['child2.md', []],
        ['grandchild1.md', []],
        ['unrelated.md', ['child_unrelated.md']]
      ]);

      const orphaned = getOrphanedNodes('start.md', reverseGraph);

      expect(orphaned).toEqual(new Set(['child1.md', 'child2.md', 'grandchild1.md']));
    });

    it('handles cycles in the dependency graph', () => {
      const reverseGraph = new Map([
        ['start.md', ['node_a.md']],
        ['node_a.md', ['node_b.md']],
        ['node_b.md', ['node_a.md', 'node_c.md']],
        ['node_c.md', []]
      ]);

      const orphaned = getOrphanedNodes('start.md', reverseGraph);

      expect(orphaned).toEqual(new Set(['node_a.md', 'node_b.md', 'node_c.md']));
    });
  });
});

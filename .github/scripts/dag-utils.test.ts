import { describe, it, expect } from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as os from 'node:os';
import { todayISO, buildReverseDependencyGraph, getOrphanedNodes, updateActiveSessionsTable } from './dag-utils';

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

  describe('updateActiveSessionsTable', () => {
    it('creates ACTIVE_SESSIONS.md with no active sessions when .foundry has no active nodes', () => {
      const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'active-table-test-'));
      const foundryDir = path.join(tmpDir, '.foundry', 'tasks');
      fs.mkdirSync(foundryDir, { recursive: true });

      fs.writeFileSync(
        path.join(foundryDir, 'task-001.md'),
        '---\nid: task-001\ntype: TASK\ntitle: Ready Task\nstatus: READY\nowner_persona: coder\n---\nBody content',
        'utf-8'
      );

      updateActiveSessionsTable(tmpDir);

      const activeSessionsFile = path.join(tmpDir, 'ACTIVE_SESSIONS.md');
      expect(fs.existsSync(activeSessionsFile)).toBe(true);

      const content = fs.readFileSync(activeSessionsFile, 'utf-8');
      expect(content).toContain('# Active Jules Sessions');
      expect(content).toContain('*No active Jules sessions at this time.*');

      fs.rmSync(tmpDir, { recursive: true, force: true });
    });

    it('creates ACTIVE_SESSIONS.md table with active nodes formatted correctly', () => {
      const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'active-table-test-'));
      const tasksDir = path.join(tmpDir, '.foundry', 'tasks');
      fs.mkdirSync(tasksDir, { recursive: true });

      fs.writeFileSync(
        path.join(tasksDir, 'task-001.md'),
        '---\nid: task-001\ntype: TASK\ntitle: Active Coder Task\nstatus: ACTIVE\nowner_persona: coder\njules_session_id: "sessions/10384429029607810899"\n---\nBody content',
        'utf-8'
      );

      fs.writeFileSync(
        path.join(tasksDir, 'task-002.md'),
        '---\nid: task-002\ntype: TASK\ntitle: Active Human Task\nstatus: ACTIVE\nowner_persona: human\njules_session_id: null\n---\nBody content',
        'utf-8'
      );

      updateActiveSessionsTable(tmpDir);

      const activeSessionsFile = path.join(tmpDir, 'ACTIVE_SESSIONS.md');
      expect(fs.existsSync(activeSessionsFile)).toBe(true);

      const content = fs.readFileSync(activeSessionsFile, 'utf-8');
      expect(content).toContain('# Active Jules Sessions');
      expect(content).toContain('| Node ID | Type | Title | Persona | Session Link |');
      expect(content).toContain('| [task-001](.foundry/tasks/task-001.md) | TASK | Active Coder Task | coder | [10384429029607810899](https://jules.google.com/session/10384429029607810899) |');
      expect(content).toContain('| [task-002](.foundry/tasks/task-002.md) | TASK | Active Human Task | human | - |');

      fs.rmSync(tmpDir, { recursive: true, force: true });
    });
  });
});

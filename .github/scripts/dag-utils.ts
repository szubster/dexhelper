
import * as fs from 'node:fs';

export function todayISO(): string {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

export function buildReverseDependencyGraph(nodes: any[], resolveNodePath: (ref: string) => string | null): Map<string, string[]> {
  const dependents = new Map<string, string[]>();
  for (const n of nodes) {
    const deps = (n.frontmatter.depends_on || []).map(resolveNodePath).filter(Boolean) as string[];
    for (const d of deps) {
      if (!dependents.has(d)) {
        dependents.set(d, []);
      }
      dependents.get(d)!.push(n.repoPath);
    }
  }
  return dependents;
}

export function getOrphanedNodes(startNodePath: string, dependents: Map<string, string[]>): Set<string> {
  const visited = new Set<string>();
  const queue = [startNodePath];
  visited.add(startNodePath);

  while (queue.length > 0) {
    const currentPath = queue.shift()!;
    const currentDependents = dependents.get(currentPath) || [];

    for (const depPath of currentDependents) {
      if (!visited.has(depPath)) {
        visited.add(depPath);
        queue.push(depPath);
      }
    }
  }
  return visited;
}

export function logToJournal(logPath: string, logEntry: string): void {
  let entry = logEntry;
  if (!entry.endsWith('\n')) {
    entry += '\n';
  }
  fs.appendFileSync(logPath, entry, 'utf-8');
}

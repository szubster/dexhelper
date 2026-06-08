import * as fs from 'node:fs';
import * as path from 'node:path';

/** Returns today's date in ISO-8601 YYYY-MM-DD format (local time). */
export function todayISO(): string {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

/** Appends a log entry to the TPM journal. */
export function logToJournal(repoRoot: string, entry: string): void {
  const journalDir = path.join(repoRoot, '.foundry', 'journals');
  if (!fs.existsSync(journalDir)) fs.mkdirSync(journalDir, { recursive: true });
  fs.appendFileSync(path.join(journalDir, 'tpm.md'), entry, 'utf-8');
}

/**
 * Builds a reverse dependency graph from a list of nodes.
 * @param nodes Array of nodes with frontmatter.depends_on and repoPath.
 * @param resolveNodePath Function to resolve a dependency path to a canonical repoPath.
 * @returns A Map where keys are repoPaths and values are arrays of dependent repoPaths.
 */
export function buildReverseDependencyGraph(
  nodes: { frontmatter: { depends_on?: string[] }; repoPath: string }[],
  resolveNodePath: (dep: string) => string | null
): Map<string, string[]> {
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

/**
 * Traverses the reverse dependency graph to find all orphaned nodes (dependents)
 * starting from a specific node path.
 * @param startNodePath The repoPath of the node to start traversing from.
 * @param reverseGraph The reverse dependency graph built by buildReverseDependencyGraph.
 * @returns A Set containing the repoPaths of all orphaned dependent nodes.
 */
export function getOrphanedNodes(startNodePath: string, reverseGraph: Map<string, string[]>): Set<string> {
  const orphanedNodes = new Set<string>();
  const visited = new Set<string>();
  const queue = [startNodePath];
  visited.add(startNodePath);

  while (queue.length > 0) {
    const currentPath = queue.shift()!;
    const currentDependents = reverseGraph.get(currentPath) || [];

    for (const depPath of currentDependents) {
      if (!visited.has(depPath)) {
        visited.add(depPath);
        queue.push(depPath);
        orphanedNodes.add(depPath);
      }
    }
  }

  return orphanedNodes;
}

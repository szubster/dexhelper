
import * as fs from 'node:fs';
import * as path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const matter = require('gray-matter') as typeof import('gray-matter');

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

export function updateActiveSessionsTable(repoRoot: string): void {
  const foundryDir = path.join(repoRoot, '.foundry');
  const activeNodes: Array<{
    id: string;
    type: string;
    title: string;
    owner_persona: string;
    repoPath: string;
    sessionId: string | null;
  }> = [];

  function walk(current: string): void {
    let entries: fs.Dirent[];
    try {
      entries = fs.readdirSync(current, { withFileTypes: true });
    } catch {
      return;
    }

    for (const entry of entries) {
      const fullPath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        if (entry.name === 'journals' || entry.name === 'fixtures' || entry.name === 'archive') continue;
        if (entry.name === 'docs') {
          const adrsPath = path.join(fullPath, 'adrs');
          if (fs.existsSync(adrsPath)) walk(adrsPath);
          continue;
        }
        walk(fullPath);
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        try {
          const raw = fs.readFileSync(fullPath, 'utf-8');
          const parsed = matter(raw);
          if (parsed.data && parsed.data.status === 'ACTIVE') {
            const repoPath = path.relative(repoRoot, fullPath).replace(/\\/g, '/');
            const rawSessionId = parsed.data.jules_session_id;
            let sessionId: string | null = null;
            if (typeof rawSessionId === 'string') {
              const trimmed = rawSessionId.trim();
              if (trimmed && trimmed !== 'null' && trimmed !== 'undefined') {
                sessionId = trimmed.replace(/^sessions\//, '');
              }
            }
            activeNodes.push({
              id: parsed.data.id || path.basename(entry.name, '.md'),
              type: parsed.data.type || 'TASK',
              title: parsed.data.title || 'Untitled',
              owner_persona: parsed.data.owner_persona || 'unknown',
              repoPath,
              sessionId,
            });
          }
        } catch {
          // ignore malformed files
        }
      }
    }
  }

  if (fs.existsSync(foundryDir)) {
    walk(foundryDir);
  }

  // Sort active nodes deterministically by type then ID
  activeNodes.sort((a, b) => a.id.localeCompare(b.id));

  let markdown = '# Active Jules Sessions\n\n';

  if (activeNodes.length === 0) {
    markdown += '*No active Jules sessions at this time.*\n';
  } else {
    markdown += '| Node ID | Type | Title | Persona | Session Link |\n';
    markdown += '| --- | --- | --- | --- | --- |\n';
    for (const node of activeNodes) {
      const nodeLink = `[${node.id}](${node.repoPath})`;
      const sessionLink = node.sessionId
        ? `[${node.sessionId}](https://jules.google.com/session/${node.sessionId})`
        : '-';
      markdown += `| ${nodeLink} | ${node.type} | ${node.title} | ${node.owner_persona} | ${sessionLink} |\n`;
    }
  }

  const outputPath = path.join(repoRoot, 'ACTIVE_SESSIONS.md');
  fs.writeFileSync(outputPath, markdown, 'utf-8');
}

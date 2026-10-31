import * as fs from 'node:fs';
import * as path from 'node:path';
import { createRequire } from 'node:module';
import type { NodeData } from './types.ts';

interface GrayMatter {
  (str: string): { data: Record<string, any>; content: string };
  stringify: (str: string, data: Record<string, any>) => string;
}

const require = createRequire(import.meta.url);
const matter = require('gray-matter') as GrayMatter;

export function todayISO(): string {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

/**
 * Recursively discovers all node Markdown files under .foundry/
 */
export function discoverNodeFiles(foundryDir: string): string[] {
  const results: string[] = [];
  if (!fs.existsSync(foundryDir)) return results;

  function walk(current: string): void {
    let entries: fs.Dirent[] = [];
    try {
      entries = fs.readdirSync(current, { withFileTypes: true });
    } catch {
      return;
    }

    for (const entry of entries) {
      const fullPath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        if (
          entry.name === 'journals' ||
          entry.name === 'fixtures' ||
          entry.name === 'archive' ||
          entry.name === 'node_modules' ||
          entry.name === '.git'
        ) {
          continue;
        }
        if (entry.name === 'docs') {
          const adrsPath = path.join(fullPath, 'adrs');
          if (fs.existsSync(adrsPath)) walk(adrsPath);
          continue;
        }
        walk(fullPath);
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        results.push(fullPath);
      }
    }
  }

  walk(foundryDir);
  return results.sort();
}

/**
 * Parses a node Markdown file.
 */
export function parseNodeFile(filePath: string, repoRoot: string): NodeData | null {
  try {
    const rawContent = fs.readFileSync(filePath, 'utf-8');
    const parsed = matter(rawContent);
    const data = parsed.data || {};

    const fileName = path.basename(filePath, '.md');
    const id = typeof data['id'] === 'string' ? data['id'] : fileName;
    const type = typeof data['type'] === 'string' ? data['type'] : 'TASK';
    const title = typeof data['title'] === 'string' ? data['title'] : 'Untitled';
    const status = typeof data['status'] === 'string' ? data['status'] : 'PENDING';
    const owner_persona = typeof data['owner_persona'] === 'string' ? data['owner_persona'] : 'unknown';

    const rawSessionId = data['jules_session_id'];
    let jules_session_id: string | null = null;
    if (rawSessionId !== null && rawSessionId !== undefined) {
      const trimmed = String(rawSessionId).trim();
      if (trimmed && trimmed !== 'null' && trimmed !== 'undefined') {
        jules_session_id = trimmed.replace(/^sessions\//, '');
      }
    }

    const pr_number = typeof data['pr_number'] === 'number' ? data['pr_number'] : undefined;
    const rejection_count = typeof data['rejection_count'] === 'number' ? data['rejection_count'] : 0;
    const rejection_reason = typeof data['rejection_reason'] === 'string' ? data['rejection_reason'] : undefined;

    const repoPath = path.relative(repoRoot, filePath).replace(/\\/g, '/');

    return {
      id,
      type,
      title,
      status,
      owner_persona,
      jules_session_id,
      pr_number,
      rejection_count,
      rejection_reason,
      filePath,
      repoPath,
      rawContent,
      frontmatter: data,
      body: parsed.content,
    };
  } catch {
    return null;
  }
}

/**
 * Scans all nodes in the repository.
 */
export function scanAllNodes(repoRoot: string): NodeData[] {
  const foundryDir = path.join(repoRoot, '.foundry');
  const files = discoverNodeFiles(foundryDir);
  const nodes: NodeData[] = [];
  for (const file of files) {
    const node = parseNodeFile(file, repoRoot);
    if (node) nodes.push(node);
  }
  return nodes;
}

/**
 * Finds a node by its ID or repo-relative path.
 */
export function findNodeById(idOrPath: string, repoRoot: string): NodeData | null {
  const cleanId = idOrPath.replace(/\.md$/, '').replace(/^.*[/\\]/, '');

  // First check if directly a file path
  const directPath = path.resolve(repoRoot, idOrPath);
  if (fs.existsSync(directPath) && fs.statSync(directPath).isFile()) {
    return parseNodeFile(directPath, repoRoot);
  }

  const nodes = scanAllNodes(repoRoot);
  return nodes.find((n) => n.id === cleanId || n.repoPath === idOrPath) || null;
}

/**
 * Scans for READY nodes eligible for dispatch.
 */
export function scanReadyNodes(repoRoot: string): NodeData[] {
  const nodes = scanAllNodes(repoRoot);
  return nodes
    .filter((n) => n.status === 'READY')
    .sort((a, b) => a.id.localeCompare(b.id));
}

/**
 * Scans for ACTIVE nodes.
 */
export function scanActiveNodes(repoRoot: string): NodeData[] {
  const nodes = scanAllNodes(repoRoot);
  return nodes
    .filter((n) => n.status === 'ACTIVE')
    .sort((a, b) => a.id.localeCompare(b.id));
}

/**
 * Transitions a node to ACTIVE status and sets session ID.
 */
export function transitionNodeToActive(
  node: NodeData,
  sessionId: string,
  repoRoot: string
): void {
  const raw = fs.readFileSync(node.filePath, 'utf-8');
  const parsed = matter(raw);
  const dateStr = todayISO();

  parsed.data['status'] = 'ACTIVE';
  parsed.data['jules_session_id'] = sessionId;
  parsed.data['updated_at'] = dateStr;
  parsed.data['rejection_reason'] = '';

  const newContent = matter.stringify(parsed.content, parsed.data);
  fs.writeFileSync(node.filePath, newContent, 'utf-8');
  updateActiveSessionsTable(repoRoot);
}

/**
 * Transitions a node to COMPLETED status and records PR number.
 */
export function transitionNodeToCompleted(
  node: NodeData,
  prNumber: number | undefined,
  repoRoot: string
): void {
  const raw = fs.readFileSync(node.filePath, 'utf-8');
  const parsed = matter(raw);
  const dateStr = todayISO();

  parsed.data['status'] = 'COMPLETED';
  parsed.data['completed_at'] = dateStr;
  parsed.data['updated_at'] = dateStr;
  if (prNumber !== undefined) {
    parsed.data['pr_number'] = prNumber;
  }

  const newContent = matter.stringify(parsed.content, parsed.data);
  fs.writeFileSync(node.filePath, newContent, 'utf-8');
  updateActiveSessionsTable(repoRoot);
}

/**
 * Transitions a node back to READY (with rejection/closed PR reason).
 */
export function transitionNodeToReady(
  node: NodeData,
  reason: string,
  repoRoot: string
): { status: 'READY' | 'FAILED'; rejectionCount: number } {
  const raw = fs.readFileSync(node.filePath, 'utf-8');
  const parsed = matter(raw);
  const dateStr = todayISO();

  const currentCount = typeof parsed.data['rejection_count'] === 'number' ? parsed.data['rejection_count'] : 0;
  const newCount = currentCount + 1;
  parsed.data['updated_at'] = dateStr;
  parsed.data['rejection_count'] = newCount;
  parsed.data['jules_session_id'] = null;

  let newStatus: 'READY' | 'FAILED' = 'READY';
  if (newCount >= 3) {
    newStatus = 'FAILED';
    parsed.data['status'] = 'FAILED';
    parsed.data['rejection_reason'] = 'Max rejection count reached';
  } else {
    parsed.data['status'] = 'READY';
    parsed.data['rejection_reason'] = reason;
  }

  const newContent = matter.stringify(parsed.content, parsed.data);
  fs.writeFileSync(node.filePath, newContent, 'utf-8');
  updateActiveSessionsTable(repoRoot);
  return { status: newStatus, rejectionCount: newCount };
}

/**
 * Links a PR number to an active node without changing status.
 */
export function linkPRToNode(node: NodeData, prNumber: number, repoRoot: string): void {
  const raw = fs.readFileSync(node.filePath, 'utf-8');
  const parsed = matter(raw);
  parsed.data['pr_number'] = prNumber;
  parsed.data['updated_at'] = todayISO();
  fs.writeFileSync(node.filePath, matter.stringify(parsed.content, parsed.data), 'utf-8');
  updateActiveSessionsTable(repoRoot);
}

/**
 * Assigns a node to a specified persona and sets agy-<persona>-<timestamp> session ID.
 */
export function assignNodeToPersona(
  node: NodeData,
  persona: string = 'human',
  repoRoot: string
): { sessionId: string } {
  const sessionId = `agy-${persona}-${Date.now()}`;
  const raw = fs.readFileSync(node.filePath, 'utf-8');
  const parsed = matter(raw);
  const dateStr = todayISO();

  parsed.data['owner_persona'] = persona;
  parsed.data['status'] = 'ACTIVE';
  parsed.data['jules_session_id'] = sessionId;
  parsed.data['updated_at'] = dateStr;
  parsed.data['rejection_reason'] = '';

  const newContent = matter.stringify(parsed.content, parsed.data);
  fs.writeFileSync(node.filePath, newContent, 'utf-8');
  updateActiveSessionsTable(repoRoot);
  return { sessionId };
}

/**
 * Assigns a node to human and sets agy-human-<timestamp> session ID.
 */
export function assignNodeToHuman(node: NodeData, repoRoot: string): { sessionId: string } {
  return assignNodeToPersona(node, 'human', repoRoot);
}

/**
 * Re-generates ACTIVE_SESSIONS.md with all currently ACTIVE nodes.
 */
export function updateActiveSessionsTable(repoRoot: string): void {
  const activeNodes = scanActiveNodes(repoRoot);

  let markdown = '# Active Jules & Antigravity Sessions\n\n';

  if (activeNodes.length === 0) {
    markdown += '*No active sessions at this time.*\n';
  } else {
    markdown += '| Node ID | Type | Title | Persona | Session Link |\n';
    markdown += '| --- | --- | --- | --- | --- |\n';
    for (const node of activeNodes) {
      const nodeLink = `[${node.id}](${node.repoPath})`;
      let sessionLink = '-';
      if (node.jules_session_id) {
        if (node.jules_session_id.startsWith('agy-')) {
          sessionLink = `Antigravity (\`${node.jules_session_id}\`)`;
        } else {
          sessionLink = `[${node.jules_session_id}](https://jules.google.com/session/${node.jules_session_id})`;
        }
      }
      markdown += `| ${nodeLink} | ${node.type} | ${node.title} | ${node.owner_persona} | ${sessionLink} |\n`;
    }
  }

  const outputPath = path.join(repoRoot, 'ACTIVE_SESSIONS.md');
  fs.writeFileSync(outputPath, markdown, 'utf-8');
}

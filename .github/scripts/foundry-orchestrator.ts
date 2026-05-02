/**
 * foundry-orchestrator.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * The Foundry DAG Orchestrator
 */

import * as fs from 'node:fs';
import * as path from 'node:path';
import { createRequire } from 'node:module';

// gray-matter is CJS; import via require() for clean ESM interop.
const require = createRequire(import.meta.url);
const matter = require('gray-matter') as typeof import('gray-matter');

/** Regex to strip frontmatter from markdown content for body analysis. */
const FM_STRIP_REGEX = /^---[ \t]*\r?\n[\s\S]*?\r?\n---[ \t]*(?:\r?\n|$)/;

// ─── Types ────────────────────────────────────────────────────────────────────

const VALID_STATUSES = [
  'PENDING',
  'READY',
  'ACTIVE',
  'COMPLETED',
  'FAILED',
  'BLOCKED',
  'CANCELLED',
] as const;

type Status = (typeof VALID_STATUSES)[number];

const VALID_TYPES = ['IDEA', 'PRD', 'EPIC', 'STORY', 'TASK'] as const;
type NodeType = (typeof VALID_TYPES)[number];

/** Mirrors the YAML frontmatter schema defined in .foundry/docs/schema.md §3 */
export interface FoundryFrontmatter {
  id: string;
  type: NodeType;
  title: string;
  status: Status;
  owner_persona: string;
  created_at: string;
  updated_at: string;
  depends_on: string[];
  jules_session_id: string | null;
  parent?: string | null;
  tags?: string[];
  rejection_count?: number;
  rejection_reason?: string;
  pr_number?: number;
  notes?: string;
}

interface ParsedNode {
  filePath: string;
  repoPath: string;
  frontmatter: FoundryFrontmatter;
  rawContent: string;
}

const REQUIRED_FIELDS: ReadonlyArray<keyof FoundryFrontmatter> = [
  'id',
  'type',
  'title',
  'status',
  'owner_persona',
  'created_at',
  'updated_at',
  'depends_on',
  'jules_session_id',
];

const DRY_RUN: boolean = process.argv.includes('--dry-run');
const STRICT: boolean = process.argv.includes('--strict');

function warn(msg: string): void {
  process.stderr.write(`[orchestrator] WARN  ${msg}\n`);
}

function info(msg: string): void {
  process.stderr.write(`[orchestrator] INFO  ${msg}\n`);
}

function todayISO(): string {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

// ─── Phase 1: DISCOVER ───────────────────────────────────────────────────────

function discoverNodeFiles(dir: string): string[] {
  const results: string[] = [];
  function walk(current: string): void {
    let entries: fs.Dirent[];
    try { entries = fs.readdirSync(current, { withFileTypes: true }); }
    catch { warn(`Cannot read directory: ${current}`); return; }
    for (const entry of entries) {
      const fullPath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        if (entry.name === 'journals' || entry.name === 'docs') continue;
        walk(fullPath);
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        results.push(fullPath);
      }
    }
  }
  walk(dir);
  return results;
}

// ─── Phase 2: PARSE ──────────────────────────────────────────────────────────

function parseNodeFile(filePath: string, repoRoot: string): ParsedNode | null {
  const repoPath = path.relative(repoRoot, filePath).replace(/\\/g, '/');
  let rawContent: string;
  try { rawContent = fs.readFileSync(filePath, 'utf-8'); }
  catch { warn(`Cannot read file: ${repoPath}`); return null; }
  let parsed: any;
  try { parsed = matter(rawContent); }
  catch { warn(`Malformed YAML frontmatter in: ${repoPath}`); return null; }
  const fm = parsed.data as Partial<FoundryFrontmatter>;
  if (Object.keys(fm).length === 0) { warn(`No YAML frontmatter found in: ${repoPath}`); return null; }
  for (const field of REQUIRED_FIELDS) { if (fm[field] === undefined) { warn(`Missing required field '${field}' in: ${repoPath}`); return null; } }
  if (!VALID_STATUSES.includes(fm.status as Status)) { warn(`Invalid status '${String(fm.status)}' in: ${repoPath}`); return null; }
  if (!VALID_TYPES.includes(fm.type as NodeType)) { warn(`Invalid type '${String(fm.type)}' in: ${repoPath}`); return null; }
  if (!Array.isArray(fm.depends_on)) { warn(`'depends_on' is not an array in: ${repoPath}`); return null; }
  if (typeof fm.owner_persona !== 'string' || fm.owner_persona.includes(',')) { warn(`Multiple owner_personas detected in: ${repoPath}`); return null; }
  return { filePath, repoPath, frontmatter: fm as FoundryFrontmatter, rawContent };
}

// ─── Phase 5: PROMOTE ────────────────────────────────────────────────────────

function promoteNodeStatus(node: ParsedNode, currentStatus: Status, targetStatus: Status): void {
  const dateStr = todayISO();
  const dryTag = DRY_RUN ? '[DRY-RUN] ' : '';
  const fmBlockMatch = node.rawContent.match(/^---[ \t]*\r?\n([\s\S]*?)\r?\n---[ \t]*/m);
  if (!fmBlockMatch) { warn(`${dryTag}Cannot locate frontmatter delimiters for mutation in: ${node.repoPath}`); return; }
  const originalFmBlock = fmBlockMatch[0];
  let mutatedFmBlock = originalFmBlock;
  mutatedFmBlock = mutatedFmBlock.replace(new RegExp(`^(status:\\s*)(["']?)${currentStatus}\\2([ \\t\\r]*)$`, 'm'), `$1$2${targetStatus}$2$3`);
  if (mutatedFmBlock === originalFmBlock) { warn(`${dryTag}Could not find 'status: ${currentStatus}' line to replace in: ${node.repoPath}`); return; }
  mutatedFmBlock = mutatedFmBlock.replace(/^(updated_at:\s*)["']?\d{4}-\d{2}-\d{2}["']?([ \t\r]*)$/m, `$1"${dateStr}"$2`);
  const newContent = node.rawContent.replace(originalFmBlock, mutatedFmBlock);
  if (!DRY_RUN) { try { fs.writeFileSync(node.filePath, newContent, 'utf-8'); } catch (e) { warn(`Failed to write file: ${node.repoPath} — ${String(e)}`); return; } }
  node.frontmatter.status = targetStatus;
  node.frontmatter.updated_at = dateStr;
  node.rawContent = newContent;
  info(`${dryTag}Promoted ${currentStatus} → ${targetStatus}: ${node.repoPath}`);
}

function promoteNodeToTpm(node: ParsedNode): void {
  const dateStr = todayISO();
  const dryTag = DRY_RUN ? '[DRY-RUN] ' : '';
  const fmBlockMatch = node.rawContent.match(/^---[ \t]*\r?\n([\s\S]*?)\r?\n---[ \t]*/m);
  if (!fmBlockMatch) { warn(`${dryTag}Cannot locate frontmatter delimiters for mutation in: ${node.repoPath}`); return; }
  const originalFmBlock = fmBlockMatch[0];
  let mutatedFmBlock = originalFmBlock;
  mutatedFmBlock = mutatedFmBlock.replace(/^(status:\\s*)(["']?)[^"'\r\n]+?\\2([ \\t\\r]*)$/m, `$1$2BLOCKED$2$3`);
  mutatedFmBlock = mutatedFmBlock.replace(/^(owner_persona:\\s*)(["']?)[^"'\r\n]+?\\2([ \\t\\r]*)$/m, `$1$2tpm$2$3`);
  mutatedFmBlock = mutatedFmBlock.replace(/^(updated_at:\s*)["']?\d{4}-\d{2}-\d{2}["']?([ \t\r]*)$/m, `$1"${dateStr}"$2`);
  const newContent = node.rawContent.replace(originalFmBlock, mutatedFmBlock);
  if (!DRY_RUN) { try { fs.writeFileSync(node.filePath, newContent, 'utf-8'); } catch (e) { warn(`Failed to write file: ${node.repoPath} — ${String(e)}`); return; } }
  node.frontmatter.status = 'BLOCKED';
  node.frontmatter.owner_persona = 'tpm';
  node.frontmatter.updated_at = dateStr;
  node.rawContent = newContent;
  info(`${dryTag}Flagged node for TPM: ${node.repoPath}`);
}

// ─── Main ─────────────────────────────────────────────────────────────────────

function main(): void {
  const repoRoot = process.cwd();
  const foundryDir = path.join(repoRoot, '.foundry');
  if (!fs.existsSync(foundryDir)) { warn(`'.foundry/' not found`); console.log(JSON.stringify([])); return; }
  const filePaths = discoverNodeFiles(foundryDir);
  const nodes: ParsedNode[] = [];
  for (const fp of filePaths) { const node = parseNodeFile(fp, repoRoot); if (node) nodes.push(node); }
  const nodeMap = new Map<string, ParsedNode>();
  const parentToChildren = new Map<string, ParsedNode[]>();
  const evalCache = new Map<string, boolean>();
  for (const node of nodes) {
    nodeMap.set(node.repoPath, node);
    if (node.frontmatter.parent) {
      if (!parentToChildren.has(node.frontmatter.parent)) parentToChildren.set(node.frontmatter.parent, []);
      parentToChildren.get(node.frontmatter.parent)!.push(node);
    }
  }
  let hasUnresolvableDeps = false;
  function isDescendant(childPath: string, ancestorPath: string): boolean {
    let curr = nodeMap.get(childPath)?.frontmatter.parent;
    while (curr) { if (curr === ancestorPath) return true; curr = nodeMap.get(curr)?.frontmatter.parent; }
    return false;
  }
  function isHierarchicallyIncomplete(nodePath: string, evaluatingFor?: string): boolean {
    const cacheKey = evaluatingFor ? `${nodePath}|${evaluatingFor}` : nodePath;
    if (evalCache.has(cacheKey)) return evalCache.get(cacheKey)!;
    const node = nodeMap.get(nodePath);
    if (!node) { hasUnresolvableDeps = true; evalCache.set(cacheKey, true); return true; }
    if (node.frontmatter.status !== 'COMPLETED') { evalCache.set(cacheKey, true); return true; }
    const children = parentToChildren.get(nodePath) || [];
    for (const child of children) {
      if (evaluatingFor && (child.repoPath === evaluatingFor || isDescendant(evaluatingFor, child.repoPath))) continue;
      if (isHierarchicallyIncomplete(child.repoPath, evaluatingFor)) { evalCache.set(cacheKey, true); return true; }
    }
    for (const depPath of node.frontmatter.depends_on) {
      if (isHierarchicallyIncomplete(depPath, evaluatingFor)) { evalCache.set(cacheKey, true); return true; }
    }
    evalCache.set(cacheKey, false); return false;
  }
  // SUSPEND
  for (const node of nodes) {
    if (node.frontmatter.status !== 'ACTIVE' && node.frontmatter.status !== 'COMPLETED') continue;
    let suspend = false;
    for (const depPath of node.frontmatter.depends_on) {
      const dep = nodeMap.get(depPath);
      if (!dep) { if (fs.existsSync(path.join(repoRoot, depPath))) continue; hasUnresolvableDeps = true; suspend = true; break; }
      if (!isDescendant(node.repoPath, depPath)) { if (isHierarchicallyIncomplete(depPath, node.repoPath)) { suspend = true; break; } }
      else { if (dep.frontmatter.status !== 'ACTIVE' && dep.frontmatter.status !== 'COMPLETED') { suspend = true; break; } }
    }
    if (suspend) promoteNodeStatus(node, node.frontmatter.status, 'PENDING');
  }
  // IMPOSSIBLE LOOP
  for (const node of nodes) {
    if (node.frontmatter.status === 'FAILED' && node.frontmatter.rejection_reason) {
      if (node.frontmatter.parent) {
        const parentNode = nodeMap.get(node.frontmatter.parent);
        if (parentNode && parentNode.frontmatter.status !== 'ACTIVE') promoteNodeStatus(parentNode, parentNode.frontmatter.status, 'ACTIVE');
      } else if (node.frontmatter.owner_persona !== 'tpm') promoteNodeToTpm(node);
    }
  }
  // RESOLVE
  const eligible: ParsedNode[] = [];
  evalCache.clear();
  for (const node of nodes) {
    if (node.frontmatter.status !== 'PENDING') continue;
    let blocked = false;
    let currParent = node.frontmatter.parent;
    while (currParent) {
      const parentNode = nodeMap.get(currParent);
      if (!parentNode) { blocked = true; break; }
      if (parentNode.frontmatter.status !== 'ACTIVE' && parentNode.frontmatter.status !== 'COMPLETED') {
        const parentChildren = parentToChildren.get(currParent) || [];
        if (!(parentNode.frontmatter.status === 'PENDING' && parentChildren.length > 0)) { blocked = true; break; }
      }
      currParent = parentNode.frontmatter.parent;
    }
    if (blocked) continue;
    const currentChildren = parentToChildren.get(node.repoPath) || [];
    for (const child of currentChildren) { if (isHierarchicallyIncomplete(child.repoPath, node.repoPath)) { blocked = true; break; } }
    if (blocked) continue;
    for (const depPath of node.frontmatter.depends_on) {
      const dep = nodeMap.get(depPath);
      if (!dep) { blocked = true; break; }
      if (!isDescendant(node.repoPath, depPath)) { if (isHierarchicallyIncomplete(depPath, node.repoPath)) { blocked = true; break; } }
      else { if (dep.frontmatter.status !== 'ACTIVE' && dep.frontmatter.status !== 'COMPLETED') { blocked = true; break; } }
    }
    if (blocked) continue;
    const body = node.rawContent.replace(FM_STRIP_REGEX, '');
    const regex = /\.foundry\/(ideas|prds|epics|stories|tasks)\/[a-zA-Z0-9_-]+\.md/g;
    const targets = (body.match(regex) || []).filter(m => m !== node.repoPath && m !== node.frontmatter.parent && !node.frontmatter.depends_on.includes(m));
    let bypass = targets.length > 0 && targets.every(t => nodeMap.has(t));
    const hasUnchecked = /^- \[ \]/m.test(body);
    const nodeChildren = parentToChildren.get(node.repoPath) || [];
    const hasChildren = nodeChildren.length > 0;
    const allChildrenCompleted = hasChildren && nodeChildren.every(c => c.frontmatter.status === 'COMPLETED');
    if (!hasUnchecked && hasChildren && allChildrenCompleted) promoteNodeStatus(node, 'PENDING', 'COMPLETED');
    else if (bypass) promoteNodeStatus(node, 'PENDING', 'COMPLETED');
    else eligible.push(node);
  }
  // IDEMPOTENT
  const finalEligible: ParsedNode[] = [];
  for (const node of eligible) {
    let bypass = false;
    if (node.frontmatter.type !== 'TASK') {
      const body = node.rawContent.replace(FM_STRIP_REGEX, '');
      const linkRegex = /\]\((?:\.\/)?(\.foundry\/(?:ideas|prds|epics|stories|tasks)\/[^)]+\.md)\)/g;
      const links = [...body.matchAll(linkRegex)].map(m => m[1]);
      if (links.length > 0 && links.every(l => nodeMap.has(l)) && links.some(l => nodeMap.get(l)?.frontmatter.parent === node.repoPath)) bypass = true;
    }
    if (bypass) {
      promoteNodeStatus(node, 'PENDING', 'COMPLETED');
      if (!DRY_RUN) {
        const logPath = path.join(repoRoot, '.foundry/journals/agile_coach.md');
        const entry = `\n## ${todayISO()}: Pre-existing Artifacts Anomaly\n\nThe orchestrator detected that target artifacts for \`${node.repoPath}\` already existed.\n`;
        try { fs.appendFileSync(logPath, entry, 'utf-8'); } catch {}
      }
    } else finalEligible.push(node);
  }
  // PROMOTE
  for (const node of finalEligible) {
    if (node.frontmatter.owner_persona === 'human') promoteNodeStatus(node, 'PENDING', 'ACTIVE');
    else promoteNodeStatus(node, 'PENDING', 'READY');
  }
  for (const node of nodes) {
    if (node.frontmatter.status === 'READY' && node.frontmatter.owner_persona === 'human') promoteNodeStatus(node, 'READY', 'ACTIVE');
  }
  // COLLECT & OUTPUT
  const readyNodes = nodes.filter((n) => n.frontmatter.status === 'READY').map((n) => ({ ...n.frontmatter, repo_path: n.repoPath }));
  console.log(JSON.stringify(readyNodes));
  if (hasUnresolvableDeps && STRICT) process.exit(1);
  process.exit(0);
}

if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith('foundry-orchestrator.ts')) main();
export { discoverNodeFiles, parseNodeFile, promoteNodeStatus, main };

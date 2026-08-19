/**
 * foundry-orchestrator.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * The Foundry DAG Orchestrator — Epic 2 / Story 2.1
 *
 * Execution phases:
 *   1. DISCOVER  — walk .foundry/**\/*.md, skipping journals/ and docs/
 *   2. PARSE     — extract YAML frontmatter via gray-matter; skip malformed nodes
 *   3. MAP       — build a repo-relative-path → ParsedNode lookup
 *   4. RESOLVE   — find PENDING nodes whose depends_on are all COMPLETED (or [])
 *   5. PROMOTE   — mutate those files: PENDING → READY, bump updated_at
 *   6. COLLECT   — gather all READY nodes (promoted + previously ready)
 *   7. OUTPUT    — console.log(JSON.stringify(readyNodes))  ← only stdout line
 *   8. EXIT      — 0 on success; 1 if unresolvable deps found in --strict mode
 *
 * Usage:
 *   node --strip-types foundry-orchestrator.ts [--dry-run] [--strict]
 *
 * Flags:
 *   --dry-run   Log what would be promoted; do NOT write any files.
 *   --strict    Exit 1 if any depends_on path is unresolvable.
 *
 * Authority: .foundry/docs/schema.md
 * ─────────────────────────────────────────────────────────────────────────────
 */

import * as fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import * as path from 'node:path';
import { createRequire } from 'node:module';
import { todayISO, buildReverseDependencyGraph, getOrphanedNodes, logToJournal } from './dag-utils.ts';
import { NodeFrontmatterSchema, type NodeFrontmatter } from './schema.ts';

// gray-matter is CJS; import via require() for clean ESM interop.
const require = createRequire(import.meta.url);
const matter = require('gray-matter') as typeof import('gray-matter');

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ReadyNodeItem extends NodeFrontmatter {
  repo_path: string;
  critical_weight: number;
  compiled_prompt?: string;
}

interface ParsedNode {
  /** Absolute path on disk */
  filePath: string;
  /** Repo-relative path, e.g. ".foundry/stories/story-001-scaffold.md" */
  repoPath: string;
  frontmatter: NodeFrontmatter;
  /** Full raw file content — needed for surgical in-place mutation */
  rawContent: string;
  /** Markdown body content without frontmatter */
  body: string;
}

// ─── CLI flags ────────────────────────────────────────────────────────────────

const MAX_REJECTION_THRESHOLD = 3; // Hardcoded fallback for isolated test environments

const isDryRun = (): boolean => process.argv.includes('--dry-run');
const isStrict = (): boolean => process.argv.includes('--strict');

const COMPILE_ARG_INDEX = process.argv.indexOf('--compile');
const COMPILE_PATH = COMPILE_ARG_INDEX !== -1 ? process.argv[COMPILE_ARG_INDEX + 1] : null;

// ─── Logging (all diagnostic output → stderr; only the matrix JSON → stdout) ─

let hasWarnings = false;

function warn(msg: string): void {
  hasWarnings = true;
  process.stderr.write(`[orchestrator] WARN  ${msg}\n`);
  process.stderr.write(`::warning::[orchestrator] ${msg}\n`);
}

function info(msg: string): void {
  process.stderr.write(`[orchestrator] INFO  ${msg}\n`);
}

// ─── Utilities ────────────────────────────────────────────────────────────────

// ─── Phase 1: DISCOVER ───────────────────────────────────────────────────────

/**
 * Recursively walks `dir` and returns absolute paths to all .md files,
 * excluding anything under `journals/` or `docs/` subdirectories.
 */
function discoverNodeFiles(dir: string): string[] {
  const results: string[] = [];

  function walk(current: string): void {
    let entries: fs.Dirent[];
    try {
      entries = fs.readdirSync(current, { withFileTypes: true });
  } catch {
      warn(`Cannot read directory: ${current}`);
      return;
    }

    for (const entry of entries) {
      const fullPath = path.join(current, entry.name);

      if (entry.isDirectory()) {
        // Skip journals, fixtures, and archive entirely. For docs, only explore the adrs/ subdirectory.
        if (entry.name === 'journals' || entry.name === 'fixtures' || entry.name === 'archive') continue;
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

  walk(dir);
  return results;
}

// ─── Phase 2: PARSE ──────────────────────────────────────────────────────────

/**
 * Parses a single markdown file and returns a ParsedNode, or null if the file
 * is malformed or missing required fields. Warnings are emitted for all errors.
 */
function parseNodeFile(filePath: string, repoRoot: string): ParsedNode | null {
  // console.log("parsing", filePath);
  const repoPath = path.relative(repoRoot, filePath).replace(/\\/g, '/');

  let rawContent: string;
  try {
    rawContent = fs.readFileSync(filePath, 'utf-8');
  } catch {
    warn(`Cannot read file: ${repoPath}`);
    return null;
  }

  // gray-matter throws on malformed YAML — catch gracefully.
  let parsed: ReturnType<typeof matter>;
  try {
    parsed = matter(rawContent);
  } catch {
    warn(`Malformed YAML frontmatter in: ${repoPath} — skipping`);
    return null;
  }

  const fm = parsed.data;

  // Files without a frontmatter block have an empty data object.
  if (Object.keys(fm).length === 0) {
    warn(`No YAML frontmatter found in: ${repoPath} — skipping`);
    return null;
  }

  const parseResult = NodeFrontmatterSchema.safeParse(fm);
  if (!parseResult.success) {
    warn(`Schema validation failed in: ${repoPath} — skipping. Errors: ${parseResult.error.message}`);
    return null;
  }

  return {
    filePath,
    repoPath,
    frontmatter: parseResult.data,
    rawContent,
    body: parsed.content,
  };
}

// ─── Phase 5: PROMOTE ────────────────────────────────────────────────────────

/**
 * Mutates the on-disk markdown file to change `status: currentStatus` → `status: targetStatus`
 * and update `updated_at` to today's date.
 *
 * In --dry-run mode, logs the intended change but does NOT write to disk.
 */
function promoteNodeStatus(node: ParsedNode, currentStatus: NodeFrontmatter['status'], targetStatus: NodeFrontmatter['status']): void {
  const dateStr = todayISO();
  const dryTag = isDryRun() ? '[DRY-RUN] ' : '';

  if (node.frontmatter.status !== currentStatus) {
    warn(`${dryTag}Cannot promote status. Current status is ${node.frontmatter.status}, expected ${currentStatus} in: ${node.repoPath}`);
    return;
  }

  const clearRejectionReasonStatuses: NodeFrontmatter['status'][] = ['ACTIVE', 'READY', 'PENDING', 'VERIFYING', 'COMPLETED'];

  const newData = { ...node.frontmatter, status: targetStatus, updated_at: dateStr };

  if (clearRejectionReasonStatuses.includes(targetStatus)) {
    newData.rejection_reason = '';
  }

  const newContent = matter.stringify(node.body, newData);

  if (!isDryRun()) {
    try {
      fs.writeFileSync(node.filePath, newContent, 'utf-8');
    } catch (e) {
      warn(`Failed to write file: ${node.repoPath} — ${String(e)}`);
      return;
    }
  }

  // Update in-memory state so downstream phases see the correct status.
  node.frontmatter = newData as NodeFrontmatter;
  node.rawContent = newContent;

  info(`${dryTag}Promoted ${currentStatus} → ${targetStatus}: ${node.repoPath}`);
}

function promoteNodeToTpm(node: ParsedNode): void {
  const dateStr = todayISO();
  const dryTag = isDryRun() ? '[DRY-RUN] ' : '';

  const newData = { ...node.frontmatter, status: 'BLOCKED', owner_persona: 'tpm', updated_at: dateStr };
  const newContent = matter.stringify(node.body, newData);

  if (!isDryRun()) {
    try {
      fs.writeFileSync(node.filePath, newContent, 'utf-8');
    } catch (e) {
      warn(`Failed to write file: ${node.repoPath} — ${String(e)}`);
      return;
    }
  }

  node.frontmatter = newData as NodeFrontmatter;
  node.rawContent = newContent;

  info(`${dryTag}Flagged node for TPM: ${node.repoPath}`);
}

function promoteNodeToCancelledWithReason(node: ParsedNode, reason: string): void {
  const dateStr = todayISO();
  const dryTag = isDryRun() ? '[DRY-RUN] ' : '';

  const newData = { ...node.frontmatter, status: 'CANCELLED' as NodeFrontmatter['status'], rejection_reason: reason, updated_at: dateStr };
  const newContent = matter.stringify(node.body, newData);

  if (!isDryRun()) {
    try {
      fs.writeFileSync(node.filePath, newContent, 'utf-8');
    } catch (e) {
      warn(`${dryTag}Failed to write file ${node.repoPath}: ${String(e)}`);
      return;
    }
  }

  node.frontmatter = newData as NodeFrontmatter;
  node.rawContent = newContent;

  info(`${dryTag}Cancelled node ${node.repoPath} with reason: ${reason}`);
}

function promoteNodeToFailedWithReason(node: ParsedNode, reason: string): void {
  const dateStr = todayISO();
  const dryTag = isDryRun() ? '[DRY-RUN] ' : '';

  const newData = { ...node.frontmatter, status: 'FAILED' as NodeFrontmatter['status'], rejection_reason: reason, updated_at: dateStr };
  const newContent = matter.stringify(node.body, newData);

  if (!isDryRun()) {
    try {
      fs.writeFileSync(node.filePath, newContent, 'utf-8');
    } catch (e) {
      warn(`Failed to write file: ${node.repoPath} — ${String(e)}`);
      return;
    }
  }

  node.frontmatter = newData as NodeFrontmatter;
  node.rawContent = newContent;

  info(`${dryTag}Flagged node as FAILED due to ${reason}: ${node.repoPath}`);
}

function acknowledgeNodeFailure(node: ParsedNode): void {
  const dateStr = todayISO();
  const dryTag = isDryRun() ? '[DRY-RUN] ' : '';

  const newReason = `[ACKNOWLEDGED] ${node.frontmatter.rejection_reason || ''}`.trim();
  const newData = { ...node.frontmatter, rejection_reason: newReason, updated_at: dateStr };
  const newContent = matter.stringify(node.body, newData);

  if (!isDryRun()) {
    try {
      fs.writeFileSync(node.filePath, newContent, 'utf-8');
    } catch (e) {
      warn(`Failed to write file: ${node.repoPath} — ${String(e)}`);
      return;
    }
  }

  node.frontmatter = newData as NodeFrontmatter;
  node.rawContent = newContent;

  info(`${dryTag}Acknowledged failure in: ${node.repoPath}`);
}

function compilePromptForNode(node: ParsedNode, repoRoot: string): string {
  const ownerPersona = node.frontmatter.status === 'VERIFYING' ? 'auditor' : node.frontmatter.owner_persona;

  // 1. Load Generic Persona Prompt
  let genericPrompt = '';
  const genericPath = path.join(repoRoot, '.github', 'agents', 'generic', `${ownerPersona}.md`);
  const fallbackPath = path.join(repoRoot, '.github', 'agents', `${ownerPersona}.md`);

  if (fs.existsSync(genericPath)) {
    genericPrompt = fs.readFileSync(genericPath, 'utf-8');
  } else if (fs.existsSync(fallbackPath)) {
    genericPrompt = fs.readFileSync(fallbackPath, 'utf-8');
  } else {
    genericPrompt = `As the ${ownerPersona} of The Foundry, your task is described in the provided node file.`;
  }

  let combined = genericPrompt;

  // 2. Load Specific Prompt Layers (based on tags or layers field)
  const layers = new Set<string>();
  if (node.frontmatter.tags) {
    for (const tag of node.frontmatter.tags) {
      layers.add(tag.toLowerCase());
    }
  }
  if (node.frontmatter.layers && Array.isArray(node.frontmatter.layers)) {
    for (const layer of node.frontmatter.layers) {
      layers.add(layer.toLowerCase());
    }
  }

  for (const layer of layers) {
    const layerPath = path.join(repoRoot, '.github', 'agents', 'specific', `${layer}.md`);
    if (fs.existsSync(layerPath)) {
      const layerContent = fs.readFileSync(layerPath, 'utf-8');
      combined += `\n\n### SPECIFIC CONTEXT: ${layer.toUpperCase()}\n${layerContent}`;
    }
  }

  // 3. Load Core Principles/Policies (checks for core_policies.md or core_principles.md)
  const corePoliciesPath = path.join(repoRoot, '.foundry', 'docs', 'knowledge_base', 'agents', 'core_policies.md');
  const corePrinciplesPath = path.join(repoRoot, '.foundry', 'docs', 'knowledge_base', 'agents', 'core_principles.md');

  if (fs.existsSync(corePoliciesPath)) {
    const corePoliciesContent = fs.readFileSync(corePoliciesPath, 'utf-8');
    combined += `\n\n### CORE SYSTEM POLICIES\n${corePoliciesContent}`;
  } else if (fs.existsSync(corePrinciplesPath)) {
    const corePrinciplesContent = fs.readFileSync(corePrinciplesPath, 'utf-8');
    combined += `\n\n### CORE SYSTEM POLICIES\n${corePrinciplesContent}`;
  }

  return combined;
}


// ─── Main ─────────────────────────────────────────────────────────────────────

function main(): void {
  hasWarnings = false;
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const repoRoot = process.env.VITEST ? process.cwd() : path.resolve(__dirname, '..', '..');

  if (COMPILE_PATH) {
    const fullPath = path.resolve(repoRoot, COMPILE_PATH);
    const node = parseNodeFile(fullPath, repoRoot);
    if (!node) {
      warn(`Could not parse node at compile path: ${COMPILE_PATH}`);
      process.exitCode = 1;
      return;
    }
    const compiled = compilePromptForNode(node, repoRoot);
    process.stdout.write(compiled);
    return;
  }

  if (isDryRun()) {
    info('🔍 Dry-run mode active — no files will be modified.');
  }
  if (isStrict()) {
    info('⚠️  Strict mode active — unresolvable deps will cause exit(1).');
  }

  const foundryDir = path.join(repoRoot, '.foundry');

  if (!fs.existsSync(foundryDir)) {
    warn(`'.foundry/' directory not found at repo root: ${repoRoot}`);
    console.log(JSON.stringify([]));
    return;
  }

  // ── Phase 1: DISCOVER ──────────────────────────────────────────────────────
  info('Phase 1: Discovering node files...');
  const filePaths = discoverNodeFiles(foundryDir);
  info(`Found ${filePaths.length} candidate .md file(s).`);

  // ── Phase 2: PARSE ─────────────────────────────────────────────────────────
  info('Phase 2: Parsing frontmatter...');
  const nodes: ParsedNode[] = [];
  for (const fp of filePaths) {
    const node = parseNodeFile(fp, repoRoot);
    if (node !== null) nodes.push(node);
  }
  info(`Successfully parsed ${nodes.length} valid node(s) (skipped ${filePaths.length - nodes.length}).`);

  // ── Phase 3: BUILD MAPS ────────────────────────────────────────────────────
  info('Phase 3: Building dependency resolution map...');
  const nodeMap = new Map<string, ParsedNode>();
  const idToPathMap = new Map<string, string>();
  const parentToChildren = new Map<string, ParsedNode[]>();

  for (const node of nodes) {
    nodeMap.set(node.repoPath, node);
    idToPathMap.set(node.frontmatter.id, node.repoPath);
  }

  const childToParents = new Map<string, Set<string>>();

  /**
   * Helper to resolve a node reference (either ID or path) to a repo-relative path.
   */
  function resolveNodePath(ref: string | null | undefined, silent = false): string | null {
    if (!ref) return null;
    if (idToPathMap.has(ref)) return idToPathMap.get(ref)!;
    if (ref.startsWith('.foundry/')) {
      if (nodeMap.has(ref) || fs.existsSync(path.join(repoRoot, ref))) {
        return ref;
      }
      if (!ref.startsWith('.foundry/archive/')) {
        const archivedRef = ref.replace(/^\.foundry\//, '.foundry/archive/');
        if (nodeMap.has(archivedRef) || fs.existsSync(path.join(repoRoot, archivedRef))) {
          return archivedRef;
        }
      }
      return ref;
    }

    // Attempt to resolve ID from archive filesystem manually if it's an ID format
    const idRegexMatch = ref.match(/^(idea|prd|epic|story|task|research|adr)-/);
    if (idRegexMatch) {
       const typeMap: Record<string, string> = {
         idea: 'ideas',
         prd: 'prds',
         epic: 'epics',
         story: 'stories',
         task: 'tasks',
         research: 'research',
         adr: 'docs/adrs'
       };
       const prefix = idRegexMatch[1];
       const folder = typeMap[prefix];
       if (folder) {
         const archivedPath = `.foundry/archive/${folder}/${ref}.md`;
         if (fs.existsSync(path.join(repoRoot, archivedPath))) {
           return archivedPath;
         }
       }
    }

    // Log a warning if we can't resolve a non-empty reference.
    if (!silent) warn(`Unresolvable node reference: '${ref}'`);
    return null;
  }

  // 1. First pass: strictly populate nodeMap and idToPathMap (Already done above)

  // 2. Second pass: evaluate explicit parents and markdown links
  for (const node of nodes) {
    let parentPath = node.frontmatter.parent;
    if (parentPath) {
      // Resolve parent path fully (handles IDs and archived/non-archived paths)
      const resolvedParent = resolveNodePath(parentPath);
      if (resolvedParent) {
        parentPath = resolvedParent;
      }

      if (!parentToChildren.has(parentPath)) {
        parentToChildren.set(parentPath, []);
      }
      if (!parentToChildren.get(parentPath)!.find(n => n.repoPath === node.repoPath)) {
        parentToChildren.get(parentPath)!.push(node);
      }

      if (!childToParents.has(node.repoPath)) {
        childToParents.set(node.repoPath, new Set());
      }
      childToParents.get(node.repoPath)!.add(parentPath);
    }

    // Parse body for regex to find markdown links to children and raw node IDs
    const linkRegex = /\]\((?:\.\/)?(\.foundry\/(?:ideas|prds|epics|stories|tasks|research)\/[^)]+\.md)\)/g;
    const idRegex = /(?:idea|prd|epic|story|task|research|adr)-[a-zA-Z0-9_-]+/g;
    const body = node.body;

    const linkMatches = [...body.matchAll(linkRegex)].map(m => m[1]);
    const idMatches = [...body.matchAll(idRegex)]
      .map(m => m[0])
      .map(id => resolveNodePath(id, true))
      .filter((path): path is string => !!path);

    const matches = [...new Set([...linkMatches, ...idMatches])].map(m => resolveNodePath(m, true)).filter((m): m is string => !!m);

    for (const match of matches) {
      // node.repoPath is the potential parent, match is the potential child
      if (match !== node.repoPath) {
        let matchedNode = nodeMap.get(match);
        if (!matchedNode && fs.existsSync(path.join(repoRoot, match))) {
          const parsed = parseNodeFile(path.join(repoRoot, match), repoRoot);
          if (parsed) {
            matchedNode = parsed;
          }
        }
        if (matchedNode) {
          // Check 1: If matchedNode has an explicit parent in frontmatter, do not add node as parent if it differs
          const explicitParent = resolveNodePath(matchedNode.frontmatter.parent);
          if (explicitParent && explicitParent !== node.repoPath && explicitParent !== node.frontmatter.id) {
            continue;
          }

          // Check 2: If node depends on matchedNode (directly via depends_on), node cannot be parent of matchedNode
          const nodeDeps = (node.frontmatter.depends_on || []).map(d => resolveNodePath(d)).filter(Boolean);
          if (nodeDeps.includes(match)) {
            continue;
          }

          if (!parentToChildren.has(node.repoPath)) {
            parentToChildren.set(node.repoPath, []);
          }
          if (!parentToChildren.get(node.repoPath)!.find(n => n.repoPath === match)) {
            parentToChildren.get(node.repoPath)!.push(matchedNode);
          }
          if (!childToParents.has(match)) {
            childToParents.set(match, new Set());
          }
          childToParents.get(match)!.add(node.repoPath);
        }
      }
    }
  }

  // ── Phase 3.0: MAX REJECTION THRESHOLD CHECK ───────────────────────────────
  info('Phase 3.0: Checking for max rejection threshold...');
  for (const node of nodes) {
    if (node.frontmatter.status === 'FAILED' && (node.frontmatter.rejection_count || 0) >= MAX_REJECTION_THRESHOLD) {
      promoteNodeToCancelledWithReason(node, 'Max rejection count reached');
    }
  }

  // ── Phase 3.1: CASCADE CANCELLATIONS ───────────────────────────────────────
  info('Phase 3.1: Cascading CANCELLED statuses...');
  // Find all explicitly cancelled nodes
  const cancelledNodes = new Set<string>();
  for (const node of nodes) {
    if (node.frontmatter.status === 'CANCELLED') {
      cancelledNodes.add(node.repoPath);
    }
  }

  // Helper to cascade cancellation to children recursively
  function cascadeCancel(parentPath: string) {
    const children = parentToChildren.get(parentPath) || [];
    for (const child of children) {
      if (child.frontmatter.status !== 'COMPLETED' && child.frontmatter.status !== 'CANCELLED') {
        promoteNodeToCancelledWithReason(child, 'Cancelled due to cascading cancellation from parent');
        cancelledNodes.add(child.repoPath);
        cascadeCancel(child.repoPath); // Recursive call
      }
    }
  }

  for (const cancelledPath of Array.from(cancelledNodes)) {
    cascadeCancel(cancelledPath);
  }

  let hasUnresolvableDeps = false;

  // Helper to recursively check if a node is blocked.
  // A node is blocked if:
  // 1. Its status is not COMPLETED (and it's not the target node we are evaluating).
  // 2. ANY of its recursive dependencies are blocked.
  // 3. ANY of its recursive children are blocked.

  // Helper to safely check if 'child' is a deep descendant of 'ancestor'
  function isDescendant(childPath: string, ancestorPath: string): boolean {
    const queue = [childPath];
    const visited = new Set<string>();

    while (queue.length > 0) {
      const curr = queue.shift()!;
      if (visited.has(curr)) continue;
      visited.add(curr);

      const parents = childToParents.get(curr);
      if (parents) {
        for (const p of parents) {
          if (p === ancestorPath) return true;
          queue.push(p);
        }
      }
    }
    return false;
  }

  /**
   * Helper to recursively check if a node (parent or dependency) is "incomplete"
   * and thus blocks downstream work.
   *
   * A node is incomplete if:
   * 1. Its status is NOT 'COMPLETED'.
   * 2. ANY of its recursive children (sub-tasks/stories) are incomplete.
   * 3. ANY of its recursive dependencies are incomplete.
   */
  function isHierarchicallyIncomplete(nodePath: string, ignoredRefs: string | string[] = [], visited = new Set<string>()): boolean {
    const ignoredPaths = Array.isArray(ignoredRefs) ? ignoredRefs : [ignoredRefs];
    if (visited.has(nodePath)) return false;
    visited.add(nodePath);

    const node = nodeMap.get(nodePath);

    if (!node) {
      if (fs.existsSync(path.join(repoRoot, nodePath))) {
        // If it exists on disk but isn't in nodeMap, it was likely archived/skipped during discovery.
        // Archived tasks are implicitly completed/cancelled and therefore not incomplete.
        return false;
      }
      warn(`Node not found in resolution map: ${nodePath}`);
      hasUnresolvableDeps = true;
      return true;
    }

    const isIgnored = ignoredPaths.includes(node.repoPath);

    if (!isIgnored && node.frontmatter.status !== 'COMPLETED' && node.frontmatter.status !== 'CANCELLED') {
      return true;
    }

    const children = parentToChildren.get(nodePath) || [];
    for (const child of children) {
      if (ignoredPaths.includes(child.repoPath)) continue;

      if (isHierarchicallyIncomplete(child.repoPath, ignoredPaths, visited)) {
        return true;
      }
    }

    for (const depRef of node.frontmatter.depends_on) {
      const depPath = resolveNodePath(depRef);
      if (depRef && !depPath) {
        return true;
      }
      if (!depPath || ignoredPaths.includes(depPath)) continue;

      if (isHierarchicallyIncomplete(depPath, ignoredPaths, visited)) {
        return true;
      }
    }

    return false;
  }

  // ── Phase 3.5: SUSPEND (Wait & Wake) ───────────────────────────────────────
  info('Phase 3.5: Checking ACTIVE/VERIFYING/READY nodes for suspension...');
  for (const node of nodes) {
    if (node.frontmatter.status !== 'ACTIVE' && node.frontmatter.status !== 'VERIFYING' && node.frontmatter.status !== 'READY') continue;

    let shouldSuspend = false;

    const children = parentToChildren.get(node.repoPath) || [];
    for (const child of children) {
      if (isHierarchicallyIncomplete(child.repoPath, [node.repoPath])) {
        shouldSuspend = true;
        break;
      }
    }

    for (const depRef of node.frontmatter.depends_on) {
      const depPath = resolveNodePath(depRef);
      if (!depPath) {
        warn(`Unresolvable dependency '${depRef}' referenced by ${node.frontmatter.status} node: ${node.repoPath}`);
        hasUnresolvableDeps = true;
        shouldSuspend = true;
        break;
      }

      const dep = nodeMap.get(depPath);
      if (!dep) {
        if (fs.existsSync(path.join(repoRoot, depPath))) {
          continue;
        }
        warn(`Dependency file '${depRef}' not found for ${node.frontmatter.status} node: ${node.repoPath}`);
        hasUnresolvableDeps = true;
        shouldSuspend = true;
        break;
      }

      // If it is an ancestor, we only care that it is status ACTIVE or COMPLETED.
      if (!isDescendant(node.repoPath, depPath!)) {
        if (isHierarchicallyIncomplete(depPath!, [node.repoPath])) {
          shouldSuspend = true;
          break;
        }
      } else {
        if (dep.frontmatter.status !== 'ACTIVE' && dep.frontmatter.status !== 'COMPLETED') {
          shouldSuspend = true;
          break;
        }
      }
    }

    if (shouldSuspend && (node.frontmatter.status === 'ACTIVE' || node.frontmatter.status === 'VERIFYING' || node.frontmatter.status === 'READY')) {
      info(`Suspending ${node.frontmatter.status} node: ${node.repoPath}`);
      promoteNodeStatus(node, node.frontmatter.status, 'PENDING');
    }
  }

  // ── Phase 3.6: IMPOSSIBLE LOOP ─────────────────────────────────────────────
  info('Phase 3.6: Checking for Impossible Loop conditions...');
  for (const node of nodes) {
    if ((node.frontmatter.status === 'FAILED' || node.frontmatter.status === 'CANCELLED') && node.frontmatter.rejection_reason === 'Max rejection count reached') {
      // Auto-cancel orphaned PENDING nodes depending directly or indirectly on this permanently failed node

      const dependents = buildReverseDependencyGraph(nodes, resolveNodePath as (ref: string) => string | null);
      const visited = getOrphanedNodes(node.repoPath, dependents);

      for (const depPath of visited) {
        if (depPath === node.repoPath) continue;
        const dependentNode = nodeMap.get(depPath);
        if (dependentNode && dependentNode.frontmatter.status === 'PENDING') {
          promoteNodeToCancelledWithReason(dependentNode, `Cancelled due to permanent failure of dependency: ${node.frontmatter.id}`);
          cancelledNodes.add(dependentNode.repoPath);
          cascadeCancel(dependentNode.repoPath);
        }
      }
    }

    if (
      ((node.frontmatter.status === 'FAILED' || node.frontmatter.status === 'CANCELLED') &&
      node.frontmatter.rejection_reason &&
      !node.frontmatter.rejection_reason.startsWith('[ACKNOWLEDGED]') &&
      node.frontmatter.rejection_reason !== 'Cancelled due to cascading cancellation from parent' &&
      !node.frontmatter.rejection_reason.startsWith('Cancelled due to permanent failure of dependency:'))
    ) {
      // Skip waking up parent if the child is merely suspended (waiting for dependencies/children).
      // We ignore the parent node itself during this check because it's exactly what we want to find out
      // (if something OTHER than the parent is blocking the child).
      const parentPath = resolveNodePath(node.frontmatter.parent);

      if (parentPath) {
        const parentNode = nodeMap.get(parentPath);
        if (
          parentNode &&
          parentNode.frontmatter.status !== 'ACTIVE' &&
          parentNode.frontmatter.status !== 'READY' &&
          parentNode.frontmatter.status !== 'COMPLETED' &&
          parentNode.frontmatter.status !== 'CANCELLED'
        ) {
          info(`Impossible Loop: waking up parent ${parentNode.repoPath}`);
          if (parentNode.frontmatter.owner_persona === 'human') {
            promoteNodeStatus(parentNode, parentNode.frontmatter.status, 'ACTIVE');
          } else {
            promoteNodeStatus(parentNode, parentNode.frontmatter.status, 'READY');
          }
          acknowledgeNodeFailure(node);
        }
      } else if (node.frontmatter.owner_persona !== 'tpm') {
        info(`Impossible Loop: flagging node without parent for TPM: ${node.repoPath}`);
        promoteNodeToTpm(node);
        acknowledgeNodeFailure(node);
      }
    }
  }

  // ── Phase 3.9: CIRCULAR DEPENDENCY DETECTION ───────────────────────────────
  info('Phase 3.9: Detecting circular dependencies among PENDING nodes...');

  const pendingNodesForCycleDetection = nodes.filter(n => n.frontmatter.status === 'PENDING');
  const dependencyGraph = new Map<string, string[]>();

  for (const n of pendingNodesForCycleDetection) {
    const deps = (n.frontmatter.depends_on || []).map(d => resolveNodePath(d)).filter(Boolean) as string[];
    // Also include implicit parent dependencies
    const parentPath = resolveNodePath(n.frontmatter.parent);
    if (parentPath) {
      deps.push(parentPath);
    }
    dependencyGraph.set(n.repoPath, deps);
  }

  const visitedForCycle = new Set<string>();
  const recursionStackPath: string[] = [];
  const recursionSet = new Set<string>();
  const nodesInCycle = new Set<string>();

  function dfsCycle(nodePath: string) {
    visitedForCycle.add(nodePath);
    recursionStackPath.push(nodePath);
    recursionSet.add(nodePath);

    const deps = dependencyGraph.get(nodePath) || [];
    for (const dep of deps) {
      if (!dependencyGraph.has(dep)) continue; // Only care about PENDING dependencies

      if (!visitedForCycle.has(dep)) {
        dfsCycle(dep);
      } else if (recursionSet.has(dep)) {
        const cycleStartIndex = recursionStackPath.indexOf(dep);
        const cyclePath = recursionStackPath.slice(cycleStartIndex);
        cyclePath.push(dep);

        warn(`Detected circular dependency: ${cyclePath.join(' -> ')}`);

        for (const cycleNode of cyclePath) {
          nodesInCycle.add(cycleNode);
        }
      }
    }

    recursionStackPath.pop();
    recursionSet.delete(nodePath);
  }

  for (const n of pendingNodesForCycleDetection) {
    if (!visitedForCycle.has(n.repoPath)) {
      dfsCycle(n.repoPath);
    }
  }

  if (nodesInCycle.size > 0) {
    for (const nodePath of nodesInCycle) {
      const cycleNode = nodes.find(n => n.repoPath === nodePath);
      if (cycleNode) {
        promoteNodeToFailedWithReason(cycleNode, 'Circular dependency detected');
      }
    }
  }

  // ── Phase 3.10: HIERARCHICAL DEADLOCK DETECTION ────────────────────────────
  info('Phase 3.10: Detecting hierarchical deadlocks...');
  for (const node of nodes) {
    if (node.frontmatter.status === 'COMPLETED' || node.frontmatter.status === 'CANCELLED') continue;

    const children = parentToChildren.get(node.repoPath) || [];
    for (const child of children) {
      if (child.frontmatter.status === 'COMPLETED' || child.frontmatter.status === 'CANCELLED') continue;

      const queue = [child.repoPath];
      const visited = new Set<string>();
      let isCyclic = false;

      while (queue.length > 0) {
        const curr = queue.shift()!;
        if (visited.has(curr)) continue;
        visited.add(curr);

        if (curr === node.repoPath) {
          isCyclic = true;
          break;
        }

        const currNode = nodeMap.get(curr);
        if (currNode) {
          for (const depRef of currNode.frontmatter.depends_on) {
            const depPath = resolveNodePath(depRef);
            if (depPath) queue.push(depPath);
          }
        }
      }

      // Also check if parent transitively depends on child
      if (!isCyclic) {
        const parentQueue = [node.repoPath];
        const parentVisited = new Set<string>();
        while (parentQueue.length > 0) {
          const curr = parentQueue.shift()!;
          if (parentVisited.has(curr)) continue;
          parentVisited.add(curr);

          if (curr === child.repoPath) {
            isCyclic = true;
            break;
          }

          const currNode = nodeMap.get(curr);
          if (currNode) {
            for (const depRef of currNode.frontmatter.depends_on) {
              const depPath = resolveNodePath(depRef);
              if (depPath) parentQueue.push(depPath);
            }
          }
        }
      }

      if (isCyclic) {
        warn(`Hierarchical deadlock detected: Parent '${node.frontmatter.id}' (${node.repoPath}) has unchecked/incomplete child '${child.frontmatter.id}' (${child.repoPath}), but a dependency cycle exists between them!`);
        if (node.frontmatter.status === 'PENDING') {
          promoteNodeToFailedWithReason(node, 'Hierarchical deadlock detected');
        }
        if (child.frontmatter.status === 'PENDING') {
          promoteNodeToFailedWithReason(child, 'Hierarchical deadlock detected');
        }
      }
    }
  }

  // ── Phase 4: RESOLVE ───────────────────────────────────────────────────────
  info('Phase 4: Resolving DAG — finding eligible PENDING nodes...');
  const eligible: ParsedNode[] = [];

  for (const node of nodes) {
    if (node.frontmatter.status !== 'PENDING') continue;

    // A PENDING node is blocked if:
    // 1. It has an unresolvable dependency.
    // 2. Its parent is blocked (recursive).
    // 3. Any of its explicit dependencies is blocked (recursive).

    let blocked = false;

        // Check parent inheritance
    const initialParents = childToParents.get(node.repoPath) || new Set<string>();
    let queue = Array.from(initialParents);
    let visited = new Set<string>();

    while (queue.length > 0) {
      const currParent = queue.shift()!;
      if (visited.has(currParent)) continue;
      visited.add(currParent);

      const parentNode = nodeMap.get(currParent);
      if (!parentNode) {
        if (fs.existsSync(path.join(repoRoot, currParent))) {
          // Parent is archived (exists on disk) — implicitly completed/cancelled
          continue;
        }
        warn(`Parent '${currParent}' not found for: ${node.repoPath}`);
        blocked = true;
        break;
      }

      const parentStatus = parentNode.frontmatter.status;
      if (parentStatus !== 'ACTIVE' && parentStatus !== 'COMPLETED') {
        const parentChildren = parentToChildren.get(currParent) || [];
        if (parentStatus === 'PENDING' && parentChildren.length > 0) {
          // Exception for Late-Binding: If parent is PENDING and has children,
          // it is waiting for those children. Do not block the child...
          // UNLESS the parent itself has incomplete dependencies.
          let isParentDepIncomplete = false;
          for (const depRef of parentNode.frontmatter.depends_on) {
            const depPath = resolveNodePath(depRef);
            if (depPath && isHierarchicallyIncomplete(depPath, [node.repoPath])) {
              isParentDepIncomplete = true;
              break;
            }
          }
          if (isParentDepIncomplete) {
            blocked = true;
            break;
          }
        } else {
          blocked = true;
          break;
        }
      }

      const grandParents = childToParents.get(currParent);
      if (grandParents) {
        for (const gp of grandParents) {
          queue.push(gp);
        }
      }
    }

    if (blocked) continue;

    // Check if node is explicitly blocked by its own incomplete children
    const children = parentToChildren.get(node.repoPath) || [];
    for (const child of children) {
      if (isHierarchicallyIncomplete(child.repoPath, [node.repoPath])) {
        blocked = true;
        break;
      }
    }

    if (blocked) continue;

    const deps = node.frontmatter.depends_on;

    for (const depRef of deps) {
      const depPath = resolveNodePath(depRef);
      if (!depPath) {
        warn(`Unresolvable dependency '${depRef}' referenced by: ${node.repoPath}`);
        hasUnresolvableDeps = true;
        blocked = true;
        break;
      }

      const dep = nodeMap.get(depPath);
      if (!dep) {
        if (fs.existsSync(path.join(repoRoot, depPath))) {
          continue;
        }
        warn(`Unresolvable dependency '${depRef}' referenced by: ${node.repoPath}`);
        hasUnresolvableDeps = true;
        blocked = true;
        break;
      }

      // If it is an ancestor, we only care that it is status ACTIVE or COMPLETED.
      if (!isDescendant(node.repoPath, depPath!)) {
        if (isHierarchicallyIncomplete(depPath!, [node.repoPath])) {
          blocked = true;
          break;
        }
      } else {
        if (dep.frontmatter.status !== 'ACTIVE' && dep.frontmatter.status !== 'COMPLETED') {
          blocked = true;
          break;
        }
      }
    }

    if (!blocked) {
      // Preflight check
      const regex = /\.foundry\/(ideas|prds|epics|stories|tasks)\/[a-zA-Z0-9_-]+\.md/g;
      const body = node.body;
      const matches = [...new Set(body.match(regex) || [])];

      const parentPath = resolveNodePath(node.frontmatter.parent);
      const resolvedDeps = node.frontmatter.depends_on.map(d => resolveNodePath(d));
      const targetArtifacts = matches.map(m => resolveNodePath(m)).filter((m): m is string =>
        !!m &&
        m !== node.repoPath &&
        m !== parentPath &&
        !resolvedDeps.includes(m)
      );

      let bypassDispatch = false;
      let allTargetsCompleted = false;

      if (targetArtifacts.length > 0) {
        allTargetsCompleted = true;
        for (const target of targetArtifacts) {
          const targetNode = nodeMap.get(target);
          if (!targetNode || targetNode.frontmatter.status !== 'COMPLETED') {
            allTargetsCompleted = false;
            break;
          }
        }
        if (allTargetsCompleted) {
          bypassDispatch = true;
        }
      }

      const children = parentToChildren.get(node.repoPath) || [];

      const acceptanceCriteriaMatch = node.body.match(/## Acceptance Criteria\s*([\s\S]*?)(?:\n## |$)/);
      const acceptanceCriteriaText = acceptanceCriteriaMatch ? acceptanceCriteriaMatch[1] : '';
      const hasUncheckedTasks = /^\s*-\s*\[\s\]/m.test(acceptanceCriteriaText);

      if (bypassDispatch) {
        if (hasUncheckedTasks) {
          const type = node.frontmatter.type;
          const isLateBindingParent = (children.length > 0 && type !== 'TASK') || ['IDEA', 'PRD', 'EPIC', 'STORY'].includes(type);
          if (isLateBindingParent) {
            info(`Preflight success: Valid target artifacts exist and are completed, but ${node.repoPath} still has unchecked tasks. Promoting to READY.`);
            eligible.push(node);
          } else {
            info(`Preflight failure: Leaf task ${node.repoPath} has completed target artifacts but contains unchecked boxes.`);
            promoteNodeToFailedWithReason(node, 'Merged with unfulfilled acceptance criteria');
          }
        } else {
          info(`Preflight success: Valid target artifacts exist and are completed. Bypassing dispatch for ${node.repoPath}`);
          promoteNodeStatus(node, 'PENDING', 'COMPLETED');
        }
      } else if (children.length > 0) {
        // If the node already has children, it is in a Late-Binding wait state.
        // We MUST NOT push it to eligible here. Phase 4.1 will wake it up if all children are completed.
        info(`Late-Binding Parent: ${node.repoPath} is waiting for children to complete.`);
      } else {
        const hasCheckboxes = /^\s*-\s*\[\s*[xX\s]\s*\]/m.test(acceptanceCriteriaText);
        if (hasCheckboxes && !hasUncheckedTasks) {
          info(`Leaf node ${node.repoPath} has all acceptance criteria checked. Promoting directly to COMPLETED to prevent reawakening.`);
          promoteNodeStatus(node, 'PENDING', 'COMPLETED');
        } else {
          eligible.push(node);
        }
      }
    }
  }

  info(`${eligible.length} node(s) eligible for promotion to READY.`);

  // ── Phase 4.1: Late-Binding Completion ────────────────────────────────────
  info('Phase 4.1: Checking for completed Late-Binding parents...');
  for (const node of nodes) {
    if (node.frontmatter.status === 'PENDING') {
      const children = parentToChildren.get(node.repoPath) || [];
      if (children.length > 0) {
        // Parent is PENDING and has children. Check if ALL children are COMPLETED.
        let allChildrenCompleted = true;
        for (const child of children) {
          if (child.frontmatter.status !== 'COMPLETED' && child.frontmatter.status !== 'CANCELLED') {
            allChildrenCompleted = false;
            break;
          }
        }

        if (allChildrenCompleted) {
          let isDepIncomplete = false;
          for (const depRef of node.frontmatter.depends_on) {
            const depPath = resolveNodePath(depRef);
            if (depPath && isHierarchicallyIncomplete(depPath, [node.repoPath])) {
              isDepIncomplete = true;
              break;
            }
          }

          if (!isDepIncomplete) {
            // Auto-fulfill acceptance criteria checkboxes corresponding to completed/cancelled children
            let updatedBody = node.body;
            for (const child of children) {
              if (child.frontmatter.status === 'COMPLETED' || child.frontmatter.status === 'CANCELLED') {
                const childIdEscaped = child.frontmatter.id.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
                const childPathEscaped = child.repoPath.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
                const checkboxRegex = new RegExp(`^(\\s*-\\s*\\[)\\s(\\]\\s*(?:.*(?:${childIdEscaped}|${childPathEscaped}).*))`, 'gm');
                updatedBody = updatedBody.replace(checkboxRegex, '$1x$2');
              }
            }

            if (updatedBody !== node.body) {
              node.body = updatedBody;
              const newContent = matter.stringify(node.body, node.frontmatter);
              node.rawContent = newContent;
              if (!isDryRun()) {
                try {
                  fs.writeFileSync(node.filePath, newContent, 'utf-8');
                  info(`Auto-checked completed child tasks in parent node: ${node.repoPath}`);
                } catch (e) {
                  warn(`Failed to write auto-checked parent file ${node.repoPath}: ${String(e)}`);
                }
              }
            }

            // Auto-remediate parent node stall: auto-check any remaining unchecked acceptance criteria
            // since all child tasks created to fulfill this parent node are COMPLETED or CANCELLED.
            const acceptanceCriteriaMatch = node.body.match(/## Acceptance Criteria\s*([\s\S]*?)(?:\n## |$)/);
            const acceptanceCriteriaText = acceptanceCriteriaMatch ? acceptanceCriteriaMatch[1] : '';
            const hasUncheckedTasks = /^\s*-\s*\[\s\]/m.test(acceptanceCriteriaText);

            if (hasUncheckedTasks) {
              info(`Auto-remediating parent node stall for ${node.repoPath}: checking off remaining acceptance criteria.`);
              const updatedBody = node.body.replace(/(## Acceptance Criteria\s*[\s\S]*?)(?:\n## |$)/, (match) => {
                return match.replace(/^(\s*-\s*\[)\s(\])/gm, '$1x$2');
              });
              node.body = updatedBody;
              const newContent = matter.stringify(node.body, node.frontmatter);
              node.rawContent = newContent;
              if (!isDryRun()) {
                try {
                  fs.writeFileSync(node.filePath, newContent, 'utf-8');
                  info(`Auto-checked remaining acceptance criteria in parent node: ${node.repoPath}`);
                } catch (e) {
                  warn(`Failed to write auto-remediated parent file ${node.repoPath}: ${String(e)}`);
                }
              }
            }
              if (node.frontmatter.type === 'EPIC') {
                const hasE2E = children.some(child =>
                  child.frontmatter.type === 'STORY' &&
                  child.frontmatter.tags &&
                  child.frontmatter.tags.some(t => t.toLowerCase() === 'e2e' || t.toLowerCase() === 'integration')
                );
                if (!hasE2E) {
                  info(`Late-Binding Parent Complete: ${node.repoPath} has completed children, but lacks an E2E/integration STORY. Promoting to FAILED.`);
                  promoteNodeToFailedWithReason(node, 'Merged with unfulfilled acceptance criteria: Missing E2E/integration story');
                  const idx = eligible.indexOf(node);
                  if (idx !== -1) {
                    eligible.splice(idx, 1);
                  }
                  continue; // Skip promoting to COMPLETED
                }
              }

              info(`Late-Binding Parent Complete: ${node.repoPath} has children and all are COMPLETED. Promoting directly to COMPLETED.`);
              promoteNodeStatus(node, 'PENDING', 'COMPLETED');
              // Remove from eligible if it was added
              const idx = eligible.indexOf(node);
              if (idx !== -1) {
                eligible.splice(idx, 1);
              }
          } else {
            info(`Late-Binding Parent: ${node.repoPath} has completed children, but is waiting on dependencies.`);
          }
        }
      }
    }
  }

  // ── Phase 4.5: IDEMPOTENT GENERATION CHECK ────────────────────────────────
  info('Phase 4.5: Performing idempotent generation checks...');
  const finalEligible: ParsedNode[] = [];
  for (const node of eligible) {
    let shouldBypass = false;

    // We restrict idempotent check to generation nodes (typically non-TASK,
    // but checking for explicit children links is the robust way)
    if (node.frontmatter.type !== 'TASK') {
      const body = node.body;

      const linkRegex = /\]\((?:\.\/)?(\.foundry\/(?:ideas|prds|epics|stories|tasks)\/[^)]+\.md)\)/g;
      const links = [...body.matchAll(linkRegex)].map(m => m[1]);

      if (links.length > 0) {
        const resolvedLinks = links.map(l => resolveNodePath(l)).filter((l): l is string => !!l);
        const allExist = resolvedLinks.every(l => nodeMap.has(l) || fs.existsSync(path.join(repoRoot, l)));
        const hasChild = resolvedLinks.some(l => {
          let childNode = nodeMap.get(l);
          if (!childNode && fs.existsSync(path.join(repoRoot, l))) {
            childNode = parseNodeFile(path.join(repoRoot, l), repoRoot) || undefined;
          }
          if (!childNode) return false;
          const resolvedParentOfChild = resolveNodePath(childNode.frontmatter.parent);
          const resolvedNodePathValue = resolveNodePath(node.repoPath);
          return resolvedParentOfChild === resolvedNodePathValue || childNode.frontmatter.parent === node.frontmatter.id;
        });

        if (allExist && hasChild) {
          shouldBypass = true;
        }
      }
    }

    const acceptanceCriteriaMatch = node.body.match(/## Acceptance Criteria\s*([\s\S]*?)(?:\n## |$)/);
    const acceptanceCriteriaText = acceptanceCriteriaMatch ? acceptanceCriteriaMatch[1] : '';
    const hasUncheckedTasks = /^\s*-\s*\[\s\]/m.test(acceptanceCriteriaText);

    if (shouldBypass) {
      if (hasUncheckedTasks) {
        info(`Idempotent check: Artifacts for ${node.repoPath} already exist, but node still has unchecked tasks. Promoting to READY.`);
        finalEligible.push(node);
      } else {
        if (node.frontmatter.type === 'EPIC') {
          // Check for E2E story in its generated links
          const bodyLinks = [...node.body.matchAll(/\]\((?:\.\/)?(\.foundry\/(?:ideas|prds|epics|stories|tasks)\/[^)]+\.md)\)/g)].map(m => m[1]);
          const e2eChildExists = bodyLinks.some(l => {
            const childNode = nodeMap.get(l);
            return childNode &&
                   childNode.frontmatter.type === 'STORY' &&
                   childNode.frontmatter.tags &&
                   childNode.frontmatter.tags.some(t => t.toLowerCase() === 'e2e' || t.toLowerCase() === 'integration');
          });

          if (!e2eChildExists) {
            info(`Idempotent check failed for ${node.repoPath}: artifacts exist but lacks an E2E/integration STORY. Promoting to FAILED.`);
            promoteNodeToFailedWithReason(node, 'Merged with unfulfilled acceptance criteria: Missing E2E/integration story');
            continue;
          }
        }

        info(`Idempotent check bypassed dispatch for ${node.repoPath} (artifacts already exist).`);
        promoteNodeStatus(node, 'PENDING', 'COMPLETED');

        const dateStr = todayISO();
        const logDir = require('node:path').join(repoRoot, '.foundry/journals/agile_coach');
        if (!isDryRun() && !require('node:fs').existsSync(logDir)) {
          require('node:fs').mkdirSync(logDir, { recursive: true });
        }
        const logPath = require('node:path').join(logDir, `${Date.now()}.md`);
        const logEntry = `\n## ${dateStr}: Pre-existing Artifacts Anomaly\n\n### Observation\nThe orchestrator detected that target artifacts for \`${node.repoPath}\` already existed and were completely formed before dispatch.\n\n### Action Taken\nBypassed Jules session dispatch via idempotent generation check and auto-fulfilled the node.\n`;

        if (!isDryRun()) {
          try {
            logToJournal(logPath, logEntry);
            info(`Logged anomaly to ${logPath}`);
          } catch (e) {
            warn(`Failed to log anomaly to Agile Coach journal: ${String(e)}`);
          }
        }
      }
    } else {
      finalEligible.push(node);
    }
  }

  // ── Phase 4.8: MAPPING VALIDATION ──────────────────────────────────────────
  info('Phase 4.8: Validating node type to persona mappings...');
  const validatedEligible: ParsedNode[] = [];
  const validMappings: Record<string, string[]> = {
    IDEA: ['product_manager'],
    PRD: ['epic_planner', 'story_owner'],
    EPIC: ['story_owner', 'epic_planner'],
    STORY: ['tech_lead', 'story_owner'],
    TASK: ['coder', 'qa', 'tech_lead', 'architect', 'changelogger'],
    RESEARCH: ['researcher'],
    ADR: ['architect'],
  };

  for (const node of finalEligible) {
    if (
      node.frontmatter.owner_persona === 'human' ||
      node.frontmatter.owner_persona === 'tpm' ||
      node.frontmatter.owner_persona === 'agile_coach' ||
      node.frontmatter.owner_persona === 'mechanic' ||
      node.frontmatter.owner_persona === 'auditor'
    ) {
      validatedEligible.push(node);
      continue;
    }

    const validPersonas = validMappings[node.frontmatter.type] || [];
    if (!validPersonas.includes(node.frontmatter.owner_persona)) {
      warn(`Invalid mapping: ${node.frontmatter.type} node '${node.repoPath}' cannot be owned by '${node.frontmatter.owner_persona}'`);
      promoteNodeToFailedWithReason(node, 'Invalid owner_persona mapping');
    } else {
      validatedEligible.push(node);
    }
  }

  // ── Phase 5: PROMOTE ───────────────────────────────────────────────────────
  info('Phase 5: Promoting eligible nodes...');
  for (const node of validatedEligible) {
    if (node.frontmatter.owner_persona === 'human') {
      promoteNodeStatus(node, 'PENDING', 'ACTIVE');
    } else {
      promoteNodeStatus(node, 'PENDING', 'READY');
    }
  }

  // ── Phase 5.1: HANDLE EXISTING READY HUMAN TASKS ───────────────────────────
  info('Phase 5.1: Upgrading existing READY human tasks to ACTIVE...');
  for (const node of nodes) {
    if (node.frontmatter.status === 'READY' && node.frontmatter.owner_persona === 'human') {
      promoteNodeStatus(node, 'READY', 'ACTIVE');
    }
  }

  // ── Phase 6: COLLECT ───────────────────────────────────────────────────────
  info('Phase 6: Collecting all READY nodes for matrix output...');

  // Calculate critical path weights for all nodes to prioritize tasks that unblock the most downstream work
  const dependents = buildReverseDependencyGraph(nodes, resolveNodePath as (ref: string) => string | null);

  // We need to also include parent relationships as a dependency, because a child completing unblocks its parent
  for (const node of nodes) {
    const parentPath = resolveNodePath(node.frontmatter.parent);
    if (parentPath) {
      if (!dependents.has(node.repoPath)) {
        dependents.set(node.repoPath, []);
      }
      dependents.get(node.repoPath)!.push(parentPath);
    }
  }

  const criticalPathWeights = new Map<string, number>();

  function getWeight(nodePath: string): number {
    if (criticalPathWeights.has(nodePath)) {
        return criticalPathWeights.get(nodePath)!;
    }

    const deps = dependents.get(nodePath) || [];
    const allReachable = new Set<string>();
    const queue = [...deps];

    while(queue.length > 0) {
        const curr = queue.shift()!;
        if (!allReachable.has(curr)) {
            allReachable.add(curr);
            const currDeps = dependents.get(curr) || [];
            queue.push(...currDeps);
        }
    }

    criticalPathWeights.set(nodePath, allReachable.size);
    return allReachable.size;
  }

  for (const n of nodes) {
      getWeight(n.repoPath);
  }

  // Include both freshly-promoted nodes AND any that were already READY before
  // this run (idempotent: re-running the orchestrator is always safe).
  const includePrompt = process.argv.includes('--include-prompt');
  const readyNodes = nodes
    .filter((n) => n.frontmatter.status === 'READY' || n.frontmatter.status === 'VERIFYING')
    .map((n) => {
      const item: ReadyNodeItem = {
        ...n.frontmatter,
        repo_path: n.repoPath,
        owner_persona: n.frontmatter.status === 'VERIFYING' ? 'auditor' : n.frontmatter.owner_persona,
        critical_weight: getWeight(n.repoPath),
      };
      if (includePrompt) {
        item.compiled_prompt = compilePromptForNode(n, repoRoot);
      }
      return item;
    })
    .sort((a, b) => {
      // 1. Sort by Critical Path Weight descending (highest weight first)
      const weightA = a.critical_weight;
      const weightB = b.critical_weight;
      if (weightA !== weightB) {
        return weightB - weightA;
      }

      // 2. Fallback: Sort by created_at ascending (oldest first)
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();

      if (!Number.isNaN(dateA) && !Number.isNaN(dateB) && dateA !== dateB) {
        return dateA - dateB;
      }

      // 3. Fallback: sort by numeric id ascending
      return a.id.localeCompare(b.id, undefined, { numeric: true, sensitivity: 'base' });
    });

  info(`Total READY nodes: ${readyNodes.length}`);

  // ── Phase 7: OUTPUT ────────────────────────────────────────────────────────
  // This is the ONLY line written to stdout. The GitHub Actions matrix step
  // captures this exact output via: matrix=$(node ... | tail -1)
  console.log(JSON.stringify(readyNodes));

  // ── Phase 8: EXIT ──────────────────────────────────────────────────────────
  if ((hasUnresolvableDeps || hasWarnings) && isStrict()) {
    warn('Exiting with code 1: DAG resolution warnings or unresolvable dependencies detected (--strict mode).');
    process.exitCode = 1;
    return;
  }
}

if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith('foundry-orchestrator.ts')) {
  main();
}

export { discoverNodeFiles, parseNodeFile, promoteNodeStatus, main };

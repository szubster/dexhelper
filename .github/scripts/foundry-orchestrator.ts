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
import * as path from 'node:path';
import { createRequire } from 'node:module';

// gray-matter is CJS; import via require() for clean ESM interop.
const require = createRequire(import.meta.url);
const matter = require('gray-matter') as typeof import('gray-matter');

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
  // Supports both <type>-<NNN>-<slug> and <type>-<parent_NNN>-<NNN>-<slug>
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
  /** Absolute path on disk */
  filePath: string;
  /** Repo-relative path, e.g. ".foundry/stories/story-001-scaffold.md" */
  repoPath: string;
  frontmatter: FoundryFrontmatter;
  /** Full raw file content — needed for surgical in-place mutation */
  rawContent: string;
}

// ─── Required fields (schema §3.1) ───────────────────────────────────────────

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

// ─── CLI flags ────────────────────────────────────────────────────────────────

const DRY_RUN: boolean = process.argv.includes('--dry-run');
const STRICT: boolean = process.argv.includes('--strict');

// ─── Logging (all diagnostic output → stderr; only the matrix JSON → stdout) ─

function warn(msg: string): void {
  process.stderr.write(`[orchestrator] WARN  ${msg}\n`);
}

function info(msg: string): void {
  process.stderr.write(`[orchestrator] INFO  ${msg}\n`);
}

// ─── Utilities ────────────────────────────────────────────────────────────────

/** Returns today's date in ISO-8601 YYYY-MM-DD format (local time). */
function todayISO(): string {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

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
        // Skip the journals/ and docs/ subtrees entirely.
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

  // Files without a frontmatter block have an empty data object.
  if (!parsed.matter || parsed.matter.trim() === '') {
    warn(`No YAML frontmatter found in: ${repoPath} — skipping`);
    return null;
  }

  const fm = parsed.data as Partial<FoundryFrontmatter>;

  // Validate required fields.
  for (const field of REQUIRED_FIELDS) {
    if (fm[field] === undefined) {
      warn(`Missing required field '${field}' in: ${repoPath} — skipping`);
      return null;
    }
  }

  // Validate status enum.
  if (!VALID_STATUSES.includes(fm.status as Status)) {
    warn(`Invalid status '${String(fm.status)}' in: ${repoPath} — skipping`);
    return null;
  }

  // Validate type enum.
  if (!VALID_TYPES.includes(fm.type as NodeType)) {
    warn(`Invalid type '${String(fm.type)}' in: ${repoPath} — skipping`);
    return null;
  }

  // Ensure depends_on is an array (gray-matter may parse a missing key as undefined).
  if (!Array.isArray(fm.depends_on)) {
    warn(`'depends_on' is not an array in: ${repoPath} — skipping`);
    return null;
  }

  // Validate owner_persona is a single string (not array, no commas).
  if (typeof fm.owner_persona !== 'string' || fm.owner_persona.includes(',')) {
    warn(`Multiple owner_personas detected in: ${repoPath} — skipping`);
    return null;
  }

  return {
    filePath,
    repoPath,
    frontmatter: fm as FoundryFrontmatter,
    rawContent,
  };
}

// ─── Phase 5: PROMOTE ────────────────────────────────────────────────────────

/**
 * Mutates the on-disk markdown file to change `status: currentStatus` → `status: targetStatus`
 * and update `updated_at` to today's date.
 *
 * Strategy: surgical string replacement inside the raw frontmatter block only.
 * We do NOT re-serialize the full YAML (which would reorder keys and cause diff noise).
 * The two regexes target only the relevant lines, preserving everything else verbatim.
 *
 * In --dry-run mode, logs the intended change but does NOT write to disk.
 */
function promoteNodeStatus(node: ParsedNode, currentStatus: Status, targetStatus: Status): void {
  const dateStr = todayISO();
  const dryTag = DRY_RUN ? '[DRY-RUN] ' : '';

  // Locate the frontmatter block: --- ... --- at the start of the file.
  // The block can use LF or CRLF; we handle both.
  const fmBlockMatch = node.rawContent.match(/^---[ \t]*\r?\n([\s\S]*?)\r?\n---[ \t]*/m);
  if (!fmBlockMatch) {
    warn(`${dryTag}Cannot locate frontmatter delimiters for mutation in: ${node.repoPath}`);
    return;
  }

  const originalFmBlock = fmBlockMatch[0];
  let mutatedFmBlock = originalFmBlock;

  // ① Replace status (handles optional single/double quotes and trailing whitespace/CR).
  //    The 'm' flag makes ^ and $ match line boundaries within the block.
  mutatedFmBlock = mutatedFmBlock.replace(
    new RegExp(`^(status:\\s*)["']?${currentStatus}["']?([ \\t\\r]*)$`, 'm'),
    `$1${targetStatus}$2`,
  );

  // Sanity check
  if (mutatedFmBlock === originalFmBlock) {
    warn(`${dryTag}Could not find 'status: ${currentStatus}' line to replace in: ${node.repoPath}`);
    return;
  }

  // ② Replace `updated_at` — handles both quoted and unquoted date values.
  mutatedFmBlock = mutatedFmBlock.replace(
    /^(updated_at:\s*)["']?\d{4}-\d{2}-\d{2}["']?([ \t\r]*)$/m,
    `$1"${dateStr}"$2`,
  );

  const newContent = node.rawContent.replace(originalFmBlock, mutatedFmBlock);

  if (!DRY_RUN) {
    try {
      fs.writeFileSync(node.filePath, newContent, 'utf-8');
    } catch (e) {
      warn(`Failed to write file: ${node.repoPath} — ${String(e)}`);
      return;
    }
  }

  // Update in-memory state so downstream phases see the correct status.
  node.frontmatter.status = targetStatus;
  node.frontmatter.updated_at = dateStr;
  node.rawContent = newContent;

  info(`${dryTag}Promoted ${currentStatus} → ${targetStatus}: ${node.repoPath}`);
}

function promoteNodeToTpm(node: ParsedNode): void {
  const dateStr = todayISO();
  const dryTag = DRY_RUN ? '[DRY-RUN] ' : '';

  const fmBlockMatch = node.rawContent.match(/^---[ \t]*\r?\n([\s\S]*?)\r?\n---[ \t]*/m);
  if (!fmBlockMatch) {
    warn(`${dryTag}Cannot locate frontmatter delimiters for mutation in: ${node.repoPath}`);
    return;
  }

  const originalFmBlock = fmBlockMatch[0];
  let mutatedFmBlock = originalFmBlock;

  mutatedFmBlock = mutatedFmBlock.replace(
    /^(status:\s*)["']?[^"'\r\n]+["']?([ \t\r]*)$/m,
    `$1BLOCKED$2`,
  );

  mutatedFmBlock = mutatedFmBlock.replace(
    /^(owner_persona:\s*)["']?[^"'\r\n]+["']?([ \t\r]*)$/m,
    `$1tpm$2`,
  );

  mutatedFmBlock = mutatedFmBlock.replace(
    /^(updated_at:\s*)["']?\d{4}-\d{2}-\d{2}["']?([ \t\r]*)$/m,
    `$1"${dateStr}"$2`,
  );

  const newContent = node.rawContent.replace(originalFmBlock, mutatedFmBlock);

  if (!DRY_RUN) {
    try {
      fs.writeFileSync(node.filePath, newContent, 'utf-8');
    } catch (e) {
      warn(`Failed to write file: ${node.repoPath} — ${String(e)}`);
      return;
    }
  }

  node.frontmatter.status = 'BLOCKED';
  node.frontmatter.owner_persona = 'tpm';
  node.frontmatter.updated_at = dateStr;
  node.rawContent = newContent;

  info(`${dryTag}Flagged node for TPM: ${node.repoPath}`);
}

// ─── Main ─────────────────────────────────────────────────────────────────────

function main(): void {
  if (DRY_RUN) {
    info('🔍 Dry-run mode active — no files will be modified.');
  }
  if (STRICT) {
    info('⚠️  Strict mode active — unresolvable deps will cause exit(1).');
  }

  const repoRoot = process.cwd();
  const foundryDir = path.join(repoRoot, '.foundry');

  if (!fs.existsSync(foundryDir)) {
    warn(`'.foundry/' directory not found at repo root: ${repoRoot}`);
    console.log(JSON.stringify([]));
    process.exit(0);
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
  const parentToChildren = new Map<string, ParsedNode[]>();

  for (const node of nodes) {
    nodeMap.set(node.repoPath, node);

    const parentPath = node.frontmatter.parent;
    if (parentPath) {
      if (!parentToChildren.has(parentPath)) {
        parentToChildren.set(parentPath, []);
      }
      parentToChildren.get(parentPath)!.push(node);
    }
  }

  let hasUnresolvableDeps = false;

  // Helper to recursively check if a node is blocked.
  // A node is blocked if:
  // 1. Its status is not COMPLETED (and it's not the target node we are evaluating).
  // 2. ANY of its recursive dependencies are blocked.
  // 3. ANY of its recursive children are blocked.
  const evalCache = new Map<string, boolean>();

  // Helper to safely check if 'child' is a deep descendant of 'ancestor'
  function isDescendant(childPath: string, ancestorPath: string): boolean {
    let curr = nodeMap.get(childPath)?.frontmatter.parent;
    while (curr) {
      if (curr === ancestorPath) return true;
      curr = nodeMap.get(curr)?.frontmatter.parent;
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
  function isHierarchicallyIncomplete(nodePath: string, evaluatingFor?: string): boolean {
    const cacheKey = evaluatingFor ? `${nodePath}|${evaluatingFor}` : nodePath;
    // skip caching as it causes test issues since tests mock multiple times within same global env
    // if (evalCache.has(cacheKey)) return evalCache.get(cacheKey)!;

    const node = nodeMap.get(nodePath);

    if (!node) {
      if (fs.existsSync(path.join(repoRoot, nodePath))) {
        evalCache.set(cacheKey, false);
        return false;
      }
      hasUnresolvableDeps = true;
      evalCache.set(cacheKey, true);
      return true;
    }

    if (node.frontmatter.status !== 'COMPLETED') {
      evalCache.set(cacheKey, true);
      return true;
    }

    evalCache.set(cacheKey, true);

    const children = parentToChildren.get(nodePath) || [];
    for (const child of children) {
      if (evaluatingFor && (child.repoPath === evaluatingFor || isDescendant(evaluatingFor, child.repoPath))) {
        continue;
      }
      if (isHierarchicallyIncomplete(child.repoPath, evaluatingFor)) {
        return true;
      }
    }

    for (const depPath of node.frontmatter.depends_on) {
      if (isHierarchicallyIncomplete(depPath, evaluatingFor)) {
        return true;
      }
    }

    evalCache.set(cacheKey, false);
    return false;
  }

  // ── Phase 3.5: SUSPEND (Wait & Wake) ───────────────────────────────────────
  info('Phase 3.5: Checking ACTIVE/COMPLETED nodes for suspension...');
  for (const node of nodes) {
    if (node.frontmatter.status !== 'ACTIVE' && node.frontmatter.status !== 'COMPLETED') continue;

    let shouldSuspend = false;
    for (const depPath of node.frontmatter.depends_on) {
      const dep = nodeMap.get(depPath);
      if (!dep) {
        if (fs.existsSync(path.join(repoRoot, depPath))) {
          continue;
        }
        warn(`Unresolvable dependency '${depPath}' referenced by ${node.frontmatter.status} node: ${node.repoPath}`);
        hasUnresolvableDeps = true;
        shouldSuspend = true;
        break;
      }

      // If it is an ancestor, we only care that it is status ACTIVE or COMPLETED.
      if (!isDescendant(node.repoPath, depPath)) {
        if (isHierarchicallyIncomplete(depPath, node.repoPath)) {
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



    if (shouldSuspend) {
      info(`Suspending ${node.frontmatter.status} node: ${node.repoPath}`);
      promoteNodeStatus(node, node.frontmatter.status, 'PENDING');
    }
  }

  // ── Phase 3.6: IMPOSSIBLE LOOP ─────────────────────────────────────────────
  info('Phase 3.6: Checking for Impossible Loop conditions...');
  for (const node of nodes) {
    if (node.frontmatter.status === 'FAILED' && node.frontmatter.rejection_reason) {
      if (node.frontmatter.parent) {
        const parentNode = nodeMap.get(node.frontmatter.parent);
        if (parentNode && parentNode.frontmatter.status !== 'ACTIVE') {
          info(`Impossible Loop: waking up parent ${parentNode.repoPath}`);
          promoteNodeStatus(parentNode, parentNode.frontmatter.status, 'ACTIVE');
        }
      } else if (node.frontmatter.owner_persona !== 'tpm') {
        info(`Impossible Loop: flagging node without parent for TPM: ${node.repoPath}`);
        promoteNodeToTpm(node);
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
    let currParent = node.frontmatter.parent;
    while (currParent) {
      let parentStatus: string | undefined = undefined;
      let nextParent: string | undefined | null = undefined;

      const parentNode = nodeMap.get(currParent);
      if (!parentNode) {
        if (!fs.existsSync(path.join(repoRoot, currParent))) {
          warn(`Parent '${currParent}' not found for: ${node.repoPath}`);
          blocked = true;
          break;
        } else {
          try {
            const content = fs.readFileSync(path.join(repoRoot, currParent), 'utf-8');
            const m = matter(content);
            parentStatus = m.data['status'] as Status;
            nextParent = m.data['parent'] as string;
          } catch {
            warn(`Parent '${currParent}' could not be parsed for: ${node.repoPath}`);
            blocked = true;
            break;
          }
        }
      } else {
        parentStatus = parentNode.frontmatter.status;
        nextParent = parentNode.frontmatter.parent;
      }

      if (parentStatus !== 'ACTIVE' && parentStatus !== 'COMPLETED') {
        const parentChildren = parentToChildren.get(currParent) || [];
        if (parentStatus === 'PENDING' && parentChildren.length > 0) {
          // Exception for Late-Binding: If parent is PENDING and has children,
          // it is waiting for those children. Do not block the child.
        } else {
          blocked = true;
          break;
        }
      }
      currParent = nextParent;
    }

    if (blocked) continue;

    // Check if node is explicitly blocked by its own incomplete children
    const children = parentToChildren.get(node.repoPath) || [];
    for (const child of children) {
      if (isHierarchicallyIncomplete(child.repoPath, node.repoPath)) {
        blocked = true;
        break;
      }
    }

    if (blocked) continue;

    const deps = node.frontmatter.depends_on;

    for (const depPath of deps) {
      const dep = nodeMap.get(depPath);
      if (!dep) {
        if (fs.existsSync(path.join(repoRoot, depPath))) {
          continue;
        }
        warn(`Unresolvable dependency '${depPath}' referenced by: ${node.repoPath}`);
        hasUnresolvableDeps = true;
        blocked = true;
        break;
      }

      // If it is an ancestor, we only care that it is status ACTIVE or COMPLETED.
      if (!isDescendant(node.repoPath, depPath)) {
        if (isHierarchicallyIncomplete(depPath, node.repoPath)) {
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
      eligible.push(node);
    }
  }

  info(`${eligible.length} node(s) eligible for promotion to READY.`);

  // ── Phase 4.5: IDEMPOTENT GENERATION CHECK ────────────────────────────────
  info('Phase 4.5: Performing idempotent generation checks...');
  const finalEligible: ParsedNode[] = [];
  for (const node of eligible) {
    let shouldBypass = false;

    // We restrict idempotent check to generation nodes (typically non-TASK,
    // but checking for explicit children links is the robust way)
    if (node.frontmatter.type !== 'TASK') {
      const fmMatch = node.rawContent.match(/^---[\s\S]*?---/);
      const body = fmMatch ? node.rawContent.slice(fmMatch[0].length) : node.rawContent;

      const linkRegex = /\]\((?:\.\/)?(\.foundry\/(?:ideas|prds|epics|stories|tasks)\/[^\)]+\.md)\)/g;
      const links = [...body.matchAll(linkRegex)].map(m => m[1]);

      if (links.length > 0) {
        const allExist = links.every(l => nodeMap.has(l));
        const hasChild = links.some(l => nodeMap.get(l)?.frontmatter.parent === node.repoPath);

        if (allExist && hasChild) {
          shouldBypass = true;
        }
      }
    }

    if (shouldBypass) {
      info(`Idempotent check bypassed dispatch for ${node.repoPath} (artifacts already exist).`);
      promoteNodeStatus(node, 'PENDING', 'COMPLETED');

      const dateStr = todayISO();
      const logPath = require('node:path').join(repoRoot, '.foundry/journals/agile_coach.md');
      const logEntry = `\n## ${dateStr}: Pre-existing Artifacts Anomaly\n\n### Observation\nThe orchestrator detected that target artifacts for \`${node.repoPath}\` already existed and were completely formed before dispatch.\n\n### Action Taken\nBypassed Jules session dispatch via idempotent generation check and auto-fulfilled the node.\n`;

      if (!DRY_RUN) {
        try {
          fs.appendFileSync(logPath, logEntry, 'utf-8');
          info(`Logged anomaly to ${logPath}`);
        } catch (e) {
          warn(`Failed to log anomaly to Agile Coach journal: ${String(e)}`);
        }
      }
    } else {
      finalEligible.push(node);
    }
  }

  // ── Phase 5: PROMOTE ───────────────────────────────────────────────────────
  info('Phase 5: Promoting eligible nodes...');
  for (const node of finalEligible) {
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
  // Include both freshly-promoted nodes AND any that were already READY before
  // this run (idempotent: re-running the orchestrator is always safe).
  const readyNodes = nodes
    .filter((n) => n.frontmatter.status === 'READY')
    .map((n) => ({
      ...n.frontmatter,
      repo_path: n.repoPath,
    }));

  info(`Total READY nodes: ${readyNodes.length}`);

  // ── Phase 7: OUTPUT ────────────────────────────────────────────────────────
  // This is the ONLY line written to stdout. The GitHub Actions matrix step
  // captures this exact output via: matrix=$(node ... | tail -1)
  console.log(JSON.stringify(readyNodes));

  // ── Phase 8: EXIT ──────────────────────────────────────────────────────────
  if (hasUnresolvableDeps && STRICT) {
    warn('Exiting with code 1: unresolvable dependency paths detected (--strict mode).');
    process.exit(1);
  }

  process.exit(0);
}

if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith('foundry-orchestrator.ts')) {
  main();
}

export { discoverNodeFiles, parseNodeFile, promoteNodeStatus, main };

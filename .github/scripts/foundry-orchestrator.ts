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
interface FoundryFrontmatter {
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
    } catch (e) {
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
  const repoPath = path.relative(repoRoot, filePath).replace(/\\/g, '/');

  let rawContent: string;
  try {
    rawContent = fs.readFileSync(filePath, 'utf-8');
  } catch (e) {
    warn(`Cannot read file: ${repoPath}`);
    return null;
  }

  // gray-matter throws on malformed YAML — catch gracefully.
  let parsed: ReturnType<typeof matter>;
  try {
    parsed = matter(rawContent);
  } catch (e) {
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

  return {
    filePath,
    repoPath,
    frontmatter: fm as FoundryFrontmatter,
    rawContent,
  };
}

// ─── Phase 5: PROMOTE ────────────────────────────────────────────────────────

/**
 * Mutates the on-disk markdown file to change `status: PENDING` → `status: READY`
 * and update `updated_at` to today's date.
 *
 * Strategy: surgical string replacement inside the raw frontmatter block only.
 * We do NOT re-serialize the full YAML (which would reorder keys and cause diff noise).
 * The two regexes target only the relevant lines, preserving everything else verbatim.
 *
 * In --dry-run mode, logs the intended change but does NOT write to disk.
 */
function promoteNodeToReady(node: ParsedNode): void {
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

  // ① Replace `status: PENDING` (handles optional single/double quotes).
  //    The 'm' flag makes ^ and $ match line boundaries within the block.
  mutatedFmBlock = mutatedFmBlock.replace(
    /^(status:\s*)["']?PENDING["']?([ \t]*)$/m,
    `$1READY$2`,
  );

  // Sanity check — if PENDING wasn't found, something is wrong.
  if (mutatedFmBlock === originalFmBlock) {
    warn(`${dryTag}Could not find 'status: PENDING' line to replace in: ${node.repoPath}`);
    return;
  }

  // ② Replace `updated_at` — handles both quoted and unquoted date values.
  mutatedFmBlock = mutatedFmBlock.replace(
    /^(updated_at:\s*)["']?\d{4}-\d{2}-\d{2}["']?([ \t]*)$/m,
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
  node.frontmatter.status = 'READY';
  node.frontmatter.updated_at = dateStr;
  node.rawContent = newContent;

  info(`${dryTag}Promoted PENDING → READY: ${node.repoPath}`);
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

  // ── Phase 4: RESOLVE ───────────────────────────────────────────────────────
  info('Phase 4: Resolving DAG — finding eligible PENDING nodes...');
  let hasUnresolvableDeps = false;
  const eligible: ParsedNode[] = [];

  // Helper to recursively check if a node is blocked.
  // A node is blocked if:
  // 1. Its status is not COMPLETED (and it's not the target node we are evaluating).
  // 2. ANY of its recursive dependencies are blocked.
  // 3. ANY of its recursive children are blocked.
  const evalCache = new Map<string, boolean>();

  function isBlocked(nodePath: string, visited = new Set<string>()): boolean {
    if (evalCache.has(nodePath)) return evalCache.get(nodePath)!;
    if (visited.has(nodePath)) {
      warn(`Circular dependency detected at ${nodePath}`);
      return true;
    }
    visited.add(nodePath);

    const node = nodeMap.get(nodePath);
    if (!node) {
      hasUnresolvableDeps = true;
      evalCache.set(nodePath, true);
      return true;
    }

    // Unresolved dependencies
    for (const depPath of node.frontmatter.depends_on) {
      const dep = nodeMap.get(depPath);
      if (!dep) {
        warn(`Unresolvable dependency '${depPath}' referenced by: ${nodePath}`);
        hasUnresolvableDeps = true;
        evalCache.set(nodePath, true);
        return true;
      }

      if (dep.frontmatter.status !== 'COMPLETED') {
        evalCache.set(nodePath, true);
        return true;
      }

      if (isBlocked(depPath, visited)) {
        evalCache.set(nodePath, true);
        return true;
      }
    }

    // Hierarchical blocking: ALL children must be COMPLETED
    const children = parentToChildren.get(nodePath) || [];
    for (const child of children) {
      if (child.frontmatter.status !== 'COMPLETED') {
        evalCache.set(nodePath, true);
        return true;
      }
      if (isBlocked(child.repoPath, visited)) {
        evalCache.set(nodePath, true);
        return true;
      }
    }

    visited.delete(nodePath);
    evalCache.set(nodePath, false);
    return false;
  }

  // Helper to safely check if 'child' is a deep descendant of 'ancestor'
  function isDescendant(childPath: string, ancestorPath: string): boolean {
    let curr = nodeMap.get(childPath)?.frontmatter.parent;
    while (curr) {
      if (curr === ancestorPath) return true;
      curr = nodeMap.get(curr)?.frontmatter.parent;
    }
    return false;
  }

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
      const parentNode = nodeMap.get(currParent);
      if (!parentNode) break;

      // Parent blocked by its own dependencies?
      for (const depPath of parentNode.frontmatter.depends_on) {
        const dep = nodeMap.get(depPath);
        if (!dep || dep.frontmatter.status !== 'COMPLETED' || isBlocked(depPath)) {
            blocked = true;
            break;
        }
      }
      if (blocked) break;
      currParent = parentNode.frontmatter.parent;
    }

    if (blocked) continue;

    const deps = node.frontmatter.depends_on;

    for (const depPath of deps) {
      const dep = nodeMap.get(depPath);
      if (!dep) {
        warn(`Unresolvable dependency '${depPath}' referenced by: ${node.repoPath}`);
        hasUnresolvableDeps = true;
        blocked = true;
        break;
      }

      if (dep.frontmatter.status !== 'COMPLETED') {
        blocked = true;
        break;
      }

      // Is the dependency itself structurally blocked?
      // For the dependency's children, skip checking children if the CURRENT node is a descendant of that dependency.
      // E.g. Epic depends on Idea. Idea has no children. Not blocked.
      // Story depends on Epic. Epic has Story as child. Story is descendant of Epic -> Skip child check for Epic.

      // We do a custom check for the dependency so we can exclude checking the current node's path in the children.
      let depStructurallyBlocked = false;
      for(const innerDepPath of dep.frontmatter.depends_on) {
         if(isBlocked(innerDepPath)) {
            depStructurallyBlocked = true;
            break;
         }
      }

      if(depStructurallyBlocked) {
         blocked = true;
         break;
      }

      if (!isDescendant(node.repoPath, depPath)) {
          // It's an external dependency. We must ensure the dependency and ALL its children are completed.
          if(isBlocked(depPath)) {
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

  // ── Phase 5: PROMOTE ───────────────────────────────────────────────────────
  info('Phase 5: Promoting eligible nodes...');
  for (const node of eligible) {
    promoteNodeToReady(node);
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

export { discoverNodeFiles, parseNodeFile, promoteNodeToReady, main };

/**
 * foundry-active.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Transitions a Foundry node from READY to ACTIVE status.
 * Includes a strict "dumb" check to ensure only state fields are modified.
 *
 * Usage:
 *   npx tsx foundry-active.ts <repo-relative-path> <github-run-id>
 * ─────────────────────────────────────────────────────────────────────────────
 */

import * as fs from 'node:fs';
import * as path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const matter = require('gray-matter') as typeof import('gray-matter');

function info(msg: string): void {
  process.stderr.write(`[active-transition] INFO  ${msg}\n`);
}

function error(msg: string): void {
  process.stderr.write(`[active-transition] ERROR ${msg}\n`);
}

function todayISO(): string {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

export function transitionNodeToActive(repoPath: string, sessionId: string, repoRoot: string): void {
  const filePath = path.resolve(repoRoot, repoPath);
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${repoPath}`);
  }

  const rawContent = fs.readFileSync(filePath, 'utf-8');
  const original = matter(rawContent);

  // 1. Pre-validation
  if (original.data['status'] !== 'READY') {
    throw new Error(`Node is not in READY status (current: ${original.data['status']}): ${repoPath}`);
  }

  const dateStr = todayISO();

  // 2. Perform surgical mutation to preserve formatting/order
  const fmBlockMatch = rawContent.match(/^---[ \t]*\r?\n([\s\S]*?)\r?\n---[ \t]*/m);
  if (!fmBlockMatch) {
    throw new Error(`Cannot locate frontmatter delimiters in: ${repoPath}`);
  }

  const originalFmBlock = fmBlockMatch[0];
  let mutatedFmBlock = originalFmBlock;

  const upsertField = (fm: string, key: string, value: string, pattern: RegExp): string => {
    if (pattern.test(fm)) {
      return fm.replace(pattern, `$1"${value}"$2`);
    }
    // Append before the closing ---
    return fm.replace(/\r?\n---[ \t]*$/, `\n${key}: "${value}"\n---`);
  };

  // status: READY -> ACTIVE (handles optional quotes and missing field)
  mutatedFmBlock = upsertField(
    mutatedFmBlock,
    'status',
    'ACTIVE',
    /^(status:\s*)["']?(?:READY|PENDING|ACTIVE)["']?([ \t]*)$/m
  );

  // jules_session_id: null -> sessionId (handles optional quotes and missing field)
  mutatedFmBlock = upsertField(
    mutatedFmBlock,
    'jules_session_id',
    sessionId,
    /^(jules_session_id:\s*)(?:null|["']?.*?["']?)([ \t]*)$/m
  );

  // updated_at: YYYY-MM-DD -> today (handles optional quotes and missing field)
  mutatedFmBlock = upsertField(
    mutatedFmBlock,
    'updated_at',
    dateStr,
    /^(updated_at:\s*)(?:null|["']?.*?["']?)([ \t]*)$/m
  );

  const newContent = rawContent.replace(originalFmBlock, mutatedFmBlock);
  const mutated = matter(newContent);

  // 3. Strict "Dumb" Diff Check
  const allowedChanges = ['status', 'jules_session_id', 'updated_at'];
  const allKeys = new Set([...Object.keys(original.data), ...Object.keys(mutated.data)]);

  const violations: string[] = [];
  for (const key of allKeys) {
    if (allowedChanges.includes(key)) {
      if (key === 'status' && mutated.data['status'] !== 'ACTIVE') {
        violations.push(`Failed to update status to ACTIVE in: ${repoPath}`);
      }
      if (key === 'jules_session_id' && String(mutated.data['jules_session_id']) !== sessionId) {
        violations.push(`Failed to update jules_session_id to ${sessionId} in: ${repoPath}`);
      }
      continue;
    }

    if (JSON.stringify(original.data[key]) !== JSON.stringify(mutated.data[key])) {
      violations.push(`STRICT CHECK VIOLATION: Unexpected change in field '${key}' in: ${repoPath}`);
    }
  }

  if (original.content !== mutated.content) {
    violations.push(`STRICT CHECK VIOLATION: Body content was modified in: ${repoPath}`);
  }

  if (violations.length > 0) {
    throw new Error(`Aborting transition due to strict check violations:\n${violations.join('\n')}`);
  }

  // 4. Persistence
  fs.writeFileSync(filePath, newContent, 'utf-8');
  info(`Successfully transitioned ${repoPath} to ACTIVE (session: ${sessionId})`);
}

async function main() {
  const [repoPath, sessionId] = process.argv.slice(2);

  if (!repoPath || !sessionId) {
    error('Usage: npx tsx foundry-active.ts <repo-relative-path> <jules-session-id>');
    process.exit(1);
  }

  try {
    transitionNodeToActive(repoPath, sessionId, process.cwd());
  } catch (err) {
    error(String(err));
    process.exit(1);
  }
}

if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith('foundry-active.ts')) {
  main();
}

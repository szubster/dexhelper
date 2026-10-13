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
import { fileURLToPath } from 'node:url';
import * as path from 'node:path';
import { createRequire } from 'node:module';
import { todayISO, updateActiveSessionsTable } from './dag-utils.ts';

const require = createRequire(import.meta.url);
const matter = require('gray-matter') as typeof import('gray-matter');

function info(msg: string): void {
  process.stderr.write(`[active-transition] INFO  ${msg}\n`);
}

function error(msg: string): void {
  process.stderr.write(`[active-transition] ERROR ${msg}\n`);
}

export function transitionNodeToActive(repoPath: string, sessionId: string, repoRoot: string): void {
  const filePath = path.resolve(repoRoot, repoPath);
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${repoPath}`);
  }

  const rawContent = fs.readFileSync(filePath, 'utf-8');
  const original = matter(rawContent);

  // 1. Pre-validation
  if (original.data['status'] !== 'READY' && original.data['status'] !== 'VERIFYING') {
    throw new Error(`Node is not in READY or VERIFYING status (current: ${original.data['status']}): ${repoPath}`);
  }

  const dateStr = todayISO();

  // 2. Perform mutation via gray-matter
  const newData = { ...original.data, status: 'ACTIVE', jules_session_id: sessionId, updated_at: dateStr, rejection_reason: '' };
  const newContent = matter.stringify(original.content, newData);

  // 3. Strict Diff Check
  const mutated = matter(newContent);
  const violations: string[] = [];

  if (mutated.data['status'] !== 'ACTIVE') {
    violations.push(`Failed to update status to ACTIVE in: ${repoPath}`);
  }
  if (String(mutated.data['jules_session_id']) !== sessionId) {
    violations.push(`Failed to update jules_session_id to ${sessionId} in: ${repoPath}`);
  }

  if (original.content.trim() !== mutated.content.trim()) {
    violations.push(`STRICT CHECK VIOLATION: Body content was modified in: ${repoPath}`);
  }

  if (violations.length > 0) {
    throw new Error(`Aborting transition due to strict check violations:\n${violations.join('\n')}`);
  }

  // 4. Persistence
  fs.writeFileSync(filePath, newContent, 'utf-8');
  info(`Successfully transitioned ${repoPath} to ACTIVE (session: ${sessionId})`);

  // 5. Update ACTIVE_SESSIONS.md Markdown Table
  try {
    updateActiveSessionsTable(repoRoot);
  } catch (err) {
    error(`Failed to update ACTIVE_SESSIONS.md: ${String(err)}`);
  }
}

async function main() {
  const [repoPath, sessionId] = process.argv.slice(2);

  if (!repoPath || !sessionId) {
    error('Usage: npx tsx foundry-active.ts <repo-relative-path> <jules-session-id>');
    process.exit(1);
  }

  try {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const repoRoot = path.resolve(__dirname, '..', '..');
    transitionNodeToActive(repoPath, sessionId, repoRoot);
  } catch (err) {
    error(String(err));
    process.exit(1);
  }
}

if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith('foundry-active.ts')) {
  void main();
}

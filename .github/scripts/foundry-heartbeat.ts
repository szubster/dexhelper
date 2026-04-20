/**
 * foundry-heartbeat.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Detects "zombie" ACTIVE sessions where the GitHub Action run has failed
 * or been cancelled without updating the node status.
 *
 * Transitions stale nodes from ACTIVE -> FAILED and logs to the TPM journal.
 *
 * Usage:
 *   node --strip-types foundry-heartbeat.ts
 * ─────────────────────────────────────────────────────────────────────────────
 */

import * as fs from 'node:fs';
import * as path from 'node:path';
import { execFileSync } from 'node:child_process';
import { discoverNodeFiles, parseNodeFile } from './foundry-orchestrator.ts';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

function info(msg: string): void {
  process.stderr.write(`[heartbeat] INFO  ${msg}\n`);
}

function error(msg: string): void {
  process.stderr.write(`[heartbeat] ERROR ${msg}\n`);
}

function todayISO(): string {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

function isRunActive(runId: string): boolean {
  try {
    const output = execFileSync('gh', ['run', 'view', runId, '--json', 'status'], { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'pipe'] });
    const data = JSON.parse(output);
    const activeStatuses = ['in_progress', 'queued', 'requested', 'waiting', 'pending'];
    return activeStatuses.includes(data.status);
  } catch (err) {
    // If gh command fails, treat as stale
    error(`Failed to check run status for ${runId}: ${err}`);
    return false;
  }
}

function appendToJournal(repoRoot: string, repoPath: string, runId: string): void {
  const journalDir = path.join(repoRoot, '.foundry', 'journals');
  const tpmJournalPath = path.join(journalDir, 'tpm.md');

  if (!fs.existsSync(journalDir)) {
    fs.mkdirSync(journalDir, { recursive: true });
  }

  const logEntry = `\n- **${todayISO()}**: Transitioned \`${repoPath}\` from \`ACTIVE\` to \`FAILED\` (Stale run ID: \`${runId}\`).\n`;
  fs.appendFileSync(tpmJournalPath, logEntry, 'utf-8');
}

export function transitionNodeToFailed(filePath: string, repoPath: string, repoRoot: string, rawContent: string): void {
  const dateStr = todayISO();

  const fmBlockMatch = rawContent.match(/^---[ \t]*\r?\n([\s\S]*?)\r?\n---[ \t]*/m);
  if (!fmBlockMatch) {
    throw new Error(`Cannot locate frontmatter delimiters in: ${repoPath}`);
  }

  const originalFmBlock = fmBlockMatch[0];
  let mutatedFmBlock = originalFmBlock;

  // status: ACTIVE -> FAILED
  mutatedFmBlock = mutatedFmBlock.replace(
    /^(status:\s*)ACTIVE([ \t]*)$/m,
    `$1FAILED$2`,
  );

  // updated_at
  mutatedFmBlock = mutatedFmBlock.replace(
    /^(updated_at:\s*)["']?\d{4}-\d{2}-\d{2}["']?([ \t]*)$/m,
    `$1"${dateStr}"$2`,
  );

  const newContent = rawContent.replace(originalFmBlock, mutatedFmBlock);
  fs.writeFileSync(filePath, newContent, 'utf-8');
}

export function main() {
  const repoRoot = process.cwd();
  const foundryDir = path.join(repoRoot, '.foundry');

  if (!fs.existsSync(foundryDir)) {
    error(`'.foundry/' directory not found at repo root: ${repoRoot}`);
    process.exit(1);
  }

  const filePaths = discoverNodeFiles(foundryDir);
  let staleCount = 0;

  for (const fp of filePaths) {
    const node = parseNodeFile(fp, repoRoot);
    if (!node) continue;

    if (node.frontmatter.status === 'ACTIVE') {
      const runId = String(node.frontmatter.jules_session_id);

      if (!runId || runId === 'null') {
        info(`Node ${node.repoPath} is ACTIVE but has no valid jules_session_id. Marking as FAILED.`);
        transitionNodeToFailed(node.filePath, node.repoPath, repoRoot, node.rawContent);
        appendToJournal(repoRoot, node.repoPath, runId);
        staleCount++;
        continue;
      }

      info(`Checking status for ACTIVE node: ${node.repoPath} (Run ID: ${runId})`);
      const isActive = isRunActive(runId);

      if (!isActive) {
        info(`Run ${runId} is no longer active. Transitioning ${node.repoPath} to FAILED.`);
        transitionNodeToFailed(node.filePath, node.repoPath, repoRoot, node.rawContent);
        appendToJournal(repoRoot, node.repoPath, runId);
        staleCount++;
      } else {
        info(`Run ${runId} is still active. No action taken for ${node.repoPath}.`);
      }
    }
  }

  info(`Heartbeat check complete. Transitioned ${staleCount} stale node(s).`);
}

if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith('foundry-heartbeat.ts')) {
  main();
}

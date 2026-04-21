/**
 * foundry-heartbeat.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Monitors ACTIVE nodes for zombie Jules sessions.
 * Queries the Jules API for each session ID and transitions the node to FAILED
 * if the session has terminated (e.g., FAILED, COMPLETED) while still in ACTIVE state.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import * as fs from 'node:fs';
import * as path from 'node:path';
import { discoverNodeFiles, parseNodeFile } from './foundry-orchestrator.ts';

const DRY_RUN = process.argv.includes('--dry-run');

function warn(msg: string): void {
  process.stderr.write(`[heartbeat] WARN  ${msg}\n`);
}

function info(msg: string): void {
  process.stderr.write(`[heartbeat] INFO  ${msg}\n`);
}

function todayISO(): string {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

const TERMINAL_STATES = ['FAILED', 'COMPLETED', 'CANCELLED', 'ERROR', 'ABORTED'];

export async function transitionNodeToFailed(node: any, repoRoot: string): Promise<void> {
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
    /^(status:\s*)ACTIVE([ \t]*)$/m,
    `$1FAILED$2`,
  );

  mutatedFmBlock = mutatedFmBlock.replace(
    /^(jules_session_id:\s*)(["']?.*?["']?)([ \t]*)$/m,
    `$1null$3`,
  );

  mutatedFmBlock = mutatedFmBlock.replace(
    /^(updated_at:\s*)["']?\d{4}-\d{2}-\d{2}["']?([ \t]*)$/m,
    `$1"${dateStr}"$2`,
  );

  const newContent = node.rawContent.replace(originalFmBlock, mutatedFmBlock);

  if (!DRY_RUN) {
    try {
      fs.writeFileSync(node.filePath, newContent, 'utf-8');

      const journalDir = path.join(repoRoot, '.foundry', 'journals');
      if (!fs.existsSync(journalDir)) {
        fs.mkdirSync(journalDir, { recursive: true });
      }
      const journalPath = path.join(journalDir, 'tpm.md');
      const logEntry = `\n- **${dateStr}**: Heartbeat detected zombie session for \`${node.frontmatter.id}\` (Session: ${node.frontmatter.jules_session_id}). Transitioned to FAILED.\n`;
      fs.appendFileSync(journalPath, logEntry, 'utf-8');
    } catch (e) {
      warn(`Failed to write file or journal: ${node.repoPath} — ${String(e)}`);
      return;
    }
  }

  info(`${dryTag}Transitioned ACTIVE → FAILED: ${node.repoPath}`);
}


export async function transitionNodeToInReview(node: any, outputs: any[], repoRoot: string): Promise<void> {
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
    /^(status:\s*)ACTIVE([ \t]*)$/m,
    `$1IN_REVIEW$2`,
  );

  let prUrl = null;
  if (outputs && Array.isArray(outputs)) {
    for (const output of outputs) {
      if (output.pullRequest && output.pullRequest.url) {
        prUrl = output.pullRequest.url;
        break;
      }
    }
  }

  // Extract PR number from URL (e.g., https://github.com/owner/repo/pull/123)
  let prNumberStr = 'null';
  if (prUrl) {
    const parts = prUrl.split('/');
    const maybeNumber = parts[parts.length - 1];
    if (maybeNumber && !isNaN(parseInt(maybeNumber, 10))) {
      prNumberStr = maybeNumber;
    }
  }

  mutatedFmBlock = mutatedFmBlock.replace(
    /^(pr_number:\s*)(null|["']?.*?["']?)([ \t]*)$/m,
    `$1${prNumberStr}$3`,
  );

  mutatedFmBlock = mutatedFmBlock.replace(
    /^(updated_at:\s*)["']?\d{4}-\d{2}-\d{2}["']?([ \t]*)$/m,
    `$1"${dateStr}"$2`,
  );

  const newContent = node.rawContent.replace(originalFmBlock, mutatedFmBlock);

  if (!DRY_RUN) {
    try {
      fs.writeFileSync(node.filePath, newContent, 'utf-8');

      const journalDir = path.join(repoRoot, '.foundry', 'journals');
      if (!fs.existsSync(journalDir)) {
        fs.mkdirSync(journalDir, { recursive: true });
      }
      const journalPath = path.join(journalDir, 'tpm.md');
      const logEntry = `\n- **${dateStr}**: Heartbeat detected completed session for \`${node.frontmatter.id}\` (Session: ${node.frontmatter.jules_session_id}). Transitioned to IN_REVIEW with PR #${prNumberStr}.\n`;
      fs.appendFileSync(journalPath, logEntry, 'utf-8');
    } catch (e) {
      warn(`Failed to write file or journal: ${node.repoPath} — ${String(e)}`);
      return;
    }
  }

  info(`${dryTag}Transitioned ACTIVE → IN_REVIEW: ${node.repoPath} (PR: ${prNumberStr})`);
}

export async function main() {
  const apiKey = process.env.JULES_API_KEY;
  if (!apiKey) {
    warn('JULES_API_KEY environment variable is not set.');
  }

  const repoRoot = process.cwd();
  const foundryDir = path.join(repoRoot, '.foundry');

  if (!fs.existsSync(foundryDir)) {
    warn(`'.foundry/' directory not found at repo root: ${repoRoot}`);
    process.exit(0);
  }

  const filePaths = discoverNodeFiles(foundryDir);
  const activeNodes = [];

  for (const fp of filePaths) {
    const node = parseNodeFile(fp, repoRoot);
    if (node && node.frontmatter.status === 'ACTIVE') {
      activeNodes.push(node);
    }
  }

  info(`Found ${activeNodes.length} ACTIVE node(s).`);

  for (const node of activeNodes) {
    const sessionId = node.frontmatter.jules_session_id;
    if (!sessionId || sessionId === 'null') {
      warn(`Node ${node.repoPath} is ACTIVE but has no jules_session_id. Treating as FAILED.`);
      await transitionNodeToFailed(node, repoRoot);
      continue;
    }

    if (!apiKey) {
      continue; // Skip API check if no key is provided, but we still handled null IDs above
    }

    try {
      const res = await fetch(`https://jules.googleapis.com/v1alpha/sessions/${sessionId}`, {
        headers: {
          'X-Goog-Api-Key': apiKey
        }
      });

      const data = await res.json();

      if (res.status === 404 || data.error?.status === 'NOT_FOUND') {
        info(`Session ${sessionId} not found (404). Treating as FAILED.`);
        await transitionNodeToFailed(node, repoRoot);
      } else if (res.ok && data) {
        let hasOpenPR = false;

        if (data.outputs && Array.isArray(data.outputs)) {
          for (const output of data.outputs) {
            if (output.pullRequest && output.pullRequest.url) {
              hasOpenPR = true;
              break;
            }
          }
        }

        if (hasOpenPR) {
          info(`Session ${sessionId} has created a PR (State: ${data.state}). Transitioning to IN_REVIEW.`);
          await transitionNodeToInReview(node, data.outputs, repoRoot);
        } else if (data.state && TERMINAL_STATES.includes(data.state)) {
          info(`Session ${sessionId} is in terminal state '${data.state}' without a PR. Treating as FAILED.`);
          await transitionNodeToFailed(node, repoRoot);
        } else {
          info(`Session ${sessionId} is in state '${data.state || 'UNKNOWN'}'. Leaving as ACTIVE.`);
        }
      }
    } catch (err) {
      warn(`Failed to check session ${sessionId}: ${String(err)}`);
    }
  }
}

if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith('foundry-heartbeat.ts')) {
  main().catch(err => {
    warn(`Fatal error: ${String(err)}`);
    process.exit(1);
  });
}

/**
 * foundry-heartbeat.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Monitors ACTIVE nodes for Jules sessions and PR status.
 * Transitions nodes directly to COMPLETED (merged) or resurrects to READY (rejected).
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

const TERMINAL_STATES = ['FAILED', 'COMPLETED'];

/** Surgical mutation to FAILED */
export async function transitionNodeToFailed(node: any, repoRoot: string): Promise<void> {
  const dateStr = todayISO();
  const dryTag = DRY_RUN ? '[DRY-RUN] ' : '';

  const fmBlockMatch = node.rawContent.match(/^---[ \t]*\r?\n([\s\S]*?)\r?\n---[ \t]*/m);
  if (!fmBlockMatch) return;

  const originalFmBlock = fmBlockMatch[0];
  let mutatedFmBlock = originalFmBlock;

  mutatedFmBlock = mutatedFmBlock.replace(/^(status:\s*)["']?ACTIVE["']?([ \t]*)$/m, `$1"FAILED"$2`);
  mutatedFmBlock = mutatedFmBlock.replace(/^(jules_session_id:\s*)(?:null|["']?.*?["']?)([ \t]*)$/m, `$1null$2`);
  mutatedFmBlock = mutatedFmBlock.replace(/^(updated_at:\s*)(?:null|["']?.*?["']?)([ \t]*)$/m, `$1"${dateStr}"$2`);

  const newContent = node.rawContent.replace(originalFmBlock, mutatedFmBlock);

  if (!DRY_RUN) {
    fs.writeFileSync(node.filePath, newContent, 'utf-8');
    logToJournal(repoRoot, `\n- **${dateStr}**: Heartbeat detected zombie session for \`${node.frontmatter.id}\`. Transitioned to FAILED.\n`);
  }
  info(`${dryTag}Transitioned ACTIVE → FAILED: ${node.repoPath}`);
}

/** Surgical mutation to COMPLETED */
export async function transitionNodeToCompleted(node: any, repoRoot: string, prNumber: number): Promise<void> {
  const dateStr = todayISO();
  const dryTag = DRY_RUN ? '[DRY-RUN] ' : '';

  const fmBlockMatch = node.rawContent.match(/^---[ \t]*\r?\n([\s\S]*?)\r?\n---[ \t]*/m);
  if (!fmBlockMatch) return;

  const originalFmBlock = fmBlockMatch[0];
  let mutatedFmBlock = originalFmBlock;

  mutatedFmBlock = mutatedFmBlock.replace(/^(status:\s*)["']?ACTIVE["']?([ \t]*)$/m, `$1"COMPLETED"$2`);
  mutatedFmBlock = mutatedFmBlock.replace(/^(jules_session_id:\s*)(?:null|["']?.*?["']?)([ \t]*)$/m, `$1null$2`);
  mutatedFmBlock = mutatedFmBlock.replace(/^(updated_at:\s*)(?:null|["']?.*?["']?)([ \t]*)$/m, `$1"${dateStr}"$2`);

  const newContent = node.rawContent.replace(originalFmBlock, mutatedFmBlock);

  if (!DRY_RUN) {
    fs.writeFileSync(node.filePath, newContent, 'utf-8');
    logToJournal(repoRoot, `\n- **${dateStr}**: PR #${prNumber} merged. \`${node.frontmatter.id}\` is now COMPLETED.\n`);
  }
  info(`${dryTag}Transitioned ACTIVE → COMPLETED: ${node.repoPath} (PR #${prNumber})`);
}

/** Surgical mutation back to READY (Resurrection) */
export async function transitionNodeToReady(node: any, repoRoot: string, reason: string): Promise<void> {
  const dateStr = todayISO();
  const dryTag = DRY_RUN ? '[DRY-RUN] ' : '';

  const fmBlockMatch = node.rawContent.match(/^---[ \t]*\r?\n([\s\S]*?)\r?\n---[ \t]*/m);
  if (!fmBlockMatch) return;

  const originalFmBlock = fmBlockMatch[0];
  let mutatedFmBlock = originalFmBlock;

  mutatedFmBlock = mutatedFmBlock.replace(/^(status:\s*)["']?(?:FAILED|ACTIVE)["']?([ \t]*)$/m, `$1"READY"$2`);
  mutatedFmBlock = mutatedFmBlock.replace(/^(jules_session_id:\s*)(?:null|["']?.*?["']?)([ \t]*)$/m, `$1null$2`);

  if (/^rejection_count:/m.test(mutatedFmBlock)) {
    mutatedFmBlock = mutatedFmBlock.replace(/^rejection_count:\s*(\d+)/m, (_: string, count: string) => `rejection_count: ${parseInt(count, 10) + 1}`);
  } else {
    mutatedFmBlock = mutatedFmBlock.replace(/^status: READY/m, `status: READY\nrejection_count: 1`);
  }
  mutatedFmBlock = mutatedFmBlock.replace(/^(updated_at:\s*)(?:null|["']?.*?["']?)([ \t]*)$/m, `$1"${dateStr}"$2`);

  const newContent = node.rawContent.replace(originalFmBlock, mutatedFmBlock);

  if (!DRY_RUN) {
    fs.writeFileSync(node.filePath, newContent, 'utf-8');
    logToJournal(repoRoot, `\n- **${dateStr}**: Resurrection Loop triggered for \`${node.frontmatter.id}\`. Reason: ${reason}. Transitioned back to READY.\n`);
  }
  info(`${dryTag}Resurrected → READY: ${node.repoPath} (${reason})`);
}

/** Robust discovery: Jules Session -> GitHub Search -> GitHub List */
async function findPRForSession(
  repoFullName: string,
  githubToken: string,
  julesKey: string,
  sessionId: string,
  nodeId: string
): Promise<{ pr: any; sessionStatus: string | null }> {
  let sessionStatus: string | null = null;
  let prData: any = null;

  // 1. Fetch Jules session details (Primary Source of Truth)
  try {
    const res = await fetch(`https://jules.googleapis.com/v1alpha/sessions/${sessionId}`, {
      headers: { 'X-Goog-Api-Key': julesKey }
    });
    if (res.ok) {
      const data = await res.json() as any;
      sessionStatus = data.state || null;
      
      const prUrl = data.outputs?.find((o: any) => o.pullRequest?.url)?.pullRequest.url;
      if (prUrl) {
        const match = prUrl.match(/pull\/(\d+)$/);
        if (match) {
          const prNumber = parseInt(match[1], 10);
          const prRes = await fetch(`https://api.github.com/repos/${repoFullName}/pulls/${prNumber}`, {
            headers: { 'Authorization': `Bearer ${githubToken}`, 'Accept': 'application/vnd.github.v3+json' }
          });
          if (prRes.ok) {
            prData = await prRes.json();
          }
        }
      }
    } else if (res.status === 404) {
      sessionStatus = 'NOT_FOUND';
    }
  } catch (err) {
    process.stderr.write(`[heartbeat] Jules API error: ${String(err)}\n`);
  }

  if (prData) return { pr: prData, sessionStatus };

  // 2. Fallback to GitHub Search API (Index-dependent)
  try {
    const searchRes = await fetch(`https://api.github.com/search/issues?q=repo:${repoFullName}+is:pr+${sessionId}`, {
      headers: { 'Authorization': `Bearer ${githubToken}`, 'Accept': 'application/vnd.github.v3+json' }
    });
    const searchJson = await searchRes.json() as any;
    if (searchJson.items?.[0]) return { pr: searchJson.items[0], sessionStatus };
  } catch (err) { /* ignore search error */ }

  // 3. Fallback to listing recent PRs (Index-independent)
  try {
    const pullsRes = await fetch(`https://api.github.com/repos/${repoFullName}/pulls?state=all&per_page=30`, {
      headers: { 'Authorization': `Bearer ${githubToken}`, 'Accept': 'application/vnd.github.v3+json' }
    });
    const pulls = await pullsRes.json() as any;
    if (Array.isArray(pulls)) {
      for (const pr of pulls) {
        if (pr.body?.includes(sessionId) || pr.head?.ref?.includes(sessionId)) {
          return { pr, sessionStatus };
        }
      }
    }
  } catch (err) { /* ignore list error */ }

  return { pr: null, sessionStatus };
}

function logToJournal(repoRoot: string, entry: string): void {
  const journalDir = path.join(repoRoot, '.foundry', 'journals');
  if (!fs.existsSync(journalDir)) fs.mkdirSync(journalDir, { recursive: true });
  fs.appendFileSync(path.join(journalDir, 'tpm.md'), entry, 'utf-8');
}

export async function main() {
  const julesKey = process.env.JULES_API_KEY;
  const githubToken = process.env.GITHUB_TOKEN;
  const repoFullName = process.env.GITHUB_REPOSITORY || 'szubster/dexhelper';
  
  if (!julesKey || !githubToken) {
    warn('Missing JULES_API_KEY or GITHUB_TOKEN. Skipping remote checks.');
    return;
  }

  const repoRoot = process.cwd();
  const filePaths = discoverNodeFiles(path.join(repoRoot, '.foundry'));
  const activeNodes = [];
  const failedNodes = [];

  for (const fp of filePaths) {
    const node = parseNodeFile(fp, repoRoot);
    if (!node) continue;
    if (node.frontmatter.status === 'ACTIVE') activeNodes.push(node);
    if (node.frontmatter.status === 'FAILED') failedNodes.push(node);
  }

  info(`Monitoring ${activeNodes.length} ACTIVE and ${failedNodes.length} FAILED nodes.`);

  // --- Pass 1: Check ACTIVE Nodes ---
  for (const node of activeNodes) {
    const sessionId = node.frontmatter.jules_session_id;
    const isHuman = node.frontmatter.owner_persona === 'human';

    if (!isHuman && (!sessionId || sessionId === 'null')) {
      warn(`Node ${node.repoPath} is ACTIVE but missing session ID. Failing.`);
      await transitionNodeToFailed(node, repoRoot);
      continue;
    }

    let pr: any = null;
    let sessionStatus: string | null = null;

    if (isHuman) {
      const prNumber = node.frontmatter.pr_number;
      if (prNumber) {
        try {
          const prRes = await fetch(`https://api.github.com/repos/${repoFullName}/pulls/${prNumber}`, {
            headers: { 'Authorization': `Bearer ${githubToken}`, 'Accept': 'application/vnd.github.v3+json' }
          });
          if (prRes.ok) {
            pr = await prRes.json();
          }
        } catch (err) {
          process.stderr.write(`[heartbeat] GitHub API error for human task: ${String(err)}\n`);
        }
      }
    } else {
      // A. Robust PR Discovery
      const res = await findPRForSession(repoFullName, githubToken, julesKey, sessionId, node.frontmatter.id);
      pr = res.pr;
      sessionStatus = res.sessionStatus;
    }

    if (pr) {
      if (pr.state === 'closed') {
        // If from search, it might lack 'merged' property. Ensure we have the detail.
        let isMerged = pr.merged;
        if (isMerged === undefined) {
          const detailRes = await fetch(`https://api.github.com/repos/${repoFullName}/pulls/${pr.number}`, {
            headers: { 'Authorization': `Bearer ${githubToken}`, 'Accept': 'application/vnd.github.v3+json' }
          });
          const detail = await detailRes.json() as any;
          isMerged = detail.merged;
        }

        if (isMerged) {
          await transitionNodeToCompleted(node, repoRoot, pr.number);
          continue;
        } else {
          await transitionNodeToReady(node, repoRoot, `PR #${pr.number} closed without merging.`);
          continue;
        }
      } else {
        info(`Node ${node.repoPath} has open PR #${pr.number}. Keeping ACTIVE.`);
        continue;
      }
    }

    // B. Terminal State check (Zombie detection)
    if (!isHuman) {
      if (sessionStatus === 'NOT_FOUND' || (sessionStatus && TERMINAL_STATES.includes(sessionStatus))) {
        info(`Session ${sessionId} (Status: ${sessionStatus}) terminated without PR. Failing.`);
        await transitionNodeToFailed(node, repoRoot);
      }
    }
  }

  // --- Pass 2: Check FAILED Nodes ---
  for (const node of failedNodes) {
    await transitionNodeToReady(node, repoRoot, `Retry from FAILED status.`);
  }
}

if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith('foundry-heartbeat.ts')) {
  main().catch(err => { warn(`Fatal: ${String(err)}`); process.exit(1); });
}

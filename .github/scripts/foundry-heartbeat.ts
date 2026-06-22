/**
 * foundry-heartbeat.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Monitors ACTIVE nodes for Jules sessions and PR status.
 * Transitions nodes directly to COMPLETED (merged) or resurrects to READY (rejected).
 * ─────────────────────────────────────────────────────────────────────────────
 */

import * as fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import * as path from 'node:path';
import matter from 'gray-matter';
import { discoverNodeFiles, parseNodeFile } from './foundry-orchestrator.ts';
import { todayISO } from './dag-utils.ts';

const DRY_RUN = process.argv.includes('--dry-run');

function warn(msg: string): void {
  process.stderr.write(`[heartbeat] WARN  ${msg}\n`);
}

function info(msg: string): void {
  process.stderr.write(`[heartbeat] INFO  ${msg}\n`);
}

const TERMINAL_STATES = ['FAILED', 'COMPLETED'];

/** Extracts and strictly validates jules_session_id from a node */
function getSessionId(node: any): string | null {
  const rawId = node.frontmatter.jules_session_id;
  if (typeof rawId !== 'string') return null;
  const trimmed = rawId.trim();
  if (!trimmed || trimmed === 'null' || trimmed === 'undefined') return null;
  return trimmed;
}

/** Surgical mutation to FAILED */
export async function transitionNodeToFailed(node: any, repoRoot: string, rejectionReason?: string): Promise<void> {
  const dateStr = todayISO();
  const dryTag = DRY_RUN ? '[DRY-RUN] ' : '';

  const parsed = matter(node.rawContent);
  parsed.data.status = 'FAILED';
  parsed.data.jules_session_id = null;
  parsed.data.updated_at = dateStr;

  if (rejectionReason) {
    parsed.data.rejection_reason = rejectionReason;
  }

  const newContent = matter.stringify(parsed.content, parsed.data);

  if (!DRY_RUN) {
    fs.writeFileSync(node.filePath, newContent, 'utf-8');
  }
  info(`${dryTag}Transitioned ACTIVE → FAILED: ${node.repoPath}`);
}

/** Surgical mutation to COMPLETED or PENDING depending on tasks */
export async function transitionNodeToCompleted(node: any, repoRoot: string, prNumber: number): Promise<void> {
  const dateStr = todayISO();
  const dryTag = DRY_RUN ? '[DRY-RUN] ' : '';

  const parsed = matter(node.rawContent);

  // Late-Binding Support: If unchecked tasks exist, check if node is a parent.
  const acceptanceCriteriaMatch = parsed.content.match(/## Acceptance Criteria\s*([\s\S]*?)(?:\n## |$)/);
  const acceptanceCriteriaText = acceptanceCriteriaMatch ? acceptanceCriteriaMatch[1] : '';
  const hasUncheckedTasks = /^\s*-\s*\[\s\]/m.test(acceptanceCriteriaText);

  if (hasUncheckedTasks) {
    // Determine if it's a late-binding parent
    // Build a quick children check
    const filePaths = discoverNodeFiles(path.join(repoRoot, '.foundry'));
    let hasChildren = false;
    for (const fp of filePaths) {
      if (fp === node.filePath) continue;
      const childNode = parseNodeFile(fp, repoRoot);
      if (childNode && (childNode.frontmatter.parent === node.repoPath || childNode.frontmatter.parent === node.frontmatter.id)) {
        hasChildren = true;
        break;
      }
    }

    const type = parsed.data.type || node.frontmatter.type;

    if (hasChildren || ["IDEA", "PRD", "EPIC", "STORY"].includes(type)) {
       parsed.data.status = "PENDING";
       parsed.data.jules_session_id = null;
       parsed.data.updated_at = dateStr;
       parsed.data.rejection_reason = '';

       const newContent = matter.stringify(parsed.content, parsed.data);

       if (!DRY_RUN) {
         fs.writeFileSync(node.filePath, newContent, 'utf-8');
       }
       info(`${dryTag}Transitioned ACTIVE → PENDING: ${node.repoPath} (PR #${prNumber})`);
       return;
    } else {
       parsed.data.status = "FAILED";
       parsed.data.jules_session_id = null;
       parsed.data.updated_at = dateStr;
       parsed.data.rejection_reason = "Merged with unfulfilled acceptance criteria";

       const newContent = matter.stringify(parsed.content, parsed.data);

       if (!DRY_RUN) {
         fs.writeFileSync(node.filePath, newContent, 'utf-8');
       }
       info(`${dryTag}Transitioned ACTIVE → FAILED: ${node.repoPath} (PR #${prNumber})`);
       return;
    }
  }

  const nodeType = parsed.data.type || node.frontmatter.type;
  if (["IDEA", "PRD", "EPIC"].includes(nodeType)) {
    parsed.data.status = "VERIFYING";
    parsed.data.jules_session_id = null;
    parsed.data.updated_at = dateStr;
    parsed.data.rejection_reason = '';

    const newContent = matter.stringify(parsed.content, parsed.data);

    if (!DRY_RUN) {
      fs.writeFileSync(node.filePath, newContent, 'utf-8');
    }
    info(`${dryTag}Transitioned ACTIVE → VERIFYING: ${node.repoPath} (PR #${prNumber})`);
  } else {
    parsed.data.status = "COMPLETED";
    parsed.data.jules_session_id = null;
    parsed.data.updated_at = dateStr;
    parsed.data.rejection_reason = '';

    const newContent = matter.stringify(parsed.content, parsed.data);

    if (!DRY_RUN) {
      fs.writeFileSync(node.filePath, newContent, 'utf-8');
    }
    info(`${dryTag}Transitioned ACTIVE → COMPLETED: ${node.repoPath} (PR #${prNumber})`);
  }
}

/** Surgical mutation back to READY (Resurrection) */
export async function transitionNodeToReady(node: any, repoRoot: string, reason: string): Promise<void> {
  const dateStr = todayISO();
  const dryTag = DRY_RUN ? '[DRY-RUN] ' : '';

  const parsed = matter(node.rawContent);
  const newRejectionCount = (parsed.data.rejection_count || 0) + 1;
  parsed.data.rejection_count = newRejectionCount;
  parsed.data.updated_at = dateStr;

  if (newRejectionCount >= 3) {
    parsed.data.status = "FAILED";
    parsed.data.rejection_reason = "Max rejection count reached";
    const newContent = matter.stringify(parsed.content, parsed.data);
    if (!DRY_RUN) {
      fs.writeFileSync(node.filePath, newContent, 'utf-8');
    }
    info(`${dryTag}Max rejection count reached → FAILED: ${node.repoPath} (${reason})`);
  } else {
    const currentStatus = parsed.data.status || node.frontmatter.status;
    if (currentStatus === "VERIFYING") {
      parsed.data.status = "VERIFYING";
      parsed.data.jules_session_id = null;
      parsed.data.rejection_reason = '';
      const newContent = matter.stringify(parsed.content, parsed.data);

      if (!DRY_RUN) {
        fs.writeFileSync(node.filePath, newContent, 'utf-8');
      }
      info(`${dryTag}Resurrected → VERIFYING: ${node.repoPath} (${reason})`);
    } else {
      parsed.data.status = "READY";
      parsed.data.jules_session_id = null;
      parsed.data.rejection_reason = '';
      const newContent = matter.stringify(parsed.content, parsed.data);

      if (!DRY_RUN) {
        fs.writeFileSync(node.filePath, newContent, 'utf-8');
      }
      info(`${dryTag}Resurrected → READY: ${node.repoPath} (${reason})`);
    }
  }
}


/** Surgical mutation back to READY without penalty (Jules System Failure) */
export async function transitionNodeToReadyWithoutPenalty(node: any, repoRoot: string, reason: string): Promise<void> {
  const dateStr = todayISO();
  const dryTag = DRY_RUN ? '[DRY-RUN] ' : '';

  const parsed = matter(node.rawContent);

  const currentStatus = parsed.data.status || node.frontmatter.status;
  if (currentStatus === "VERIFYING") {
    parsed.data.status = "VERIFYING";
    parsed.data.jules_session_id = null;
    parsed.data.updated_at = dateStr;
    parsed.data.rejection_reason = '';

    const newContent = matter.stringify(parsed.content, parsed.data);

    if (!DRY_RUN) {
      fs.writeFileSync(node.filePath, newContent, 'utf-8');
    }
    info(`${dryTag}System failure detected → VERIFYING: ${node.repoPath} (${reason})`);
  } else {
    parsed.data.status = "READY";
    parsed.data.jules_session_id = null;
    parsed.data.updated_at = dateStr;
    parsed.data.rejection_reason = '';

    const newContent = matter.stringify(parsed.content, parsed.data);

    if (!DRY_RUN) {
      fs.writeFileSync(node.filePath, newContent, 'utf-8');
    }
    info(`${dryTag}System failure detected → READY: ${node.repoPath} (${reason})`);
  }
}

/** Robust discovery: Jules Session -> GitHub Search -> GitHub List */
async function findPRForSession(
  repoFullName: string,
  githubToken: string,
  julesKey: string,
  sessionId: string
): Promise<{ pr: any; sessionStatus: string | null; updateTime?: string }> {
  let sessionStatus: string | null = null;
  let updateTime: string | undefined;

  let prData: any = null;


  // 1. Fetch Jules session details (Primary Source of Truth)
  try {
    const res = await fetch(`https://jules.googleapis.com/v1alpha/sessions/${sessionId}`, {
      headers: { 'X-Goog-Api-Key': julesKey }
    });
    if (res.ok) {
      const data = await res.json() as any;
      sessionStatus = data.state || null;
      updateTime = data.updateTime;
      
      let prUrl;
      if (Array.isArray(data.outputs)) {
        prUrl = data.outputs.find((o: any) => o.pullRequest?.url)?.pullRequest.url;
      } else if (data.outputs && typeof data.outputs === 'object') {
        const key = Object.keys(data.outputs).find(k => data.outputs[k]?.pullRequest?.url);
        if (key) prUrl = data.outputs[key].pullRequest.url;
      }
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

  if (prData) return { pr: prData, sessionStatus, updateTime };

  // 2. Fallback to GitHub Search API (Index-dependent)
  try {
    const searchRes = await fetch(`https://api.github.com/search/issues?q=repo:${repoFullName}+is:pr+${sessionId}`, {
      headers: { 'Authorization': `Bearer ${githubToken}`, 'Accept': 'application/vnd.github.v3+json' }
    });
    const searchJson = await searchRes.json() as any;
    if (searchJson.items?.[0]) return { pr: searchJson.items[0], sessionStatus, updateTime };
  } catch { /* ignore search error */ }

  // 3. Fallback to listing recent PRs (Index-independent)
  try {
    const pullsRes = await fetch(`https://api.github.com/repos/${repoFullName}/pulls?state=all&per_page=30`, {
      headers: { 'Authorization': `Bearer ${githubToken}`, 'Accept': 'application/vnd.github.v3+json' }
    });
    const pulls = await pullsRes.json() as any;
    if (Array.isArray(pulls)) {
      for (const pr of pulls) {
        if (pr.body?.includes(sessionId) || pr.head?.ref?.includes(sessionId)) {
          return { pr, sessionStatus, updateTime };
        }
      }
    }
  } catch { /* ignore list error */ }

  return { pr: null, sessionStatus, updateTime };
}

export async function main() {
  const julesKey = process.env.JULES_API_KEY;
  const githubToken = process.env.GITHUB_TOKEN;
  const repoFullName = process.env.GITHUB_REPOSITORY || 'szubster/dexhelper';
  
  if (!julesKey || !githubToken) {
    warn('Missing JULES_API_KEY or GITHUB_TOKEN. Skipping remote checks.');
    return;
  }

  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const repoRoot = path.resolve(__dirname, '..', '..');
  const filePaths = discoverNodeFiles(path.join(repoRoot, '.foundry'));
  const activeNodes = [];
  const failedNodes = [];

  for (const fp of filePaths) {
    const node = parseNodeFile(fp, repoRoot);
    if (!node) continue;
    if (node.frontmatter.status === 'ACTIVE' || node.frontmatter.status === 'VERIFYING') activeNodes.push(node);
    if (node.frontmatter.status === 'FAILED') failedNodes.push(node);
  }

  info(`Monitoring ${activeNodes.length} ACTIVE/VERIFYING and ${failedNodes.length} FAILED nodes.`);

  // --- Pass 1: Check ACTIVE Nodes ---
  for (const node of activeNodes) {
    const sessionId = getSessionId(node);
    const isHuman = node.frontmatter.owner_persona === 'human';

    if (!isHuman && !sessionId && (node.frontmatter.status === 'ACTIVE' || node.frontmatter.status === 'VERIFYING')) {
      warn(`Node ${node.repoPath} is ${node.frontmatter.status} but missing session ID. Failing.`);
      await transitionNodeToFailed(node, repoRoot, `${node.frontmatter.status} node missing or malformed session ID`);
      continue;
    }

    let pr: any = null;
    let sessionStatus: string | null = null;
  let updateTime: string | undefined;

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
      const res = await findPRForSession(repoFullName, githubToken, julesKey, sessionId as string);
      pr = res.pr;
      sessionStatus = res.sessionStatus;
      updateTime = res.updateTime;
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
      if (sessionStatus && TERMINAL_STATES.includes(sessionStatus)) {
        info(`Session ${sessionId} (Status: ${sessionStatus}) terminated without PR. Transitioning to READY without penalty.`);
        await transitionNodeToReadyWithoutPenalty(node, repoRoot, `Session terminated with state: ${sessionStatus}`);
      } else if (sessionStatus === 'NOT_FOUND') {
        info(`Session ${sessionId} NOT_FOUND without PR. Failing.`);
        await transitionNodeToFailed(node, repoRoot, `Session terminated with state: NOT_FOUND`);
      } else if (updateTime) {
        const lastUpdate = new Date(updateTime).getTime();
        const now = Date.now();
        const hoursElapsed = (now - lastUpdate) / (1000 * 60 * 60);

        if (hoursElapsed > 24) {
          info(`Session ${sessionId} has been IN_PROGRESS for >24h. Assuming dead. Transitioning to READY without penalty.`);
          await transitionNodeToReadyWithoutPenalty(node, repoRoot, 'Session timed out (>24h)');
        }
      }
    }
  }

  // --- Pass 2: Check FAILED Nodes ---
  for (const node of failedNodes) {
    const parsed = matter(node.rawContent);
    const rejectionCount = parsed.data.rejection_count || 0;
    if (rejectionCount >= 3) {
      info(`Skipping retry for ${node.repoPath} because rejection_count (${rejectionCount}) >= 3.`);
    } else {
      await transitionNodeToReady(node, repoRoot, `Retry from FAILED status.`);
    }
  }

  // --- Pass 3: Remote Branch Cleanup ---
  await cleanupRemoteBranches(repoRoot, repoFullName, githubToken);
}

if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith('foundry-heartbeat.ts')) {
  main().catch(err => { warn(`Fatal: ${String(err)}`); process.exit(1); });
}

/**
 * Identifies Git branches that are safe to delete, based on FAILED or CANCELLED task nodes.
 * @param repoRoot Absolute path to the repository root.
 * @param remoteBranches List of all remote branch names (e.g. from `git branch -r`).
 * @returns An array of branch names safe to delete.
 */
export async function cleanupRemoteBranches(repoRoot: string, repoFullName: string, githubToken: string): Promise<void> {
  try {
    // 1. Fetch open PR head refs
    const openPrsRes = await fetch(`https://api.github.com/repos/${repoFullName}/pulls?state=open&per_page=100`, {
      headers: { 'Authorization': `Bearer ${githubToken}`, 'Accept': 'application/vnd.github.v3+json' }
    });
    let openPrHeadRefs: string[] = [];
    if (openPrsRes.ok) {
      const openPrs = await openPrsRes.json() as any[];
      if (Array.isArray(openPrs)) {
        openPrHeadRefs = openPrs.map(pr => pr?.head?.ref).filter(Boolean);
      }
    } else {
      warn(`Failed to fetch open PRs: ${openPrsRes.status} ${openPrsRes.statusText}`);
      return;
    }

    // 2. Fetch all remote branches
    const refsRes = await fetch(`https://api.github.com/repos/${repoFullName}/git/matching-refs/heads/`, {
      headers: { 'Authorization': `Bearer ${githubToken}`, 'Accept': 'application/vnd.github.v3+json' }
    });
    let remoteBranches: string[] = [];
    if (refsRes.ok) {
      const refs = await refsRes.json() as any[];
      // refs have form "refs/heads/branch-name", strip prefix
      if (Array.isArray(refs)) {
        remoteBranches = refs.map(ref => ref?.ref?.replace('refs/heads/', '')).filter(Boolean);
      }
    } else {
      warn(`Failed to fetch remote refs: ${refsRes.status} ${refsRes.statusText}`);
      return;
    }

    // 3. Identify branches to cleanup
    const branchesToDelete = await identifyBranchesForCleanup(repoRoot, remoteBranches, openPrHeadRefs);

    if (branchesToDelete.length === 0) {
      info(`No remote branches require cleanup.`);
      return;
    }

    // 4. Delete branches
    for (const branch of branchesToDelete) {
      if (DRY_RUN) {
        info(`[DRY-RUN] Would delete remote branch: ${branch}`);
      } else {
        const deleteRes = await fetch(`https://api.github.com/repos/${repoFullName}/git/refs/heads/${branch}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${githubToken}`, 'Accept': 'application/vnd.github.v3+json' }
        });

        if (deleteRes.ok || deleteRes.status === 404 /* already deleted? */) {
          info(`Deleted remote branch: ${branch}`);
        } else {
          warn(`Failed to delete remote branch ${branch}: ${deleteRes.status} ${deleteRes.statusText}`);
        }
      }
    }
  } catch (err) {
    warn(`Error during cleanupRemoteBranches: ${String(err)}`);
  }
}

/**
 * Identifies Git branches that are safe to delete, based on FAILED or CANCELLED task nodes.
 * @param repoRoot Absolute path to the repository root.
 * @param remoteBranches List of all remote branch names (e.g. from `git branch -r`).
 * @returns An array of branch names safe to delete.
 */
export async function identifyBranchesForCleanup(repoRoot: string, remoteBranches: string[], openPrHeadRefs: string[] = []): Promise<string[]> {
  const filePaths = discoverNodeFiles(path.join(repoRoot, '.foundry'));
  const safeSessionIds = new Set<string>();
  const candidateSessionIds = new Set<string>();

  for (const fp of filePaths) {
    const node = parseNodeFile(fp, repoRoot);
    if (!node) continue;

    const status = node.frontmatter.status;
    const sessionId = getSessionId(node);

    if (!sessionId) {
      continue;
    }

    if (['PENDING', 'READY', 'ACTIVE', 'COMPLETED'].includes(status)) {
      safeSessionIds.add(sessionId);
    } else if (['FAILED', 'CANCELLED'].includes(status)) {
      candidateSessionIds.add(sessionId);
    }
  }

  const branchesToDelete: string[] = [];

  for (const branch of remoteBranches) {
    if (branch === 'main' || branch === 'master' || branch === 'origin/main' || branch === 'origin/master') {
      continue; // Never delete main/master
    }

    // Protect active PR branches
    if (openPrHeadRefs.some(ref => branch.endsWith(ref) || branch === ref)) {
      continue;
    }

    let isSafe = false;
    for (const safeSession of safeSessionIds) {
      if (branch.includes(safeSession)) {
        isSafe = true;
        break;
      }
    }

    if (isSafe) {
      continue;
    }

    let isCandidate = false;
    for (const candidateSession of candidateSessionIds) {
      if (branch.includes(candidateSession)) {
        isCandidate = true;
        break;
      }
    }

    if (isCandidate) {
      // It's a candidate and not in the safe set.
      branchesToDelete.push(branch);
    }
  }

  return branchesToDelete;
}

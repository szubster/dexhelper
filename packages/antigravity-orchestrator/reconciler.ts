import type { ReconcileOptions, ReconcileResult } from './types.ts';
import {
  scanActiveNodes,
  transitionNodeToCompleted,
  transitionNodeToReady,
  linkPRToNode,
} from './node-manager.ts';
import { fetchRecentPRs, matchPRToNode } from './github-pr.ts';
import { commitAndPush } from './git.ts';
import type { CommandExecutor } from './agentapi.ts';

export async function reconcileActiveSessions(
  options: ReconcileOptions = {},
  executor?: CommandExecutor
): Promise<ReconcileResult[]> {
  const log = options.log || ((msg: string) => process.stderr.write(`${msg}\n`));
  const repoRoot = options.repoRoot || process.cwd();

  const activeNodes = scanActiveNodes(repoRoot);
  const agyNodes = activeNodes.filter(
    (n) => typeof n.jules_session_id === 'string' && n.jules_session_id.startsWith('agy-')
  );

  if (agyNodes.length === 0) {
    log('[reconciler] No active Antigravity (agy-*) sessions to reconcile.');
    return [];
  }

  log(`[reconciler] Found ${agyNodes.length} active Antigravity session(s). Fetching PRs...`);
  const prs = await fetchRecentPRs({
    repoFullName: options.repoFullName,
    githubToken: options.githubToken,
    executor,
    log,
  });

  const results: ReconcileResult[] = [];
  const modifiedFiles: string[] = [];

  for (const node of agyNodes) {
    const matchedPR = matchPRToNode(node, prs);
    if (!matchedPR) {
      log(`[reconciler] Node ${node.id} (${node.jules_session_id}) has no matching PR yet. Keeping ACTIVE.`);
      continue;
    }

    log(`[reconciler] Matched node ${node.id} to PR #${matchedPR.number} (${matchedPR.state})`);

    if (options.dryRun) {
      results.push({
        nodeId: node.id,
        repoPath: node.repoPath,
        sessionId: node.jules_session_id!,
        prNumber: matchedPR.number,
        previousStatus: 'ACTIVE',
        newStatus: matchedPR.isMerged ? 'COMPLETED' : matchedPR.state === 'CLOSED' ? 'READY' : 'ACTIVE',
        reason: `[DRY-RUN] Matched PR #${matchedPR.number} state: ${matchedPR.state}`,
      });
      continue;
    }

    if (matchedPR.isMerged) {
      transitionNodeToCompleted(node, matchedPR.number, repoRoot);
      modifiedFiles.push(node.repoPath);
      results.push({
        nodeId: node.id,
        repoPath: node.repoPath,
        sessionId: node.jules_session_id!,
        prNumber: matchedPR.number,
        previousStatus: 'ACTIVE',
        newStatus: 'COMPLETED',
        reason: `PR #${matchedPR.number} merged`,
      });
      log(`[reconciler] Transitioned ${node.id} -> COMPLETED (PR #${matchedPR.number} merged)`);
    } else if (matchedPR.state === 'CLOSED') {
      const reason = `PR #${matchedPR.number} closed without merging.`;
      const { status: newStatus } = transitionNodeToReady(node, reason, repoRoot);
      modifiedFiles.push(node.repoPath);
      results.push({
        nodeId: node.id,
        repoPath: node.repoPath,
        sessionId: node.jules_session_id!,
        prNumber: matchedPR.number,
        previousStatus: 'ACTIVE',
        newStatus,
        reason: newStatus === 'FAILED' ? 'Max rejection count reached' : reason,
      });
      log(`[reconciler] Transitioned ${node.id} -> ${newStatus} (${newStatus === 'FAILED' ? 'Max rejection count reached' : reason})`);
    } else {
      // PR is open
      if (node.pr_number !== matchedPR.number) {
        linkPRToNode(node, matchedPR.number, repoRoot);
        modifiedFiles.push(node.repoPath);
        results.push({
          nodeId: node.id,
          repoPath: node.repoPath,
          sessionId: node.jules_session_id!,
          prNumber: matchedPR.number,
          previousStatus: 'ACTIVE',
          newStatus: 'ACTIVE',
          reason: `Linked open PR #${matchedPR.number}`,
        });
        log(`[reconciler] Linked open PR #${matchedPR.number} to node ${node.id}`);
      }
    }
  }

  // Handle Git workflow if any changes occurred
  if (modifiedFiles.length > 0 && (options.git || options.push)) {
    const commitMsg = `Foundry: Reconcile Antigravity tasks (${modifiedFiles.length} node(s) updated)`;
    await commitAndPush(
      [...modifiedFiles, 'ACTIVE_SESSIONS.md'],
      commitMsg,
      {
        repoRoot,
        push: options.push !== false,
        log,
      },
      executor
    );
  }

  return results;
}

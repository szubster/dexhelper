import type { AssignOptions, AssignResult } from './types.ts';
import { findNodeById, assignNodeToPersona } from './node-manager.ts';
import { commitAndPush } from './git.ts';
import type { CommandExecutor } from './agentapi.ts';

export async function assignNode(
  nodeId: string,
  options: AssignOptions,
  executor?: CommandExecutor
): Promise<AssignResult> {
  const log = options.log || ((msg: string) => process.stderr.write(`${msg}\n`));
  const repoRoot = options.repoRoot || process.cwd();
  const persona = options.persona || 'human';

  const node = findNodeById(nodeId, repoRoot);
  if (!node) {
    throw new Error(`Node not found: ${nodeId}`);
  }

  log(`[assign] Assigning node ${node.id} (${node.repoPath}) to '${persona}'`);

  if (options.dryRun) {
    const mockSessionId = `agy-${persona}-dryrun`;
    log(`[assign] [DRY-RUN] Would assign ${node.id} to ${persona} with session ${mockSessionId}`);
    return {
      nodeId: node.id,
      repoPath: node.repoPath,
      sessionId: mockSessionId,
      persona,
      success: true,
    };
  }

  const { sessionId } = assignNodeToPersona(node, persona, repoRoot);
  log(`[assign] Node ${node.id} assigned to ${persona} with session ID: ${sessionId}`);

  let gitStatus;
  if (options.git || options.push) {
    const commitMsg = `Foundry: Assign ${node.id} -> ${persona} [${sessionId}]`;
    gitStatus = await commitAndPush(
      [node.repoPath, 'ACTIVE_SESSIONS.md'],
      commitMsg,
      {
        repoRoot,
        push: options.push !== false,
        log,
      },
      executor
    );
  }

  return {
    nodeId: node.id,
    repoPath: node.repoPath,
    sessionId,
    persona,
    success: true,
    gitStatus,
  };
}

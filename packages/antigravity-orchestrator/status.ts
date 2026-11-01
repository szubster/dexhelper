import type { StatusReport } from './types.ts';
import { scanReadyNodes, scanActiveNodes } from './node-manager.ts';
import { resolveInitialModel } from './model-selector.ts';

export function getFoundryStatus(repoRoot: string = process.cwd()): StatusReport {
  const readyNodes = scanReadyNodes(repoRoot).map((node) => ({
    id: node.id,
    repoPath: node.repoPath,
    title: node.title,
    persona: node.owner_persona,
    recommendedModel: resolveInitialModel(node.owner_persona),
  }));

  const allActive = scanActiveNodes(repoRoot);
  const activeAntigravityNodes: StatusReport['activeAntigravityNodes'] = [];
  const activeJulesNodes: StatusReport['activeJulesNodes'] = [];

  for (const node of allActive) {
    const sessionId = node.jules_session_id || '';
    if (sessionId.startsWith('agy-')) {
      activeAntigravityNodes.push({
        id: node.id,
        repoPath: node.repoPath,
        title: node.title,
        persona: node.owner_persona,
        sessionId,
        prNumber: node.pr_number ?? undefined,
      });
    } else {
      activeJulesNodes.push({
        id: node.id,
        repoPath: node.repoPath,
        title: node.title,
        persona: node.owner_persona,
        sessionId,
      });
    }
  }

  let table = '=== FOUNDRY ORCHESTRATION STATUS ===\n\n';

  table += `## READY Nodes for Dispatch (${readyNodes.length})\n`;
  if (readyNodes.length === 0) {
    table += '  None.\n';
  } else {
    for (const r of readyNodes) {
      table += `  - [${r.id}] ${r.title} | Persona: ${r.persona} | Model: ${r.recommendedModel}\n`;
    }
  }

  table += `\n## ACTIVE Antigravity Sessions (${activeAntigravityNodes.length})\n`;
  if (activeAntigravityNodes.length === 0) {
    table += '  None.\n';
  } else {
    for (const a of activeAntigravityNodes) {
      const pr = a.prNumber ? ` | PR: #${a.prNumber}` : '';
      table += `  - [${a.id}] ${a.title} | ${a.sessionId} | ${a.persona}${pr}\n`;
    }
  }

  table += `\n## ACTIVE Jules Sessions (${activeJulesNodes.length})\n`;
  if (activeJulesNodes.length === 0) {
    table += '  None.\n';
  } else {
    for (const j of activeJulesNodes) {
      table += `  - [${j.id}] ${j.title} | ${j.sessionId} | ${j.persona}\n`;
    }
  }

  return {
    readyNodes,
    activeAntigravityNodes,
    activeJulesNodes,
    markdownTable: table,
  };
}

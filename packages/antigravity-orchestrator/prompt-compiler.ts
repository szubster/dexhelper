import type { NodeData } from './types.ts';

/**
 * Compiles a structured, autonomous execution prompt for an Antigravity agent.
 * Instructs the agent to create branch antigravity/<node-id> and open a PR with [<node-id>] <title>.
 */
export function compileAntigravityPrompt(node: NodeData): string {
  const branchName = `antigravity/${node.id}`;
  const prTitle = `[${node.id}] ${node.title}`;

  return `# Task Assignment: ${node.title}

You are an autonomous engineering agent assigned to complete Foundry node \`${node.id}\`.

## Context & Node Details
- **Node ID**: \`${node.id}\`
- **Node Type**: \`${node.type}\`
- **Assigned Persona**: \`${node.owner_persona}\`
- **File Location**: \`${node.repoPath}\`
- **Target Branch**: \`${branchName}\`
- **Target PR Title**: \`${prTitle}\`

---

## Autonomous Execution Directives
1. **Strict No-Ask Policy**: Execute completely autonomously. NEVER ask the user questions, confirm steps, or request clarification. Make sound engineering decisions.
2. **Git Workflow**:
   - Create and checkout branch \`${branchName}\`.
   - Implement the requirements specified in this task.
   - Update \`${node.repoPath}\` to mark completed acceptance criteria checkboxes as checked (\`- [x]\`).
   - Run verification commands: \`pnpm lint\` and \`pnpm test\`.
   - Commit your changes and push to origin \`${branchName}\`.
   - Open a GitHub Pull Request with the exact title: \`${prTitle}\`.
3. **Repository Standards**:
   - Maintain the tactical hardware aesthetic (ADR 008/ADR 024): sharp corners (\`rounded-none\`), dashed borders (\`border-dashed\`), monospace fonts (\`font-mono\`).
   - Testing: Write unit tests using \`vitest\` or E2E tests using Playwright. \`@testing-library/*\` is strictly forbidden.
   - Keep diffs focused and minimal.

---

## Node Specification & Acceptance Criteria
${node.body.trim()}
`;
}

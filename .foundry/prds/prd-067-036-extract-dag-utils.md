---
id: prd-067-036-extract-dag-utils
type: PRD
title: Extract DAG Utilities to Shared Module
status: CANCELLED
owner_persona: epic_planner
created_at: '2026-05-29'
updated_at: '2026-07-17'
depends_on: []
jules_session_id: '3525481879973084593'
parent: idea-067-extract-dag-utils
tags:
  - refactor
  - foundry
  - orchestrator
research_references: []
rejection_count: 3
rejection_reason: '[ACKNOWLEDGED] Max rejection count reached'
notes: Spawned from idea-067-extract-dag-utils to organize DAG orchestration logic.
---

# Extract DAG Utilities to Shared Module

## 1. Introduction
The Foundry orchestrator and heartbeat scripts currently duplicate complex DAG management logic. This duplication increases the risk of bugs and divergent behavior, as evidenced by recent discrepancies in the Impossible Loop handling. This PRD details the extraction of these core utilities into a shared module.

## 2. Goals & Objectives
- Encapsulate DAG reverse-dependency generation.
- Standardize the traversal of orphaned nodes.
- Unify node state transition functions (e.g., `transitionNodeToFailed`, `transitionNodeToCompleted`, and `transitionNodeToReady`) across all `.github/scripts/` to uniformly apply ADR 006 (using `gray-matter` for parsing) and handle metadata consistently.

## 3. Scope of Extraction

### 3.1 `dag-utils.ts` Creation
Create `.github/scripts/dag-utils.ts`.

### 3.2 Key Functions to Extract/Implement
- **`buildReverseDependencyGraph(nodes, resolveNodePath)`**: A pure function that returns a `Map<string, string[]>` where keys are node paths and values are arrays of dependent node paths.
- **`getOrphanedNodes(startNodePath, reverseGraph)`**: A function that traverses the reverse dependency graph and returns a `Set<string>` of all paths that depend (directly or indirectly) on the `startNodePath`.
- **`transitionNodeToFailed(node, repoRoot, rejectionReason, dryRun)`**: Surgical mutation applying ADR 006. Updates status, `jules_session_id`, `updated_at`, and appends the `rejection_reason` using `matter.stringify`.
- **`transitionNodeToCompleted(node, repoRoot, prNumber, dryRun, hasChildrenCheck)`**: Surgical mutation handling both leaf tasks and late-binding parent nodes, strictly enforcing the acceptance criteria checkboxes as per ADR 007 and ADR 009.
- **`transitionNodeToReady(node, repoRoot, reason, dryRun)`**: Resurrection loop mutation updating `rejection_count`. If count reaches 3, transitions to `FAILED`.

## 4. Testing Strategy
- The current test suite in `.github/scripts/foundry-orchestrator.test.ts` and `.github/scripts/foundry-heartbeat.test.ts` must pass without modifications to ensure external behavior remains intact.
- Extract any helper functions that are purely utility (like `todayISO`, `logToJournal`) to `dag-utils.ts` and write new unit tests if they contain complex logic, though simple file operations might not require it.
- Ensure the test suite correctly executes `pnpm install && npx vitest run` in `.github/scripts/` to validate changes across both files.

## Next Steps
- [x] Epic Planner: Evaluate this PRD and convert it to Epics to extract the DAG utilities to a shared module.
- [x] .foundry/epics/epic-036-053-shared-dag-utilities.md
- [x] .foundry/epics/epic-036-054-unify-state-transitions.md
- [ ] epic-036-329-shared-dag-utilities-v2
- [ ] epic-036-330-unify-state-transitions-v2

## Acceptance Criteria
- [ ] `dag-utils.ts` created with shared functions.
- [ ] `foundry-orchestrator.ts` and `foundry-heartbeat.ts` refactored to use `dag-utils.ts`.
- [ ] All DAG orchestration tests pass.

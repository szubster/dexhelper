---
id: prd-540-726-tree-completeness-and-false-failure-prevention-heuristics
type: PRD
title: Tree Completeness and False Failure Prevention Heuristics
status: READY
owner_persona: epic_planner
created_at: '2026-10-25'
updated_at: '2026-10-26'
depends_on: []
jules_session_id: null
pr_number: null
parent: idea-540-tree-completeness-and-false-failure-prevention-heuristics
tags:
  - orchestrator
  - process-improvement
  - dag-health
rejection_count: 1
rejection_reason: ''
---

# PRD: Tree Completeness and False Failure Prevention Heuristics

## 1. Context & Problem Statement
Currently, the Orchestrator suffers from two key friction points when managing the Directed Acyclic Graph (DAG) state:
1. Macro nodes (`IDEA`, `PRD`, `EPIC`, `STORY`) can be falsely marked as failed or permanently stuck if the underlying infrastructure session crashes (e.g. `NOT_FOUND` or bash timeout) during Empty PR submission steps, even if all downstream child implementation tasks have completed and merged successfully.
2. Macro nodes can be prematurely verified before their entire sub-tree of descendant nodes reaches terminal (`COMPLETED`) status.

These issues create friction by causing false failures in the Orchestrator, requiring manual intervention to unstick nodes that have functionally completed their required work but failed at the orchestration layer due to transient infrastructure errors or premature state transitions.

## 2. Proposed Solution
Implement two new heuristics in the Orchestrator (`packages/foundry/foundry-orchestrator.ts`):
1. **Crash Recovery Heuristic**: Implement logic that classifies session crashes distinctly from domain/code QA rejections. If a parent macro node fails solely due to an infrastructure crash, but all of its explicitly generated descendant nodes are `COMPLETED`, the Orchestrator must automatically recover the parent node to `COMPLETED` (or `VERIFYING`) via a reconciliation sweep.
2. **Sub-Tree Completeness Validator**: Implement strict DAG-tree validation ensuring that no macro node is allowed to transition to `VERIFYING` unless all nodes within its spawned descendant sub-tree have achieved terminal (`COMPLETED`) status.

## 3. Product Value & Impact
- Eliminates false-positive node failures related to infrastructure instability.
- Prevents premature verification of macro nodes, ensuring full end-to-end completeness of generated tasks.
- Increases the autonomous resilience and self-healing capacity of the Orchestrator DAG.

## 4. Requirements & Scope
- Update `packages/foundry/foundry-orchestrator.ts` to include the Crash Recovery Heuristic.
- Update `packages/foundry/foundry-orchestrator.ts` to include the Sub-Tree Completeness Validator.
- Write unit tests within `packages/foundry/tests/` to verify these heuristics.
- Modify the state transition logic to enforce sub-tree terminal status checks before marking macro nodes as `VERIFYING`.

## 5. Exclusions (Out of Scope)
- Modifications to agent prompts or persona logic.
- Fixing unrelated Orchestrator bugs not tied to these heuristics.
- Migrating the Orchestrator state machine to a different framework.

## Acceptance Criteria
- [x] Break down this PRD into Epics for Crash Recovery and Sub-Tree Completeness Validation.
- [ ] epic-726-728-crash-recovery-heuristic
- [ ] epic-726-729-sub-tree-completeness-validator

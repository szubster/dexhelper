---
id: task-050-083-enforce-acceptance-criteria
type: TASK
title: Enforce Acceptance Criteria in Heartbeat and Orchestrator
status: COMPLETED
owner_persona: coder
created_at: '2026-05-12'
updated_at: '2026-05-14'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-031-050-enforce-acceptance-criteria-completion
tags: []
research_references: []
rejection_count: 2
rejection_reason: Merged with unfulfilled acceptance criteria
notes: ''
---

# Enforce Acceptance Criteria in Heartbeat and Orchestrator

## Context
ADR 007 states that nodes cannot successfully transition to `COMPLETED` if they have unchecked acceptance criteria checkboxes (`- [ ]`).
We must correctly distinguish between:
1. **Late-binding parents**: If they contain unchecked tasks, it acts as an intentional signal to the orchestrator to keep the node alive (`PENDING` or `READY`), so new child nodes can be generated.
2. **Standard leaf tasks**: If they have unchecked boxes when their target artifacts are completed (or when merged via empty PR), it is an invalid completion. They must be transitioned to `FAILED`.

## Requirements

1. **Update `foundry-heartbeat.ts`**:
   - In `transitionNodeToCompleted`, the script currently checks `hasChildren` and properly targets `FAILED` for leaf nodes with unchecked tasks.
   - However, it currently misses saving the rejection reason to the frontmatter data.
   - Ensure you add `parsed.data.rejection_reason = rejectionReason;` when transitioning to `FAILED`.

2. **Update `foundry-orchestrator.ts` preflight logic (Phase 3.7 Preflight)**:
   - When checking `bypassDispatch`, if `hasUncheckedTasks` is true, the script currently pushes the node to `eligible` (which promotes to `READY`).
   - You must distinguish if the node is a parent or a leaf task.
   - If `children.length > 0` or the node type is a generation type (`IDEA`, `PRD`, `EPIC`, `STORY`), it's a valid late-binding wait state. Proceed with `eligible.push(node)` and the informational log.
   - If it is a leaf task without children (e.g. `TASK` type and `children.length === 0`), this is an "invalid leaf completion". The node should NOT be pushed to `eligible`.
   - Instead, log an appropriate failure message (e.g., `info(\`Preflight failure: Leaf task \${node.repoPath} has completed target artifacts but contains unchecked boxes.\`);`) and fail the node by calling `promoteNodeToFailedWithReason(node, 'Merged with unfulfilled acceptance criteria');`.

## Acceptance Criteria
- [x] Update `foundry-heartbeat.ts` to assign `parsed.data.rejection_reason` when targeting `FAILED` for leaf tasks with unchecked boxes.
- [x] Update `foundry-orchestrator.ts` Phase 3.7 Preflight to call `promoteNodeToFailedWithReason` instead of `eligible.push(node)` for leaf tasks with unchecked tasks when `bypassDispatch` is true.

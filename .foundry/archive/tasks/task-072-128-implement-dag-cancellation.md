---
id: task-072-128-implement-dag-cancellation
type: TASK
title: Implement DAG Dependency Cancellation Logic
status: COMPLETED
owner_persona: coder
created_at: '2026-05-20'
updated_at: '2026-05-23'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-035-072-implement-cancellation-logic
tags:
  - orchestrator
  - auto-cancel
  - backend
research_references: []
rejection_count: 2
rejection_reason: >-
  Implementation modifies immutable COMPLETED nodes to PENDING during Wait and
  Wake, causing them to be incorrectly swept up by cascade cancellation logic.
notes: ''
---

# TASK: Implement DAG Dependency Cancellation Logic

## Objective
Update `.github/scripts/foundry-orchestrator.ts` to implement the core logic for detecting nodes that failed permanently and auto-canceling any dependent nodes that are still in a `PENDING` state.

## Context & Blueprint
As requested in `story-035-072-implement-cancellation-logic`, the orchestrator needs to be enhanced to automatically cancel nodes that depend on a permanently failed node.

- When a node has `status: FAILED
- Traverse the DAG (recursively or iteratively) and find nodes that depend on this failed node.
- If the dependent node is currently in `PENDING` state, change its state to `CANCELLED`.
- Update the cancelled node's `rejection_reason` to `"Cancelled due to permanent failure of dependency: <failed-node-id>"`.
- Safeguard the traversal to avoid infinite loops due to circular dependencies.
- Log cancellation details to the console output.

## Acceptance Criteria
- [x] Implement detection of permanently failed nodes (`status === 'FAILED'` and `rejection_reason === 'Max rejection count reached'`) during the DAG evaluation cycle in `.github/scripts/foundry-orchestrator.ts`.
- [x] Traverse the DAG to identify all `PENDING` nodes that rely directly or indirectly on the failed node via their `depends_on` array.
- [x] Transition identified `PENDING` nodes to `CANCELLED`.
- [x] Set `rejection_reason` for the newly cancelled nodes to `"Cancelled due to permanent failure of dependency: <failed-node-id>"`.
- [x] Include loop detection/safeguards to prevent infinite traversals if circular dependencies exist.
- [x] Output console logs for the cancellation operations.

---
id: story-035-072-implement-cancellation-logic
type: STORY
title: Implement DAG Dependency Cancellation Logic
status: COMPLETED
owner_persona: tech_lead
created_at: '2026-05-20'
updated_at: '2026-05-20'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-028-035-orchestrator-auto-cancel-orphaned-nodes
tags:
  - orchestrator
  - auto-cancel
  - backend
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# STORY: Implement DAG Dependency Cancellation Logic

## Objective
Update `.github/scripts/foundry-orchestrator.ts` to implement the core logic for detecting nodes that failed permanently, and auto-canceling any dependent nodes that are still in a `PENDING` state.

## Acceptance Criteria
- [x] During the DAG evaluation cycle, identify any nodes with `status: 'FAILED'` and `rejection_reason: 'Max rejection count reached'`.
- [x] Traverse the DAG to find all nodes with `status: 'PENDING'` that explicitly list the failed node in their `depends_on` array.
- [x] Transition these `PENDING` nodes to `CANCELLED`.
- [x] Update their `rejection_reason` to `"Cancelled due to permanent failure of dependency: <failed-node-id>"`.
- [x] Add safeguards to prevent circular dependencies or infinite loops during cancellation traversal.
- [x] Log cancellation operations in standard output to ensure visibility.

## Children Nodes
- .foundry/tasks/task-072-128-implement-dag-cancellation.md
- .foundry/tasks/task-072-129-qa-dag-cancellation.md

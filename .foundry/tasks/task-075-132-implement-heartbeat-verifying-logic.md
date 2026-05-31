---
id: task-075-132-implement-heartbeat-verifying-logic
type: TASK
title: Implement Heartbeat VERIFYING Logic
status: ACTIVE
owner_persona: coder
created_at: '2026-05-22'
updated_at: '2026-05-28'
depends_on: []
jules_session_id: '6322166743020527496'
pr_number: null
parent: story-040-075-heartbeat-verifying-logic
tags:
  - process
  - orchestrator
  - heartbeat
rejection_count: 1
rejection_reason: >-
  Zombie detection main loop only monitors ACTIVE nodes for missing
  jules_session_id. VERIFYING nodes missing jules_session_id are ignored instead
  of flagged as FAILED.
---

# Task: Implement Heartbeat VERIFYING Logic

## Implementation Details
- In `.github/scripts/foundry-heartbeat.ts`, update `transitionNodeToCompleted`. When a PR is merged, instead of mutating the node state to `COMPLETED`, it should mutate the status to `VERIFYING` and clear the `jules_session_id`. Note that it should still handle late-binding parents appropriately. If the target node is a late binding parent, it should still be transitioned to `PENDING` rather than `VERIFYING` if there are unchecked tasks. Also, ensure that only nodes of type `IDEA`, `PRD`, and `EPIC` can transition to `VERIFYING`. All other node types should continue to transition to `COMPLETED`.
- Update the main loop that monitors `ACTIVE` nodes to also monitor `VERIFYING` nodes. The heartbeat script must monitor `VERIFYING` nodes exactly as it monitors `ACTIVE` nodes for zombie detection. If an auditor session crashes or times out, it should transition back to `VERIFYING` or `FAILED`.
- **Constraint**: This task only covers updates to the `foundry-heartbeat.ts` script. Do not modify the DAG schema or orchestrator directly in this task.

## Acceptance Criteria
- [x] `transitionNodeToCompleted` sets status to `VERIFYING` on successful PR merge and validation.
- [x] Zombie detection processes `VERIFYING` nodes.

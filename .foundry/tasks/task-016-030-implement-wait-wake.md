---
id: task-016-030-implement-wait-wake
type: TASK
title: "Implement Wait & Wake logic in Orchestrator"
status: "COMPLETED"
owner_persona: coder
created_at: "2026-04-25"
updated_at: "2026-04-25"
depends_on: []
jules_session_id: null
pr_number: null
parent: ".foundry/stories/story-011-016-wait-wake-implementation.md"
---

# Implement Wait & Wake logic in Orchestrator

## Description
Implement the Wait & Wake orchestration logic in `.github/scripts/foundry-orchestrator.ts`. The orchestrator needs to support suspending the current session by moving an `ACTIVE` node to `PENDING` if it dynamically adds incomplete downstream nodes to its `depends_on` array.

## Acceptance Criteria
- [x] Add a new phase (e.g., Phase 3.5: SUSPEND) to iterate through all `ACTIVE` nodes.
- [x] For each `ACTIVE` node, check its `depends_on` array.
- [x] If any of the paths in `depends_on` points to a node that is not `COMPLETED`, the `ACTIVE` node must be suspended.
- [x] Transition its status from `ACTIVE` to `PENDING` using `promoteNodeStatus(node, 'ACTIVE', 'PENDING')`.

---
id: task-478-529-evaluate-locks-for-pending-nodes
type: TASK
title: Evaluate locks for PENDING nodes in RESOLVE phase
status: PENDING
owner_persona: coder
created_at: '2026-09-03'
updated_at: '2026-09-03'
depends_on:
  - task-478-528-aggregate-active-locks
jules_session_id: null
pr_number: null
parent: story-412-478-implement-resolve-phase-locking
tags:
  - orchestrator
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Evaluate locks for PENDING nodes in RESOLVE phase

## Objective
Implement lock evaluation in Phase 4 (RESOLVE) to prevent nodes from transitioning to `READY` if their required locks are currently held by active nodes.

## Requirements
- In `.github/scripts/foundry-orchestrator.ts`, within Phase 4, after aggregating `ACTIVE` locks, update the logic for `PENDING` nodes.
- For every `PENDING` node eligible to transition to `READY`, check its declared `locks` against the set of aggregated active locks.
- If there is an intersection (i.e., the node requires a lock that is currently active), hold the node in `PENDING` status. Do not add it to the `eligible` list for promotion.
- Add an explicit log statement (e.g. `info('Node <path> requires lock <lock> which is currently active. Holding in PENDING.')`) when a node is blocked by a lock.

## Acceptance Criteria
- [ ] Implement lock intersection evaluation in Phase 4 of `foundry-orchestrator.ts`.
- [ ] Prevent nodes with intersecting locks from transitioning to `READY`.
- [ ] Add unit tests for the lock evaluation logic.
- [ ] Ensure `pnpm lint && pnpm test` pass.

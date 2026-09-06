---
id: task-478-530-resolve-phase-locking-qa
type: TASK
title: QA Verification for RESOLVE phase locking logic
status: PENDING
owner_persona: qa
created_at: '2026-09-03'
updated_at: '2026-09-03'
depends_on:
  - task-478-529-evaluate-locks-for-pending-nodes
jules_session_id: null
pr_number: null
parent: story-412-478-implement-resolve-phase-locking
tags:
  - orchestrator
  - qa
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# QA Verification for RESOLVE phase locking logic

## Objective
Verify that the orchestrator's RESOLVE phase correctly aggregates locks from `ACTIVE` nodes and prevents `PENDING` nodes with intersecting locks from transitioning to `READY`.

## Requirements
- Create integration test cases or mock orchestrator runs that simulate:
  - An `ACTIVE` node holding a specific lock.
  - A `PENDING` node that requires the same lock.
- Verify that the `PENDING` node is NOT transitioned to `READY` while the `ACTIVE` node holds the lock.
- Verify that once the `ACTIVE` node transitions to `COMPLETED` or `FAILED`, the `PENDING` node is subsequently allowed to transition to `READY`.
- Verify no deadlocks are introduced.

## Acceptance Criteria
- [ ] Write and run integration/QA tests for lock aggregation and evaluation.
- [ ] Confirm `PENDING` nodes are held when locks intersect.
- [ ] Confirm `PENDING` nodes are released when blocking locks are released.
- [ ] Ensure `pnpm lint && pnpm test` pass.

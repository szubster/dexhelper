---
id: story-412-478-implement-resolve-phase-locking
type: STORY
title: Implement RESOLVE phase locking logic
status: READY
owner_persona: tech_lead
created_at: '2026-08-26'
updated_at: '2026-09-03'
depends_on:
  - story-412-477-parse-locks-orchestrator
jules_session_id: '1428006663748828254'
pr_number: null
parent: epic-340-412-orchestrator-resource-locking
tags:
  - orchestrator
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Implement RESOLVE phase locking logic

## Objective
Implement lock aggregation and evaluation in the RESOLVE phase of the orchestrator to prevent lock intersections.

## Requirements
- In Phase 4 (RESOLVE), aggregate all `locks` declared by currently `ACTIVE` nodes.
- For every `PENDING` node eligible to transition to `READY`, check its declared `locks` against the active locks.
- If an intersection is found, hold the node in `PENDING` status.
- Ensure locks are appropriately released (i.e. not aggregated) once a node transitions out of `ACTIVE` status (to `COMPLETED` or `FAILED`).
- Prevent deadlocks.

## Acceptance Criteria
- [x] Break down into Tasks
- [ ] task-478-528-aggregate-active-locks
- [ ] task-478-529-evaluate-locks-for-pending-nodes
- [ ] task-478-530-resolve-phase-locking-qa

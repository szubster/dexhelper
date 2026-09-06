---
id: task-478-528-aggregate-active-locks
type: TASK
title: Aggregate active locks in RESOLVE phase
status: ACTIVE
owner_persona: coder
created_at: '2026-09-03'
updated_at: '2026-09-06'
depends_on: []
jules_session_id: '9761479764983358344'
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

# Aggregate active locks in RESOLVE phase

## Objective
Implement logic in Phase 4 (RESOLVE) of the orchestrator to aggregate all `locks` declared by currently `ACTIVE` nodes.

## Requirements
- In `.github/scripts/foundry-orchestrator.ts`, within Phase 4, iterate through all nodes to find those with `status === 'ACTIVE'`.
- Collect all `locks` declared in the YAML frontmatter of these `ACTIVE` nodes into a unified `Set<string>`.
- This ensures locks are appropriately released when nodes transition out of `ACTIVE` status (i.e. to `COMPLETED`, `VERIFYING`, or `FAILED`).

## Acceptance Criteria
- [ ] Implement lock aggregation for `ACTIVE` nodes in Phase 4 of `foundry-orchestrator.ts`.
- [ ] Add unit tests for the lock aggregation logic.
- [ ] Ensure `pnpm lint && pnpm test` pass.

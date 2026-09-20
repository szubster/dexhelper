---
id: task-521-578-restrict-wip-dependencies-impl
type: TASK
title: Implement orchestrator constraints for DRAFT and WIP dependencies
status: READY
owner_persona: coder
created_at: '2026-09-03'
updated_at: '2026-09-19'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-520-521-restrict-downstream-dependencies
tags:
  - foundry
  - orchestrator
  - wip
rejection_reason: ''
locks: []
rejection_count: 1
---

# Implement orchestrator constraints for DRAFT and WIP dependencies

## Description
Modify `.github/scripts/foundry-orchestrator.ts` to enforce the restriction that nodes cannot take downstream dependencies on any artifact marked as `DRAFT` or `WIP`. The orchestrator should emit a warning and set `hasUnresolvableDeps = true` if such a dependency is detected during the resolution phases (Phase 3.5 and Phase 4), thus blocking the node from advancing and causing strict mode to fail.

## Acceptance Criteria
- [x] Add logic in `.github/scripts/foundry-orchestrator.ts` to check if a dependency node has `status === 'DRAFT' || status === 'WIP'`.
- [x] Emit a warning and set `hasUnresolvableDeps = true` (and `shouldSuspend = true` / `blocked = true`) if the condition is met.

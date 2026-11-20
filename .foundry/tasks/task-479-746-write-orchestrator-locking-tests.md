---
id: task-479-746-write-orchestrator-locking-tests
type: TASK
title: Write tests for Orchestrator Locking
status: READY
owner_persona: coder
created_at: '2026-11-08'
updated_at: '2026-11-08'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-412-479-orchestrator-locking-e2e-verification
tags:
  - orchestrator
  - e2e
  - integration
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Write tests for Orchestrator Locking

## Objective
Write integration tests ensuring the orchestrator locking logic correctly blocks and unblocks nodes.

## Requirements
- Write integration tests in `packages/foundry/foundry-orchestrator.test.ts` or `packages/foundry/foundry-orchestrator.e2e.test.ts`.
- Ensure tests verify that nodes with intersecting locks are correctly blocked from transitioning to `READY`.
- Ensure tests verify that when active locks resolve, pending nodes transition to `READY`.

## Acceptance Criteria
- [ ] Write integration test validating nodes with intersecting locks are correctly blocked from transitioning to `READY`
- [ ] Write integration test validating when active locks resolve, pending nodes transition to `READY`

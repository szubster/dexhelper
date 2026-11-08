---
id: story-412-479-orchestrator-locking-e2e-verification
type: STORY
title: E2E Verification for Orchestrator Locking
status: PENDING
owner_persona: tech_lead
created_at: '2026-08-26'
updated_at: '2026-08-26'
depends_on:
  - story-412-478-implement-resolve-phase-locking
jules_session_id: '1428006663748828254'
pr_number: null
parent: epic-340-412-orchestrator-resource-locking
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

# E2E Verification for Orchestrator Locking

## Objective
Perform Integration and E2E Verification for the orchestrator locking logic.

## Requirements
- Verify that the orchestrator correctly blocks nodes with intersecting locks from transitioning to `READY`.
- Verify that once blocking nodes transition out of `ACTIVE`, the pending nodes can transition to `READY`.
- Run the orchestrator test suite (`cd .github/scripts && pnpm install && npx vitest`) and ensure all tests pass and locking tests are added if necessary.

## Acceptance Criteria
- [ ] Break down into Tasks

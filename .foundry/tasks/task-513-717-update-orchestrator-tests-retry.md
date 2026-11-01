---
id: task-513-717-update-orchestrator-tests-retry
type: TASK
title: Update Orchestrator Idempotent Tests Retry
status: PENDING
owner_persona: coder
created_at: '2026-10-22'
updated_at: '2026-10-31'
depends_on:
  - research-513-716-investigate-orchestrator-test-updates-failure
jules_session_id: null
parent: story-018-513-orchestrator-test-updates
tags:
  - orchestrator
  - typescript
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---
# Task: Update Orchestrator Idempotent Tests Retry

## Overview
Update test cases in `packages/foundry/foundry-orchestrator.test.ts` to cover the new Phase 4.5 auto-checking behavior.

## Details
- Read the findings from `research-513-716-investigate-orchestrator-test-updates-failure`.
- Write or update unit tests to verify that `foundry-orchestrator.ts` correctly auto-checks non-node criteria.
- Verify that a parent node is auto-fulfilled if its only unchecked criteria are plain text checkboxes.

## Acceptance Criteria
- [ ] Test cases added/updated for Phase 4.5 auto-checking behavior in `packages/foundry/foundry-orchestrator.test.ts`.
- [ ] Tests pass cleanly with `cd packages/foundry && npx vitest run`.

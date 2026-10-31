---
id: story-018-513-orchestrator-test-updates
type: STORY
title: Update Orchestrator Idempotent Tests
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-09-01'
updated_at: '2026-10-28'
depends_on:
  - story-018-512-idempotent-orchestrator-bypass
jules_session_id: '571249819035095697'
parent: epic-008-018-session-dispatch-bypass
tags:
  - orchestrator
  - typescript
rejection_count: 1
rejection_reason: ''
notes: ''
locks: []
---
# Story: Update Orchestrator Idempotent Tests

## Overview
Update test cases in `.github/scripts/foundry-orchestrator.test.ts` to cover the new Phase 4.5 auto-checking behavior.

## Details
- Write or update unit tests to verify that `foundry-orchestrator.ts` correctly auto-checks non-node criteria.
- Verify that a parent node is auto-fulfilled if its only unchecked criteria are plain text checkboxes.

## Acceptance Criteria
- [x] task-513-689-update-orchestrator-tests
- [x] task-513-690-qa-orchestrator-tests
- [ ] research-513-716-investigate-orchestrator-test-updates-failure
- [ ] task-513-717-update-orchestrator-tests-retry
- [ ] task-513-718-qa-orchestrator-tests-retry
- [x] Test cases added/updated for Phase 4.5 auto-checking behavior.
- [x] Tests pass cleanly with `npx vitest run`.

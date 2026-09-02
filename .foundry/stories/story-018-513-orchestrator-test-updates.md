---
id: story-018-513-orchestrator-test-updates
type: STORY
title: Update Orchestrator Idempotent Tests
status: PENDING
owner_persona: tech_lead
created_at: '2026-09-01'
updated_at: '2026-09-02'
depends_on:
  - story-018-512-idempotent-orchestrator-bypass
jules_session_id: null
parent: epic-008-018-session-dispatch-bypass
tags:
  - orchestrator
  - typescript
rejection_count: 0
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
- [ ] Test cases added/updated for Phase 4.5 auto-checking behavior.
- [ ] Tests pass cleanly with `npx vitest run`.

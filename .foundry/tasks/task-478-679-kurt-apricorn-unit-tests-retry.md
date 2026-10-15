---
id: task-478-679-kurt-apricorn-unit-tests-retry
type: TASK
title: Kurt Apricorn Parsing Unit Tests Retry
status: PENDING
owner_persona: coder
created_at: '2026-10-10'
updated_at: '2026-10-10'
depends_on:
  - task-478-678-kurt-apricorn-core-logic-retry
jules_session_id: null
pr_number: null
parent: story-404-478-kurt-apricorn-parsing-logic
tags:
  - gen2
  - testing
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---
# Kurt Apricorn Parsing Unit Tests Retry

## Context
We must ensure the Kurt Apricorn parsing logic works perfectly, especially bounds checking. This is a retry of `task-478-669`.

## Objectives
- Write Vitest unit tests for the core parsing logic.
- Test normal extraction cases.
- Test RangeError behavior when providing an undersized Uint8Array.

## Acceptance Criteria
- [ ] Provide 100% test coverage for the Apricorn parsing logic.
- [ ] Explicitly test the RangeError out-of-bounds cases.

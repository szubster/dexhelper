---
id: task-478-669-kurt-apricorn-unit-tests
type: TASK
title: Kurt Apricorn Parsing Unit Tests
status: PENDING
owner_persona: coder
created_at: '2026-10-07'
updated_at: '2026-10-09'
depends_on:
  - task-478-668-kurt-apricorn-core-logic
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
# Kurt Apricorn Parsing Unit Tests

## Context
We must ensure the Kurt Apricorn parsing logic works perfectly, especially bounds checking.

## Objectives
- Write Vitest unit tests for the core parsing logic.
- Test normal extraction cases.
- Test RangeError behavior when providing an undersized Uint8Array.

## Acceptance Criteria
- [ ] Provide 100% test coverage for the Apricorn parsing logic.
- [ ] Explicitly test the RangeError out-of-bounds cases.

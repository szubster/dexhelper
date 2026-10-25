---
id: task-478-705-kurt-apricorn-unit-tests-retry-2
type: TASK
title: Kurt Apricorn Unit Tests Retry 2
status: CANCELLED
owner_persona: coder
created_at: '2026-10-18'
updated_at: '2026-10-25'
depends_on:
  - task-478-704-kurt-apricorn-core-logic-retry-2
jules_session_id: null
pr_number: null
parent: story-404-478-kurt-apricorn-parsing-logic
tags:
  - gen2
  - items
  - testing
rejection_count: 0
rejection_reason: >-
  Cancelled due to permanent failure of dependency:
  research-478-703-investigate-kurt-apricorn-core-logic-failure
notes: ''
locks: []
---
# Kurt Apricorn Unit Tests Retry 2

## Context
Implement unit tests for the core Apricorn parsing logic. This is a retry of `task-478-679`.

## Objectives
- Ensure the extraction functions correctly parse different states of Kurt's Apricorn crafting.
- Verify that out-of-bounds reads throw a RangeError.

## Acceptance Criteria
- [ ] Write unit tests covering extraction logic and edge cases.

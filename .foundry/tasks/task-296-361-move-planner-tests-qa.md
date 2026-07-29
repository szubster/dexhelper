---
id: task-296-361-move-planner-tests-qa
type: TASK
title: QA move planner and diff engine edge case tests
status: PENDING
owner_persona: qa
created_at: '2026-07-29'
updated_at: '2026-07-29'
depends_on:
  - task-296-360-move-planner-tests-impl
jules_session_id: null
pr_number: null
parent: story-137-296-move-planner-unit-tests
tags:
  - testing
  - algorithm
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# QA move planner and diff engine edge case tests

## Objective
Verify the comprehensive unit tests for the diff engine and move planner algorithms to ensure they cover complex edge cases appropriately.

## Acceptance Criteria
- [ ] Review and verify the tests implemented in `task-296-360-move-planner-tests-impl`.
- [ ] Ensure tests cover disjoint cycles, open chains, and mixed operations.
- [ ] Ensure tests cover invalid format storage locations in `boxDiff.ts`.

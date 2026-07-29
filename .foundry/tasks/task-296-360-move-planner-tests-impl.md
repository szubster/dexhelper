---
id: task-296-360-move-planner-tests-impl
type: TASK
title: Implement move planner and diff engine edge case tests
status: PENDING
owner_persona: coder
created_at: '2026-07-29'
updated_at: '2026-07-29'
depends_on: []
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

# Implement move planner and diff engine edge case tests

## Objective
Write comprehensive unit tests for the diff engine (`src/engine/saveParser/utils/boxDiff.ts`) and move planner algorithms (`src/engine/saveParser/utils/movePlanner.ts`) to ensure correct operation sequence generation for various edge cases.

## Description
The move planner logic involves complex states (full boxes, swap chains, cyclic moves). This task requires building robust test fixtures covering these scenarios to guarantee the generated operations are minimal, correct, and do not lead to invalid states.
Also, we need to add edge case tests for `boxDiff.ts`.

## Constraints & Requirements
1. Add tests in `movePlanner.test.ts` to handle overlapping cycles (multiple disjoint cycles in one diff).
2. Add tests in `movePlanner.test.ts` to handle a chain of moves ending in an empty slot (no cycle).
3. Add tests in `movePlanner.test.ts` to handle complex mixed operations (adds, removals, moves, cycles, swaps all happening together).
4. Add tests in `boxDiff.test.ts` to handle storage locations that do not match the expected `Box N` regex.

## Acceptance Criteria
- [ ] Implement disjoint cycle tests in `movePlanner.test.ts`.
- [ ] Implement open-chain move tests in `movePlanner.test.ts`.
- [ ] Implement complex mixed operation tests in `movePlanner.test.ts`.
- [ ] Implement invalid format storage location test in `boxDiff.test.ts`.

---
id: task-295-353-move-planner-qa
type: TASK
title: QA Move Planner Algorithm
status: READY
owner_persona: qa
created_at: '2026-07-28'
updated_at: '2026-07-28'
depends_on:
  - task-295-352-move-planner-impl
jules_session_id: null
pr_number: null
parent: story-137-295-move-planner-algorithm
tags:
  - algorithm
  - planner
  - qa
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# QA Move Planner Algorithm

## Objective
Thoroughly QA and verify the Move Planner Algorithm implemented in `task-295-352-move-planner-impl`.

## Description
The move planner logic is highly susceptible to infinite loops and incorrect instruction sequences during cycle resolution. As the QA persona, you must heavily stress-test the `calculateMovePlan` function.

## Verification Scenarios
You must verify the implementation handles the following scenarios correctly via unit testing:
1. **Empty State / No Diffs**: The algorithm should return an empty list of operations.
2. **Simple Addition / Removal**: Correctly generating `DEPOSIT` or `WITHDRAW` (or equivalent) commands.
3. **Linear Move**: Moving a single Pokémon to an empty slot.
4. **Direct Swap**: Two Pokémon needing to go to each other's exact spots. The algorithm must resolve this cleanly.
5. **Complex Cycle (N=3+)**: A cycle of relocations (A -> B -> C -> A) must be resolved using a temporary holding space.
6. **Full Box Constraints**: Testing behavior when there are very few or zero empty slots available for holding space.

## Acceptance Criteria
- [ ] Verify the implementation of `calculateMovePlan` correctly resolves cyclic dependencies.
- [ ] Verify unit tests cover direct swaps and N=3+ cycles.
- [ ] Run `pnpm test` and ensure all tests pass.

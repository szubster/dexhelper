---
id: task-295-352-move-planner-impl
type: TASK
title: Implement Move Planner Algorithm
status: ACTIVE
owner_persona: coder
created_at: '2026-07-28'
updated_at: '2026-07-28'
depends_on: []
jules_session_id: '6146293549486245581'
pr_number: null
parent: story-137-295-move-planner-algorithm
tags:
  - algorithm
  - planner
  - implementation
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement Move Planner Algorithm

## Objective
Implement an algorithm that translates a `BoxDiffResult` into a sequential list of minimal, actionable manual user operations required to transition the PC layout from the current state to the target state.

## Description
The diff engine (implemented in `src/engine/saveParser/utils/boxDiff.ts`) computes the additions, removals, and relocations between two PC box states. This task is to build a `movePlanner` utility that takes that diff output and generates structured instructions.

The planner needs to account for constraints:
- E.g., handling "swap" operations when a target slot is already occupied by a Pokémon that also needs to be moved.
- Dealing with cycle dependencies (e.g. A wants to move to B's spot, B wants to move to C's spot, C wants to move to A's spot) by utilizing a temporary "party" holding space or an empty box slot.

The output should be a structured list of operations, such as:
`{ type: 'MOVE' | 'SWAP' | 'DEPOSIT' | 'WITHDRAW', sourceBox, sourceSlot, targetBox, targetSlot }`

## Constraints & Requirements
1. Implement the planner logic in `src/engine/saveParser/utils/movePlanner.ts` (or similar).
2. The logic must deterministically resolve cyclic relocation dependencies using an available empty slot (either in a box or in a hypothetical "party" holding space).
3. The output operations should be minimal.

## Acceptance Criteria
- [x] Implement `calculateMovePlan` (or similar) function.
- [x] Define the output operation structure (e.g., `MoveOperation` type).
- [x] Write unit tests for basic linear moves.
- [x] Write unit tests for swap scenarios (two Pokémon trading spots).
- [x] Write unit tests for cycle resolutions (3+ Pokémon forming a relocation cycle).

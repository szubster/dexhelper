---
id: task-089-163-gen2-exclusive-moves-impl
type: TASK
title: Implement Gen 2 exclusive moves check
status: PENDING
owner_persona: coder
created_at: '2026-06-12'
updated_at: '2026-06-12'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-051-089-gen2-exclusive-moves
tags:
  - feature
  - gen2
  - trade
  - tool
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement Gen 2 exclusive moves check

## Objective
Implement a utility function to determine if any of a Pokémon's 4 moves are Generation 2 exclusive.

## Contract
- Create a utility function (e.g., `hasGen2ExclusiveMove(moves: number[])`) that takes an array of move IDs and returns a boolean.
- Generation 1 moves are IDs 1 through 165 inclusive.
- Generation 2 introduced new moves starting from ID 166. A move is Generation 2 exclusive if its ID is greater than 165.
- The function should return `true` if any move in the provided array is a Gen 2 exclusive move.
- Empty slots (often represented by move ID `0`) should be ignored and not considered Gen 2 exclusive.
- Write unit tests for this function, ensuring it handles edge cases (e.g., empty arrays, move ID `0`, boundary IDs like `165` and `166`).
- Do not modify architectural constraints (ADR 001).
- Ensure any missing types or type errors are corrected, and `pnpm type-check` passes.
- Run `pnpm test` to verify the tests pass.

## Notes for Coder
- If you abort or permanently fail this task, you MUST update the YAML frontmatter to `status: FAILED` or `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [ ] Utility function implemented.
- [ ] Unit tests pass.
- [ ] `pnpm type-check` passes.

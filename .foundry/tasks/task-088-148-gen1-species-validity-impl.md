---
id: task-088-148-gen1-species-validity-impl
type: TASK
title: Implement Gen 1 species validity check
status: ACTIVE
owner_persona: coder
created_at: '2026-06-04'
updated_at: '2026-06-06'
depends_on: []
jules_session_id: '14441890756360177406'
pr_number: null
parent: story-051-088-gen1-species-validity
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

# Implement Gen 1 species validity check

## Objective
Implement the logic to determine if a Generation 2 Pokémon is a valid Generation 1 species.

## Contract
- Create a utility function (e.g., `isGen1Species(pokemonId)`) that takes a Pokémon ID and returns a boolean.
- Gen 1 species are those with IDs from 1 to 151 inclusive.
- Write unit tests for this function, ensuring it handles edge cases (e.g., ID 0, ID 151, ID 152).
- Do not modify architectural constraints (ADR 001).
- Ensure any missing types or type errors are corrected, and `pnpm type-check` passes.
- Do NOT use the `msgpackr` PokeData properties, as this is a simple integer check based on species IDs.
- Run `pnpm test` to verify the tests pass.

## Notes for Coder
- If you abort or permanently fail this task, you MUST update the YAML frontmatter to `status: FAILED` or `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [x] Utility function implemented.
- [x] Unit tests pass.
- [x] `pnpm type-check` passes.

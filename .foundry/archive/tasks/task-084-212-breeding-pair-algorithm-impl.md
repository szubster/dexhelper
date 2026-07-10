---
id: task-084-212-breeding-pair-algorithm-impl
type: TASK
title: Update DB Schema and Generate Script for Egg Groups
status: COMPLETED
owner_persona: coder
created_at: '2026-06-25'
updated_at: '2026-06-28'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-044-084-breeding-pair-algorithm
tags:
  - backend
  - data
  - gen2
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Update DB Schema and Generate Script for Egg Groups

## Objective
Update the `PokemonMetadata` interface in `src/db/schema.ts` to include `egg_groups` (as `eg: string[]` or `eg: number[]` for compactness) and modify `scripts/generate-pokedata.ts` to extract this information from the PokeAPI `pokemon-species` data.

## Technical Contract
- Extend `PokemonMetadata` in `src/db/schema.ts` with an `eg: string[]` field (or similar, representing the egg groups).
- Update `scripts/generate-pokedata.ts` to parse `sData.egg_groups` and populate the new field.
- Implement a utility function to calculate Gen 2 gender based on Attack DV and Gender Ratio (`gr`).
- Write unit tests for the gender calculation logic.

## Acceptance Criteria
- [x] `PokemonMetadata` includes an `eg` (egg groups) property.
- [x] `scripts/generate-pokedata.ts` correctly extracts egg groups.
- [x] Utility for Gen 2 gender calculation based on Attack DV and `gr` is implemented and tested.
- [x] If transient failures occur, update YAML to `status: FAILED` with a `rejection_reason`. If aborting, update to `status: CANCELLED` with `rejection_reason`.
- [x] If submitting an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

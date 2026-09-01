---
id: task-490-506-pal-park-hm-validator-impl
type: TASK
title: Implement Gen 3 HM Move Validation Logic
status: READY
owner_persona: coder
created_at: '2026-08-29'
updated_at: '2026-08-29'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-420-490-pal-park-hm-validation
tags:
  - implementation
  - gen3
  - pal-park
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Implement Gen 3 HM Move Validation Logic

## Context
As part of the Pal Park migration engine (Gen 3 to Gen 4), we need a validator that checks whether a candidate Pokémon knows any Hidden Machine (HM) moves. Gen 3 Pokémon in the party or PC knowing HM moves are generally restricted from being migrated to prevent the player from getting soft-locked in the source game.

## Requirements
- Identify the correct TypeScript module for Pal Park utility logic (e.g. `src/engine/assistant/utils/encounterTools.ts`, `src/engine/assistant/utils/palParkTools.ts`, or a newly created file if one doesn't exist).
- Define a constant array or set containing the Move IDs for all Generation 3 HM moves:
  - Cut
  - Fly
  - Surf
  - Strength
  - Flash
  - Rock Smash
  - Waterfall
  - Dive
- Implement a validator function, `hasGen3HMMoves(moveIds: number[]): boolean`.
- Ensure the function returns `true` if any of the provided move IDs match the Gen 3 HM move list, and `false` otherwise.
- Write corresponding unit tests (in `.test.ts`) validating positive (contains HM), negative (no HMs), and edge cases (empty move list, duplicate moves).

## Acceptance Criteria
- [ ] Implement `GEN3_HM_MOVES` constant containing all 8 Gen 3 HM move IDs.
- [ ] Implement `hasGen3HMMoves` function returning a boolean.
- [ ] Unit tests correctly verify the logic for positive and negative cases.

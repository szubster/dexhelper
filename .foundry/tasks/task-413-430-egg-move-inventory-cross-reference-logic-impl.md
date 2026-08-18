---
id: task-413-430-egg-move-inventory-cross-reference-logic-impl
type: TASK
title: Implement Egg Move Inventory Cross-Reference Logic
status: ACTIVE
owner_persona: coder
created_at: '2026-08-16'
updated_at: '2026-08-18'
depends_on: []
jules_session_id: '9710672368201557725'
pr_number: null
parent: story-114-413-egg-move-inventory-cross-reference-logic
tags:
  - feature
  - mechanics
  - state
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
---

# Task: Implement Egg Move Inventory Cross-Reference Logic

## Context
In Gen 2 and Gen 3, only **Male** Pokémon can pass down Egg Moves to their offspring (excluding Ditto, which cannot pass down Egg Moves it has learned). The current logic in `generateBreedingSuggestions` (`src/engine/assistant/generators/breedGenerator.ts`) simply checks if *any* owned instance has the move: `const hasMove = instances.some((inst) => inst.moves?.includes(moveId));` without checking gender.

## Requirements
1. Update `generateBreedingSuggestions` to verify the gender of the instances that know the egg move.
2. An instance should only be considered as having the move (`hasMove = true`) if it is **Male**.
3. For Gen 2 saves, use the existing `calculateGen2Gender(inst.dvs.atk, genderRate)` utility from `src/utils/gender.ts`.
4. For Gen 3 saves, implement `calculateGen3Gender(personalityValue, genderRate)` in `src/utils/gender.ts` (gender is determined by the lowest 8 bits of PV compared to the gender rate threshold, where `genderRate` in DB is an enum-like value for female ratio, similar to Gen 2).
5. Fetch the `genderRate` (`gr`) from `apiData.pokemonMetadata`.
6. Write Vitest tests covering scenarios where the player has a Female with the move (should not pass) vs a Male with the move (should pass).

## Acceptance Criteria
- [ ] `calculateGen3Gender` is implemented in `src/utils/gender.ts`.
- [ ] `generateBreedingSuggestions` checks if the instance is male before setting `hasMove = true`.
- [ ] Unit tests cover gender constraints.

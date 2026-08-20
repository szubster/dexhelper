---
id: task-414-440-egg-move-inventory-missing-links-impl
type: TASK
title: Implement Egg Move Inventory Missing Links Calculation
status: ACTIVE
owner_persona: coder
created_at: '2026-08-18'
updated_at: '2026-08-20'
depends_on: []
jules_session_id: '354536531762217392'
pr_number: null
parent: story-114-414-egg-move-inventory-missing-links
tags:
  - feature
  - mechanics
  - state
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Implement Egg Move Inventory Missing Links Calculation

## Context
As part of the cross-referencing logic for Egg Moves, we need to calculate and display the "missing links" in a breeding chain. A "missing link" is an intermediate species in the breeding chain that the player does not own or lacks a compatible male to pass down the move.

## Requirements
1. Update the suggestion models in `src/engine/assistant/strategies/types.ts` to support returning missing link data in `StandardSuggestion` (e.g., `missingLinks?: { speciesId: number; reason: 'absent' | 'missing_male' }[];`).
2. Update the logic in `generateBreedingSuggestions` (`src/engine/assistant/generators/breedGenerator.ts`) to calculate these missing links as it traverses the `p.em` chain.
3. If an intermediate `stepSpeciesId` is completely missing from `instancesBySpecies`, flag it as `absent`.
4. If it is present but lacks a valid male instance (reusing the logic added in the previous task), flag it as `missing_male`.
5. Attach the `missingLinks` array to the generated suggestion for the Egg Move.
6. Write unit tests in `src/engine/assistant/generators/__tests__/breedGenerator.test.ts` to verify the logic correctly identifies and flags both 'absent' and 'missing_male' links for complex chains.

## Acceptance Criteria
- [x] `missingLinks` array is populated correctly in the `StandardSuggestion` model.
- [x] The engine correctly identifies species completely missing from inventory as 'absent'.
- [x] The engine correctly identifies species present but without a male as 'missing_male'.
- [x] Unit tests cover multiple chain scenarios.

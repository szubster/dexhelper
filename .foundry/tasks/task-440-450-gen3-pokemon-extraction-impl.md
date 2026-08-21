---
id: task-440-450-gen3-pokemon-extraction-impl
type: TASK
title: Implement Gen 3 Pokemon Extraction Function
status: PENDING
owner_persona: coder
created_at: '2026-08-21'
updated_at: '2026-08-21'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-130-440-extract-gen3-party-data-structure
tags:
  - gen3
  - save-engine
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement Gen 3 Pokemon Extraction Function

## Objective
Implement `extractGen3PokemonData` to extract the raw 100-byte Pokémon data structure for each party Pokémon from an active Gen 3 save file. This function should manage extracting and decrypting the 48-byte Data block inside this 100-byte structure.

## Description
In `src/engine/saveParser/parsers/gen3.ts`:
1.  Implement `extractGen3PokemonData(view: DataView, offset: number)`:
    *   Parse the 100-byte structure.
    *   Calculate the decryption key (`pv ^ otId`).
    *   Determine the permutation (as defined in `src/engine/saveParser/parsers/gen3.ts` using `SUBSTRUCTURE_ORDER`).
    *   Extract and decrypt the 48-byte data block using the `DataView` API.
    *   If both PV and OTID are 0, return `null`.
2.  Refactor `parseGen3Party` to utilize the new `extractGen3PokemonData` function for extracting species, items, and moves, rather than doing the calculation manually.

## Technical Details
-   Ensure correct offset parsing across all Gen 3 games using the `DataView` API.
-   Do not implement specific stat/attribute extraction (like Pokérus) yet, this story is strictly about scaffolding the 100-byte data block structure and managing decryption.
-   Only refactor `parseGen3Party` in this task to minimize scope as the story states "Extract Gen 3 Party Data Structure", however, doing so for `parseGen3PCBoxes` is highly recommended to prevent duplicate logic.

## Acceptance Criteria
- [ ] `extractGen3PokemonData` is implemented and exports a decrypted 48-byte buffer.
- [ ] `parseGen3Party` correctly uses `extractGen3PokemonData`.
- [ ] Appropriate unit tests are added or updated.
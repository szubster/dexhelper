---
id: task-245-249-gen2-box-grouping-impl
type: TASK
title: Implement Gen 2 Box Parsing Grouping
status: ACTIVE
owner_persona: coder
created_at: '2026-06-29'
updated_at: '2026-07-01'
depends_on: []
jules_session_id: '2324158207491763169'
pr_number: null
parent: story-108-245-gen2-box-parsing
tags:
  - backend
  - save-parsing
  - gen2
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Implement Gen 2 Box Parsing Grouping

## Objective
Implement the backend data grouping and aggregation logic to take extracted PC Box Pokémon from Generation 2 save files and group them by species ID for duplicate analysis.

## Context
The goal is to prepare Gen 2 PC box data for the frontend Comparison Matrix UI. Gen 2 box parsing (`parsePCBoxes` in `src/engine/saveParser/parsers/gen2.ts`) already extracts PC box Pokémon into the `pcDetails` array in `SaveData`. `parseGen2PokemonInstance` natively calculates DVs and Shininess for each instance. We need a utility function to group this array by `speciesId` and specifically ensure we only process Pokémon from PC Boxes.

## Requirements
1.  **Grouping Utility**: Create a utility function (e.g., in `src/engine/saveParser/utils/boxGrouping.ts`) that takes an array of `PokemonInstance` and returns a grouped object/record where the key is the `speciesId` and the value is an array of `PokemonInstance`.
2.  **Location Filtering**: Ensure that the grouping logic explicitly ignores any Pokémon that are NOT from a PC Box. You can verify this by checking if `pokemon.storageLocation.startsWith('Box')` (or similar, depending on how `parseGen2PokemonInstance` tags locations, which is currently `Box N`). This satisfies the requirement to exclude Party or Daycare Pokémon to prevent accidental releases.
3.  **Stat Verification**: Confirm via tests that the instances being grouped include DVs and Shininess. (This should happen natively because `pcDetails` is constructed via `parseGen2PokemonInstance`).
4.  **Unit Tests**: Add a test file (e.g., `boxGrouping.test.ts`) that verifies the grouping logic and location filtering.
5.  **Constants Requirement**: When parsing or verifying save file data structures, ensure that all memory offsets, lengths, bit locations, and shifts must be defined as reusable constants at the module level, forbidding inline magic numbers.

## Reminders
*   If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
*   If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
*   If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [x] Grouping logic is implemented to group `PokemonInstance` objects by `speciesId`.
- [x] Party and Daycare Pokémon are actively excluded from the grouping output.
- [x] Unit tests are written to verify grouping and filtering behavior.
- [x] Ensure that all memory offsets, lengths, bit locations, and shifts must be defined as reusable constants at the module level, forbidding inline magic numbers.

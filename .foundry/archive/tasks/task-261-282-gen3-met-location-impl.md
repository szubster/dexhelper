---
id: task-261-282-gen3-met-location-impl
type: TASK
title: Implement Gen 3 Met Location Extraction
status: COMPLETED
owner_persona: coder
created_at: '2026-07-08'
updated_at: '2026-07-31'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-097-261-extract-pokemon-met-locations
tags:
  - feature
  - nuzlocke
  - gen3
rejection_count: 2
rejection_reason: ''
notes: ''
---

# TASK: Implement Gen 3 Met Location Extraction

## Objective
Implement extraction of the `metLocation` data from Gen 3 Pokémon structures.

## Context
In Gen 3, the `metLocation` is stored in the 48-byte Encrypted Data block, specifically in the Miscellaneous (M) substructure.
The M substructure is 12 bytes long. The `metLocation` is a 1-byte value located at offset 1 within the M substructure (the second byte).
Currently, the `met_location` field does not exist in `PokemonInstance.caughtData` in `src/engine/saveParser/parsers/common.ts`.

## Requirements
1.  **Update Interface:** Modify `PokemonInstance` in `src/engine/saveParser/parsers/common.ts`. Ensure `caughtData` is updated to include the raw `metLocation` byte value (e.g. `metLocation?: number;` inside `caughtData`, alongside existing `location: number` used by other gens). **Ensure you check existing types** to see the best place to add it, likely inside the `caughtData` object.
2.  **Avoid Magic Numbers:** Define a reusable constant at the module level for the offset, e.g., `MET_LOCATION_OFFSET_IN_M = 1`. Do not use inline magic numbers.
3.  **Use DataView:** Ensure all new parsing logic strictly uses the `DataView` API. If reading from the decrypted M substructure block (which might be an array or dataview), use the proper bounds and API.
4.  **Parse Logic:** Update `src/engine/saveParser/parsers/gen3.ts` (or the relevant file where Pokémon party/PC data is decrypted/parsed, such as wherever `parseGen3PersonalityValue` or `parseGen3Ribbons` is used to read from the M block) to extract this byte and attach it to the parsed `PokemonInstance`.

## Hand-off Instructions
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [x] `metLocation` parsing logic added for Gen 3.
- [x] Constant defined for the offset (no magic numbers).
- [x] `DataView` API utilized.

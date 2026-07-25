---
id: task-319-323-gen3-hof-pokedex-extraction-impl
type: TASK
title: Implement Gen 3 Hall of Fame & Pokédex Data Extraction
status: ACTIVE
owner_persona: coder
created_at: '2026-07-15'
updated_at: '2026-07-25'
depends_on: []
jules_session_id: '1082541271944162161'
pr_number: null
parent: story-304-319-gen3-hof-pokedex-extraction
tags:
  - data-extraction
  - gen3
research_references:
  - .foundry/docs/knowledge_base/engine/save_parsing/gen3_hall_of_fame.md
  - .foundry/docs/knowledge_base/gen3_pokemon_data_structure.md
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement Gen 3 Hall of Fame & Pokédex Data Extraction

## Objective
Implement the logic to extract the Hall of Fame entry flag (`GAME_STAT_ENTERED_HOF`, ID 10) and Pokédex data (number of caught Pokémon in Hoenn and National Dex) from Gen 3 save files.

## Technical Contract
- **Architecture Constraint (ADR 010):** You MUST exclusively use the native `DataView` API (e.g., `getUint8`, `getUint16`, `getUint32`) for all new parsing logic.
- **Architecture Constraint (ADR 028):** You MUST define all memory offsets, limits, bit locations, and shifts as reusable module-level constants. Inline magic numbers are strictly forbidden.
- **Relative Offsets:** When parsing data from `SaveBlock1`, you MUST use the dynamically resolved `section1Offset` passed to the function to calculate relative memory offsets, properly supporting the Gen 3 A/B bank flash memory architecture.
- **Bounds Checking:** You MUST wrap your `DataView` reads in a `try...catch` block. If a `RangeError` is caught, you MUST throw a new `Error` with the precise message `"The save file is corrupted or incomplete."` to prevent silent failures.
- **Implementation Scope:**
  - Locate and extract the `GAME_STAT_ENTERED_HOF` (ID 10) from the `gameStats` array in `SaveBlock1` or use an equivalent methodology per the research references to determine Hall of Fame entry.
  - Extract the number of caught Pokémon in both the Hoenn and National Dex. (The exact offsets and structure should be determined during implementation based on Gen 3 save structure knowledge).
- **Testing:** You MUST write corresponding Vitest unit tests to cover the new extraction logic.

## Acceptance Criteria
- [ ] `DataView` API is used for parsing.
- [ ] All offsets and constants are defined at the module level.
- [ ] Relative offsets from `section1Offset` are used for `SaveBlock1` data.
- [ ] `RangeError` is caught and translated to `"The save file is corrupted or incomplete."`.
- [ ] `GAME_STAT_ENTERED_HOF` or equivalent Hall of Fame entry flag is extracted.
- [ ] Number of caught Pokémon in Hoenn and National Dex is extracted.
- [ ] Tests are written and pass.

## Persona Instructions
- **Coder & QA:** If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- **Coder & QA:** If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- **Coder & QA:** If you submit an empty PR for a completed task (e.g., if the work is already done), you MUST check off all Acceptance Criteria checkboxes before submitting.

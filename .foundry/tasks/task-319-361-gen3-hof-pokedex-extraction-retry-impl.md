---
id: task-319-361-gen3-hof-pokedex-extraction-retry-impl
type: TASK
title: Implement Gen 3 Hall of Fame & Pokédex Data Extraction (Retry)
status: ACTIVE
owner_persona: coder
created_at: '2026-07-29'
updated_at: '2026-07-29'
depends_on:
  - research-319-360-gen3-hof-magic-numbers
jules_session_id: '151059372485234069'
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

# Implement Gen 3 Hall of Fame & Pokédex Data Extraction (Retry)

## Objective
Implement the logic to extract the Hall of Fame entry flag (`GAME_STAT_ENTERED_HOF`, ID 10) and Pokédex data (number of caught Pokémon in Hoenn and National Dex) from Gen 3 save files. This is a retry after the previous implementation failed QA due to using magic numbers.

## Technical Contract
- **Architecture Constraint (ADR 010):** You MUST exclusively use the native `DataView` API (e.g., `getUint8`, `getUint16`, `getUint32`) for all new parsing logic.
- **Architecture Constraint (ADR 028):** You MUST define all memory offsets, limits, bit locations, and shifts as reusable module-level constants. Inline magic numbers are strictly forbidden.
- **Save File Parsing & Extraction Guidelines Compliance:** You MUST strictly adhere to all guidelines defined in **Section 13 ("Save File Parsing & Extraction Guidelines")** of `.foundry/docs/schema.md`.
  - All memory offsets, lengths, bit locations, shifts, and array bounds checking limits must be explicitly defined as reusable constants at the module level.
  - No magic numbers (e.g., `0x2dd6`, `>> 4`, `* 4`, `/ 8`, `% 8`) are allowed directly in parsing functions. Create constants such as `BYTES_PER_GAME_STAT` or `BITS_PER_BYTE`.
  - You must pass and utilize the resolved section offset (e.g., `section1Offset` or `section2Offset`) to calculate relative memory offsets.
  - When parsing bitwise blocks using the `DataView` API, you must explicitly map the specific bit offsets corresponding to target events.
  - You MUST catch `RangeError` for out-of-bounds reads and throw a new error with the message "The save file is corrupted or incomplete." to prevent application crashes.
- **Implementation Scope:**
  - Wait for the completion of `research-319-360-gen3-hof-magic-numbers` to understand exactly which constants to define.
  - Locate and extract the `GAME_STAT_ENTERED_HOF` (ID 10) from the `gameStats` array in `SaveBlock1` or use an equivalent methodology per the research references to determine Hall of Fame entry.
  - Extract the number of caught Pokémon in both the Hoenn and National Dex.
- **Testing:** You MUST write corresponding Vitest unit tests to cover the new extraction logic.

## Acceptance Criteria
- [ ] `DataView` API is used for parsing.
- [ ] All offsets, limits, and multipliers are defined at the module level (no magic numbers).
- [ ] Section 13 of `.foundry/docs/schema.md` is strictly adhered to.
- [ ] Relative offsets from `section1Offset` are used for `SaveBlock1` data.
- [ ] `RangeError` is caught and translated to `"The save file is corrupted or incomplete."`.
- [ ] `GAME_STAT_ENTERED_HOF` or equivalent Hall of Fame entry flag is extracted.
- [ ] Number of caught Pokémon in Hoenn and National Dex is extracted.
- [ ] Tests are written and pass.

## Persona Instructions
- **Coder & QA:** If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- **Coder & QA:** If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- **Coder & QA:** If you submit an empty PR for a completed task (e.g., if the work is already done), you MUST check off all Acceptance Criteria checkboxes before submitting.

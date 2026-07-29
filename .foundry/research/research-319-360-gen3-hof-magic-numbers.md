---
id: research-319-360-gen3-hof-magic-numbers
type: RESEARCH
title: Investigate Magic Numbers for Gen 3 HOF Offsets
status: ACTIVE
owner_persona: researcher
created_at: '2026-07-29'
updated_at: '2026-07-29'
depends_on: []
jules_session_id: '7509224859674163249'
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

# Research: Investigate Magic Numbers for Gen 3 HOF Offsets

## Objective
Investigate how to avoid using magic numbers for offset calculations in the Gen 3 Hall of Fame data extraction. The previous implementation was rejected because it used inline magic numbers like `GAME_STAT_ENTERED_HOF_ID * 4`, `Math.floor(bitIndex / 8)`, and `bitIndex % 8`.

## Requirements
- Identify the appropriate module-level constants that should be defined to replace the magic numbers `4` and `8` in the context of `GAME_STAT_ENTERED_HOF_ID` and bitwise operations for Pokédex extraction.
- Provide a summary of the required constants and their purposes.

## Acceptance Criteria
- [x] Determine module-level constants for `4` (bytes per stat) and `8` (bits per byte) to avoid inline magic numbers.
- [x] Provide documentation on how these constants should be used in the parsing logic.

## Findings
To adhere to the "No Magic Numbers" policy outlined in the Save File Parsing & Extraction Guidelines (Section 13 of `.foundry/docs/schema.md`), the following module-level constants have been identified and must be defined in the parsing module:

- **`BYTES_PER_GAME_STAT = 4`**: Since each game stat is a 32-bit integer, this constant replaces the inline `4` when calculating offsets in the `gameStats` array. It should be used as: `offset = GAME_STAT_ENTERED_HOF_ID * BYTES_PER_GAME_STAT`.
- **`BITS_PER_BYTE = 8`**: This constant replaces the inline `8` used during bitwise operations (like Pokédex extraction). It should be used to calculate the byte index (`Math.floor(bitIndex / BITS_PER_BYTE)`) and the remaining bit offset (`bitIndex % BITS_PER_BYTE`).

These requirements have been documented in `.foundry/docs/knowledge_base/engine/save_parsing/gen3_hall_of_fame.md`.

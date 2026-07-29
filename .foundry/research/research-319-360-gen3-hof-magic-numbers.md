---
id: research-319-360-gen3-hof-magic-numbers
type: RESEARCH
title: Investigate Magic Numbers for Gen 3 HOF Offsets
status: READY
owner_persona: researcher
created_at: '2026-07-29'
updated_at: '2026-07-29'
depends_on: []
jules_session_id: null
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
- [ ] Determine module-level constants for `4` (bytes per stat) and `8` (bits per byte) to avoid inline magic numbers.
- [ ] Provide documentation on how these constants should be used in the parsing logic.

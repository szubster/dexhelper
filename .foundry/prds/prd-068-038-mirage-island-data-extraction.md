---
id: prd-068-038-mirage-island-data-extraction
type: PRD
title: Extract Gen 3 Mirage Island Value
status: READY
owner_persona: epic_planner
created_at: '2026-06-04'
updated_at: '2026-06-06'
depends_on: []
jules_session_id: null
pr_number: null
parent: idea-068-mirage-island-predictor
tags:
  - feature
  - gen3
  - mirage-island
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Extract Gen 3 Mirage Island Value

## Context
As defined in `idea-068-mirage-island-predictor`, we need to implement a predictor for Mirage Island in Gen 3 games (Ruby, Sapphire, Emerald). Mirage Island appears if the game's daily Mirage Island value matches the lower two bytes of the personality value of any Pokémon in the player's party. This feature will give players the ability to scan their entire PC box.

## Requirements

1. **Save File Parsing**: Update the save parser engine to extract the daily Mirage Island value. This value is likely stored in the save file's daily/random variables block. As per ADR 010, `DataView` must be strictly used for all parsing logic to ensure robustness against out-of-bounds reads.
2. **Personality Value Extraction**: We already extract Pokémon data. Ensure that the full 32-bit personality value (or specifically the lower 16 bits) is correctly parsed and made available for every Pokémon in the PC boxes.
3. **Data Hydration**: Expose the parsed daily Mirage Island value and the relevant Pokémon personality value segments in the unified application state (`PokeDB` or equivalent) for consumption by the suggestion engine or UI controllers.

## Constraints
- The implementation must strictly adhere to the `DataView` API for all new save parsing logic as mandated by ADR 010.
- Ensure graceful error handling if the save file is corrupted or truncated.
- The parsed value should be included in the unified data payload and must maintain backwards compatibility with Gen 1 and Gen 2 files.

## Acceptance Criteria
- [x] Epic Planner: Generate child epics that implement the save file parsing updates and the application state hydration.
- [ ] .foundry/epics/epic-038-061-mirage-island-value-parsing.md
- [ ] .foundry/epics/epic-038-062-pokemon-personality-value-extraction.md

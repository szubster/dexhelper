---
id: epic-051-094-friendship-data-extraction
type: EPIC
title: Friendship Data Extraction (Gen 2 & 3)
status: READY
owner_persona: story_owner
created_at: '2026-06-16'
updated_at: '2026-06-17'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-081-051-friendship-evolution-tracker
tags:
  - gen2
  - gen3
  - save-parsing
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Friendship Data Extraction (Gen 2 & 3)

## Description
Implement the core data extraction logic to read the Friendship (Happiness) value for Pokémon in both Generation 2 and Generation 3 save files. The parser must extract this value for Pokémon in the active Party as well as those stored in PC Boxes.

## Requirements
*   **Gen 2 Parsing:** Extract the Friendship byte from both Party and PC data structures.
*   **Gen 3 Parsing:** Extract the Friendship byte from the Growth (G) substructure within the 48-byte encrypted Data block for both Party and PC Pokémon.
*   The data must be exposed via the engine's standard API, returning the raw 0-255 value for each parsed Pokémon.
*   Ensure rigorous bounds checking using the `DataView` API as mandated by ADR 010.

## Acceptance Criteria
- [ ] Gen 2 Party parsing extracts Friendship value.
- [ ] Gen 2 PC parsing extracts Friendship value.
- [ ] Gen 3 Party parsing extracts Friendship value (handling PV % 24 substructure permutation).
- [ ] Gen 3 PC parsing extracts Friendship value.
- [ ] Unit tests added/updated to verify Friendship extraction against known save fixtures.

- [x] Break down into Tasks
- [ ] story-094-151-gen2-friendship-extraction
- [ ] story-094-152-gen3-friendship-extraction

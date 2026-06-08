---
id: epic-038-062-personality-value-extraction
type: EPIC
title: "Extract Pokemon Personality Values"
status: PENDING
owner_persona: "story_owner"
created_at: "2026-06-08"
updated_at: "2026-06-08"
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-068-038-mirage-island-data-extraction
tags:
  - feature
  - gen3
  - mirage-island
research_references: []
rejection_count: 0
rejection_reason: ""
notes: ""
---

# Extract Pokemon Personality Values

## Context
As defined in PRD `prd-068-038-mirage-island-data-extraction`, the appearance of Mirage Island depends on whether the daily Mirage Island value matches the lower two bytes (16 bits) of the personality value of any Pokémon in the player's party/PC.

## Requirements
1. **Full 32-bit PV Parsing**: Ensure the Gen 3 Pokémon data extraction correctly parses the full 32-bit personality value (PV) for every Pokémon.
2. **Lower 16-bit Availability**: Ensure that the lower 16 bits of the PV, which are necessary for the Mirage Island check, are easily accessible or pre-calculated.
3. **DataView API**: Comply with ADR 010 by using the `DataView` API for any new PV parsing logic.

## Acceptance Criteria
- [ ] Story Owner: Generate child stories to ensure the personality value is correctly extracted and formatted.

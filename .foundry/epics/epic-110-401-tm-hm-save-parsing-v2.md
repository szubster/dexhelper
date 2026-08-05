---
id: epic-110-401-tm-hm-save-parsing-v2
type: EPIC
title: Gen 1-3 TM/HM Save Parsing V2
status: PENDING
owner_persona: story_owner
created_at: '2026-08-05'
updated_at: '2026-08-05'
depends_on:
  - research-110-400-investigate-tm-hm-save-parsing-failure
jules_session_id: null
pr_number: null
parent: prd-105-110-tm-hm-inventory-planner
tags:
  - feature
  - gen1
  - gen2
  - gen3
  - save-parsing
research_references:
  - .foundry/docs/knowledge_base/moveset-inventory-memory-offsets.md
notes: ''
---

# Gen 1-3 TM/HM Save Parsing V2

## Overview
This Epic focuses on parsing the Item Bag structures for Generation 1, 2, and 3 save files to extract the player's current TM and HM inventory. It is version 2, replacing the previously failed attempt.

## Requirements
- Parse the Item Bag structure for Gens 1, 2, and 3 save files to extract current TM and HM inventory.
- Identify the specific TM/HM item IDs and their quantities.
- Map the parsed TM/HM items to their corresponding moves.
- Extract Event Flags to determine if one-time TMs have already been collected.
- **Constraint:** Must adhere to ADR 015 regarding full `PokeData` property names.
- **Constraint:** Must follow ADR 028 for dynamic save block extraction (no inline magic numbers, use module-level constants for offsets/lengths).

## Acceptance Criteria
- [ ] Break down into STORY nodes for Gen 1, Gen 2, and Gen 3 parsing.
- [ ] Generate a final STORY dedicated exclusively to Integration and E2E Verification.

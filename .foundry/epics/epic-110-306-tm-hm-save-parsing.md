---
id: epic-110-306-tm-hm-save-parsing
type: EPIC
title: Gen 1-3 TM/HM Save Parsing
status: READY
owner_persona: story_owner
created_at: '2026-07-12'
updated_at: '2026-07-31'
depends_on: []
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
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 1-3 TM/HM Save Parsing

## Overview
As part of the Gen 1-3 TM/HM Inventory & Compatibility Planner, this Epic focuses on the Data Layer requirement. It involves parsing the Item Bag structures for Generation 1, 2, and 3 save files to extract the player's current TM and HM inventory.

## Requirements
- Parse the Item Bag structure for Gens 1, 2, and 3 save files to extract current TM and HM inventory.
- Identify the specific TM/HM item IDs and their quantities.
- Map the parsed TM/HM items to their corresponding moves.
- Extract Event Flags to determine if one-time TMs have already been collected.
- **Constraint:** Must adhere to ADR 015 regarding full `PokeData` property names.
- **Constraint:** Must follow ADR 028 for dynamic save block extraction (no inline magic numbers, use module-level constants for offsets/lengths).

## Acceptance Criteria
- [ ] story-306-319-gen1-tm-hm-parsing
- [ ] story-306-320-gen2-tm-hm-parsing
- [ ] story-306-321-gen3-tm-hm-parsing
- [x] Break down into STORY nodes for Gen 1, Gen 2, and Gen 3 parsing.

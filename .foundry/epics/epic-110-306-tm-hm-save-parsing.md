---
id: epic-110-306-tm-hm-save-parsing
type: EPIC
title: TM/HM Save Parsing (Gens 1-3)
status: PENDING
owner_persona: story_owner
created_at: "2026-08-04"
updated_at: "2026-08-04"
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-105-110-tm-hm-inventory-planner
tags:
  - data-parsing
  - gen1
  - gen2
  - gen3
research_references: []
rejection_count: 0
rejection_reason: ""
notes: ""
---

# TM/HM Save Parsing (Gens 1-3)

## Description
This epic covers the Data Layer requirements for the TM/HM Inventory Planner. It involves parsing the Item Bag structures for Gen 1, Gen 2, and Gen 3 save files to extract the player's current TM and HM inventory. It also includes identifying specific TM/HM item IDs, their quantities, mapping them to their corresponding moves, and extracting event flags to determine if one-time TMs have already been collected.

All parsing logic must follow ADR 015 regarding full `PokeData` property names and ADR 028 for dynamic save block extraction (using module-level constants for offsets/lengths, no inline magic numbers, and supporting relative offsets for Gen 3).

## Dependencies & Prerequisites
- Knowledge of accurate offset documentation for TM/HM pockets in Gen 1, 2, and 3 bags.
- Knowledge of event flags for TM pickups.

## Acceptance Criteria
- [ ] Implement Gen 1 save parsing for TM/HM inventory and event flags.
- [ ] Implement Gen 2 save parsing for TM/HM inventory and event flags.
- [ ] Implement Gen 3 save parsing for TM/HM inventory and event flags.
- [ ] Ensure all parsing uses full `PokeData` property names.
- [ ] Define module-level constants for all memory offsets and avoid inline magic numbers.
- [ ] A final STORY dedicated exclusively to Integration and E2E Verification must be generated for this EPIC.

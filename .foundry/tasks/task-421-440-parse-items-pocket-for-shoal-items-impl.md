---
id: task-421-440-parse-items-pocket-for-shoal-items-impl
type: TASK
title: Implement Gen 3 Items Pocket Parsing for Shoal Items
status: COMPLETED
owner_persona: coder
created_at: '2026-08-13'
updated_at: '2026-08-20'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-411-421-shoal-items-parsing
tags:
  - task
  - gen3
  - item-tracker
  - data-extraction
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Implement Gen 3 Items Pocket Parsing for Shoal Items

## Context
This task focuses on the backend parsing logic for extracting the counts of Shoal Shells and Shoal Salts from the Gen 3 save file. We need to parse the Items pocket and return the counts in the SaveData object.

Based on our research:
- **Items Pocket Offsets:**
  - Ruby/Sapphire: `0x0560`
  - Emerald: `0x0560`
  - FireRed/LeafGreen: `0x0310`
- **Items Pocket Sizes:**
  - Ruby/Sapphire: 20 items * 4 bytes = 80 bytes (`0x50`)
  - Emerald: 30 items * 4 bytes = 120 bytes (`0x78`)
  - FireRed/LeafGreen: 42 items * 4 bytes = 168 bytes (`0xA8`)
- **Item IDs:**
  - Shoal Salt: `0x02B`
  - Shoal Shells: `0x02C`

Note: As seen in `parseGen3TMHMs`, item quantities in Gen 3 pockets are XOR-masked with the lower 16 bits of the security key (`quantity = maskedQuantity ^ (securityKey & LOWER_16_BIT_MASK)`).

## Acceptance Criteria
- [x] In `src/engine/saveParser/parsers/gen3.ts`, define constants `ITEMS_POCKET_OFFSET_RS = 0x0560`, `ITEMS_POCKET_OFFSET_EMERALD = 0x0560`, `ITEMS_POCKET_OFFSET_FRLG = 0x0310`, `ITEMS_POCKET_SIZE_RS = 80`, `ITEMS_POCKET_SIZE_EMERALD = 120`, `ITEMS_POCKET_SIZE_FRLG = 168`, `ITEM_SHOAL_SALT = 0x02B`, `ITEM_SHOAL_SHELL = 0x02C`.
- [x] In `src/engine/saveParser/parsers/common.ts`, update `Gen3SaveData` to include `gen3ShoalItems?: { shells: number; salt: number };`.
- [x] In `src/engine/saveParser/parsers/gen3.ts`, implement `parseGen3ShoalItems(view: DataView, saveBlock1Offset: number, gameVersion: GameVersion, securityKey: number)` to extract the Shoal Items. Iterate using `ITEM_ENTRY_SIZE` and unmask quantity using the `securityKey` in the same way `parseGen3TMHMs` does.
- [x] In `src/engine/saveParser/parsers/gen3.ts`, update `parseGen3` to call `parseGen3ShoalItems` and attach the returned value to the main output.
- [x] Ensure proper RangeError handling for `DataView` operations to throw "The save file is corrupted or incomplete." on failure.

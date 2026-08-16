---
id: task-297-338-gen2-roamer-core-extraction-impl
type: TASK
title: Implement Gen 2 Roamer Core Data Extraction
status: ACTIVE
owner_persona: coder
created_at: '2026-07-21'
updated_at: '2026-08-16'
depends_on: []
jules_session_id: '15309777334278320584'
pr_number: null
parent: story-139-297-gen2-roamer-core-extraction
tags:
  - feature
  - gen2
  - roamer
  - save-parsing
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# TASK: Implement Gen 2 Roamer Core Data Extraction

## Context
As part of the Gen 2 Roamer Data Extraction Epic, we need to extract the 7-byte `roam_struct` for the Gen 2 roamers (Raikou, Entei, Suicune) and the map tracking variables from the `sPokemonData` block.

## Requirements
- The roamer data is located starting at offset `0x02F8` within the `sPokemonData` block (which begins at `0xDCD7` in WRAM).
- Read the species, level, HP, and map variables for Raikou (`+0x02F8`), Entei (`+0x02FF`), and Suicune (`+0x0306`).
- Extract `wRoamMons_CurMapGroup` and `wRoamMons_CurMapNumber` (at `+0x030C` and `+0x030B` respectively) to track their current location.
- **CRITICAL:** All memory offsets, lengths, bit locations, and shifts must be explicitly defined as reusable constants at the module level. Inline magic numbers for memory operations are strictly forbidden.

## Acceptance Criteria
- [ ] Implement data extraction for the 3 Gen 2 roaming legendaries based on the 7-byte `roam_struct`.
- [ ] Extract the map tracking variables correctly.
- [ ] Ensure all memory offsets and lengths are defined as module-level constants.
- [ ] Catch `RangeError` exceptions originating from out-of-bounds `DataView` reads, and rethrow them with the message: `'The save file is corrupted or incomplete.'` (per ADR 010).

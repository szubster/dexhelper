---
id: story-139-297-gen2-roamer-core-extraction
type: STORY
title: Parse Gen 2 Roamer Core Data
status: COMPLETED
owner_persona: tech_lead
created_at: '2026-07-11'
updated_at: '2026-08-18'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-043-139-gen2-roamer-data-extraction
tags: []
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Parse Gen 2 Roamer Core Data

## Objective
Extract the 7-byte `roam_struct` for the Gen 2 roamers (Raikou, Entei, Suicune) and the map tracking variables from the `sPokemonData` block.

## Description
- The roamer data is located starting at offset `0x02F8` within the `sPokemonData` block (which begins at `0xDCD7` in WRAM).
- Read the species, level, HP, and map variables for Raikou (`+0x02F8`), Entei (`+0x02FF`), and Suicune (`+0x0306`).
- Extract `wRoamMons_CurMapGroup` and `wRoamMons_CurMapNumber` (at `+0x030C` and `+0x030B` respectively) to track their current location.

## Acceptance Criteria
- [x] Implement data extraction for the 3 Gen 2 roaming legendaries based on the 7-byte `roam_struct`.
- [x] Extract the map tracking variables correctly.
- [x] Break down this Story into Tasks.

- [x] task-297-338-gen2-roamer-core-extraction-impl
- [x] task-297-339-gen2-roamer-core-extraction-qa

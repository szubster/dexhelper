---
id: epic-524-540-trick-house-tracker
type: EPIC
title: Gen 3 Trick House Tracker Dashboard
status: READY
owner_persona: story_owner
created_at: '2026-09-05'
updated_at: '2026-09-05'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-155-524-trick-house-tracker
tags:
  - dexhelper
  - feature
  - gen3
  - tracker
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 3 Trick House Tracker Dashboard

## Context & Vision
The Trick House is a recurring side-quest in Generation 3 games (Ruby, Sapphire, Emerald) consisting of eight unique puzzles that unlock as the player earns Gym Badges. This EPIC covers the implementation of a "Trick House Tracker" component in DexHelper to parse the player's save file, extract the Trick House variables, and display a helpful dashboard.

## Requirements
1. **Save File Parsing:**
   - Extract `VAR_TRICK_HOUSE_LEVEL` (current puzzle level) at `SAVE_BLOCK_1_VARS_OFFSET + ((0x4044 - 0x4000) * 2)`.
   - Extract puzzle state variables (`VAR_TRICK_HOUSE_PUZZLE_1_STATE` to `VAR_TRICK_HOUSE_PUZZLE_8_STATE`) at their respective offsets.
   - Extract `VAR_TRICK_HOUSE_PRIZE_PICKUP` (prize status) at `SAVE_BLOCK_1_VARS_OFFSET + ((0x40C1 - 0x4000) * 2)`.
   - Use MsgPack (`msgpackr`) with `useRecords: true` when serializing/deserializing application data structures (`PokeData`).
   - For Gen 3 save block extraction, pass and utilize the resolved section offset (e.g., `section1Offset`) to support A/B bank flash memory architecture.

2. **UI Layout & Dashboard:**
   - Display the current puzzle level and overall completion status.
   - Map puzzle levels to required HMs/items (e.g., Cut for Level 1, Rock Smash for Level 3, Strength for Level 4, Surf/Secret Power for subsequent levels).
   - Indicate if the player needs to pick up a prize from a previous completion.
   - Adhere strictly to UI aesthetic constraints (tactical hardware, sharp edges `rounded-none`, monospaced fonts, dashed borders).

## Breakdown
- Implement Save File Parsing for Trick House.
- Implement Trick House Tracker Dashboard UI.
- Integration and E2E Verification.

## Acceptance Criteria
- [ ] Story Owner: Break down into implementation stories for parsing and UI.
- [ ] Story Owner: Generate a final STORY dedicated exclusively to Integration and E2E Verification (tagged with `e2e` or `integration`).

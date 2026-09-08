---
id: story-540-558-trick-house-save-parsing
type: STORY
title: Trick House Save Parsing Logic
status: PENDING
owner_persona: tech_lead
created_at: '2026-09-05'
updated_at: '2026-09-05'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-524-540-trick-house-tracker
tags:
  - dexhelper
  - feature
  - gen3
  - tracker
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Trick House Save Parsing Logic

## Context
As part of the Gen 3 Trick House Tracker Dashboard, we need to extract the player's Trick House state from the save file. This involves extracting the current puzzle level, the states of the 8 puzzles, and the prize pickup flag from Save Block 1.

## Requirements
- Parse `VAR_TRICK_HOUSE_LEVEL` at `SAVE_BLOCK_1_VARS_OFFSET + ((0x4044 - 0x4000) * 2)`.
- Parse puzzle state variables `VAR_TRICK_HOUSE_PUZZLE_1_STATE` to `VAR_TRICK_HOUSE_PUZZLE_8_STATE`.
- Parse `VAR_TRICK_HOUSE_PRIZE_PICKUP` at `SAVE_BLOCK_1_VARS_OFFSET + ((0x40C1 - 0x4000) * 2)`.
- Serialize the output as `PokeData` format using `msgpackr` with `useRecords: true`.
- Utilize relative section offsets (e.g., `section1Offset`) for Gen 3 A/B bank flash memory architecture.
- Follow architectural rules (ADR 032, no magic numbers, explicit module-level constants).

## Acceptance Criteria
- [ ] Tech Lead: Break down into implementation TASK nodes (e.g., constants definition, core logic).
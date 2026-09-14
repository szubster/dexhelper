---
id: task-558-568-gen3-trick-house-core-logic
type: TASK
title: Implement Gen 3 Trick House Save Parsing Core Logic
status: PENDING
owner_persona: coder
created_at: '2026-09-12'
updated_at: '2026-09-12'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-540-558-trick-house-save-parsing
tags:
  - dexhelper
  - feature
  - gen3
  - tracker
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Implement Gen 3 Trick House Save Parsing Core Logic

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
- [ ] Constants defined for `VAR_TRICK_HOUSE_LEVEL`, puzzle states, and prize pickup.
- [ ] Core logic implemented to parse Trick House state.
- [ ] Integration with Gen 3 save parser completed.

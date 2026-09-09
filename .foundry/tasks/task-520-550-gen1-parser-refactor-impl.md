---
id: task-520-550-gen1-parser-refactor-impl
type: TASK
title: Refactor Gen 1 Core Parser Logic
status: READY
owner_persona: coder
created_at: '2026-09-03'
updated_at: '2026-09-03'
parent: story-521-520-gen1-parser-refactor-core
depends_on:
  - task-520-549-gen1-parser-constants-impl
jules_session_id: null
rejection_reason: ''
---

# TASK: Refactor Gen 1 Core Parser Logic

## Context
Use the newly defined constants in gen1.ts parsing logic.

## Acceptance Criteria
- [ ] Replace inline `11`, `4`, `25` with `GEN1_STRING_LENGTH`, `POKEMON_MAX_MOVES`, `PIKACHU_DEX_ID`.
- [ ] Replace inline `2` and `4` in math thresholds with `RED_BLUE_SCORE_THRESHOLD` and `MIN_RED_SCORE_FOR_CONFIDENCE`.
- [ ] Refactor item offset calculations to use `ITEM_RECORD_LENGTH`, `ITEM_LIST_START_OFFSET`, and `ITEM_QUANTITY_OFFSET`.
- [ ] Replace `1 <<` with `BIT_MASK <<` in `npcTradeFlags` bitwise operations.
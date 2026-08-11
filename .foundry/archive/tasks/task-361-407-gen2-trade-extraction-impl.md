---
id: task-361-407-gen2-trade-extraction-impl
type: TASK
title: Gen 2 NPC Trade Extraction Implementation
status: COMPLETED
owner_persona: coder
created_at: '2026-08-08'
updated_at: '2026-08-09'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-349-361-gen2-trade-extraction
tags:
  - feature
  - backend
  - save-parsing
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---
# Task: Gen 2 NPC Trade Extraction Implementation

## Objective
Implement extraction of in-game NPC trade completion flags from Generation 2 save files using the `DataView` API. Ensure that memory offsets and magic numbers are strictly extracted as module-level constants, avoiding inline hardcoding.

## Acceptance Criteria
- [x] Define reusable constants `NPC_TRADE_FLAGS_OFFSET_CRYSTAL`, `NPC_TRADE_FLAGS_OFFSET_GS`, and `GEN2_NPC_TRADE_COUNT` for offset handling.
- [x] Implement bitwise mapping using `DataView.getUint8` to accurately extract all trade flags.
- [x] Ensure that parsing strictly throws a new `Error('The save file is corrupted or incomplete.')` when encountering `RangeError` from the `DataView` API reading out of bounds.
- [x] Incorporate extracted `npcTradeFlags` correctly into the mapped `SaveData` output.

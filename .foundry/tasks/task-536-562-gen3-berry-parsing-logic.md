---
id: task-536-562-gen3-berry-parsing-logic
type: TASK
title: Implement Gen 3 Berry Tracker DataView Parsing Logic
status: READY
owner_persona: coder
created_at: '2026-09-04'
updated_at: '2026-09-11'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-513-536-gen3-berry-dataview-parsing
tags:
  - gen3
  - dataview
  - parsing
research_references:
  - .foundry/docs/knowledge_base/gen3_berry_patch_offsets.md
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Implement Gen 3 Berry Tracker DataView Parsing Logic

## Overview
Implement the DataView-based parsing logic for Gen 3 berry patch data as defined in `.foundry/docs/knowledge_base/gen3_berry_patch_offsets.md`.

## Acceptance Criteria
- [x] Implement a `parseGen3BerryTrees` function that takes a `DataView` for `SaveBlock1` and a `sectionOffset`.
- [x] Read 128 `BerryTree` structs (8 bytes each) starting at offset `0x169C` from the `sectionOffset` inside `SaveBlock1`.
- [x] Add bounds checking via `try/catch` on the `DataView` reading, throwing a new `Error("The save file is corrupted or incomplete.")` inside the catch block if a `RangeError` is encountered.
- [x] Define the constants `BERRY_TREES_OFFSET = 0x169C`, `BERRY_TREES_COUNT = 128`, and `BERRY_TREE_STRUCT_SIZE = 8` inside the module.
- [x] Extract the following fields per `BerryTree`:
  - `berryId`: `DataView.getUint8(offset + 0)`
  - `stage`: `DataView.getUint8(offset + 1) & 0x7F`
  - `stopGrowth`: `(DataView.getUint8(offset + 1) & 0x80) >> 7`
  - `minutesUntilNextStage`: `DataView.getUint16(offset + 2, true)`
  - `berryYield`: `DataView.getUint8(offset + 4)`
  - `regrowthCount`: `DataView.getUint8(offset + 5) & 0x0F`
  - `watered1`: `(DataView.getUint8(offset + 5) & 0x10) >> 4`
  - `watered2`: `(DataView.getUint8(offset + 5) & 0x20) >> 5`
  - `watered3`: `(DataView.getUint8(offset + 5) & 0x40) >> 6`
  - `watered4`: `(DataView.getUint8(offset + 5) & 0x80) >> 7`

## Architectural Notes
- The coder must use the `DataView` API.
- Do NOT use magic numbers inline. Use the defined constants.

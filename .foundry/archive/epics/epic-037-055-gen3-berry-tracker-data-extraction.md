---
id: epic-037-055-gen3-berry-tracker-data-extraction
type: EPIC
title: Gen 3 Berry Tracker Data Extraction
status: CANCELLED
owner_persona: story_owner
created_at: '2026-06-03'
updated_at: '2026-08-22'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-067-037-gen3-berry-tracker
tags:
  - feature
  - gen3
  - berries
  - engine
research_references: []
rejection_count: 3
rejection_reason: '[ACKNOWLEDGED] Max rejection count reached'
notes: ''
---

# Epic: Gen 3 Berry Tracker Data Extraction

## Overview
This Epic covers the Engine Layer data extraction for the Gen 3 Berry Farming Tracker. The core objective is to parse the state of all berry patches (planted, sprouted, taller, flowering, ripe) from the save file.

As mandated by ADR 010 (`010-gen3-data-parsing.md`), all data parsing must strictly use the native `DataView` API to ensure safe bounds checking and prevent silent failures. In addition, following ADR 010 (`010-msgpack-for-gen3-data.md`), the parsed data must be serialized using `msgpackr`.

## Details
*   **Berry Patch Data Extraction:** Parse the necessary fields from the Gen 3 save file memory blocks that store the state of berry patches.
*   **Properties:** Location (map ID), berry type, current growth stage, time planted/last watered, and calculate time to next stage based on real-world time mechanics (without depending on save file RTC context if possible).
*   **Serialization:** Integrate the parsed berry data with the PokeData storage generation pipeline, outputting via MsgPack format.

## Acceptance Criteria
- [x] Implement `DataView`-based parsing logic for Gen 3 berry patch data.
- [x] Handle bounds checking gracefully (e.g., throwing and catching `RangeError` on out-of-bounds reads).
- [x] Extract map location, berry ID, growth stage, and time metadata.
- [x] Serialize the extracted data using `msgpackr` and integrate with the runtime data API.

### Generated Stories
- [x] .foundry/archive/stories/story-055-095-gen3-berry-data-parsing.md
- [x] .foundry/archive/stories/story-055-096-gen3-berry-msgpack-integration.md

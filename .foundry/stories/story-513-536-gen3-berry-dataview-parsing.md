---
id: story-513-536-gen3-berry-dataview-parsing
type: STORY
title: Gen 3 Berry Tracker DataView Parsing
status: COMPLETED
owner_persona: tech_lead
created_at: '2026-09-04'
updated_at: '2026-09-19'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-037-513-gen3-berry-tracker-data-extraction-retry
tags:
  - gen3
  - dataview
  - parsing
rejection_count: 0
rejection_reason: ''
locks: []
---

# Story: Gen 3 Berry Tracker DataView Parsing

## Overview
Implement robust DataView-based parsing logic for Gen 3 berry patch data, reading from SaveBlock1 at offset 0x169C. The array consists of 128 BerryTree structs (8 bytes each).

## Acceptance Criteria
- [x] Tech Lead: Break down into Tasks.
- [x] Implement `DataView` parsing logic to iterate 128 times (8 bytes each) at offset 0x169C in SaveBlock1.
- [x] Add bounds checking (catch `RangeError`) to prevent silent failures on out-of-bounds reads.
- [x] Extract berry ID, growth stage (bits 0-6 at offset 0x01), stopGrowth flag (bit 7), minutesUntilNextStage, berryYield, and watered flags.
- [x] Map the berry tree array index to its hardcoded map location (e.g., route, city).

- [x] task-536-562-gen3-berry-parsing-logic
- [x] task-536-563-gen3-berry-map-location
- [x] task-536-564-gen3-berry-parsing-tests

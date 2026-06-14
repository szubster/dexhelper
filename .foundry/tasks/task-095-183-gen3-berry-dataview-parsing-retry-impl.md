---
id: task-095-183-gen3-berry-dataview-parsing-retry-impl
type: TASK
title: Implement Gen 3 Berry Tracker DataView Parsing Logic (Retry)
status: PENDING
owner_persona: coder
created_at: '2026-06-14'
updated_at: '2026-06-14'
depends_on:
  - research-095-158-gen3-berry-missing-offsets
jules_session_id: null
pr_number: null
parent: story-055-095-gen3-berry-data-parsing
tags:
  - feature
  - gen3
  - berries
  - engine
research_references:
  - research-095-158-gen3-berry-missing-offsets
rejection_count: 0
rejection_reason: ''
notes: 'Retry of task-095-157 after missing data research'
---

# Task: Implement Gen 3 Berry Tracker DataView Parsing Logic (Retry)

## Overview
Implement the extraction logic for Gen 3 berry patches using the native `DataView` API. Ensure that we extract data correctly based on the research findings.

## Constraints & Architecture
- Follow ADR 010: Exclusively use the native `DataView` API (e.g., `getUint8`, `getUint16`) instead of raw `Uint8Array` manipulations.
- Implement graceful handling of bounds checking by throwing and explicitly catching `RangeError` within the parser engine. Propagate these as specific validation errors (e.g., "Corrupted Save File").
- Reference `research-095-158-gen3-berry-missing-offsets`:
  - `map ID` is implicitly tied to the array index (0-127). Use the array index as the `mapId`.
  - Do NOT attempt to extract `time planted` and `last watered time` as they do not exist.
  - Read `minutesUntilNextStage` and `regrowthCount` instead.
- The `Gen3BerryPatch` interface expects the following fields: `mapId`, `berryId`, `stage`, `stopGrowth`, `minutesUntilNextStage`, `berryYield`, `regrowthCount`, `watered1`, `watered2`, `watered3`, `watered4`.
- Seek to offset `0x169C` within Section 1 to read the 128 `BerryTree` structs. Each struct is 8 bytes.
- IMPORTANT: If you abort or permanently fail this task, you MUST update the YAML frontmatter to `status: FAILED` or `status: CANCELLED` with a `rejection_reason`.
- IMPORTANT: If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [ ] Implement `DataView` reading logic for Gen 3 berry patches.
- [ ] Gracefully handle bounds checking by throwing and catching `RangeError`, returning corrupted save error.
- [ ] Extract `mapId` (implicit array index), `berryId`, `stage`, `stopGrowth`, `minutesUntilNextStage`, `berryYield`, `regrowthCount`, and the four watering flags (`watered1`, `watered2`, `watered3`, `watered4`).

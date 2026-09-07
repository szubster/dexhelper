---
id: epic-037-513-gen3-berry-tracker-data-extraction-retry
type: EPIC
title: Gen 3 Berry Tracker Data Extraction (Retry)
status: ACTIVE
owner_persona: story_owner
created_at: '2026-09-01'
updated_at: '2026-09-04'
depends_on:
  - research-037-512-investigate-gen3-berry-extraction-failure
jules_session_id: '2207205937950131080'
pr_number: null
parent: prd-067-037-gen3-berry-tracker
tags:
  - feature
  - gen3
  - berries
  - engine
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Epic: Gen 3 Berry Tracker Data Extraction (Retry)

## Overview
This Epic is a retry of the Engine Layer data extraction for the Gen 3 Berry Farming Tracker, based on the findings from the preceding investigation research node.

The core objective is to parse the state of all berry patches from the save file using the native `DataView` API to ensure safe bounds checking and prevent silent failures. In addition, the parsed data must be serialized using `msgpackr`.

## Details
*   **Berry Patch Data Extraction:** Parse the necessary fields from the Gen 3 save file memory blocks that store the state of berry patches.
*   **Properties:** Location (map ID), berry type, current growth stage, time planted/last watered, and calculate time to next stage based on real-world time mechanics (without depending on save file RTC context if possible).
*   **Serialization:** Integrate the parsed berry data with the PokeData storage generation pipeline, outputting via MsgPack format.

## Acceptance Criteria
- [ ] Implement `DataView`-based parsing logic for Gen 3 berry patch data.
- [ ] Handle bounds checking gracefully (e.g., throwing and catching `RangeError` on out-of-bounds reads).
- [ ] Extract map location, berry ID, growth stage, and time metadata.
- [ ] Serialize the extracted data using `msgpackr` and integrate with the runtime data API.
- [x] Generate a final STORY dedicated exclusively to Integration and E2E Verification.
- [ ] story-513-536-gen3-berry-dataview-parsing
- [ ] story-513-537-gen3-berry-serialization-and-api
- [ ] story-513-538-gen3-berry-tracker-integration-e2e

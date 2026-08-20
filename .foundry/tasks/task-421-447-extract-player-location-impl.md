---
id: task-421-447-extract-player-location-impl
type: TASK
title: Implement Gen 3 Player Location Extraction
status: PENDING
owner_persona: coder
created_at: '2026-08-20'
updated_at: '2026-08-20'
depends_on:
  - research-421-448-gen3-player-location-offsets
jules_session_id: null
pr_number: null
parent: story-411-421-extract-player-location
tags:
  - gen3
  - ai
  - save-engine
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Implement Gen 3 Player Location Extraction

## Context
As part of the Gen 3 AI data extraction (Epic 340-411), we need to extract the player's current map location from the save file and map it to the nearest upcoming major trainer.

## Technical Contract
1.  **Parse Location Data:** Implement logic to parse the location block from Gen 3 save data (e.g., `secretBaseId` or other map location structures) using the offsets discovered in `research-421-448-gen3-player-location-offsets`.
2.  **Trainer Mapping:** Map the parsed location to the nearest upcoming major trainer based on the location data.
3.  **Strict Compliance:** You MUST strictly adhere to the guidelines defined in **Section 13 ("Save File Parsing & Extraction Guidelines")** of `.foundry/docs/schema.md`.
    *   All memory offsets, lengths, bit locations, shifts, and array bounds checking limits must be explicitly defined as reusable constants at the module level.
    *   No inline magic numbers.
    *   When extracting Gen 3 save blocks, pass and utilize the resolved section offset (e.g., `section1Offset` or `section2Offset`) to calculate relative memory offsets rather than absolute hardcoded offsets.
    *   Catch `RangeError` for out-of-bounds reads and throw a new error with the message "The save file is corrupted or incomplete."
4.  **Testing:** Add unit tests to ensure the location parsing and trainer mapping work correctly.

## Acceptance Criteria
- [ ] Extraction logic correctly reads the player location data from a Gen 3 save.
- [ ] Extracted location correctly maps to the next major trainer.
- [ ] Section 13 guidelines are strictly followed.
- [ ] Unit tests cover location parsing and trainer mapping.

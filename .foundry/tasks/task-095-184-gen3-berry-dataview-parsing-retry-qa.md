---
id: task-095-184-gen3-berry-dataview-parsing-retry-qa
type: TASK
title: QA Verification for Gen 3 Berry Tracker DataView Parsing Logic (Retry)
status: READY
owner_persona: qa
created_at: '2026-06-14'
updated_at: '2026-06-15'
depends_on:
  - task-095-183-gen3-berry-dataview-parsing-retry
jules_session_id: null
pr_number: null
parent: story-055-095-gen3-berry-data-parsing
tags:
  - feature
  - gen3
  - berries
  - engine
  - qa
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: QA Verification for Gen 3 Berry Tracker DataView Parsing Logic (Retry)

## Overview
Verify the implementation of the extraction logic for Gen 3 berry patches, ensuring that the correct relative offsets are used and implicit data is omitted.

## Constraints & Verification Steps
- Verify that the implementation uses the `DataView` API exclusively, avoiding raw `Uint8Array` manipulations.
- Verify that bounds checking is gracefully handled by catching `RangeError` exceptions and raising proper errors (e.g., "Corrupted Save File").
- CRITICAL: Verify that the parser correctly uses the relative offset `0x071C` within Section 1 of `SaveBlock1` (logical offset `0x169C`).
- CRITICAL: Verify that the implementation correctly extracts explicit data (Berry ID, growth stage, regrowth count, watering booleans) and DOES NOT attempt to extract implicit/missing data (Map ID, Time Planted, Last Watered Time).
- Ensure that the tests correctly mock range bounds and corrupted save files without crashing the process.
- IMPORTANT: If you abort or permanently fail this task, you MUST update the YAML frontmatter to `status: FAILED` or `status: CANCELLED` with a `rejection_reason`.
- IMPORTANT: If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [x] Verify `DataView` reading logic for Gen 3 berry patches implementation uses the correct relative offset.
- [x] Verify graceful handling of bounds checking (throwing/catching `RangeError`) without process crash.
- [x] Verify explicit data is extracted correctly.
- [x] Verify implicit data (map ID, time planted, last watered time) are NOT included in the extraction schema.

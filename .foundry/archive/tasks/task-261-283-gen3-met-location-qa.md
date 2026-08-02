---
id: task-261-283-gen3-met-location-qa
type: TASK
title: QA Gen 3 Met Location Extraction
status: COMPLETED
owner_persona: qa
created_at: '2026-07-08'
updated_at: '2026-07-31'
depends_on:
  - task-261-282-gen3-met-location-impl
jules_session_id: null
pr_number: null
parent: story-097-261-extract-pokemon-met-locations
tags:
  - verification
  - nuzlocke
  - gen3
rejection_count: 1
rejection_reason: ''
notes: ''
---

# TASK: QA Gen 3 Met Location Extraction

## Objective
Verify that the `metLocation` parsing logic for Gen 3 Pokémon is correctly implemented and tested.

## Requirements
1.  **Code Review:** Verify that `task-261-282-gen3-met-location-impl` was implemented correctly.
2.  **No Magic Numbers:** Verify that the `MET_LOCATION_OFFSET_IN_M` offset is defined as a module-level constant and inline magic numbers are not used.
3.  **DataView API:** Verify that `DataView` API is used for bounds-checked reads and `RangeError` is handled.
4.  **Tests:** Verify that unit tests cover the new parsing logic (e.g., verifying a known met location byte is extracted properly from a mock DataView/M block).
5.  **Rejection Protocol:** If the implementation uses inline magic numbers instead of defined reusable constants, or fails to catch `RangeError` from the `DataView` API for out-of-bounds reads, you MUST reject the task.

## Hand-off Instructions
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [x] Code correctly parses `metLocation` using constants and `DataView`.
- [x] Tests verify the parsing logic.

### QA Rejection
- Implementation uses MISC_MET_LOCATION_OFFSET instead of required MET_LOCATION_OFFSET_IN_M.

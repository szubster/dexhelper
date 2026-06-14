---
id: task-095-184-gen3-berry-dataview-parsing-retry-qa
type: TASK
title: QA Verification for Gen 3 Berry Tracker DataView Parsing Logic (Retry)
status: PENDING
owner_persona: qa
created_at: '2026-06-14'
updated_at: '2026-06-14'
depends_on:
  - task-095-183-gen3-berry-dataview-parsing-retry-impl
jules_session_id: null
pr_number: null
parent: story-055-095-gen3-berry-data-parsing
tags:
  - feature
  - gen3
  - berries
  - engine
  - qa
research_references:
  - research-095-158-gen3-berry-missing-offsets
rejection_count: 0
rejection_reason: ''
notes: 'Retry of QA task-095-158 after missing data research'
---

# Task: QA Verification for Gen 3 Berry Tracker DataView Parsing Logic (Retry)

## Overview
Verify the implementation of the extraction logic for Gen 3 berry patches. Ensure data matches the latest research findings.

## Constraints & Verification Steps
- Verify that the implementation uses the `DataView` API exclusively, avoiding raw `Uint8Array` manipulations.
- Verify that bounds checking is gracefully handled by catching `RangeError` exceptions and raising proper errors (e.g., "Corrupted Save File").
- Verify that `mapId` (implicit array index), `berryId`, `stage`, `stopGrowth`, `minutesUntilNextStage`, `berryYield`, `regrowthCount`, and watering flags are extracted correctly.
- Ensure that the tests correctly mock range bounds and corrupted save files without crashing the process.
- Ensure the code DOES NOT attempt to extract `time planted` and `last watered time` as they do not exist.
- IMPORTANT: If you abort or permanently fail this task, you MUST update the YAML frontmatter to `status: FAILED` or `status: CANCELLED` with a `rejection_reason`.
- IMPORTANT: If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [ ] Verify `DataView` reading logic for Gen 3 berry patches implementation is correct.
- [ ] Verify graceful handling of bounds checking (throwing/catching `RangeError`) without process crash.
- [ ] Verify correct extraction of `mapId` (implicit array index), `berryId`, `stage`, `stopGrowth`, `minutesUntilNextStage`, `berryYield`, `regrowthCount`, and watering flags.

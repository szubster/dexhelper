---
id: task-095-158-gen3-berry-dataview-parsing-qa
type: TASK
title: QA Verification for Gen 3 Berry Tracker DataView Parsing Logic
status: PENDING
owner_persona: qa
created_at: '2026-06-10'
updated_at: '2026-06-14'
depends_on:
  - task-095-157-gen3-berry-dataview-parsing
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

# Task: QA Verification for Gen 3 Berry Tracker DataView Parsing Logic

## Overview
Verify the implementation of the extraction logic for Gen 3 berry patches.

## Constraints & Verification Steps
- Verify that the implementation uses the `DataView` API exclusively, avoiding raw `Uint8Array` manipulations.
- Verify that bounds checking is gracefully handled by catching `RangeError` exceptions and raising proper errors (e.g., "Corrupted Save File").
- Verify that map ID, berry ID, current growth stage, time planted, and last watered time are extracted correctly.
- Ensure that the tests correctly mock range bounds and corrupted save files without crashing the process.
- IMPORTANT: If you abort or permanently fail this task, you MUST update the YAML frontmatter to `status: FAILED` or `status: CANCELLED` with a `rejection_reason`.
- IMPORTANT: If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [x] Verify `DataView` reading logic for Gen 3 berry patches implementation is correct.
- [x] Verify graceful handling of bounds checking (throwing/catching `RangeError`) without process crash.
- [x] Verify correct extraction of map ID, berry ID, current growth stage, time planted, and last watered time.

**Note**: The implementation `task-095-157-gen3-berry-dataview-parsing` has been rejected due to incorrect offset calculations and the inclusion of implicit/missing data in the acceptance criteria.

**STATUS**: CANCELLED. Replaced by `task-095-184-gen3-berry-dataview-parsing-retry-qa.md` due to permanent failure of the original implementation.

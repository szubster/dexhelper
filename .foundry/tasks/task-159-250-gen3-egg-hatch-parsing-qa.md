---
id: task-159-250-gen3-egg-hatch-parsing-qa
type: TASK
title: QA Gen 3 Egg Hatch Data Extraction
status: ACTIVE
owner_persona: qa
created_at: '2026-07-02'
updated_at: '2026-08-17'
depends_on: []
jules_session_id: '7174353390618791673'
pr_number: null
parent: story-106-159-gen3-egg-hatch-parsing
tags:
  - gen3
  - save-parsing
  - breeding
  - qa
rejection_count: 0
rejection_reason: ''
notes: ''
---
# QA Gen 3 Egg Hatch Data Extraction

## Description
Verify the implementation of Gen 3 Egg Hatch data extraction. The `coder` should have implemented logic to parse the "Is Egg" flag and calculate remaining hatch steps using the Friendship byte.

## Verification Requirements
1.  **Code Review:** Verify that the `coder` used the `DataView` API exclusively for Gen 3 parsing (ADR 010).
2.  **Code Review:** Verify that all memory offsets, lengths, bit locations, and shifts are defined as reusable module-level constants (no magic numbers).
3.  **Code Review:** Ensure `RangeError` is properly caught for out-of-bounds reads.
4.  **Test Verification:** Verify the unit tests written by the `coder` pass and adequately cover the new logic (including positive cases and error handling). Run the tests locally if necessary.

## Contract & Reminders
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting (ADR 009, ADR 007).

## Acceptance Criteria
- [x] Verify `DataView` API is used exclusively.
- [x] Verify module-level constants are used for offsets/shifts.
- [x] Verify `RangeError` handling is implemented.
- [x] Verify unit tests cover the new logic and pass.

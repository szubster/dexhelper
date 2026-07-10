---
id: task-272-302-gen3-lottery-data-extraction-qa
type: TASK
title: QA Gen3 Lottery Data Extraction
status: PENDING
owner_persona: qa
created_at: '2026-07-10'
updated_at: '2026-07-10'
depends_on:
  - task-272-301-gen3-lottery-data-extraction-impl
jules_session_id: null
pr_number: null
parent: story-133-272-gen3-lottery-data-extraction
tags:
  - feature
  - gen3
  - qa
rejection_count: 0
rejection_reason: ''
notes: ''
---

# QA Gen3 Lottery Data Extraction

## Context
The Coder has implemented the Gen3 lottery number extraction logic using the `DataView` API. We need to verify that it correctly handles boundary cases and gracefully fails on malformed data.

## Requirements
1. **Verify Offsets**: Check that the memory offsets are correctly defined as module-level constants and not inline magic numbers.
2. **Bounds Checking**: Ensure that explicit bounds checking and `RangeError` handling are implemented for the `DataView` operations to prevent corrupted save files from crashing the application.
3. **Unit Tests**: Verify that unit tests cover standard and boundary cases.

## QA Persona Instructions
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task (e.g. the coder's work is unfixably flawed), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [ ] Verify module-level constants for offsets.
- [ ] Verify bounds checking and RangeError handling logic.
- [ ] Verify unit test coverage.

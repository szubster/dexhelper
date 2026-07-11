---
id: task-276-305-gen3-trick-house-parser-qa
type: TASK
title: QA Gen 3 Trick House Parser Implementation
status: FAILED
owner_persona: qa
created_at: '2026-07-06'
updated_at: '2026-07-11'
depends_on:
  - task-276-304-gen3-trick-house-parser-impl
jules_session_id: null
pr_number: null
parent: story-111-276-trick-house-parser-impl
tags:
  - feature
  - gen3
  - mechanics
  - qa
research_references: []
rejection_count: 0
rejection_reason: '[ACKNOWLEDGED] Merged with unfulfilled acceptance criteria'
notes: ''
---

# Task: QA Gen 3 Trick House Parser Implementation

## Objective
Verify the correctness and architectural compliance of the Trick House save file parser implemented by the Coder.

## Scope
Validate the logic implemented for extracting Gen 3 Trick House progression states using the `DataView` API. Ensure strict adherence to dynamic save extraction guidelines.

## Contracts & Verification Steps
1. **Verify No Magic Numbers:** Confirm that the Coder explicitly defined all memory offsets, lengths, bit locations, and shifts as reusable constants at the module level. Inline magic numbers in the DataView extraction logic are strictly forbidden (ADR 028).
2. **Verify Correct Little-Endian Usage:** Ensure that all 16-bit variable extractions use `DataView.getUint16(offset, true)`.
3. **Verify Bitwise Math:** Ensure the `FLAG_LANDMARK_TRICK_HOUSE` is accurately extracted using the correct byte offset and bitwise operations.
4. **Test Coverage:** Ensure the Coder included unit tests simulating Gen 3 SaveBlock1 buffers to validate correct extraction.

## Acceptance Criteria
- [ ] Validated that all offsets and variables are defined as module-level constants.
- [ ] Confirmed no inline magic numbers exist in the parsing logic.
- [ ] Verified correct Little-Endian usage for variables.
- [ ] Verified correct bitwise extraction for the landmark flag.
- [ ] Verified unit test coverage for the implemented logic.

## Review Contracts
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

### QA Rejection
- **Reason**: Implementation is missing a `try/catch` block for `RangeError` from the `DataView` API to properly handle out-of-bounds reads. Tests must also ensure that reading out-of-bounds throws an appropriate error, such as `The save file is corrupted or incomplete.`

### Cancelled
Replaced by new tasks.

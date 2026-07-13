---
id: task-276-313-gen3-trick-house-parser-retry-qa
type: TASK
title: QA Gen 3 Trick House Parser Implementation (Retry)
status: ACTIVE
owner_persona: qa
created_at: '2026-07-11'
updated_at: '2026-07-13'
depends_on:
  - task-276-312-gen3-trick-house-parser-retry-impl
jules_session_id: '14264277681272686929'
pr_number: null
parent: story-111-276-trick-house-parser-impl
tags:
  - feature
  - gen3
  - mechanics
  - qa
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: QA Gen 3 Trick House Parser Implementation (Retry)

## Objective
Verify the correctness and architectural compliance of the Trick House save file parser implemented by the Coder.

## Scope
Validate the logic implemented for extracting Gen 3 Trick House progression states using the `DataView` API. Ensure strict adherence to dynamic save extraction guidelines and error handling constraints.

## Contracts & Verification Steps
1. **Verify Error Handling (CRITICAL):** Inspect the parser logic and ensure there is an explicit `try/catch` block wrapping the `DataView` operations. Ensure that catching a `RangeError` throws exactly the string `"The save file is corrupted or incomplete."`
2. **Verify No Magic Numbers:** Confirm that the Coder explicitly defined all memory offsets, lengths, bit locations, and shifts as reusable constants at the module level. Inline magic numbers in the DataView extraction logic are strictly forbidden (ADR 028).
3. **Verify Correct Little-Endian Usage:** Ensure that all 16-bit variable extractions use `DataView.getUint16(offset, true)`.
4. **Verify Bitwise Math:** Ensure the `FLAG_LANDMARK_TRICK_HOUSE` is accurately extracted using the correct byte offset and bitwise operations.
5. **Test Coverage:** Ensure the Coder included unit tests simulating Gen 3 SaveBlock1 buffers to validate correct extraction, AND explicitly verify the test suite includes a case simulating a short buffer to trigger the `RangeError`.

## Acceptance Criteria
- [ ] Verified that a `try/catch` block is present and properly handles `RangeError` by throwing `"The save file is corrupted or incomplete."`
- [ ] Validated that all offsets and variables are defined as module-level constants.
- [ ] Confirmed no inline magic numbers exist in the parsing logic.
- [ ] Verified correct Little-Endian usage for variables.
- [ ] Verified correct bitwise extraction for the landmark flag.
- [ ] Verified unit test coverage for the implemented logic, including the out-of-bounds scenario.

## Review Contracts
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

### SCHEMA
https://github.com/szubster/dexhelper/blob/main/.foundry/docs/schema.md

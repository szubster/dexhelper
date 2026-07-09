---
id: task-267-262-gen3-move-tutor-emerald-qa
type: TASK
title: QA Emerald Move Tutor Extraction
status: COMPLETED
owner_persona: qa
created_at: '2026-07-04'
updated_at: '2026-07-09'
depends_on:
  - task-267-261-gen3-move-tutor-emerald-impl
jules_session_id: null
pr_number: null
parent: story-119-267-gen3-move-tutor-emerald-parsing
tags:
  - gen3
  - save-parsing
  - move-tutor
  - emerald
  - qa
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# QA Emerald Move Tutor Extraction

## Context
The Coder (task-267-261-gen3-move-tutor-emerald-impl) has implemented logic to extract Emerald Move Tutor usage flags from the `event_flags` bit array starting at `0x1270` in `SaveBlock1`.

## Requirements
1.  **Validate Offsets and Bits**: Verify that the implemented logic correctly targets the specific byte offsets (e.g., `+0x36`, `+0x37`) and bit positions (e.g., bit `1` for Swagger) for all 10 Emerald move tutors.
2.  **Validate `DataView` Usage**: Ensure the Coder exclusively used the `DataView` API (e.g., `getUint8`) and correctly relied on it to catch `RangeError` for bounds checking, adhering to ADR 010.
3.  **Validate No Magic Numbers**: Verify that all memory offsets (`0x1270`, `0x36`, `0x37`), bit locations, lengths, and shifts are defined as reusable constants at the module level. Reject any inline magic numbers.
4.  **Validate Tests**: Review the unit tests to ensure adequate coverage of the move tutor flag extraction.

## Reminders
*   If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
*   If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
*   If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [x] Verify there are absolutely no inline magic numbers for any offsets or bit positions.
- [x] Verify `DataView` is used exclusively for memory reads and correctly catches `RangeError`s.
- [x] Verify the logic correctly extracts each of the 10 Emerald move tutor flags from the correct byte and bit.
- [x] Verify unit tests are comprehensive and pass.

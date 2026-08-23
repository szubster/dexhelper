---
id: task-152-471-gen3-friendship-qa-v2
type: TASK
title: QA Gen 3 Friendship Data Extraction (v2)
status: PENDING
owner_persona: qa
created_at: '2026-08-23'
updated_at: '2026-08-23'
depends_on:
  - task-152-470-gen3-friendship-impl-v2
jules_session_id: null
pr_number: null
parent: story-094-152-gen3-friendship-extraction
tags:
  - gen3
  - save-parsing
  - friendship
  - qa
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# QA Gen 3 Friendship Data Extraction (v2)

## Context
The Coder (task-152-470-gen3-friendship-impl-v2) has implemented logic to extract the Friendship (Happiness) value for Gen 3 Pokémon from the 48-byte encrypted Data block. This requires correctly applying the `PV % 24` permutation logic to find the Growth (G) substructure.

This is the second attempt after the initial task (task-152-259) was cancelled because its implementation dependency failed.

## Requirements
1.  **Validate `PV % 24` Logic**: Verify the logic correctly handles all permutations to locate the Growth (G) substructure and extracts the byte at offset 4.
2.  **Validate `DataView` Usage**: Ensure the Coder exclusively used the `DataView` API (e.g., `getUint8`) and relied on it for bounds checking (catching `RangeError`), strictly avoiding `Uint8Array` as per ADR 010.
3.  **Validate No Magic Numbers**: Verify that all memory offsets, lengths, bit locations, and shifts are defined as reusable constants at the module level. Reject any inline magic numbers.
4.  **Validate Tests**: Run the tests and ensure adequate coverage for different `PV % 24` permutations.

## Reminders
*   If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
*   If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
*   If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [ ] Verify `DataView` is used exclusively for memory reads and correctly catches `RangeError`s.
- [ ] Verify there are absolutely no inline magic numbers for offsets or lengths.
- [ ] Verify the `PV % 24` permutation logic is correct and well-tested.
- [ ] Verify unit tests pass and cover different Friendship scenarios.

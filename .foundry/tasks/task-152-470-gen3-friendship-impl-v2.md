---
id: task-152-470-gen3-friendship-impl-v2
type: TASK
title: Implement Gen 3 Friendship Data Extraction (v2)
status: PENDING
owner_persona: coder
created_at: '2026-08-23'
updated_at: '2026-08-23'
depends_on:
  - research-152-469-investigate-gen3-friendship-failure
jules_session_id: null
pr_number: null
parent: story-094-152-gen3-friendship-extraction
tags:
  - gen3
  - save-parsing
  - friendship
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement Gen 3 Friendship Data Extraction (v2)

## Context
As part of the Gen 3 data extraction effort (story-094-152-gen3-friendship-extraction), we need to extract the Friendship (Happiness) value for Pokémon. In Gen 3, a Pokémon's data structure is 100 bytes long, and the core details are in a 48-byte encrypted Data block. This block has four 12-byte substructures (G, A, E, M).
Friendship is located at offset 4 of the **Growth (G)** substructure. The order of the substructures depends on `PV % 24`.

This is the second attempt after the initial task (task-152-258) was cancelled. Refer to `research-152-469` for notes on why it failed.

## Requirements
1.  **Party and PC Parsing**: Implement logic to extract Friendship for Gen 3 Pokémon in both the active Party and PC Boxes.
2.  **PV % 24 Permutations**: The implementation must correctly determine the permutation order using `PV % 24` to locate the Growth (G) substructure.
3.  **DataView API**: You MUST exclusively use the native `DataView` API (e.g., `getUint8`, `getUint16`, `getUint32`) for rigorous bounds checking (as per ADR 010). Do not use raw `Uint8Array` manipulations.
4.  **No Inline Magic Numbers**: All memory offsets, lengths, bit locations, and shifts MUST be defined as reusable constants at the module level. Inline magic numbers are strictly forbidden.
5.  **Bounds Checking**: Rely on `DataView` to throw `RangeError` on out-of-bounds reads. Catch these explicitly and gracefully propagate them as specific validation errors.
6.  **Unit Tests**: Update/create Gen 3 unit tests to verify the extracted Friendship value is correct.

## Reminders
*   If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
*   If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
*   If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [ ] Create constants for all memory offsets (e.g., Growth substructure offset, Friendship offset within Growth, etc.).
- [ ] Implement utility/logic to determine the `PV % 24` permutation.
- [ ] Implement logic to extract the Friendship byte from the Data block using the `DataView` API.
- [ ] Integrate or prepare the logic for Party and PC Box parsing.
- [ ] Write unit tests verifying Friendship extraction works for various `PV % 24` permutations.

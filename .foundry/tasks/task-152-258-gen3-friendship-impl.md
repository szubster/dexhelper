---
id: task-152-258-gen3-friendship-impl
type: TASK
title: Implement Gen 3 Friendship Data Extraction
status: ACTIVE
owner_persona: coder
created_at: '2026-07-03'
updated_at: '2026-08-20'
depends_on: []
jules_session_id: '846019353466887955'
pr_number: null
parent: story-094-152-gen3-friendship-extraction
tags:
  - gen3
  - save-parsing
  - friendship
research_references: []
rejection_count: 2
rejection_reason: ''
notes: ''
---

# Implement Gen 3 Friendship Data Extraction

## Context
As part of the Gen 3 data extraction effort (story-094-152-gen3-friendship-extraction), we need to extract the Friendship (Happiness) value for Pokémon. In Gen 3, a Pokémon's data structure is 100 bytes long, and the core details are in a 48-byte encrypted Data block. This block has four 12-byte substructures (G, A, E, M).
Friendship is located at offset 4 of the **Growth (G)** substructure. The order of the substructures depends on `PV % 24`.

## Requirements
1.  **Party and PC Parsing**: Implement logic to extract Friendship for Gen 3 Pokémon in both the active Party and PC Boxes (even if currently stubbed in `src/engine/saveParser/parsers/gen3.ts`, build the foundational utility functions or integrate if appropriate).
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
- [x] Create constants for all memory offsets (e.g., Growth substructure offset, Friendship offset within Growth, etc.).
- [x] Implement utility/logic to determine the `PV % 24` permutation.
- [x] Implement logic to extract the Friendship byte from the Data block using the `DataView` API.
- [x] Integrate or prepare the logic for Party and PC Box parsing.
- [x] Write unit tests verifying Friendship extraction works for various `PV % 24` permutations.

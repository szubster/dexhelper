---
id: task-159-249-gen3-egg-hatch-parsing-impl
type: TASK
title: Implement Gen 3 Egg Hatch Data Extraction
status: ACTIVE
owner_persona: coder
created_at: '2026-07-02'
updated_at: '2026-07-04'
depends_on: []
jules_session_id: '657138697970413617'
pr_number: null
parent: story-106-159-gen3-egg-hatch-parsing
tags:
  - gen3
  - save-parsing
  - breeding
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement Gen 3 Egg Hatch Data Extraction

## Description
Implement the logic to calculate the exact remaining steps for an Egg to hatch in Gen 3 (Ruby, Sapphire, Emerald, FireRed, LeafGreen).

Similar to Gen 2, Gen 3 repurposes the Friendship byte to store remaining "Egg Cycles" if the Pokémon has the "Is Egg" flag set. The Friendship byte is located in the Growth (G) substructure (offset 4). The cycle length is also 256 steps in Gen 3. You MUST use the `DataView` API (ADR 010).

## Technical Requirements
1.  **Extract the "Is Egg" bit flag:** The "Is Egg" flag is located in the IVs/Egg/Ability bitfield within the Miscellaneous (M) substructure. Define reusable module-level constants for offsets and bit shifts. Avoid inline magic numbers.
2.  **Parse Friendship Byte (if Egg):** If the "Is Egg" flag is set, parse the Friendship byte from the Growth (G) substructure (offset 4). Again, define reusable module-level constants for the offset.
3.  **Calculate Steps:** Multiply the parsed cycle count by 256 to calculate exact remaining steps.
4.  **DataView API:** You MUST exclusively use the native `DataView` API (`getUint8`, `getUint32`, etc.) for all read operations, and correctly handle/catch `RangeError` on out-of-bounds reads (ADR 010).
5.  **Unit Tests:** Write comprehensive unit tests verifying the calculation. Ensure proper mocking or setup to avoid `no-floating-promises` and Vitest 4 environment issues.

## Contract & Reminders
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting (ADR 009, ADR 007).
- Explicitly require that all memory offsets, lengths, bit locations, and shifts must be defined as reusable constants at the module level, forbidding inline magic numbers.

## Acceptance Criteria
- [x] Implement module-level constants for offsets, lengths, and bit shifts.
- [x] Extract the "Is Egg" bit flag from the Miscellaneous (M) substructure using `DataView`.
- [x] If it is an egg, parse the Friendship byte from the Growth (G) substructure using `DataView`.
- [x] Multiply the parsed cycle count by 256 to calculate exact steps.
- [x] Write unit tests verifying the calculation and ensuring `RangeError` handling.

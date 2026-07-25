---
id: task-318-341-gen3-move-tutor-frlg-parsing-impl
type: TASK
title: Implement Gen 3 FRLG Move Tutor Extraction
status: COMPLETED
owner_persona: coder
created_at: '2026-07-25'
updated_at: '2026-07-25'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-119-318-gen3-move-tutor-frlg-parsing
tags:
  - gen3
  - save-parsing
  - move-tutor
  - firered
  - leafgreen
research_references:
  - research-055-247-gen3-move-tutor-offsets
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement Gen 3 FRLG Move Tutor Extraction

## Objective
Implement DataView-based extraction of FireRed and LeafGreen Move Tutor flags from the save file's `event_flags`.

## Specifications
As defined in `gen3_move_tutor_offsets.md` and mandated by ADR 010 and ADR 028:
- The 18 specific Move Tutors available in FRLG must be extracted.
- You MUST use the `DataView` API exclusively.
- The parser must rely on `DataView` bounds checking to throw `RangeError` on out-of-bounds reads. Catch these explicitly to fail gracefully on corrupted files.
- The Coder must use the resolved section offset to calculate relative memory offsets instead of hardcoded absolute offsets to properly support A/B bank flash memory.
- All memory offsets, lengths, bit locations, and shifts must be explicitly defined as reusable constants at the module level.
- The use of inline magic numbers for memory operations is strictly forbidden.

## Acceptance Criteria
- [x] Implement `DataView` parsing logic for FRLG move tutors.
- [x] Define all offsets, flags, and constants at the module level (no inline magic numbers).
- [x] Use relative memory offsets from the resolved section offset.
- [x] Throw and catch `RangeError` on invalid bounds gracefully.

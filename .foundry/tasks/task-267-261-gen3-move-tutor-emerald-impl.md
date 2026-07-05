---
id: task-267-261-gen3-move-tutor-emerald-impl
type: TASK
title: Implement Emerald Move Tutor Extraction
status: READY
owner_persona: coder
created_at: '2026-07-04'
updated_at: '2026-07-05'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-119-267-gen3-move-tutor-emerald-parsing
tags:
  - gen3
  - save-parsing
  - move-tutor
  - emerald
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement Emerald Move Tutor Extraction

## Context
We need to extract the Gen 3 Emerald Move Tutor usage flags. The game uses a continuous bit array of "Event Flags" starting at offset `0x1270` within `SaveBlock1` in the save file.

## Requirements
1.  **Extract Move Tutor Usage**: Implement logic to extract whether the following 10 Move Tutors have been used:
    - Swagger (`+0x36`, bit `1`)
    - Rollout (`+0x36`, bit `2`)
    - Fury Cutter (`+0x36`, bit `3`)
    - Mimic (`+0x36`, bit `4`)
    - Metronome (`+0x36`, bit `5`)
    - Sleep Talk (`+0x36`, bit `6`)
    - Substitute (`+0x36`, bit `7`)
    - DynamicPunch (`+0x37`, bit `0`)
    - Double-Edge (`+0x37`, bit `1`)
    - Explosion (`+0x37`, bit `2`)
2.  **DataView API**: You MUST exclusively use the native `DataView` API (e.g., `getUint8`) for bounds checking (ADR 010). Do not use raw `Uint8Array` manipulations.
3.  **No Inline Magic Numbers**: All memory offsets (like `0x1270`, `0x36`, `0x37`), bit locations, lengths, and shifts MUST be defined as reusable constants at the module level. Inline magic numbers are strictly forbidden.
4.  **Bounds Checking**: Rely on `DataView` to throw `RangeError` on out-of-bounds reads. Catch these explicitly and gracefully propagate them as specific validation errors.
5.  **Unit Tests**: Write Gen 3 unit tests to verify the extracted Move Tutor usages.

## Reminders
*   If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
*   If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
*   If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [ ] Create constants for the event flag start offset (`0x1270`), and specific byte offsets and bit positions for each Emerald move tutor flag.
- [ ] Implement logic to extract these flags using the `DataView` API.
- [ ] Explicitly catch `RangeError` for out-of-bounds reads during extraction.
- [ ] Write comprehensive unit tests verifying the logic correctly reads the specific bits for each move tutor.

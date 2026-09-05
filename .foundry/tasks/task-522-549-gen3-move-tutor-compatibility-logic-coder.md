---
id: task-522-549-gen3-move-tutor-compatibility-logic-coder
type: TASK
title: Implement Gen 3 Move Tutor Logic Layer
status: READY
owner_persona: coder
created_at: '2026-09-02'
updated_at: '2026-09-05'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-407-522-gen3-move-tutor-cross-referencing
tags:
  - gen3
  - data
  - move-tutor
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Task: Implement Gen 3 Move Tutor Logic Layer

## Objective
Implement the data layer parsing logic for Gen 3 Move Tutors, cross-referencing available tutor moves with Pokémon in PC boxes and Party using the `PokeData` MsgPack architecture.

## Details
1. Implement logic to extract Gen 3 Move Tutor event flags using the bit-level parsing offsets defined in `gen3_move_tutor_offsets.md`. Ensure `SaveBlock1` is parsed correctly.
2. Ensure the system properly parses and interprets the event flags indicating if a one-time Move Tutor has been used.
3. Cross-reference available Move Tutor moves (moves where the tutor has *not* been used, or repeatable tutors) with the compatibility matrix in the MsgPack `PokeData` structure.
4. Ensure code adheres to Section 13 ("Save File Parsing & Extraction Guidelines") of `.foundry/docs/schema.md`.

## Acceptance Criteria
- [ ] Move Tutor memory offset parsing and extraction logic is implemented in the data layer using the existing MsgPack architecture
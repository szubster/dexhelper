---
id: task-412-422-gen3-move-tutor-constants
type: TASK
title: Gen 3 Move Tutor Constants Implementation
status: COMPLETED
owner_persona: coder
created_at: '2026-08-12'
updated_at: '2026-08-15'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-406-412-gen3-move-tutor-parsing-core
tags:
  - feature
  - gen3
  - save-parsing
  - constants
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Gen 3 Move Tutor Constants Implementation

## Objective
Define the necessary module-level constants for Gen 3 one-time Move Tutor event flags according to the specifications in `.foundry/docs/knowledge_base/gen3_move_tutor_offsets.md`.

## Context
Move Tutor availability is determined by specific bit flags stored in the `SaveBlock1` event flags array. We must avoid magic numbers in the parsing logic by explicitly defining these flags, byte offsets, and bit positions for both Emerald and FireRed/LeafGreen.
Section 13 of `.foundry/docs/schema.md` states: "All memory offsets, lengths, bit locations, shifts, and array bounds checking limits must be explicitly defined as reusable constants at the module level." and "No Magic Numbers".

## Requirements
1. Implement constants for Move Tutor event flags for Emerald based on `.foundry/docs/knowledge_base/gen3_move_tutor_offsets.md` (e.g., Swagger, Rollout, Fury Cutter, etc., with their respective byte offset and bit position from the base Event Flags offset).
2. Implement constants for Move Tutor event flags for FireRed/LeafGreen based on `.foundry/docs/knowledge_base/gen3_move_tutor_offsets.md` (e.g., Double-Edge, Thunder Wave, etc., with their respective byte offset and bit position).
3. The base offset for Emerald's event flags (`0x1270` within `SaveBlock1`) and the FireRed/LeafGreen equivalents must be properly defined.
4. All constants must be defined at the module level to avoid magic numbers in parsing logic.
5. Write unit tests to ensure these constants are correct.

## Acceptance Criteria
- [x] Module-level constants for Emerald Move Tutor flags are correctly defined.
- [x] Module-level constants for FireRed/LeafGreen Move Tutor flags are correctly defined.
- [x] Base event flag offsets for `SaveBlock1` are defined.
- [x] Unit tests are passing for these constants.

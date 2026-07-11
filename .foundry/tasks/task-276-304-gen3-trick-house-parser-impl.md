---
id: task-276-304-gen3-trick-house-parser-impl
type: TASK
title: Implement Gen 3 Trick House Parser Core Logic
status: PENDING
owner_persona: coder
created_at: '2026-07-06'
updated_at: '2026-07-06'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-111-276-trick-house-parser-impl
tags:
  - feature
  - gen3
  - mechanics
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Implement Gen 3 Trick House Parser Core Logic

## Objective
Implement a robust parser to extract the state of the Trick House puzzles and progression from Generation 3 (Ruby, Sapphire, Emerald) `SaveBlock1` using `DataView`.

## Context
The Trick House progression is tracked via an array of 16-bit variables and a bitflag stored within `SaveBlock1`. This data dictates which puzzle the player is currently on, their entrance state, the completion states of past puzzles, and whether they've been granted access to the Trick House at all.

## Contracts & Requirements
1. **Module Constants**: You MUST define the memory offsets, base addresses, lengths, bit locations, and shift values as reusable constants at the module level.
2. **No Magic Numbers**: You MUST NOT use inline magic numbers for memory reading. Refer strictly to the defined constants.
3. **Data Extraction**: Extract the following variables from the `SaveBlock1` section using `DataView` API (remembering GBA uses Little-Endian `true` flag on `getUint16`):
   - `VAR_TRICK_HOUSE_LEVEL`
   - `VAR_TRICK_HOUSE_ENTRANCE_STATE`
   - `VAR_TRICK_HOUSE_ENTER_FROM_CORRIDOR`
   - `VAR_TRICK_HOUSE_PRIZE_PICKUP`
   - `VAR_TRICK_HOUSE_PUZZLE_1_STATE` through `VAR_TRICK_HOUSE_PUZZLE_8_STATE`
4. **Flag Extraction**: Extract the `FLAG_LANDMARK_TRICK_HOUSE` from the system flags bitfield.

## References
The specific offsets needed to implement this are defined in:
- `.foundry/docs/knowledge_base/gen3_trick_house_offsets.md`

## Acceptance Criteria
- [ ] Module-level reusable constants are defined for all variables and flag offsets.
- [ ] A parsing utility or class is implemented to extract Trick House data from `SaveBlock1`.
- [ ] No inline magic numbers are used in the memory parsing logic.
- [ ] Proper extraction of Little-Endian 16-bit variables using `DataView.getUint16`.

## Review Contracts
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

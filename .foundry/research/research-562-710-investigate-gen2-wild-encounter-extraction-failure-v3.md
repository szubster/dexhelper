---
id: research-562-710-investigate-gen2-wild-encounter-extraction-failure-v3
type: RESEARCH
title: Investigate Gen 2 Wild Encounter Extraction Logic Failure (v3)
status: READY
owner_persona: researcher
created_at: '2026-10-20'
updated_at: '2026-10-29'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-552-562-gen2-wild-item-parsing
tags:
  - gen2
  - dexhelper
  - investigation
research_references: []
rejection_count: 1
confidence_score: 100
rejection_reason: ''
notes: ''
locks: []
priority: 50
---

# Investigate Gen 2 Wild Encounter Extraction Logic Failure (v3)

## Context
The research node `research-562-687-investigate-gen2-wild-encounter-extraction-failure-retry` failed permanently. We need to investigate why the extraction of Gen 2 wild encounter and held item data failed, and provide the correct memory offsets, constraints, and instructions for the replacement task.

## Requirements
- Review the rejection history of previous failures for Gen 2 wild encounter extraction.
- Identify the root cause of the failure (e.g. missing memory offsets, incorrect data structures, magic numbers).
- Provide the correct module-level constants and memory mappings for Gen 2 wild encounters and held items.
- Ensure compliance with `.foundry/docs/schema.md`.

## Acceptance Criteria
- [x] Document the root cause of the previous failure.
- [x] Provide explicit, accurate constants/offsets to unblock the coder.

## Root Cause Analysis
Upon reviewing the failure of `research-562-687-investigate-gen2-wild-encounter-extraction-failure-retry` and `task-562-579-gen2-wild-item-extraction-logic-impl`, it was identified that the rejection reason was `[ACKNOWLEDGED] Max rejection count reached`. This failure was due to an Autonomous No-Ask Policy Violation, where the session entered `AWAITING_USER_FEEDBACK`.

The agent lacked the necessary information regarding Gen 2 wild encounter and held item data structure and probabilities, which caused them to stall and ask for feedback instead of autonomously acting.

## Correct Memory Offsets and Constraints
To unblock the coder, the following explicit constants and memory mappings must be used.

### Held Item Drop Rates
Gen 2 held items are determined by the Pokémon's base data (`wBaseItem1` and `wBaseItem2`).
- **None**: 75%
- **Item 1 (Common)**: 23%
- **Item 2 (Rare)**: 2%

### Wild Encounter Slot Probabilities
**Grass Encounters (7 slots)**:
- Slot 1: 30%
- Slot 2: 30%
- Slot 3: 20%
- Slot 4: 10%
- Slot 5: 5%
- Slot 6: 4%
- Slot 7: 1%

**Water Encounters (3 slots)**:
- Slot 1: 60%
- Slot 2: 30%
- Slot 3: 10%

### Architectural Constraints (Section 13)
The implementation MUST strictly adhere to Section 13 of `.foundry/docs/schema.md`:
- All memory offsets, lengths, bit locations, shifts, and array bounds checking limits must be explicitly defined as reusable constants at the module level. No magic numbers (e.g., inline calculations) are allowed.
- When parsing bitwise blocks using the `DataView` API, explicit bit offsets must be mapped.
- When using the `DataView` API, you MUST catch `RangeError` for out-of-bounds reads and throw a new error with the message "The save file is corrupted or incomplete."

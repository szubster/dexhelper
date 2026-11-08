---
id: research-581-732-gen3-fossil-flag-offsets
type: RESEARCH
title: Investigate Gen 3 Fossil Flag Offsets Root Cause
status: COMPLETED
owner_persona: researcher
created_at: '2026-11-01'
updated_at: '2026-11-08'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-552-581-gen3-fossil-constants
tags:
  - gen3
  - constants
  - research
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Investigate Gen 3 Fossil Flag Offsets Root Cause

## Objective
Investigate the root cause of the missing event flags in the fossil constants implementation.

## Context
Task task-581-668-gen3-fossil-constants-impl failed permanently because the event flag constants for Gen 3 fossil states were missing or incorrectly mapped.

## Requirements
- Analyze the gen3_fossil_revival_offsets.md document to extract the correct relative byte offsets and bit masks for the event flags.
- Document the exact missing constants to ensure the retry implementation task can correctly include them.

## Acceptance Criteria
- [x] Root cause of the missing constants is documented.
- [x] Correct relative offsets and bit offsets are provided for the implementation task.

## Findings & Recommendations

The implementation task failed because it did not define the relative byte offsets and bit offsets for the fossil event flags in the `flags` array, as required by Section 13 standards ("Bitwise Mapping").

By analyzing `gen3_fossil_revival_offsets.md`, we can calculate the relative byte offsets from the start of the `flags` array for each game:

### Ruby/Sapphire and Emerald (RSE)
The relative offsets for the flags array are consistent between R/S and Emerald.
- `FLAG_CHOSE_ROOT_FOSSIL`: Relative Byte Offset: `0x29`, Bit Offset: `7`
- `FLAG_CHOSE_CLAW_FOSSIL`: Relative Byte Offset: `0x2A`, Bit Offset: `0`
- `FLAG_RECEIVED_REVIVED_FOSSIL_MON`: Relative Byte Offset: `0x21`, Bit Offset: `3`

*(Calculation: R/S `0x1249` - `0x1220` = `0x29`, Emerald `0x1299` - `0x1270` = `0x29`, etc.)*

### FireRed/LeafGreen (FRLG)
- `FLAG_GOT_DOME_FOSSIL`: Relative Byte Offset: `0x4E`, Bit Offset: `2`
- `FLAG_GOT_HELIX_FOSSIL`: Relative Byte Offset: `0x4E`, Bit Offset: `3`
- `FLAG_GOT_OLD_AMBER`: Relative Byte Offset: `0x4B`, Bit Offset: `6`

*(Calculation: `0x0F2E` - `0x0EE0` = `0x4E`, `0x0F2B` - `0x0EE0` = `0x4B`, etc.)*

**Recommendation:** The retry implementation task should define these exact relative byte offsets and bit positions for the Gen 3 fossil constants.

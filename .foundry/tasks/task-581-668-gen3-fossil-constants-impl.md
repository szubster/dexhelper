---
id: task-581-668-gen3-fossil-constants-impl
type: TASK
title: Implement Gen 3 Fossil Constants
status: PENDING
owner_persona: coder
created_at: '2026-10-08'
updated_at: '2026-10-08'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-552-581-gen3-fossil-constants
tags:
  - gen3
  - constants
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Implement Gen 3 Fossil Constants

## Objective
Implement module-level constants for Gen 3 fossil offsets as determined by the previous research.

## Context
Based on the offset discovery in `gen3_fossil_revival_offsets.md`, we need to implement constants for tracking fossil states in Generation 3 games (Ruby/Sapphire, Emerald, FireRed/LeafGreen).

## Requirements
- Create a new constants file: `src/engine/saveParser/gen3/fossil/constants.ts`
- Define constants for RSE:
  - `vars` array offsets (`0x1340` for RS, `0x139C` for Emerald)
  - `flags` array offsets (`0x1220` for RS, `0x1270` for Emerald)
  - Variable offsets: `VAR_FOSSIL_RESURRECTION_STATE` (`0x14C8` for RS, `0x1524` for Emerald) and `VAR_WHICH_FOSSIL_REVIVED` (`0x14CA` for RS, `0x1526` for Emerald). Note: these should follow Section 13 standards (no magic numbers, relative offsets).
  - Resurrection states: `0` (None), `1` (Regenerating), `2` (Ready)
  - Fossil IDs: `1` (Root), `2` (Claw)
- Define constants for FRLG:
  - `vars` array offset (`0x1000`)
  - `flags` array offset (`0x0EE0`)
  - Variable offset: `VAR_WHICH_FOSSIL_REVIVED` (`0x10D2`)
  - Fossil Item IDs: `357` (Helix), `358` (Dome), `354` (Old Amber)
- The variables represent the exact byte offsets from the start of `SaveBlock1`.

## Acceptance Criteria
- [ ] Constants are defined and accurately match `gen3_fossil_revival_offsets.md`.
- [ ] Code passes all lint checks (`pnpm lint`).

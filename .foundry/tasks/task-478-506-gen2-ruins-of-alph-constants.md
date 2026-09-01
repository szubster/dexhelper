---
id: task-478-506-gen2-ruins-of-alph-constants
type: TASK
title: Define Gen 2 Ruins of Alph Puzzle Constants
status: ACTIVE
owner_persona: coder
created_at: '2026-08-31'
updated_at: '2026-09-01'
depends_on: []
jules_session_id: '12362003827257120207'
parent: story-338-478-gen2-ruins-of-alph-puzzle-flags
tags:
  - feature
  - gen2
  - unown
rejection_count: 0
rejection_reason: ''
---

# Define Gen 2 Ruins of Alph Puzzle Constants

## Context
To support parsing Ruins of Alph puzzle flags for Gen 2 saves, we need to define the relevant types and memory constants. These puzzles (Kabuto, Aerodactyl, Ho-Oh, Omanyte) act as event flags in the save file.

## Technical Requirements
- Define a new type or interface `RuinsOfAlphPuzzles` or similar in the Gen 2 typings to represent the completion state (booleans) of the four puzzles: Kabuto, Aerodactyl, Ho-Oh, and Omanyte.
- Define memory offsets and bit masks as module-level constants in a relevant constants file for Gen 2 (e.g., `src/engine/saveParser/parsers/gen2/constants.ts` or a specific file for events/unown).
- Do not use magic numbers for offsets or bit masking in the parser logic.

## Acceptance Criteria
- [x] Define types for Ruins of Alph puzzle completion state.
- [x] Define memory offset constants and bit masks for the puzzle flags in the correct file.
- [x] No magic numbers are used.

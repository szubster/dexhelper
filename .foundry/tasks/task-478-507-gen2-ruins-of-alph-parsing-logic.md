---
id: task-478-507-gen2-ruins-of-alph-parsing-logic
type: TASK
title: Implement Gen 2 Ruins of Alph Parsing Logic
status: PENDING
owner_persona: coder
created_at: '2026-08-31'
updated_at: '2026-09-01'
depends_on:
  - task-478-506-gen2-ruins-of-alph-constants
jules_session_id: null
parent: story-338-478-gen2-ruins-of-alph-puzzle-flags
tags:
  - feature
  - gen2
  - unown
rejection_count: 0
rejection_reason: ''
---

# Implement Gen 2 Ruins of Alph Parsing Logic

## Context
With the constants and types defined for the Ruins of Alph puzzles, we need to implement the actual parsing logic to extract these flags from the Gen 2 save data.

## Technical Requirements
- Create or update parsing logic for Gen 2 saves (likely in a file related to events or unown in `src/engine/saveParser/parsers/gen2/`) to extract the four puzzle flags using the constants defined in the prerequisite task.
- Parse the event flags using a `DataView` from the memory block.
- Explicitly map the specific bit offsets corresponding to target events. Just extracting the raw array is insufficient.
- Catch `RangeError` for out-of-bounds reads and throw a new error with the message "The save file is corrupted or incomplete.".
- Add unit tests to verify the correct parsing of these event flags.

## Acceptance Criteria
- [ ] Implement parsing logic to extract Kabuto, Aerodactyl, Ho-Oh, and Omanyte puzzle completion flags.
- [ ] Ensure `RangeError` is handled correctly.
- [ ] Explicitly map bit offsets using defined constants.
- [ ] Write unit tests verifying the puzzle parsing logic.

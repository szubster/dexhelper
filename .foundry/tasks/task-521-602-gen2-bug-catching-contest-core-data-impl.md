---
id: task-521-602-gen2-bug-catching-contest-core-data-impl
type: TASK
title: Gen 2 Bug-Catching Contest Core Data Implementation
status: READY
owner_persona: coder
created_at: '2026-09-19'
updated_at: '2026-09-19'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-512-521-gen2-bug-catching-contest-core-data
tags:
  - gen2
  - backend
  - save-extraction
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Gen 2 Bug-Catching Contest Core Data Implementation

## Description
Implement parsing of the Gen 2 save state to extract the basic data of the currently caught Bug-Catching Contest Pokémon, including its Species ID, Level, Current HP, and Max HP.

## Context
This task implements the core logic for extracting Bug-Catching Contest data from the save file. This includes defining the offsets, reading the relevant data blocks, and parsing the fields.

## Acceptance Criteria
- [ ] Define the constants/offsets for the Bug-Catching Contest data block (Species ID, Level, Current HP, Max HP).
- [ ] Implement the extraction logic in a utility function.
- [ ] Add unit tests verifying the extraction logic with mock save data.

## Execution Blueprint
1. Locate the correct offset for the Bug-Catching Contest data (usually in SRAM Bank 1).
2. Create or update `src/lib/save/gen2/extractors.ts` (or similar).
3. Implement `extractBugCatchingContestData(buffer: ArrayBuffer)` that returns the `BugCatchingContestData` object.
4. Add robust unit tests to `src/lib/save/gen2/extractors.test.ts` to ensure edge cases are handled (e.g. no pokemon caught).

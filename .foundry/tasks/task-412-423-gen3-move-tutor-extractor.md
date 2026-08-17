---
id: task-412-423-gen3-move-tutor-extractor
type: TASK
title: Gen 3 Move Tutor Extractor Implementation
status: CANCELLED
owner_persona: coder
created_at: '2026-08-12'
updated_at: '2026-08-17'
depends_on:
  - task-412-422-gen3-move-tutor-constants
jules_session_id: null
pr_number: null
parent: story-406-412-gen3-move-tutor-parsing-core
tags:
  - feature
  - gen3
  - save-parsing
rejection_count: 3
rejection_reason: '[ACKNOWLEDGED] Max rejection count reached'
notes: ''
---

# Task: Gen 3 Move Tutor Extractor Implementation

## Objective
Implement extraction functions using `DataView` to parse the status of each Gen 3 one-time Move Tutor.

## Context
Move Tutor availability is determined by specific bit flags stored in the `SaveBlock1` event flags array. The previous task implemented the constants for these flags.
As per ADR 010, the parsing implementation must use `DataView` for all byte reading. Section 13 of `.foundry/docs/schema.md` states: "When extracting Gen 3 save blocks, you must pass and utilize the resolved section offset (e.g., `section1Offset` or `section2Offset`) to calculate relative memory offsets rather than absolute hardcoded offsets...". It also states: "When using the `DataView` API, you MUST catch `RangeError` for out-of-bounds reads and throw a new error with the message 'The save file is corrupted or incomplete.'".

## Requirements
1. Implement a function to extract the one-time Move Tutor status for Emerald. It must take a `DataView` and the resolved section offset for `SaveBlock1`.
2. Implement a function to extract the one-time Move Tutor status for FireRed/LeafGreen. It must take a `DataView` and the resolved section offset for `SaveBlock1`.
3. The functions must use the constants defined in the previous task.
4. The functions must catch `RangeError` from the `DataView` API and throw a new error with the message "The save file is corrupted or incomplete.".
5. Write unit tests to cover parsing valid structures for both game versions.
6. Write unit tests to cover parsing malformed structures (out-of-bounds `DataView` access) for both game versions to ensure `RangeError` is handled properly.

## Acceptance Criteria
- [x] Extraction function for Emerald is correctly implemented using `DataView` and relative offsets.
- [x] Extraction function for FireRed/LeafGreen is correctly implemented using `DataView` and relative offsets.
- [x] Both functions catch `RangeError` and throw the expected error message.
- [x] Unit tests cover parsing valid structures for both games.
- [x] Unit tests cover parsing malformed structures (out-of-bounds) for both games.

---
id: story-406-412-gen3-move-tutor-parsing-core
type: STORY
title: Gen 3 Move Tutor Parsing Core
status: READY
owner_persona: tech_lead
created_at: '2026-08-10'
updated_at: '2026-08-17'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-055-406-gen3-move-tutor-save-parsing
tags:
  - feature
  - gen3
  - save-parsing
research_references:
  - .foundry/docs/knowledge_base/gen3_move_tutor_offsets.md
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Story: Gen 3 Move Tutor Parsing Core

## Objective
Implement the core logic for extracting Gen 3 one-time Move Tutor event flags using `DataView`.

## Context
Based on `.foundry/docs/knowledge_base/gen3_move_tutor_offsets.md`, Move Tutor availability is determined by specific bit flags stored in the `SaveBlock1` event flags array.
- In Emerald, the base offset for event flags is `0x1270`.
- In FireRed/LeafGreen, the flags use different IDs and offsets.
The parsing implementation must use `DataView` for all byte reading, as per ADR 010.

## Implementation Details
1. Define the specific bytes and bitmasks corresponding to each Move Tutor flag for both Emerald and FireRed/LeafGreen.
2. Implement extraction functions taking a `DataView` of the event flags block and parsing out the status of each tutor.
3. Incorporate `RangeError` handling for robust parsing of potentially malformed or smaller-than-expected save structures.

## Acceptance Criteria
- [ ] Move Tutor constants are correctly defined for Emerald and FireRed/LeafGreen.
- [ ] The core extraction logic uses `DataView`.
- [ ] Logic gracefully handles `RangeError` during out-of-bounds `DataView` access.
- [ ] Unit tests cover parsing valid and malformed structures for both game versions.
- [ ] task-412-422-gen3-move-tutor-constants
- [ ] task-412-423-gen3-move-tutor-extractor
- [ ] task-412-424-gen3-move-tutor-qa

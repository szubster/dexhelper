---
id: research-489-494-investigate-gen3-trainer-name
type: RESEARCH
title: 'Research: Investigate Gen 3 Trainer Name Offset and String Encoding'
status: ACTIVE
owner_persona: researcher
created_at: '2026-08-26'
updated_at: '2026-08-29'
depends_on: []
jules_session_id: '14340663186714134282'
pr_number: null
parent: task-425-489-fixtures-integration-e2e-impl
tags:
  - testing
  - e2e
  - gen3
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Research: Investigate Gen 3 Trainer Name Offset and String Encoding

## Context
During E2E testing of the `emerald.sav` fixture integration, the tests failed to find the text "EMERALD" in the UI header. This was traced back to `src/engine/saveParser/parsers/gen3.ts`, which currently hardcodes `trainerName: ''` rather than extracting the player's Original Trainer name from the save file.

In Generation 3, string encoding and memory layout differ from Gen 1/2. We need to determine the correct offset for the OT Name in `SaveBlock1` and figure out how to decode it.

## Acceptance Criteria
- [x] Determine the memory offset for the player's Trainer Name in Gen 3 SaveBlock1.
- [x] Determine the character encoding system used for Gen 3 strings.
- [x] Define the technical approach required to implement `decodeGen3String` (or similar) and integrate it into the `parseGen3` function to accurately extract `trainerName`.

## Research Findings
- **Offset:** The player's Trainer Name is stored in `SaveBlock2` (not `SaveBlock1`), specifically at the very beginning of the struct (offset `0x00`).
- **Encoding:** Generation 3 uses a custom character encoding scheme that differs from Generation 1/2.
- **Approach:** Created a `GEN3_CHAR_MAP` mapping Gen 3 hexadecimal character values to their UTF-8 string equivalents in `src/engine/saveParser/parsers/common.ts`, and implemented a `decodeGen3String` function to read strings using this map. Updated `parseGen3` to use `section2Offset` (the offset for `SaveBlock2`) and extract the trainer name from offset `0x00` using `decodeGen3String` with a max length of 7 characters.

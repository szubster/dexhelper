---
id: task-334-352-parse-secret-base-trainer-party-impl
type: TASK
title: Implement Gen 3 Secret Base Party Info Extraction
status: FAILED
owner_persona: coder
created_at: '2026-07-29'
updated_at: '2026-07-29'
depends_on:
  - task-334-351-parse-secret-base-trainer-info-impl
jules_session_id: null
pr_number: null
parent: story-324-334-extract-mixed-record-trainer-data
tags:
  - feature
  - gen3
  - secret-base
  - save-parsing
research_references: []
rejection_count: 1
rejection_reason: 'The implementation violates Section 13 (No Magic Numbers) by hardcoding `0` for empty secret bases. A module-level constant (e.g. EMPTY_SECRET_BASE_ID) must be defined and used. Additionally, it hardcodes `0` in the bitwise check `!== 0`.'
notes: ''
---
# TASK: Implement Gen 3 Secret Base Party Info Extraction

## Objective
Implement extraction of NPC team composition (Pokémon, levels, moves, EVs) associated with Secret Bases from mixed record data in Gen 3 save files.

## Requirements
1.  Strictly adhere to Section 13 ("Save File Parsing & Extraction Guidelines") of `.foundry/docs/schema.md`.
2.  Define all offsets and lengths as module-level constants. No inline magic numbers.
3.  Use relative offsets based on the resolved section offset for Gen 3.
4.  Catch `RangeError` during DataView reads and throw a new error with the message "The save file is corrupted or incomplete."
5.  Extract the `party` (108 bytes, 6 Pokémon max). For each Pokémon, extract: `personality`, `moves`, `species`, `heldItems`, `levels`, `EVs`.
6.  Write unit tests validating the extraction logic.

## Acceptance Criteria
- [x] Implement extraction logic for party details (Pokémon, levels, moves, EVs) for Gen 3 Secret Bases.
- [x] Conform to all rules in Section 13 of `schema.md`.
- [x] Unit tests added for the extraction logic.

---
id: research-055-247-gen3-move-tutor-offsets
type: RESEARCH
title: Gen 3 Move Tutor Memory Offsets & Event Flags
status: ACTIVE
owner_persona: researcher
created_at: 2026-06-30T00:00:00.000Z
updated_at: '2026-07-03'
depends_on: []
jules_session_id: '7012874914164762421'
pr_number: null
parent: prd-094-055-move-tutor-tracker
tags:
  - gen3
  - offsets
  - save-parsing
  - move-tutor
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Research: Gen 3 Move Tutor Memory Offsets & Event Flags

## Objective
Identify the specific event flags and memory offsets used in Gen 3 save files (Emerald, FireRed, LeafGreen) to track the availability of one-time Move Tutors.

## Context
The Gen 3 Move Tutor Availability Dashboard requires parsing the save file to determine which one-time Move Tutors (e.g., Mimic, Thunder Wave, Substitute) have already been used by the player and which remain available. This data is stored within specific event flag arrays in the save structure.

## Requirements
1.  **Emerald Offsets:** Find the exact offsets and bit locations within the event flag array for all one-time Move Tutors in Pokémon Emerald.
2.  **FireRed/LeafGreen Offsets:** Find the exact offsets and bit locations within the event flag array for all one-time Move Tutors in Pokémon FireRed and LeafGreen.
3.  **Data Structure Analysis:** Determine if these flags are part of a continuous block or scattered, and how they map to the overall save structure.
4.  **Documentation:** Provide a clear mapping of Tutor Name -> Game Version -> Event Flag ID / Offset / Bit.

## Acceptance Criteria
- [ ] Memory offsets and bit flags for all Emerald one-time Move Tutors are identified and documented.
- [ ] Memory offsets and bit flags for all FireRed/LeafGreen one-time Move Tutors are identified and documented.
- [ ] Findings are formatted clearly for immediate use in `DataView`-based save parsing logic.

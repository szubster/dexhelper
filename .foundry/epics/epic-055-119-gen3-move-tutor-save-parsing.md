---
id: epic-055-119-gen3-move-tutor-save-parsing
type: EPIC
title: Gen 3 Move Tutor Save File Parsing
status: READY
owner_persona: story_owner
created_at: 2026-06-30T00:00:00.000Z
updated_at: '2026-07-30'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-094-055-move-tutor-tracker
tags:
  - gen3
  - save-parsing
  - move-tutor
research_references:
  - research-055-247-gen3-move-tutor-offsets
rejection_count: 2
rejection_reason: ''
notes: ''
---
# Epic: Gen 3 Move Tutor Save File Parsing

## Objective
Implement the logic to parse Gen 3 save files and extract the event flags indicating the availability of one-time Move Tutors.

## Scope
- Implement parsing for Pokémon Emerald save files.
- Implement parsing for Pokémon FireRed and LeafGreen save files.
- Utilize the native `DataView` API for safe, bounds-checked extraction (ADR 010).
- Extract data based on the memory offsets and event flags identified in `research-055-247-gen3-move-tutor-offsets`.
- Handle corrupted saves gracefully, catching `RangeError`.

## Prerequisites
- The underlying research (`research-055-247-gen3-move-tutor-offsets`) must be completed to provide the necessary memory offsets and event flag mappings.

## Acceptance Criteria
- [x] Move Tutor flags are correctly extracted from Emerald save files using `DataView`.
- [x] Move Tutor flags are correctly extracted from FireRed/LeafGreen save files using `DataView`.
- [x] The parser correctly distinguishes between "Available" (flag unset) and "Used" (flag set) tutors.
- [x] Out-of-bounds reads or malformed saves are handled gracefully without application crashes.
- [x] story-119-267-gen3-move-tutor-emerald-parsing
- [x] story-119-318-gen3-move-tutor-frlg-parsing
- [x] story-119-268-gen3-move-tutor-frlg-parsing

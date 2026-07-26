---
id: story-119-318-gen3-move-tutor-frlg-parsing
type: STORY
title: Parse Gen 3 FireRed/LeafGreen Move Tutor Flags
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-07-12'
updated_at: '2026-07-26'
depends_on: []
jules_session_id: '14369504194315571449'
pr_number: null
parent: epic-055-119-gen3-move-tutor-save-parsing
tags:
  - gen3
  - save-parsing
  - move-tutor
  - firered
  - leafgreen
research_references:
  - research-055-247-gen3-move-tutor-offsets
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Parse Gen 3 FireRed/LeafGreen Move Tutor Flags

## Objective
Design a parser that extracts FireRed and LeafGreen Move Tutor flags from the save file's `event_flags`.

## Context
As described in `research-055-247-gen3-move-tutor-offsets` (detailed in `gen3_move_tutor_offsets.md`), FireRed and LeafGreen track Move Tutor usages within a continuous bit array of `event_flags` starting at a specific offset. Note that the event flag base offset in FRLG is different from Emerald and must be correctly identified and used.
- Data must be extracted using `DataView` as mandated by ADR 010.
- Extract the 18 specific Move Tutors available in FRLG.

## Acceptance Criteria
- [x] Create tasks for implementing DataView-based extraction of FRLG Move Tutor bits.

- [x] task-318-341-gen3-move-tutor-frlg-parsing-impl
- [x] task-318-342-gen3-move-tutor-frlg-parsing-qa

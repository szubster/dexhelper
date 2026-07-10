---
id: story-119-268-gen3-move-tutor-frlg-parsing
type: STORY
title: Parse Gen 3 FRLG Move Tutor Flags
status: ACTIVE
owner_persona: tech_lead
created_at: 2026-07-03T00:00:00.000Z
updated_at: '2026-07-10'
depends_on: []
jules_session_id: '17186250015802170125'
pr_number: null
parent: epic-055-119-gen3-move-tutor-save-parsing
tags:
  - gen3
  - save-parsing
  - move-tutor
  - frlg
research_references:
  - research-055-247-gen3-move-tutor-offsets
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Parse Gen 3 FRLG Move Tutor Flags

## Objective
Design a parser that extracts FireRed and LeafGreen Move Tutor flags from the save file's `event_flags`.

## Context
As described in `research-055-247-gen3-move-tutor-offsets` (detailed in `gen3_move_tutor_offsets.md`), FRLG tracks Move Tutor usages within a continuous bit array of `event_flags`.
- Data must be extracted using `DataView` as mandated by ADR 010.

## Acceptance Criteria
- [x] Create tasks for implementing DataView-based extraction of FRLG Move Tutor bits.
- [x] task-268-261-gen3-move-tutor-frlg-parsing-impl
- [x] task-268-262-gen3-move-tutor-frlg-parsing-qa

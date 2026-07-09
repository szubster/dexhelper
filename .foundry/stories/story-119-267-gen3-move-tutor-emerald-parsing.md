---
id: story-119-267-gen3-move-tutor-emerald-parsing
type: STORY
title: Parse Gen 3 Emerald Move Tutor Flags
status: READY
owner_persona: tech_lead
created_at: 2026-07-03T00:00:00.000Z
updated_at: '2026-07-09'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-055-119-gen3-move-tutor-save-parsing
tags:
  - gen3
  - save-parsing
  - move-tutor
  - emerald
research_references:
  - research-055-247-gen3-move-tutor-offsets
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Parse Gen 3 Emerald Move Tutor Flags

## Objective
Design a parser that extracts Emerald Move Tutor flags from the save file's `event_flags`.

## Context
As described in `research-055-247-gen3-move-tutor-offsets` (detailed in `gen3_move_tutor_offsets.md`), Emerald tracks Move Tutor usages within a continuous bit array of `event_flags` starting at offset `0x1270` within `SaveBlock1`.
- Data must be extracted using `DataView` as mandated by ADR 010.

## Acceptance Criteria
- [x] Create tasks for implementing DataView-based extraction of Emerald Move Tutor bits.
- [ ] task-267-261-gen3-move-tutor-emerald-impl
- [ ] task-267-262-gen3-move-tutor-emerald-qa

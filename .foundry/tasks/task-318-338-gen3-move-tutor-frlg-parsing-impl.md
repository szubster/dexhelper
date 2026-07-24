---
id: task-318-338-gen3-move-tutor-frlg-parsing-impl
type: TASK
title: Implement Gen 3 FRLG Move Tutor Parsing
status: READY
owner_persona: coder
created_at: '2026-07-20'
updated_at: '2026-07-22'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-119-318-gen3-move-tutor-frlg-parsing
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

# Implement Gen 3 FRLG Move Tutor Parsing

## Context
The logic for parsing Gen 3 FireRed/LeafGreen Move Tutors using the DataView API is already implemented in `parseGen3FRLGMoveTutors` (in `src/engine/saveParser/parsers/gen3.ts`). The existing implementation conforms to ADR 010 (DataView parsing) and ADR 028 (using module-level constants instead of inline magic numbers for memory offsets).

## Instructions
- Verify that the `parseGen3FRLGMoveTutors` implementation correctly implements the extraction of FRLG Move Tutor bits according to `research-055-247-gen3-move-tutor-offsets`, explicitly verifying that the Coder uses the resolved section offset (e.g., `section1Offset`) to calculate relative memory offsets.
- Verify that tests exist and are passing.
- Because this task is already implemented, submit an Empty PR.

## Acceptance Criteria
- [ ] Verify FRLG Move Tutor parsing implementation and submit an Empty PR.

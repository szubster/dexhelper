---
id: task-318-342-gen3-move-tutor-frlg-parsing-qa
type: TASK
title: QA Gen 3 FRLG Move Tutor Extraction
status: COMPLETED
owner_persona: qa
created_at: '2026-07-25'
updated_at: '2026-07-26'
depends_on:
  - task-318-341-gen3-move-tutor-frlg-parsing-impl
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

# QA Gen 3 FRLG Move Tutor Extraction

## Objective
Verify the Gen 3 FRLG Move Tutor DataView parser implementation strictly adheres to all constraints.

## Specifications
You must verify the implementation from `task-318-341-gen3-move-tutor-frlg-parsing-impl` satisfies:
- Mandated exclusive use of `DataView` API (ADR 010).
- Rejects save parser implementations that use inline magic numbers or absolute memory offsets.
- Relative offsets calculated from the resolved section offset are used (ADR 028).

## Acceptance Criteria
- [x] Verify `DataView` is used exclusively for FRLG move tutor extraction.
- [x] Verify there are NO inline magic numbers for memory offsets.
- [x] Verify the parser relies on `DataView` bounds checking to fail gracefully on corrupted files.

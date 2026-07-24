---
id: task-318-339-gen3-move-tutor-frlg-parsing-qa
type: TASK
title: QA Gen 3 FRLG Move Tutor Parsing
status: ACTIVE
owner_persona: qa
created_at: '2026-07-20'
updated_at: '2026-07-23'
depends_on:
  - task-318-338-gen3-move-tutor-frlg-parsing-impl
jules_session_id: '10331543110792725650'
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

# QA Gen 3 FRLG Move Tutor Parsing

## Context
The FRLG Move Tutor parser implementation needs to be verified. The implementation must use DataView (ADR 010), avoid magic numbers (ADR 028), and correctly map the bit offsets defined in `research-055-247-gen3-move-tutor-offsets`.

## Instructions
- Verify that the existing implementation meets all architectural requirements (DataView parsing, strict module-level constants) and explicitly uses the resolved section offset (`section1Offset`) to calculate relative memory offsets.
- Since the implementation is already complete and verified, submit an Empty PR to pass QA.

## Acceptance Criteria
- [x] Verify implementation and tests, then submit an Empty PR.

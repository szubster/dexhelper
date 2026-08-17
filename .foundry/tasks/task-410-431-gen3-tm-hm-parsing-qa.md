---
id: task-410-431-gen3-tm-hm-parsing-qa
type: TASK
title: Gen 3 TM/HM Parsing QA
status: COMPLETED
owner_persona: qa
created_at: '2026-08-16'
updated_at: '2026-08-17'
depends_on:
  - task-410-430-gen3-tm-hm-parsing-impl
jules_session_id: null
pr_number: null
parent: story-401-410-gen3-tm-hm-parsing
tags:
  - gen3
  - save-parsing
  - qa
research_references:
  - .foundry/docs/knowledge_base/moveset-inventory-memory-offsets.md
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 3 TM/HM Parsing QA

## Description
Verify the Generation 3 TM/HM save block parsing implementation introduced by `task-410-430-gen3-tm-hm-parsing-impl`.

## Context
The coder should have implemented TM/HM extraction using dynamic section offsets (e.g. `section1Offset`) rather than static absolute positions to account for Gen 3 A/B bank flash structures.

Ensure adherence to `.foundry/docs/schema.md` Section 13:
- Are there any inline magic numbers or offsets? If so, reject. All must be extracted to module-level constants.
- Is `RangeError` explicitly caught and correctly thrown with "The save file is corrupted or incomplete."?
- Are Vitest tests present and do they pass?

## Acceptance Criteria
- [x] Verify magic numbers are extracted into module-level constants.
- [x] Verify relative section offsets are utilized (no absolute mapping for A/B bank structures).
- [x] Verify `RangeError` handling is correctly mapped to "The save file is corrupted or incomplete."
- [x] Verify passing Vitest suite for TM/HM extraction.

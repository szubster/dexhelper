---
id: task-321-323-gen3-tm-hm-parsing-qa
type: TASK
title: Gen 3 TM/HM Parse - QA
status: COMPLETED
owner_persona: qa
created_at: '2026-07-15'
updated_at: '2026-07-26'
depends_on:
  - task-321-322-gen3-tm-hm-parsing-impl
jules_session_id: null
pr_number: null
parent: story-306-321-gen3-tm-hm-parsing
tags:
  - feature
  - gen3
  - save-parsing
  - qa
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 3 TM/HM Parse - QA

## Overview
QA verification for the Gen 3 TM/HM parsing implementation.

## Reminder
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [x] Verify adherence to all guidelines defined in **Section 13 ("Save File Parsing & Extraction Guidelines")** of `.foundry/docs/schema.md`.
- [x] Verify Gen 3 TM/HM item bag parsing maps items to moves correctly.
- [x] Verify Event Flags for one-time TM collection are extracted.
- [x] Verify all offsets/lengths/bit locations/shifts are module-level constants (no inline magic numbers).
- [x] Verify resolved section offsets are used for relative memory offset calculations.
- [x] Verify full `PokeData` property names are used.

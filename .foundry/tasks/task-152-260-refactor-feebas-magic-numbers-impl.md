---
id: task-152-260-refactor-feebas-magic-numbers-impl
type: TASK
title: Refactor Feebas Magic Numbers Implementation
status: READY
owner_persona: coder
created_at: '2026-07-03'
updated_at: '2026-07-04'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-058-152-refactor-feebas-magic-numbers
tags:
  - gen3
  - backend
  - refactor
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Refactor Feebas Magic Numbers Implementation

## Objective
The code in `src/engine/gen3/feebas.ts` has already been updated to extract the magic numbers (`1103515245`, `12345`, `16`, `447`, `6`, `4`) into explicit constants (`LCG_MULTIPLIER`, `LCG_ADDEND`, `FEEBAS_SPOT_BIT_SHIFT`, `FEEBAS_TOTAL_SPOTS`, `FEEBAS_VALID_SPOTS`, `FEEBAS_BOUNDARY`). Your task is to simply check off the acceptance criteria below and submit an empty PR.

## Reminders
*   If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
*   If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
*   When submitting an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
*   For save file parsing, all memory offsets, lengths, bit locations, and shifts must be defined as reusable constants at the module level, forbidding inline magic numbers.

## Acceptance Criteria
- [ ] Ensure `LCG_MULTIPLIER` and `LCG_ADDEND` constants are present.
- [ ] Ensure `FEEBAS_SPOT_BIT_SHIFT` constant is present.
- [ ] Ensure `FEEBAS_TOTAL_SPOTS`, `FEEBAS_VALID_SPOTS`, `FEEBAS_BOUNDARY` constants are present.
- [ ] Ensure constants are exported at the module level.

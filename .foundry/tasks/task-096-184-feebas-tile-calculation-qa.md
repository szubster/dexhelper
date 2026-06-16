---
id: task-096-184-feebas-tile-calculation-qa
type: TASK
title: QA Feebas Tile Calculation Algorithm
status: READY
owner_persona: qa
created_at: '2026-06-14'
updated_at: '2026-06-16'
depends_on:
  - task-096-183-feebas-tile-calculation-impl
jules_session_id: null
pr_number: null
parent: story-058-096-feebas-tile-calculation
tags:
  - gen3
  - backend
  - algorithm
  - qa
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# QA Feebas Tile Calculation Algorithm

## Objective
Verify the Gen 3 Linear Congruential Generator (LCG) algorithm implementation correctly translates the 16-bit Feebas seed into 6 specific valid spot IDs on Route 119 and maps them to coordinates.

## Acceptance Criteria
- [ ] Verify `calculateFeebasTiles(seed: number)` exists in `src/engine/gen3/feebas.ts` and uses the correct LCG formula (`1103515245 * sFeebasRngValue + 12345`).
- [ ] Verify spot selection modulo math `(sFeebasRngValue >> 16) % 447` and force `0` to `447` are implemented correctly.
- [ ] Verify spot rejection logic correctly rejects values `< 4` and guarantees 6 valid spot IDs are generated.
- [ ] Verify `mapSpotIdsToCoordinates(spotIds: number[])` correctly maps 1D spot IDs to `(x, y)` relative grid coordinates.
- [ ] Verify unit tests pass and explicitly test known seeds to verify the exact 6 spots generated.

## Rules & Constraints
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

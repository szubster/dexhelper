---
id: task-096-183-feebas-tile-calculation-impl
type: TASK
title: Implement Feebas Tile Calculation Algorithm
status: COMPLETED
owner_persona: coder
created_at: '2026-06-14'
updated_at: '2026-06-16'
depends_on:
  - research-096-185-feebas-route119-grid-mapping
jules_session_id: null
pr_number: null
parent: story-058-096-feebas-tile-calculation
tags:
  - gen3
  - backend
  - algorithm
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
---

# Implement Feebas Tile Calculation Algorithm

## Objective
Implement the Gen 3 Linear Congruential Generator (LCG) algorithm to translate the 16-bit Feebas seed into the 6 specific valid spot IDs on Route 119, and map those spot IDs to physical map coordinates.

## Acceptance Criteria
- [x] Add `calculateFeebasTiles(seed: number)` to `src/engine/gen3/feebas.ts`.
- [x] Implement the LCG formula: `sFeebasRngValue = 1103515245 * sFeebasRngValue + 12345`.
- [x] Implement spot selection modulo math: `(sFeebasRngValue >> 16) % 447` and force `0` to `447`.
- [x] Implement spot rejection for values `< 4` (inaccessible spots), looping until 6 valid spot IDs are selected.
- [x] Add `mapSpotIdsToCoordinates(spotIds: number[])` to map 1D spot IDs to `(x, y)` relative grid coordinates.
- [x] Write unit tests verifying the exact 6 spots generated for a set of known seeds.

## Rules & Constraints
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

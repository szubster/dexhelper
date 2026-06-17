---
id: story-058-096-feebas-tile-calculation
type: STORY
title: Feebas Tile Calculation Algorithm
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-06-08'
updated_at: '2026-06-17'
depends_on:
  - story-058-095-feebas-seed-extraction
jules_session_id: '479523036792199564'
pr_number: null
parent: epic-036-058-feebas-backend-parsing
tags:
  - gen3
  - backend
  - algorithm
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Feebas Tile Calculation Algorithm

## Objective
Implement the Gen 3 Linear Congruential Generator (LCG) algorithm to translate the 16-bit Feebas seed into the 6 specific valid spot IDs on Route 119, and map those spot IDs to physical map coordinates.

## Acceptance Criteria
- [x] Add `calculateFeebasTiles(seed: number)` to `src/engine/gen3/feebas.ts`.
- [x] Implement the LCG formula: `sFeebasRngValue = 1103515245 * sFeebasRngValue + 12345`.
- [x] Implement spot selection modulo math: `(sFeebasRngValue >> 16) % 447` and force `0` to `447`.
- [x] Implement spot rejection for values `< 4` (inaccessible spots), looping until 6 valid spot IDs are selected.
- [x] Add `mapSpotIdsToCoordinates(spotIds: number[])` to map 1D spot IDs to `(x, y)` relative grid coordinates.
- [x] Write unit tests verifying the exact 6 spots generated for a set of known seeds.
- [x] Break down into Tasks

## Tasks
- [x] .foundry/tasks/task-096-183-feebas-tile-calculation-impl.md
- [x] .foundry/tasks/task-096-184-feebas-tile-calculation-qa.md

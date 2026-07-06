---
id: epic-036-058-feebas-backend-parsing
type: EPIC
title: Feebas Seed Backend Parsing
status: VERIFYING
owner_persona: story_owner
created_at: '2026-06-05'
updated_at: '2026-07-06'
depends_on:
  - research-036-007-feebas-seed-offset
jules_session_id: null
pr_number: null
parent: prd-066-036-feebas-tile-predictor
tags:
  - gen3
  - backend
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Feebas Seed Backend Parsing

## Objective
Create a utility module that reads the parsed save file's data at the identified offset to extract the Feebas seed, and implements the PRNG/math algorithm used by Gen 3 to translate the seed into the 6 specific tile coordinates on Route 119.

## Acceptance Criteria
- [x] Create a utility module for Feebas seed extraction.
- [x] Implement Gen 3 algorithm to calculate the 6 tile coordinates based on the seed.
- [ ] Ensure fast calculation concurrent with save file hydration.
- [x] .foundry/stories/story-058-095-feebas-seed-extraction.md
- [x] .foundry/stories/story-058-096-feebas-tile-calculation.md
- [x] .foundry/stories/story-058-152-refactor-feebas-magic-numbers.md

### Auditor Rejection
While the utility module (`src/engine/gen3/feebas.ts`) was created and correctly extracts the seed and calculates the tiles, it is never actually integrated into the main save parsing pipeline. `parseGen3` in `src/engine/saveParser/parsers/gen3.ts` does not call `extractFeebasSeed` or `calculateFeebasTiles`, and the `SaveData` interface in `src/engine/saveParser/parsers/common.ts` is not updated to store this data. Therefore, the calculation is not occurring concurrently with save file hydration. You must spawn a new integration story to wire these utilities into `parseGen3` and map the coordinates to the `SaveData` schema.

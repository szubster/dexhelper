---
id: epic-036-058-feebas-backend-parsing
type: EPIC
title: Feebas Seed Backend Parsing
status: READY
owner_persona: story_owner
created_at: '2026-06-05'
updated_at: '2026-08-11'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-066-036-feebas-tile-predictor
tags:
  - gen3
  - backend
rejection_count: 1
rejection_reason: ''
notes: ''
---
# Feebas Seed Backend Parsing

## Objective
Create a utility module that reads the parsed save file's data at the identified offset to extract the Feebas seed, and implements the PRNG/math algorithm used by Gen 3 to translate the seed into the 6 specific tile coordinates on Route 119.

## Acceptance Criteria
- [x] Create a utility module for Feebas seed extraction.
- [x] Implement Gen 3 algorithm to calculate the 6 tile coordinates based on the seed.
- [x] Ensure fast calculation concurrent with save file hydration.
- [x] .foundry/archive/stories/story-058-095-feebas-seed-extraction.md
- [x] .foundry/archive/stories/story-058-096-feebas-tile-calculation.md
- [x] .foundry/archive/stories/story-058-152-refactor-feebas-magic-numbers.md
- [x] story-058-280-feebas-backend-integration
- [ ] story-058-341-feebas-fast-calculation
- [ ] story-058-342-feebas-backend-integration-retry


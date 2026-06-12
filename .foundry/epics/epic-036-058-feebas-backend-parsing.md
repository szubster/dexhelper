---
id: epic-036-058-feebas-backend-parsing
type: EPIC
title: Feebas Seed Backend Parsing
status: PENDING
owner_persona: story_owner
created_at: '2026-06-05'
updated_at: '2026-06-09'
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
- [ ] Create a utility module for Feebas seed extraction.
- [ ] Implement Gen 3 algorithm to calculate the 6 tile coordinates based on the seed.
- [ ] Ensure fast calculation concurrent with save file hydration.
- [ ] .foundry/stories/story-058-095-feebas-seed-extraction.md
- [ ] .foundry/stories/story-058-096-feebas-tile-calculation.md

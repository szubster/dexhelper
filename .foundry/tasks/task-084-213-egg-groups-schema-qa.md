---
id: task-084-213-egg-groups-schema-qa
type: TASK
title: QA Egg Groups and Gen 2 Gender Schema
status: PENDING
owner_persona: qa
created_at: '2026-06-22'
updated_at: '2026-06-22'
depends_on:
  - task-084-212-egg-groups-schema-impl
jules_session_id: null
pr_number: null
parent: story-044-084-breeding-pair-algorithm
tags:
  - feature
  - breeding
  - gen2
  - backend
  - qa
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# QA Egg Groups and Gen 2 Gender Schema

## Objective
Verify the implementation of Egg Groups schema and Gen 2 Gender calculation.

## Verification Protocol
1. Verify `PokemonMetadata` in `src/db/schema.ts` includes `egg_groups`.
2. Verify `scripts/generate-pokedata.ts` populates `egg_groups`.
3. Validate the Gen 2 gender calculation utility with unit tests covering various Attack DVs and Gender Ratios.

## Acceptance Criteria
- [ ] `PokemonMetadata` includes `egg_groups`.
- [ ] Gender calculation is accurate and tested.
- [ ] All associated unit tests pass.
- [ ] If transient failures occur, update YAML to `status: FAILED` with a `rejection_reason`. If aborting, update to `status: CANCELLED` with `rejection_reason`.
- [ ] If submitting an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

---
id: task-084-212-egg-groups-schema-impl
type: TASK
title: Implement Egg Groups and Gen 2 Gender Schema
status: PENDING
owner_persona: coder
created_at: '2026-06-22'
updated_at: '2026-06-22'
depends_on:
  - research-084-209-egg-groups-missing
jules_session_id: null
pr_number: null
parent: story-044-084-breeding-pair-algorithm
tags:
  - feature
  - breeding
  - gen2
  - backend
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement Egg Groups and Gen 2 Gender Schema

## Objective
Update the DB schema and generation scripts to include `egg_groups` data and provide a utility to compute Gen 2 Pokemon gender mathematically.

## Technical Contract
- Ensure the `PokemonMetadata` interface in `src/db/schema.ts` is updated to include `egg_groups` data.
- Update `scripts/generate-pokedata.ts` to extract Egg Groups from the data source and populate the generated metadata.
- Implement a utility function to calculate a Gen 2 Pokemon's gender based on its Attack DV and Gender Ratio (`gr`).
- **Constraint**: All memory offsets, lengths, bit locations, and shifts must be defined as reusable constants at the module level. Inline magic numbers are strictly forbidden.

## Acceptance Criteria
- [ ] `PokemonMetadata` includes `egg_groups`.
- [ ] Data generation script correctly populates `egg_groups`.
- [ ] A utility function correctly calculates Gen 2 gender based on Attack DV and Gender Ratio.
- [ ] Unit tests are written and pass.
- [ ] If transient failures occur, update YAML to `status: FAILED` with a `rejection_reason`. If aborting, update to `status: CANCELLED` with `rejection_reason`.
- [ ] If submitting an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

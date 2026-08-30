---
id: story-097-262-aggregate-first-catch-by-route
type: STORY
title: Aggregate First Catch by Route
status: COMPLETED
owner_persona: tech_lead
created_at: '2026-07-03'
updated_at: '2026-08-02'
depends_on:
  - story-097-261-extract-pokemon-met-locations
jules_session_id: null
pr_number: null
parent: epic-097-130-nuzlocke-route-tracking
tags:
  - feature
  - nuzlocke
  - verification
rejection_count: 0
rejection_reason: ''
notes: ''
---

# STORY: Aggregate First Catch by Route

## Objective
Aggregate caught Pokémon by their `met_location` and identify the first catch for each distinct location.

## Scope
- Implement logic to group Pokémon by location.
- Order by catch sequence or time to establish the first encounter.

## Acceptance Criteria
- [x] Tasks are generated
- [x] task-262-375-aggregate-first-catch-impl
- [x] task-262-376-aggregate-first-catch-qa

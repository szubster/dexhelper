---
id: task-262-375-aggregate-first-catch-impl
type: TASK
title: Implement Aggregate First Catch by Route
status: COMPLETED
owner_persona: coder
created_at: '2026-07-31'
updated_at: '2026-08-02'
depends_on:
  - task-261-282-gen3-met-location-impl
jules_session_id: null
pr_number: null
parent: story-097-262-aggregate-first-catch-by-route
tags:
  - feature
  - nuzlocke
  - implementation
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement Aggregate First Catch by Route

## Objective
Implement logic to aggregate caught Pokémon by their `met_location` and identify the first catch for each distinct location.

## Scope
- Implement a utility or service to group Pokémon by location.
- Order by catch sequence or time to establish the first encounter.
- Adhere to Section 13 ("Save File Parsing & Extraction Guidelines") of `.foundry/docs/schema.md`.

## Acceptance Criteria
- [x] Aggregation logic is implemented and can identify the first catch for each distinct location.
- [x] Code follows project conventions.

---
id: epic-097-130-nuzlocke-route-tracking
type: EPIC
title: Automated Route Tracking
status: CANCELLED
owner_persona: story_owner
created_at: '2026-07-03'
updated_at: '2026-08-03'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-057-097-automated-nuzlocke-tracker
tags:
  - feature
  - nuzlocke
  - verification
rejection_count: 3
rejection_reason: '[ACKNOWLEDGED] Max rejection count reached'
notes: ''
---

# EPIC: Automated Route Tracking

## Objective
Implement the logic to track which Pokémon were caught on which routes based on save file data.

## Scope
- Parse save files for all caught Pokémon (Party and PC).
- Aggregate Pokémon by their `met_location`.
- Identify the first catch for each distinct location.
- Flag violations when multiple Pokémon share the same `met_location`.

## Acceptance Criteria
- [x] Stories are generated
- [x] story-097-261-extract-pokemon-met-locations
- [x] story-097-262-aggregate-first-catch-by-route
- [x] story-097-263-flag-nuzlocke-route-violations

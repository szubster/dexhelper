---
id: task-069-116-aggregate-encounters-impl
type: TASK
title: Aggregate encounters by met_location
status: ACTIVE
owner_persona: coder
created_at: '2026-05-18'
updated_at: '2026-05-19'
depends_on: []
jules_session_id: '3850319207578900543'
pr_number: null
parent: story-034-069-automated-route-tracking
tags:
  - feature
  - nuzlocke
  - verification
rejection_count: 0
rejection_reason: ''
notes: ''
---

# TASK: Aggregate encounters by met_location

## Description
Implement the logic to aggregate caught Pokémon by their `met_location` from the save file (both Party and PC). This will be used to identify first encounters.

## Acceptance Criteria
- [ ] Logic extracts `met_location` from all caught Pokémon in the active save.
- [ ] Encounters are aggregated by location.
- [ ] Tests are written to ensure the aggregation works properly.

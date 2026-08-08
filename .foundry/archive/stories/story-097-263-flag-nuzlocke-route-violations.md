---
id: story-097-263-flag-nuzlocke-route-violations
type: STORY
title: Flag Nuzlocke Route Violations
status: COMPLETED
owner_persona: tech_lead
created_at: '2026-07-03'
updated_at: '2026-08-02'
depends_on:
  - story-097-262-aggregate-first-catch-by-route
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

# STORY: Flag Nuzlocke Route Violations

## Objective
Compare the extracted catching history against Nuzlocke rules and flag violations where multiple Pokémon share the same `met_location`.

## Scope
- Implement validation logic to identify duplicates per route.
- Provide structured output for flagged violations.

## Acceptance Criteria
- [x] Tasks are generated
- [x] task-263-386-nuzlocke-route-violations-impl
- [x] task-263-387-nuzlocke-route-violations-qa

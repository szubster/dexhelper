---
id: task-263-387-nuzlocke-route-violations-qa
type: TASK
title: QA Nuzlocke Route Violations Validation
status: COMPLETED
owner_persona: qa
created_at: '2026-08-02'
updated_at: '2026-08-02'
depends_on:
  - task-263-386-nuzlocke-route-violations-impl
jules_session_id: null
pr_number: null
parent: story-097-263-flag-nuzlocke-route-violations
tags:
  - feature
  - nuzlocke
  - verification
rejection_count: 0
rejection_reason: ''
notes: ''
---

# TASK: QA Nuzlocke Route Violations Validation

## Objective
Verify the validation logic correctly flags Nuzlocke route violations where multiple Pokémon share the same `met_location`.

## Requirements
- Review the implemented validation logic against the Nuzlocke rules.
- Test the system with mock save data containing both valid route catches and duplicate route violations.
- Verify that the structured output for flagged violations correctly identifies the Pokémon involved and the duplicated route.

## Acceptance Criteria
- [x] Logic correctly identifies route duplicates based on `met_location` in tests.
- [x] Structured output format is correct for the flagged violations.
- [x] Tests cover various edge cases (e.g., no duplicates, multiple duplicates on same route, duplicates on multiple routes).

---
id: epic-054-338-trick-house-save-parsing-v2
type: EPIC
title: Gen 3 Trick House Save Parsing (v2)
status: PENDING
owner_persona: story_owner
created_at: '2026-07-20'
updated_at: '2026-07-20'
depends_on:
  - research-054-336-investigate-trick-house-parsing-failure
jules_session_id: null
pr_number: null
parent: prd-088-054-trick-house-tracker
tags:
  - feature
  - gen3
  - mechanics
research_references:
  - .foundry/research/research-054-336-investigate-trick-house-parsing-failure.md
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Epic: Gen 3 Trick House Save Parsing (v2)

## Objective
Extract the Trick House puzzle state from Gen 3 save files using the `DataView` API, incorporating lessons learned from the previous failure.

## Scope
- Investigate Gen 3 save format to find the offsets and bitflags used for Trick House progression.
- Create a structural parsing implementation.
- Return a usable state object for UI components.
- Implement comprehensive E2E/integration testing.

## Acceptance Criteria
- [ ] Determine the exact memory offset for Trick House data.
- [ ] Implement a parser using `DataView`.
- [ ] Write tests ensuring accurate data extraction across progression states.
- [ ] Implement E2E/integration testing for the feature.

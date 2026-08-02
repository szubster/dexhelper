---
id: epic-054-338-trick-house-save-parsing
type: EPIC
title: Gen 3 Trick House Save Parsing
status: ACTIVE
owner_persona: story_owner
created_at: '2026-07-19'
updated_at: '2026-08-02'
depends_on: []
jules_session_id: '8901884196265794110'
pr_number: null
parent: prd-088-054-trick-house-tracker
tags:
  - feature
  - gen3
  - mechanics
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Epic: Gen 3 Trick House Save Parsing

## Objective
Extract the Trick House puzzle state from Gen 3 save files using the `DataView` API.

## Scope
- Investigate Gen 3 save format to find the offsets and bitflags used for Trick House progression.
- Create a structural parsing implementation.
- Return a usable state object for UI components.
- Include an E2E/integration story for end-to-end verification.

## Acceptance Criteria
- [x] Determine the exact memory offset for Trick House data.
- [x] Implement a parser using `DataView`.
- [x] Write tests ensuring accurate data extraction across progression states.
- [x] story-111-249-investigate-trick-house-offsets
- [x] story-111-276-trick-house-parser-impl
- [x] story-111-277-trick-house-parser-qa
- [x] story-338-339-trick-house-e2e-integration

---
id: task-414-424-bike-badge-ui-qa
type: TASK
title: QA Bike Requirement Badges
status: CANCELLED
owner_persona: qa
created_at: '2026-08-13'
updated_at: '2026-08-30'
depends_on:
  - task-414-423-map-ui-bike-integration-impl
jules_session_id: null
pr_number: null
parent: story-406-414-bike-requirement-ui-badges
tags:
  - qa
  - ui
research_references: []
rejection_count: 0
rejection_reason: >-
  Cancelled due to permanent failure of dependency:
  task-414-423-map-ui-bike-integration-impl
notes: ''
---

# QA Bike Requirement Badges

## Context
Verify the implementation of the `BikeBadge` and its integration into the `MapUI`.

## Requirements
- Review `BikeBadge.tsx` and `MapUI.tsx` to ensure adherence to ADR 008 and ADR 024 (tactical aesthetic, no rounded corners).
- Ensure unit tests adequately cover the conditional rendering logic in `MapUI`.
- Run frontend visual tests/checks.

## Acceptance Criteria
- [ ] Verify ADR 008/024 aesthetic compliance.
- [ ] Ensure unit tests pass and cover edge cases.

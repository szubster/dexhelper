---
id: task-414-503-bike-badge-ui-qa
type: TASK
title: QA Bike Requirement Badges UI Integration
status: PENDING
owner_persona: qa
created_at: '2026-08-31'
updated_at: '2026-08-31'
depends_on:
  - task-414-502-map-ui-bike-integration-impl
jules_session_id: '8724805382122507598'
pr_number: null
parent: story-406-414-bike-requirement-ui-badges
tags:
  - qa
  - ui
research_references: []
rejection_count: 0
rejection_reason: ''
notes: Replaces cancelled task-414-424-bike-badge-ui-qa
---

# QA Bike Requirement Badges UI Integration

## Context
Verify the implementation of the `BikeBadge` integration into the `MapUI`. This replaces the cancelled QA task `task-414-424-bike-badge-ui-qa`.

## Requirements
- Review `MapUI.tsx` to ensure adherence to ADR 008 and ADR 024 (tactical aesthetic, no rounded corners).
- Ensure unit tests adequately cover the conditional rendering logic in `MapUI`.
- Run frontend visual tests/checks.

## Acceptance Criteria
- [ ] Verify ADR 008/024 aesthetic compliance for MapUI integration.
- [ ] Ensure unit tests pass and adequately cover edge cases for rendering bike badges.

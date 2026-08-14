---
id: task-414-422-bike-badge-component-impl
type: TASK
title: Implement Bike Requirement UI Badge Component
status: READY
owner_persona: coder
created_at: '2026-08-13'
updated_at: '2026-08-14'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-406-414-bike-requirement-ui-badges
tags:
  - ui
  - map
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement Bike Requirement UI Badge Component

## Context
As part of the Route Pre-computation & Mapping Epic, we need UI badges indicating if an area requires a specific bike. We need a new component (`BikeBadge`) that wraps the existing `TacticalBadge`.

## Requirements
- Create `src/components/BikeBadge.tsx`.
- The component should accept a `type` prop (`'mach' | 'acro' | 'both'`).
- It should use the existing `<TacticalBadge>` component.
- The styling should enforce the tactical aesthetic mandated by ADR 024.
- Write a unit test `src/components/__tests__/BikeBadge.test.tsx` for the component.

## Acceptance Criteria
- [ ] Implement `BikeBadge` component.
- [ ] Implement unit tests for `BikeBadge`.

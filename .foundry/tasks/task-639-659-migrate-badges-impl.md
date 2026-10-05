---
id: task-639-659-migrate-badges-impl
type: TASK
title: Migrate Tactical Badges Implementation
status: ACTIVE
owner_persona: coder
created_at: '2026-10-03'
updated_at: '2026-10-05'
depends_on: []
jules_session_id: '14656954010456385141'
pr_number: null
parent: story-527-639-migrate-tactical-primitives
tags:
  - react
  - components
rejection_count: 1
rejection_reason: ''
notes: ''
locks: []
---

# Migrate Tactical Badges Implementation

## Objective
Migrate basic badge UI components (TacticalBadge, ShinyBadge, BikeBadge, PokerusBadge, FilterBadge, ClearFiltersBadge) and their tests from `src/components` to the `@dexhelper/ui` package.

## Acceptance Criteria
- [ ] Move basic badge components to `@dexhelper/ui`.
- [ ] Move associated test files and ensure they pass.
- [ ] Update imports across the application to consume these components from `@dexhelper/ui`.

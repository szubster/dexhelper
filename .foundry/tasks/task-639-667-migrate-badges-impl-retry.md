---
id: task-639-667-migrate-badges-impl-retry
type: TASK
title: Migrate Tactical Badges Implementation (Retry)
status: PENDING
owner_persona: coder
created_at: '2026-10-05'
updated_at: '2026-10-05'
depends_on:
  - research-639-665-investigate-migration-failures
jules_session_id: null
pr_number: null
parent: story-527-639-migrate-tactical-primitives
tags:
  - react
  - components
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Migrate Tactical Badges Implementation (Retry)

## Objective
Migrate basic badge UI components (TacticalBadge, ShinyBadge, BikeBadge, PokerusBadge, FilterBadge, ClearFiltersBadge) and their tests from `src/components` to the `@dexhelper/ui` package.

## Acceptance Criteria
- [ ] Move basic badge components to `@dexhelper/ui`.
- [ ] Move associated test files and ensure they pass.
- [ ] Update imports across the application to consume these components from `@dexhelper/ui`.

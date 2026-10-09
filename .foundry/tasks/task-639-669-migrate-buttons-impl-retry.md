---
id: task-639-669-migrate-buttons-impl-retry
type: TASK
title: Migrate Tactical Buttons Implementation (Retry)
status: PENDING
owner_persona: coder
created_at: '2026-10-06'
updated_at: '2026-10-06'
depends_on:
  - research-639-668-investigate-primitives-migration-failures
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

# Migrate Tactical Buttons Implementation (Retry)

## Objective
Migrate basic button UI components (TacticalButton, NavButton, TacticalIconButton) and their tests from `src/components` to the `@dexhelper/ui` package, implementing the fixes identified in the research phase.

## Acceptance Criteria
- [ ] Move `TacticalButton`, `NavButton`, and `TacticalIconButton` to `@dexhelper/ui`.
- [ ] Move associated test files and ensure they pass.
- [ ] Update imports across the application to consume these components from `@dexhelper/ui`.

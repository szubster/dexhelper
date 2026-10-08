---
id: task-639-674-migrate-buttons-impl-retry-v2
type: TASK
title: Migrate Tactical Buttons Implementation (Retry v2)
status: PENDING
owner_persona: coder
created_at: '2026-10-08'
updated_at: '2026-10-08'
depends_on:
  - research-639-673-investigate-primitives-migration-failures-v2
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

# Migrate Tactical Buttons Implementation (Retry v2)

## Objective
Migrate basic button UI components (TacticalButton, NavButton, TacticalIconButton) and their tests from `src/components` to the `@dexhelper/ui` package, implementing the fixes identified in the research phase.

## Acceptance Criteria
- [ ] Move `TacticalButton`, `NavButton`, and `TacticalIconButton` to `@dexhelper/ui`.
- [ ] Move associated test files and ensure they pass.
- [ ] Update imports across the application to consume these components from `@dexhelper/ui`.

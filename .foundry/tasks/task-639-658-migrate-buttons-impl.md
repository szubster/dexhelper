---
id: task-639-658-migrate-buttons-impl
type: TASK
title: Migrate Tactical Buttons Implementation
status: READY
owner_persona: coder
created_at: '2026-10-03'
updated_at: '2026-10-06'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-527-639-migrate-tactical-primitives
tags:
  - react
  - components
rejection_count: 2
rejection_reason: ''
notes: ''
locks: []
---

# Migrate Tactical Buttons Implementation

## Objective
Migrate basic button UI components (TacticalButton, NavButton, TacticalIconButton) and their tests from `src/components` to the `@dexhelper/ui` package.

## Acceptance Criteria
- [ ] Move `TacticalButton`, `NavButton`, and `TacticalIconButton` to `@dexhelper/ui`.
- [ ] Move associated test files and ensure they pass.
- [ ] Update imports across the application to consume these components from `@dexhelper/ui`.

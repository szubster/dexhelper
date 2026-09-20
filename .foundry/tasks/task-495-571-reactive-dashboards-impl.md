---
id: task-495-571-reactive-dashboards-impl
type: TASK
title: Update Dashboard Components for Reactivity
status: CANCELLED
owner_persona: coder
created_at: '2026-09-12'
updated_at: '2026-09-20'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-425-495-reactive-ui-components
tags:
  - ui
  - emulator
  - components
rejection_count: 3
rejection_reason: '[ACKNOWLEDGED] Max rejection count reached'
notes: ''
locks: []
priority: 50
---

# Update Dashboard Components for Reactivity

## Context
To complete the reactive migration, various dashboard components (e.g. Checklists, Savings, Breeding, Trades) need to consume the live memory context.

## Acceptance Criteria
- [ ] Refactor dashboard components in `src/components/dashboard/` to use `useParsedSaveData` from `EmulatorContext` instead of `useStore`.
- [ ] Ensure the components reactively re-render to reflect real-time game state changes.

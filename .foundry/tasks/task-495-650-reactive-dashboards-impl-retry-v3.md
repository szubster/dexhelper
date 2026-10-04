---
id: task-495-650-reactive-dashboards-impl-retry-v3
type: TASK
title: Update Dashboard Components for Reactivity (Retry V3)
status: CANCELLED
owner_persona: coder
created_at: '2026-10-02'
updated_at: '2026-10-02'
depends_on:
  - research-495-649-investigate-reactive-dashboards-failures-v3
jules_session_id: null
pr_number: null
parent: story-425-495-reactive-ui-components
tags:
  - ui
  - emulator
  - components
rejection_count: 0
rejection_reason: 'Aborted, handling through replacement node.'
notes: ''
locks: []
---

# Update Dashboard Components for Reactivity (Retry V3)

## Context
To complete the reactive migration, dashboard components need to consume the live memory context. This is the third attempt after identifying and resolving previous failures.

## Acceptance Criteria
- [ ] Read the findings in `research-495-649-investigate-reactive-dashboards-failures-v3` before beginning work.
- [ ] Refactor dashboard components in `src/components/dashboard/` to use `useParsedSaveData` from `EmulatorContext` instead of `useStore`.
- [ ] Ensure the components reactively re-render to reflect real-time game state changes.

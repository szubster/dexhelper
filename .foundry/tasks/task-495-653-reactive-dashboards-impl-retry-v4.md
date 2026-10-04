---
id: task-495-653-reactive-dashboards-impl-retry-v4
type: TASK
title: Update Dashboard Components for Reactivity (Retry V4)
status: PENDING
owner_persona: coder
created_at: '2026-10-02'
updated_at: '2026-10-02'
depends_on:
  - research-495-652-investigate-reactive-dashboards-failures-v4
jules_session_id: null
pr_number: null
parent: story-425-495-reactive-ui-components
tags:
  - ui
  - emulator
  - components
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Update Dashboard Components for Reactivity (Retry V4)

## Context
To complete the reactive migration, dashboard components need to consume the live memory context. This is the fourth attempt after identifying and resolving previous failures.

## Acceptance Criteria
- [ ] Read the findings in `research-495-652-investigate-reactive-dashboards-failures-v4` before beginning work.
- [ ] Refactor dashboard components in `src/components/dashboard/` to use `useParsedSaveData` from `EmulatorContext` instead of `useStore`.
- [ ] Ensure the components reactively re-render to reflect real-time game state changes.

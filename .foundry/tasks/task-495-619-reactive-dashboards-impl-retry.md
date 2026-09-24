---
id: task-495-619-reactive-dashboards-impl-retry
type: TASK
title: Update Dashboard Components for Reactivity (Retry)
status: PENDING
owner_persona: coder
created_at: '2026-09-24'
updated_at: '2026-09-24'
depends_on:
  - research-495-617-investigate-reactive-ui-failures
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

# Update Dashboard Components for Reactivity (Retry)

## Context
To complete the reactive migration, various dashboard components (e.g. Checklists, Savings, Breeding, Trades) need to consume the live memory context. This is a retry of a previous task that failed permanently.

## Acceptance Criteria
- [ ] Read the findings in `research-495-617-investigate-reactive-ui-failures` before beginning work.
- [ ] Refactor dashboard components in `src/components/dashboard/` to use `useParsedSaveData` from `EmulatorContext` instead of `useStore`.
- [ ] Ensure the components reactively re-render to reflect real-time game state changes.

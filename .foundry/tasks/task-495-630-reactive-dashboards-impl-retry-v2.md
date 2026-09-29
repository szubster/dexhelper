---
id: task-495-630-reactive-dashboards-impl-retry-v2
type: TASK
title: Update Dashboard Components for Reactivity (Retry V2)
status: FAILED
owner_persona: coder
created_at: '2026-09-28'
updated_at: '2026-09-29'
depends_on:
  - research-495-627-investigate-reactive-ui-failures-v2
jules_session_id: null
pr_number: null
parent: story-425-495-reactive-ui-components
tags:
  - ui
  - emulator
  - components
rejection_count: 0
rejection_reason: '[ACKNOWLEDGED] Session terminated with state: FAILED'
notes: ''
locks: []
---

# Update Dashboard Components for Reactivity (Retry V2)

## Context
To complete the reactive migration, various dashboard components (e.g. Checklists, Savings, Breeding, Trades) need to consume the live memory context. This is a retry of previous tasks that failed permanently.

## Acceptance Criteria
- [ ] Read the findings in `research-495-627-investigate-reactive-ui-failures-v2` before beginning work.
- [ ] Refactor dashboard components in `src/components/dashboard/` to use `useParsedSaveData` from `EmulatorContext` instead of `useStore`.
- [ ] Ensure the components reactively re-render to reflect real-time game state changes.

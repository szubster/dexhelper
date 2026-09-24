---
id: task-495-618-reactive-pokedex-grid-impl-retry
type: TASK
title: Update PokedexGrid Component for Reactivity (Retry)
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

# Update PokedexGrid Component for Reactivity (Retry)

## Context
As part of making the application a real-time live companion, we need to update the `PokedexGrid` and `PokedexCard` UI components to consume the live memory context established in `story-425-494-reactive-ui-context` instead of the static `useStore`. This is a retry of a previous task that failed permanently.

## Acceptance Criteria
- [ ] Read the findings in `research-495-617-investigate-reactive-ui-failures` before beginning work.
- [ ] Refactor `src/components/PokedexGrid.tsx` and `src/components/PokedexCard.tsx` to use `useParsedSaveData` from `EmulatorContext` instead of `useStore`.
- [ ] Ensure the components reactively re-render to reflect real-time game state changes.

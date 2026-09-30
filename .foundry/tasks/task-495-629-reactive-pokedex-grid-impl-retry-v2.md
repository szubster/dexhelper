---
id: task-495-629-reactive-pokedex-grid-impl-retry-v2
type: TASK
title: Update PokedexGrid Component for Reactivity (Retry V2)
status: ACTIVE
owner_persona: coder
created_at: '2026-09-28'
updated_at: '2026-09-29'
depends_on:
  - research-495-627-investigate-reactive-ui-failures-v2
jules_session_id: '4295760575034767037'
pr_number: null
parent: story-425-495-reactive-ui-components
tags:
  - ui
  - emulator
  - components
rejection_count: 1
rejection_reason: ''
notes: ''
locks: []
---

# Update PokedexGrid Component for Reactivity (Retry V2)

## Context
As part of making the application a real-time live companion, we need to update the `PokedexGrid` and `PokedexCard` UI components to consume the live memory context established in `story-425-494-reactive-ui-context` instead of the static `useStore`. This is a retry of previous tasks that failed permanently.

## Acceptance Criteria
- [x] Read the findings in `research-495-627-investigate-reactive-ui-failures-v2` before beginning work.
- [x] Refactor `src/components/PokedexGrid.tsx` and `src/components/PokedexCard.tsx` to use `useParsedSaveData` from `EmulatorContext` instead of `useStore`.
- [x] Ensure the components reactively re-render to reflect real-time game state changes.

---
id: task-495-568-reactive-pokedex-grid-impl
type: TASK
title: Update PokedexGrid Component for Reactivity
status: READY
owner_persona: coder
created_at: '2026-09-12'
updated_at: '2026-09-14'
depends_on: []
jules_session_id: null
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
priority: 50
---

# Update PokedexGrid Component for Reactivity

## Context
As part of making the application a real-time live companion, we need to update the `PokedexGrid` and `PokedexCard` UI components to consume the live memory context established in `story-425-494-reactive-ui-context` instead of the static `useStore`.

## Acceptance Criteria
- [ ] Refactor `src/components/PokedexGrid.tsx` and `src/components/PokedexCard.tsx` to use `useParsedSaveData` from `EmulatorContext` instead of `useStore`.
- [ ] Ensure the components reactively re-render to reflect real-time game state changes.

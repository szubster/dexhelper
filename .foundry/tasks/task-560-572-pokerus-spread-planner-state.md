---
id: task-560-572-pokerus-spread-planner-state
type: TASK
title: Pokerus Spread Planner State Hook
status: ACTIVE
owner_persona: coder
created_at: '2026-09-09'
updated_at: '2026-09-16'
depends_on: []
jules_session_id: '2755111191675667384'
pr_number: null
parent: story-413-560-pokerus-spread-planner-ui
tags:
  - ui
  - pokerus
  - planner
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Pokerus Spread Planner State Hook

## Description
Implement the React state logic for the Pokerus Spread Planner to manage drag-and-drop party ordering and calculate spread probabilities based on position.

## Acceptance Criteria
- [x] Create a custom React hook `usePokerusSpreadPlanner` in `src/hooks/usePokerusSpreadPlanner.ts`.
- [x] Implement state management to represent the 6 slots of a Pokemon party.
- [x] Provide functions to reorder Pokemon within the party (e.g., swapping slots).
- [x] Implement logic to calculate and expose which uninfected Pokemon are adjacent to an infected/contagious Pokemon, indicating they are at risk/target of spread.

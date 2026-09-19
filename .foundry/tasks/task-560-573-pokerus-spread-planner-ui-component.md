---
id: task-560-573-pokerus-spread-planner-ui-component
type: TASK
title: Pokerus Spread Planner UI Component
status: READY
owner_persona: coder
created_at: '2026-09-09'
updated_at: '2026-09-18'
depends_on:
  - task-560-572-pokerus-spread-planner-state
jules_session_id: null
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

# Pokerus Spread Planner UI Component

## Description
Implement the visual presentation component for the Pokerus Spread Planner using the `usePokerusSpreadPlanner` hook.

## Acceptance Criteria
- [ ] Create a `PokerusSpreadPlanner` component displaying a list of party Pokemon.
- [ ] Utilize the `usePokerusSpreadPlanner` hook to manage the party order and spread calculations.
- [ ] Render the `PokerusBadge` for each Pokemon to visualize current strain and contagious state.
- [ ] Provide visual indicators for optimal placement of infected Pokemon (adjacent slots).
- [ ] Display a countdown or warning indicating when the game clock approaches midnight.
- [ ] Ensure styling complies with the tactical aesthetic (ADR 008, e.g. sharp corners, dashed borders, monospace fonts).

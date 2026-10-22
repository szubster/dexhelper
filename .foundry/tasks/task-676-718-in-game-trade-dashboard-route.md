---
id: task-676-718-in-game-trade-dashboard-route
type: TASK
title: In-Game Trade Dashboard Route
status: READY
owner_persona: coder
created_at: '2026-10-22'
updated_at: '2026-10-22'
depends_on:
  - task-676-716-in-game-trade-logic-hook
  - task-676-717-in-game-trade-ui-component
jules_session_id: null
pr_number: null
parent: story-350-676-in-game-trade-dashboard-core-ui
tags:
  - react
  - routing
research_references: []
rejection_count: 0
rejection_reason: ""
notes: ""
locks: []
---
# Task: In-Game Trade Dashboard Route

## Objective
Create the TanStack route for the In-Game Trade Dashboard and wire up the logic hook to the UI components.

## Scope
- Create a new route file for the dashboard view.
- Integrate the `useInGameTrades` hook with the UI components.
- Ensure the route is accessible via navigation.

## Acceptance Criteria
- [ ] Create a TanStack route file (e.g., `src/routes/in-game-trades.tsx`).
- [ ] Wire the `useInGameTrades` hook into the UI components within the route.
- [ ] Add the route to the application's navigation structure.
- [ ] Ensure the dashboard successfully renders integrated data.

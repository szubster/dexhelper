---
id: task-676-717-in-game-trade-ui-component
type: TASK
title: In-Game Trade UI Components
status: READY
owner_persona: coder
created_at: '2026-10-22'
updated_at: '2026-10-22'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-350-676-in-game-trade-dashboard-core-ui
tags:
  - react
  - ui
research_references: []
rejection_count: 0
rejection_reason: ""
notes: ""
locks: []
---
# Task: In-Game Trade UI Components

## Objective
Create presentational React components for the In-Game Trade Dashboard adhering to the tactical hardware aesthetic.

## Scope
- Create a reusable list and card component for rendering NPC trade details.
- Display visual tags for the trade completion status ("Available", "Claimed", "Incomplete").
- Enforce tactical styling (sharp edges, dashed borders, monospaced fonts).

## Acceptance Criteria
- [x] Create presentational components (e.g., `NpcTradeList` and `NpcTradeCard`).
- [x] Components accept trade data and status as props and render correctly.
- [x] Visual tags reflect the correct completion status using tactical aesthetic rules (ADR 008).
- [x] Write component tests using `vitest-browser-react` to verify rendering.

---
id: task-559-680-trick-house-ui-component
type: TASK
title: Trick House UI Component Implementation
status: ACTIVE
owner_persona: coder
created_at: '2026-09-19'
updated_at: '2026-10-12'
depends_on:
  - story-540-558-trick-house-save-parsing
jules_session_id: '4229242062505369582'
pr_number: null
parent: story-540-559-trick-house-ui
tags:
  - dexhelper
  - feature
  - gen3
  - tracker
  - react
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Trick House UI Component Implementation

## Context
As part of the Gen 3 Trick House Tracker Dashboard, we need a visual interface to display the player's Trick House progress.

## Requirements
- Create a React component to display the Trick House progress.
- Provide a dashboard showing the current Trick House puzzle level and completion status.
- Map the required HMs/items for the current level (e.g., Cut for Level 1, Rock Smash for Level 3, Strength for Level 4).
- Display an indicator if the player needs to claim a prize from a previous completion.
- Adhere strictly to UI aesthetic constraints (tactical hardware, sharp edges `rounded-none`, monospaced fonts, dashed borders).
- Write Vitest component tests.

## Acceptance Criteria
- [ ] Implement the `TrickHouseDashboard` React component.
- [ ] Add tests for the `TrickHouseDashboard` component.

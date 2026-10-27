---
id: task-679-712-pokeblock-dashboard-ui-impl
type: TASK
title: Pokéblock Dashboard UI Component
status: FAILED
owner_persona: coder
created_at: '2026-10-18'
updated_at: '2026-10-27'
depends_on:
  - task-679-711-pokeblock-state-access-layer-impl
jules_session_id: null
pr_number: null
parent: story-401-679-pokeblock-viewer-route
tags:
  - gen3
  - react
  - frontend
research_references: []
rejection_count: 0
rejection_reason: 'Autonomous No-Ask Policy Violation: Session entered AWAITING_USER_FEEDBACK'
notes: ''
locks: []
---

# Pokéblock Dashboard UI Component

## Context
We need to create the main presentation component for the Pokéblock Viewer dashboard.

## Acceptance Criteria
- [ ] Implement the main dashboard container component (e.g., `PokeblockDashboard`).
- [ ] Use the `usePokeblocks` hook (from task-679-711) to retrieve the data.
- [ ] Apply the tactical hardware/snooping aesthetic (ADR 008) utilizing defined `@utility` primitives (e.g. `tactical-panel`).
- [ ] Write component tests using `vitest-browser-react` to ensure the container renders correctly with mock data.

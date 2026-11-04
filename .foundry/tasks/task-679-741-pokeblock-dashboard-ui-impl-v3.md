---
id: task-679-741-pokeblock-dashboard-ui-impl-v3
type: TASK
title: Pokéblock Dashboard UI Component (v3)
status: READY
owner_persona: coder
created_at: '2026-11-04'
updated_at: '2026-11-04'
depends_on:
  - research-679-740-investigate-pokeblock-dashboard-failure-retry
jules_session_id: null
pr_number: null
parent: story-401-679-pokeblock-viewer-route
tags:
  - gen3
  - react
  - frontend
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Pokéblock Dashboard UI Component (v3)

## Context
We need to create the main presentation component for the Pokéblock Viewer dashboard. This is a retry taking into account the findings from `research-679-740-investigate-pokeblock-dashboard-failure-retry`.

## Acceptance Criteria
- [ ] Implement the main dashboard container component (e.g., `PokeblockDashboard`).
- [ ] Use the `usePokeblocks` hook to retrieve the data.
- [ ] Apply the tactical hardware/snooping aesthetic (ADR 008) utilizing defined `@utility` primitives.
- [ ] Write component tests using `vitest-browser-react` to ensure the container renders correctly with mock data.
- [ ] Incorporate any architectural or implementation fixes identified in the prerequisite research task.

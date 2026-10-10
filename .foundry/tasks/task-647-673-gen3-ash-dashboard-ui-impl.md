---
id: task-647-673-gen3-ash-dashboard-ui-impl
type: TASK
title: 'Task: Implement Gen 3 Volcanic Ash Tracker Dashboard UI'
status: READY
owner_persona: coder
created_at: '2026-10-03T19:33:53.000Z'
updated_at: '2026-10-03T19:33:53.000Z'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-269-647-gen3-ash-dashboard-ui
tags:
  - ui
  - gen3
  - ash
  - react
research_references: []
rejection_count: 0
rejection_reason: ''
locks: []
---

# Task: Implement Gen 3 Volcanic Ash Tracker Dashboard UI

## Description
Implement the Gen 3 Volcanic Ash Tracker Dashboard UI within DexHelper. The dashboard should use the extracted save file data and display the player's Volcanic Ash count.

## Constraints
- MUST utilize Tailwind v4 `@utility` classes (e.g., `tactical-panel`), sharp edges (`rounded-none`), dashed borders (`border-dashed`), and monospaced telemetry fonts (`font-mono`) per ADR 024.
- Must use existing layout patterns and Zustand state management.
- No PokeAPI dependency.

## Acceptance Criteria
- [ ] Implement the UI components for the Ash Tracker.
- [ ] Write `vitest-browser-react` unit tests and interaction tests for the new component.

---
id: task-523-591-living-dex-ui-overlay-impl
type: TASK
title: Implement PC Box and Party State UI Overlay on Living Dex Grid
status: READY
owner_persona: coder
created_at: '2026-09-18T08:32:20Z'
updated_at: '2026-09-24'
depends_on:
  - task-523-590-living-dex-state-connection-impl
jules_session_id: null
pr_number: null
parent: story-134-523-living-dex-state-overlay
tags:
  - ui
  - living-dex
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Task: Implement PC Box and Party State UI Overlay on Living Dex Grid

## Context
With the state connection established, the numerical grid UI needs to visually indicate the ownership state of each Pokemon.

## Acceptance Criteria
- [ ] Consume the mapped state from the connection layer within the grid UI component.
- [ ] Visually overlay an indicator (e.g., an icon, color change, or badge) within the grid cells for Pokémon currently present in the PC box or Party.
- [ ] Ensure styling complies with ADR 008 constraints.

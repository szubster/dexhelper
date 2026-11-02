---
id: task-676-707-route-119-layout-data-impl
type: TASK
title: Route 119 Layout Data and Constraints Implementation
status: COMPLETED
owner_persona: coder
created_at: '2026-10-18T18:41:32.085Z'
updated_at: '2026-10-31'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-059-676-route-119-visual-map
tags:
  - gen3
  - frontend
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---
# Route 119 Layout Data and Constraints Implementation

## Objective
Extract and define the constant map layout data, specifically the grid dimensions and water tile coordinate constraints for Route 119 in Gen 3.

## Technical Contract
- Create a data file or module (e.g. `src/engine/gen3/mapData/route119.ts`) that strictly defines the grid layout.
- Define constants for the dimensions of the Route 119 water area.
- Create helper functions to determine if a specific `[x, y]` coordinate corresponds to a valid water tile within this layout.
- Ensure no inline magic numbers are used; all layout constants must be defined explicitly.

## Acceptance Criteria
- [x] Implement data constants and helpers for Route 119 grid and water tiles.
- [x] Add unit tests verifying the grid boundaries and tile validation logic.

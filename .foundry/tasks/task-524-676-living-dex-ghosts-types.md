---
id: task-524-676-living-dex-ghosts-types
type: TASK
title: Define Types for Living Dex Ghost Slots and Tactical Styling
status: COMPLETED
owner_persona: coder
created_at: '2026-10-09'
updated_at: '2026-10-24'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-134-524-living-dex-ghosts-and-styling
tags:
  - feature
  - ui
  - living-dex
  - types
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
locks: []
---

# Task: Define Types for Living Dex Ghost Slots and Tactical Styling

## Context
To support the visual highlighting of "ghosts" (missing slots) and the application of tactical styling in the Living Dex Grid, we need to extend our type definitions to represent these states.

## Acceptance Criteria
- [x] Define types/interfaces to represent a "ghost" slot in the Living Dex grid data structure.
- [x] Define any necessary type extensions for component props to accept tactical styling overrides (e.g. `isGhost: boolean`, specific tactical class utility props if needed).

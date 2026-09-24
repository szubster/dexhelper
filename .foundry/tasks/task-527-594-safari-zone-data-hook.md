---
id: task-527-594-safari-zone-data-hook
type: TASK
title: Safari Zone Data Selection Hook
status: COMPLETED
owner_persona: coder
created_at: '2026-09-19'
updated_at: '2026-09-24'
depends_on:
  - story-325-526-safari-zone-layout-and-route
jules_session_id: null
pr_number: null
parent: story-325-527-safari-zone-area-highlighting
tags:
  - frontend
  - hooks
  - safari-zone
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Safari Zone Data Selection Hook

## Overview
Implement the custom hook to handle game version selection, Safari Zone encounters, and target Pokemon filtering.

## Requirements
- Create `src/components/safari-zone/useSafariZoneSelection.ts`.
- Hook should manage active game version state (e.g. Red, Blue, Ruby).
- Hook should manage selected target Pokemon state.
- Hook should expose available areas based on selected Pokemon using `HoennSafariZone` (or Gen 1 equivalents).
- Use Vitest to unit test the hook in `src/components/safari-zone/__tests__/useSafariZoneSelection.test.ts`.

## Acceptance Criteria
- [x] Hook exposes game version and target selection state.
- [x] Hook filters available areas correctly based on selection.
- [x] Unit tests pass.

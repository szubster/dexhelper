---
id: task-527-597-safari-zone-area-highlighting-qa
type: TASK
title: Safari Zone Area Highlighting QA
status: PENDING
owner_persona: qa
created_at: '2026-09-19'
updated_at: '2026-09-19'
depends_on:
  - task-527-595-safari-zone-selection-ui
  - task-527-596-safari-zone-area-map-ui
jules_session_id: null
pr_number: null
parent: story-325-527-safari-zone-area-highlighting
tags:
  - frontend
  - qa
  - safari-zone
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Safari Zone Area Highlighting QA

## Overview
Verify the Safari Zone Area Highlighting and selection implementation across the hook and UI components.

## Requirements
- Review `useSafariZoneSelection.ts`, `SafariTargetSelection.tsx`, and `SafariAreaMap.tsx`.
- Ensure the components properly handle game version and pokemon selection, and correctly highlight the right areas based on `HoennSafariZone` (or Gen 1 equivalents).
- Confirm strict adherence to the ADR 008 tactical hardware aesthetic.
- Run unit tests to confirm passing status.

## Acceptance Criteria
- [ ] QA Review completed for component logic and hook.
- [ ] Tactical Hardware aesthetic verified.
- [ ] Tests passed successfully.

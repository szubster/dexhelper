---
id: task-566-582-shoal-item-tracker
type: TASK
title: Implement Shoal Cave Item Tracker Component
status: COMPLETED
owner_persona: coder
created_at: '2026-09-16T11:21:59Z'
updated_at: '2026-09-19'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-412-566-shoal-cave-ui-components
tags:
  - ui
  - gen3
  - shoal-cave
  - react
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Task: Implement Shoal Cave Item Tracker Component

## Description
Implement the `ShoalItemTracker` React component to display quantities of collected Shoal Shells and Shoal Salts, as well as a visual readiness indicator for crafting the Shell Bell (requires 4 of each).

## Constraints
- The UI MUST follow the tactical hardware aesthetic constraints (`rounded-none`, `border-dashed`, monospaced telemetry fonts) outlined in ADR 008.

## Acceptance Criteria
- [x] Create `ShoalItemTracker.tsx` component.
- [x] Render collected item counts for Shoal Shells and Shoal Salts.
- [x] Add visual readiness indicator for Shell Bell crafting.
- [x] Write Vitest browser tests for the component.

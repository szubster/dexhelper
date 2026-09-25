---
id: task-566-583-shoal-dashboard-layout
type: TASK
title: Implement Shoal Cave Dashboard Layout
status: READY
owner_persona: coder
created_at: '2026-09-16T11:22:20Z'
updated_at: '2026-09-25'
depends_on:
  - task-566-581-shoal-tide-display
  - task-566-582-shoal-item-tracker
jules_session_id: null
pr_number: null
parent: story-412-566-shoal-cave-ui-components
tags:
  - ui
  - gen3
  - shoal-cave
  - react
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
locks: []
---

# Task: Implement Shoal Cave Dashboard Layout

## Description
Implement the `ShoalCaveDashboard` layout component that integrates the `TideDisplay` and `ShoalItemTracker` components.

## Constraints
- The UI MUST follow the tactical hardware aesthetic constraints (`rounded-none`, `border-dashed`, monospaced telemetry fonts) outlined in ADR 008.

## Acceptance Criteria
- [ ] Create `ShoalCaveDashboard.tsx` component.
- [ ] Integrate `TideDisplay` and `ShoalItemTracker`.
- [ ] Write Vitest browser tests for the layout.

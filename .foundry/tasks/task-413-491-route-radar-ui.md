---
id: task-413-491-route-radar-ui
type: TASK
title: Update MapUI to Display Bike Requirements
status: COMPLETED
owner_persona: coder
created_at: '2026-08-25'
updated_at: '2026-08-30'
depends_on:
  - task-413-490-route-radar-logic
jules_session_id: null
pr_number: null
parent: story-406-413-bike-requirement-heatmap
tags:
  - gen3
  - map
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Update MapUI to Display Bike Requirements

## Context
The MapUI needs to visually indicate if a route requires a Mach Bike or Acro Bike.

## Proposal
Update MapUI.tsx to consume the new RouteRadarHeatmap object structure. Adhering to ADR 008 (tactical hardware aesthetic), add visual indicators (e.g., sharp-edged badges) for bike requirements.

## Acceptance Criteria
- [x] coder: Update MapUI.tsx to read density and bike flags correctly.
- [x] coder: Add tactical visual indicators for Mach Bike and Acro Bike requirements.
- [x] coder: Update relevant tests for MapUI if any exist.

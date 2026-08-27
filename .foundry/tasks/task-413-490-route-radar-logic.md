---
id: task-413-490-route-radar-logic
type: TASK
title: Implement Bike Requirement Logic in RouteRadarController
status: COMPLETED
owner_persona: coder
created_at: '2026-08-25'
updated_at: '2026-08-27'
depends_on:
  - task-413-489-bike-requirements-types
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

# Implement Bike Requirement Logic in RouteRadarController

## Context
The RouteRadarController must be updated to aggregate bike requirement data into the heatmap.

## Proposal
Modify calculateHeatmap in RouteRadarController.ts to construct the new RouteRadarHeatmap object structure and accurately populate the requiresMachBike and requiresAcroBike properties based on the injected data.

## Acceptance Criteria
- [x] coder: Implement the logic to populate bike requirements in calculateHeatmap.
- [x] coder: Add unit tests to verify the aggregated heatmap structure includes the correct bike flags.

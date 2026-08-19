---
id: task-413-422-update-route-radar-controller
type: TASK
title: Update RouteRadarHeatmap to Support Bike Requirements
status: READY
owner_persona: coder
created_at: '2026-08-14'
updated_at: '2026-08-19'
depends_on: []
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

# Update RouteRadarHeatmap to Support Bike Requirements

## Context
As part of the Route Pre-computation & Mapping Epic, we need to expose the parsed bike requirements through the Route Radar heatmap data structure.

## Proposal
Update `RouteRadarHeatmap` interface in `src/engine/radar/RouteRadarController.ts` to include bike requirement data (e.g. `machBike: boolean`, `acroBike: boolean` or similar structure based on the map parser). Update `calculateHeatmap` to parse and include this information from the suggestions/game map definition.

## Acceptance Criteria
- [ ] coder: Update `RouteRadarHeatmap` interface to include bike requirement flags.
- [ ] coder: Update `calculateHeatmap` in `RouteRadarController` to accurately populate these bike requirements.
- [ ] coder: Write tests for `RouteRadarController` ensuring the new bike data is correctly aggregated.

---
id: task-414-423-map-ui-bike-integration-impl
type: TASK
title: Integrate Bike Badges into Map UI
status: READY
owner_persona: coder
created_at: '2026-08-13'
updated_at: '2026-08-16'
depends_on:
  - task-414-422-bike-badge-component-impl
jules_session_id: null
pr_number: null
parent: story-406-414-bike-requirement-ui-badges
tags:
  - ui
  - map
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Integrate Bike Badges into Map UI

## Context
Integrate the newly created `BikeBadge` into the `MapUI` and `RouteRadarController` flow.

## Requirements
- Update `RouteRadarHeatmap` type in `src/engine/radar/RouteRadarController.ts` to include optional bike requirement info per area.
- Update `MapUI.tsx` to display the `BikeBadge` next to the Area ID if the density is > 0 and the area requires a bike.
- Update `MapUI.test.tsx` to verify the badge renders conditionally.

## Acceptance Criteria
- [ ] `RouteRadarHeatmap` includes bike requirements.
- [ ] `MapUI` renders `BikeBadge` based on heatmap data.
- [ ] Tests in `MapUI.test.tsx` pass.

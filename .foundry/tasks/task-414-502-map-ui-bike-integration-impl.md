---
id: task-414-502-map-ui-bike-integration-impl
type: TASK
title: Integrate Bike Badges into Map UI Implementation
status: READY
owner_persona: coder
created_at: '2026-08-31'
updated_at: '2026-08-31'
depends_on:
  - task-414-422-bike-badge-component-impl
  - research-414-504-bike-badges-integration-failure
jules_session_id: '8724805382122507598'
pr_number: null
parent: story-406-414-bike-requirement-ui-badges
tags:
  - ui
  - map
research_references:
  - research-413-493-investigate-bike-requirements-source
rejection_count: 0
rejection_reason: ''
notes: 'Replaces cancelled task-414-423-map-ui-bike-integration-impl'
---

# Integrate Bike Badges into Map UI Implementation

## Context
Integrate the newly created `BikeBadge` into the `MapUI` and `RouteRadarController` flow. This replaces the cancelled task `task-414-423-map-ui-bike-integration-impl`.

## Requirements
- Update `MapUI.tsx` to display the `BikeBadge` next to the Area ID if the density is > 0 and the area requires a bike (`heatmap[areaId].requiresMachBike` or `heatmap[areaId].requiresAcroBike`). Use the `<BikeBadge type="mach" />`, `<BikeBadge type="acro" />`, or `<BikeBadge type="both" />` appropriately.
- The `BikeBadge` should be rendered using the tactical aesthetic within the area block header (e.g. adjacent to the `AREA #` or density label).
- Ensure integration conforms to the tactical hardware aesthetic guidelines (ADR 024, no rounded corners except for explicit exceptions).
- Update `MapUI.test.tsx` to verify the badge renders conditionally when the heatmap indicates a bike requirement.

## Acceptance Criteria
- [ ] `MapUI.tsx` conditionally renders `BikeBadge` based on `RouteRadarHeatmap` bike requirement properties.
- [ ] UI integration respects the tactical hardware aesthetic.
- [ ] Unit tests in `MapUI.test.tsx` are updated and passing.

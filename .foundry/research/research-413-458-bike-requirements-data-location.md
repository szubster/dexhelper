---
id: research-413-458-bike-requirements-data-location
type: RESEARCH
title: Investigate Location of Parsed Bike Requirements Data
status: READY
owner_persona: researcher
created_at: '2026-08-21'
updated_at: '2026-08-21'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-406-413-bike-requirement-heatmap
tags:
  - gen3
  - map
  - architecture
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Investigate Location of Parsed Bike Requirements Data

## Context
In `task-414-423-map-ui-bike-integration-impl` (Integrate Bike Badges into Map UI) and `task-413-422-update-route-radar-controller` (Update RouteRadarHeatmap to Support Bike Requirements), the `RouteRadarController` needs to expose bike requirements in the `RouteRadarHeatmap`.

The bike map data integration task (`task-412-424-gen3-bike-data-struct-integration-impl`) was previously completed. We need to identify exactly where and how the `MapRequirements` (i.e. `requiresMachBike`, `requiresAcroBike`) are persisted in the final Map Graph or `UnifiedLocation` data structure so that the `RouteRadarController` can query them to build the heatmap properly.

## Acceptance Criteria
- [ ] Determine where the parsed bike requirements are stored.
- [ ] Document the data access pattern for `RouteRadarController` to retrieve this information.

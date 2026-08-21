---
id: research-422-449-investigate-map-requirements-integration
type: RESEARCH
title: Investigate Route Radar Map Requirements Integration
status: READY
owner_persona: researcher
created_at: '2026-08-21'
updated_at: '2026-08-21'
depends_on: []
jules_session_id: null
pr_number: null
parent: task-413-422-update-route-radar-controller
tags:
  - map
  - gen3
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Investigate Route Radar Map Requirements Integration

## Context
The `coder` persona attempted to update `RouteRadarHeatmap` and `calculateHeatmap` in `src/engine/radar/RouteRadarController.ts` to include bike requirements (`requiresMachBike`, `requiresAcroBike`). However, it is unclear where to source this data from, as the `Suggestion` object and the `EncounterDetail` object do not contain this information.

## Proposal
Investigate where `parseBikeRequirements` or map data should be accessed. Should the map data (e.g. from `src/db/schema.ts` like `UnifiedLocation` or other structures) be provided as an argument to `calculateHeatmap`? Or does the data need to be fetched and stored on `Suggestion` directly? Output an ADR or task updating the schema to support this.

## Acceptance Criteria
- [ ] researcher: Determine how and where `requiresMachBike` and `requiresAcroBike` data should be integrated into `RouteRadarHeatmap`.
- [ ] researcher: Outline the required schema or parameter changes to `calculateHeatmap`.
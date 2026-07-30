---
id: task-089-177-radar-heatmap-ui-integration-impl
type: TASK
title: Implement Route Radar UI Integration
status: ACTIVE
owner_persona: coder
created_at: '2026-06-13'
updated_at: '2026-07-30'
depends_on: []
jules_session_id: '8369315423071966354'
pr_number: null
parent: story-048-089-route-radar-density-aggregation
tags:
  - feature
  - ux
  - map
  - data
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---
# Task: Implement Route Radar UI Integration

## Context
Following the findings in `research-089-167-investigate-heatmap-failure`, the previous attempt failed due to missing architectural integration and data schema violations. We need to implement the core computational logic for the `RouteRadarController` and integrate it into the application.

## Scope
1. Implement the data transformation pipeline inside the `RouteRadarController`. It must aggregate missing encounter suggestions by their `areaId`.
2. As mandated by ADR 015, the shortened property name `aid` has been reverted. The data uses the full `areaId` property. Update `RouteRadarController` and the `EncounterDetail` interface in `src/engine/assistant/strategies/types.ts` to use `areaId` instead of `aid`. Also ensure tests use `areaId`.
3. As mandated by ADR 018, integrate the `RouteRadarController` into the application. Pass the calculated Heatmap State as props or via context to the Map UI component.

## Acceptance Criteria
- [ ] Update `EncounterDetail` interface and references to use `areaId` instead of `aid` (ADR 015).
- [ ] Implement `calculateHeatmap` in `RouteRadarController` using `areaId`.
- [ ] Ensure the heatmap data flows into the Map UI component (`Save State -> suggestionEngine -> RouteRadarController -> Heatmap State`).
- [ ] Write/update unit tests to validate the aggregation logic using mock `suggestionEngine` outputs.

**Important Persona Instructions:**
- **CODER**: If you abort or permanently fail this task, you MUST update the YAML frontmatter to `status: FAILED` or `status: CANCELLED` with a `rejection_reason`. If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting. Do not modify the frontmatter otherwise.

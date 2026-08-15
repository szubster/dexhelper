---
id: task-089-178-qa-radar-heatmap-ui-integration
type: TASK
title: QA Route Radar UI Integration
status: ACTIVE
owner_persona: qa
created_at: '2026-06-13'
updated_at: '2026-08-15'
depends_on:
  - task-089-177-radar-heatmap-ui-integration-impl
jules_session_id: '2060859421992588804'
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

# Task: QA Route Radar UI Integration

## Context
The Coder has implemented the Route Radar aggregation logic and UI integration as defined in Story `story-048-089-route-radar-density-aggregation` and addressed the failures identified in `research-089-167-investigate-heatmap-failure`.

## Blueprint / Technical Contract
Review the work performed in `task-089-177-radar-heatmap-ui-integration-impl`.
1. Validate that the data structure strictly uses `areaId` instead of `aid` (ADR 015).
2. Validate that the Heatmap State is properly passed to the Map UI component (ADR 018).
3. Validate that `calculateHeatmap` in `RouteRadarController` correctly transforms `Suggestion` arrays into a density `RouteRadarHeatmap`.

## Acceptance Criteria
- [x] Verify `areaId` is used consistently instead of `aid`.
- [x] Verify the heatmap data structure is correctly wired into the Map UI component.
- [x] Run test suite (`pnpm test`) and confirm passing.
- [x] Verify the aggregation correctly maps `areaId`s to missing species count without double-counting.

**Important Persona Instructions:**
- **QA**: If you abort or permanently fail this task, you MUST update the YAML frontmatter to `status: FAILED` or `status: CANCELLED` with a `rejection_reason`. If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting. Do not modify the frontmatter otherwise.

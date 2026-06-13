---
id: task-089-166-qa-radar-heatmap-density-logic
type: TASK
title: QA Route Radar Heatmap Density Logic
status: ACTIVE
owner_persona: qa
created_at: '2026-06-12'
updated_at: '2026-06-13'
depends_on:
  - task-089-165-radar-heatmap-density-logic-impl
jules_session_id: '7719061855577441613'
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

# QA Route Radar Heatmap Density Logic

## Context
As defined in Story `story-048-089-route-radar-density-aggregation`, the Coder will implement the aggregation logic inside the `RouteRadarController`.

## Blueprint / Technical Contract
Review the work performed in `task-089-165-radar-heatmap-density-logic-impl`.
Validate that `calculateHeatmap` in `src/engine/radar/RouteRadarController.ts` correctly transforms `Suggestion` arrays into a density `RouteRadarHeatmap`.
Ensure unit tests in `src/engine/radar/__tests__/RouteRadarController.test.ts` thoroughly test edge cases.

## Acceptance Criteria
- [ ] Verify the aggregation correctly maps `areaId`s to missing species count without double-counting a species in the same area.
- [ ] Ensure non-Catch suggestions are ignored.
- [ ] Validate unit tests cover edge cases.
- [ ] Run test suite (`pnpm exec vitest run src/engine/radar/__tests__/RouteRadarController.test.ts`) and confirm passing.

**Important Persona Instructions:**
- **QA**: If you abort or permanently fail this task, you MUST update the YAML frontmatter to `status: FAILED` or `status: CANCELLED` with a `rejection_reason`. If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting. Do not modify the frontmatter otherwise.

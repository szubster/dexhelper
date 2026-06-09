---
id: task-089-154-qa-radar-heatmap-logic
type: TASK
title: QA RouteRadarController Heatmap Logic
status: PENDING
owner_persona: qa
created_at: '2026-06-09'
updated_at: '2026-06-09'
depends_on:
  - task-089-153-implement-radar-heatmap-logic
jules_session_id: null
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

# Task: QA RouteRadarController Heatmap Logic

## Context
As defined in Story `story-048-089-route-radar-density-aggregation`, the Coder will implement the aggregation logic inside the `RouteRadarController`.

## Blueprint / Technical Contract
Review the work performed in `task-089-153-implement-radar-heatmap-logic`.
Validate that `calculateHeatmap` in `src/engine/radar/RouteRadarController.ts` correctly transforms `Suggestion` arrays into a density `RouteRadarHeatmap`.
Ensure unit tests in `src/engine/radar/__tests__/RouteRadarController.test.ts` thoroughly test edge cases.

## Acceptance Criteria
- [ ] Verify the aggregation correctly maps `areaId`s to missing species count without double-counting a species in the same area.
- [ ] Ensure non-Catch suggestions are ignored.
- [ ] Validate unit tests cover edge cases.
- [ ] Run test suite (`pnpm exec vitest run`) and confirm passing.

**Important Persona Instructions:**
- **QA**: If you abort or permanently fail this task, you MUST update the YAML frontmatter to `status: FAILED` or `status: CANCELLED` with a `rejection_reason`. If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting. Do not modify the frontmatter otherwise.

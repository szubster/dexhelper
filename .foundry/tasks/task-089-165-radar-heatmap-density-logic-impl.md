---
id: task-089-165-radar-heatmap-density-logic-impl
type: TASK
title: Implement Route Radar Heatmap Density Logic
status: PENDING
owner_persona: coder
created_at: '2026-06-12'
updated_at: '2026-06-12'
depends_on:
  - research-089-167-investigate-heatmap-failure
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

# Implement Route Radar Heatmap Density Logic

## Context
As defined in Story `story-048-089-route-radar-density-aggregation`, we need to implement the core computational logic for the `RouteRadarController`. The controller must transform the list of recommended encounters from the `suggestionEngine` into a structured density heatmap map that the UI can render.

## Scope
Implement the data transformation pipeline inside the `RouteRadarController`. It must aggregate missing encounter suggestions by their `areaId` (e.g., Route 1, Viridian Forest) and calculate a "density" score (number of unique missing species) for each area.

## Blueprint / Technical Contract
Implement the data transformation pipeline inside the `RouteRadarController` in `src/engine/radar/RouteRadarController.ts`.

- Implement `calculateHeatmap` function to accept `suggestions: Suggestion[]`.
- It must initialize an empty `RouteRadarHeatmap` object.
- Iterate through the `suggestions` array.
- Extract unique `areaId`s from each Catch suggestion.
- For each unique `areaId` associated with a particular suggestion, increment the density score for that `areaId` in the heatmap object.
- Ensure edge cases like 0 missing encounters or non-Catch suggestions are appropriately ignored.
- Write unit tests to validate the aggregation logic using mock `suggestionEngine` outputs in `src/engine/radar/__tests__/RouteRadarController.test.ts`.

## Acceptance Criteria
- [ ] Implement the aggregation method in `RouteRadarController`.
- [ ] Ensure the density score correctly maps `areaId`s to their corresponding missing species counts.
- [ ] Ensure it accurately processes edge cases (e.g., areas with 0 missing encounters should not be present in the output or have a score of 0).
- [ ] Write unit tests to validate the aggregation logic using mock `suggestionEngine` outputs.

**Important Persona Instructions:**
- **CODER**: If you abort or permanently fail this task, you MUST update the YAML frontmatter to `status: FAILED` or `status: CANCELLED` with a `rejection_reason`. If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting. Do not modify the frontmatter otherwise.

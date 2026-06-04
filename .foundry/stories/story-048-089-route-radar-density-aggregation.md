---
id: story-048-089-route-radar-density-aggregation
type: STORY
title: Implement Density Aggregation Logic
status: PENDING
owner_persona: tech_lead
created_at: '2026-05-31'
updated_at: '2026-05-31'
depends_on:
  - .foundry/stories/story-048-088-create-route-radar-controller.md
jules_session_id: null
pr_number: null
parent: epic-035-048-smart-radar-data-unification
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

# Story: Implement Density Aggregation Logic

## Context
Following the creation of the `RouteRadarController` in `story-048-088-create-route-radar-controller`, we need to implement its core computational logic. The controller must transform the list of recommended encounters from the `suggestionEngine` into a structured density heatmap map that the UI can render.

## Scope
Implement the data transformation pipeline inside the `RouteRadarController`. It must aggregate missing encounter suggestions by their `areaId` (e.g., Route 1, Viridian Forest) and calculate a "density" score (number of unique missing species) for each area.

## Acceptance Criteria
- [ ] Implement the aggregation method in `RouteRadarController`.
- [ ] Ensure the density score correctly maps `areaId`s to their corresponding missing species counts.
- [ ] Ensure it accurately processes edge cases (e.g., areas with 0 missing encounters should not be present in the output or have a score of 0).
- [ ] Write unit tests to validate the aggregation logic using mock `suggestionEngine` outputs.

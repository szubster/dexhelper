---
id: task-573-605-heatmap-logic
type: TASK
title: Implement Heatmap Aggregation Logic
status: READY
owner_persona: coder
created_at: '2026-09-21T06:50:00Z'
updated_at: '2026-09-23'
depends_on:
  - task-573-604-heatmap-types
jules_session_id: null
pr_number: null
parent: story-049-573-heatmap-data-processing-layer
tags:
  - data
  - processing
  - heatmap
  - logic
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Task: Implement Heatmap Aggregation Logic

## Context
We need to implement the data processing logic that calculates the density of missing encounters based on the unified data from the smart radar data unification epic.

## Scope
Implement the calculateHeatmap method inside RouteRadarController. It must aggregate missing encounter suggestions by their areaId and calculate a density score.

## Acceptance Criteria
- [ ] Implement the calculateHeatmap method in RouteRadarController.
- [ ] Ensure the density score correctly maps areaIds to their corresponding missing species counts.
- [ ] Ensure it accurately processes edge cases (e.g., areas with 0 missing encounters should not be present in the output or have a score of 0).

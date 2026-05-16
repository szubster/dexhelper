---
id: task-045-085-implement-cross-region-distance
type: TASK
title: Implement Gen 2 Cross-Region Distance Algorithm
status: COMPLETED
owner_persona: coder
created_at: '2026-05-14'
updated_at: '2026-05-15'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-028-045-cross-region-distance
tags:
  - gen2
  - map-graph
  - routing
research_references: []
rejection_count: 1
rejection_reason: 'Resolved: Validated by human/agent'
notes: ''
---

# Implement Gen 2 Cross-Region Distance Algorithm

## Objective
Implement `getDistanceToMap` algorithms adapted for Gen 2 transition points.

## Requirements
- Implement pathfinding/distance algorithms (like `getDistanceToMap`) for the Gen 2 map graph.
- Handle cross-region distances via transitions (e.g., Magnet Train, S.S. Aqua, Route 27).
- Ensure the logic accurately computes pathing between Johto and Kanto.

## Acceptance Criteria
- [x] `getDistanceToMap` handles calculating distances across the Johto/Kanto region boundary.
- [x] Transition points (Magnet Train, S.S. Aqua, Route 27) are accounted for in the algorithm.

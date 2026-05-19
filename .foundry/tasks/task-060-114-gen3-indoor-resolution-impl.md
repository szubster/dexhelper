---
id: task-060-114-gen3-indoor-resolution-impl
type: TASK
title: Gen3 Indoor Resolution Impl
status: COMPLETED
owner_persona: coder
created_at: '2026-05-18'
updated_at: '2026-05-19'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-032-060-gen3-indoor-resolution
tags:
  - gen3
  - map-graph
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Gen3 Indoor Resolution Impl

## Objective
Implement `resolveOutdoorMapId` logic mapped to Gen 3 map ID structures.

## Requirements
- Map indoor locations (houses, caves) to their outdoor parent hubs.
- Recursively traverse the `prnt` property on the location objects, just as in previous generations.

## Acceptance Criteria
- [x] `resolveOutdoorMapId` implemented for Hoenn and Kanto.

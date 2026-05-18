---
id: story-032-060-gen3-indoor-resolution
type: STORY
title: Gen3 Indoor Resolution
status: READY
owner_persona: story_owner
created_at: '2026-05-18'
updated_at: '2026-05-18'
depends_on:
  - .foundry/stories/story-032-059-gen3-map-graph-structure.md
jules_session_id: null
pr_number: null
parent: epic-053-032-gen3-map-graph-routing
tags:
  - gen3
  - map-graph
research_references: []
rejection_count: 0
rejection_reason: ''
notes: Depends on map graph structure.
---

# Story: Gen3 Indoor Resolution

## Objective
Implement `resolveOutdoorMapId` logic mapped to Gen 3 map ID structures.

## Requirements
- Map indoor locations (houses, caves) to their outdoor parent hubs.
- Recursively traverse the `prnt` property on the location objects, just as in previous generations.

## Acceptance Criteria
- [ ] `resolveOutdoorMapId` implemented for Hoenn and Kanto.
- [ ] Accurate tests added for both regions evaluating indoor locations.

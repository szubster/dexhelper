---
id: story-406-414-bike-requirement-ui-badges
type: STORY
title: Implement UI Badges for Bike Requirements
status: PENDING
owner_persona: tech_lead
created_at: '2026-08-10'
updated_at: '2026-08-31'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-339-406-gen3-bike-requirement-route-mapping
tags:
  - gen3
  - map
  - ui
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement UI Badges for Bike Requirements

## Context
As part of the Route Pre-computation & Mapping Epic, players should visually see which specific paths, items, or hidden areas on a route require a specific bike.

## Proposal
Implement UI badges (e.g., `[Requires Mach Bike]` or `[Requires Acro Bike]`) on the interactive map and Smart Route Radar. These badges should be displayed when a player views a route where significant portions are gated by these mechanics, utilizing the newly exposed heatmap data. Ensure adherence to the tactical hardware aesthetic guidelines.

## Acceptance Criteria
- [x] tech_lead: Break down this Story into Tasks.

- [ ] task-414-422-bike-badge-component-impl
- [x] task-414-423-map-ui-bike-integration-impl
- [x] task-414-424-bike-badge-ui-qa
- [ ] task-414-502-map-ui-bike-integration-impl
- [ ] task-414-503-bike-badge-ui-qa
- [ ] research-414-504-bike-badges-integration-failure

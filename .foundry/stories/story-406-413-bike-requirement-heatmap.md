---
id: story-406-413-bike-requirement-heatmap
type: STORY
title: Expose Bike Requirements Through Heatmap Data Structure
status: COMPLETED
owner_persona: tech_lead
created_at: '2026-08-10'
updated_at: '2026-09-07'
depends_on: []
jules_session_id: '3948674596086442666'
pr_number: null
parent: epic-339-406-gen3-bike-requirement-route-mapping
tags:
  - gen3
  - map
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
locks: []
---

# Expose Bike Requirements Through Heatmap Data Structure

## Context
As part of the Route Pre-computation & Mapping Epic, we need to expose the parsed bike requirements through the Route Radar heatmap data structure.

## Proposal
Update `RouteRadarController` or related mapping components to consume the newly parsed map data that indicates bike requirements, and structure it so that the frontend can easily read which areas (or significant portions) require which bikes.

## Acceptance Criteria
- [x] tech_lead: Break down this Story into Tasks.
- [x] task-413-422-update-route-radar-controller
- [x] task-413-423-route-radar-controller-qa
- [x] task-413-489-bike-requirements-types
- [x] task-413-490-route-radar-logic
- [x] task-413-491-route-radar-ui
- [x] task-413-492-route-radar-qa
- [x] research-413-493-investigate-bike-requirements-source

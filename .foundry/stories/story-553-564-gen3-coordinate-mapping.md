---
id: story-553-564-gen3-coordinate-mapping
type: STORY
title: Gen 3 Map Coordinate Mapping System
status: READY
owner_persona: tech_lead
created_at: '2026-09-12'
updated_at: '2026-09-12'
depends_on: ["story-553-563-gen3-map-data-extraction"]
jules_session_id: null
pr_number: null
parent: epic-424-553-gen3-map-data-engine
tags:
  - dexhelper
  - gen3
  - map
  - data
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Gen 3 Map Coordinate Mapping System

## Objective
Develop a coordinate mapping system bridging in-game map identifiers to X/Y pixel coordinates on the map base layer.

## Scope
- Create a mapping structure (e.g., JSON mapping) resolving in-game `mapBank`, `mapId`, and route IDs to X/Y pixel coordinates.
- Ensure the system maps player location, roamers, berry patches, and swarm/Feebas locations from the extracted binary data correctly onto the coordinate plane.

## Acceptance Criteria
- [ ] Tech Lead: Break down into TASK nodes (e.g., JSON mapping definition, coordinate lookup logic, unit tests, QA).

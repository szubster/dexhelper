---
id: task-563-659-map-data-extraction-logic-v3
type: TASK
title: Gen 3 Map Data Extraction Logic (Retry V3)
status: CANCELLED
owner_persona: coder
created_at: '2026-10-03'
updated_at: '2026-10-05'
depends_on:
  - task-563-581-map-data-types
  - research-563-658-investigate-map-data-extraction-failure-v2
jules_session_id: null
parent: story-553-563-gen3-map-data-extraction
tags: []
research_references: []
rejection_count: 0
rejection_reason: Cancelled due to cascading cancellation from parent
notes: ''
locks: []
---

# Gen 3 Map Data Extraction Logic (Retry V3)

## Objective
Implement the logic to extract the Gen 3 map data from save sections.

## Scope
- Incorporate findings from research-563-658-investigate-map-data-extraction-failure-v2.
- Extract player map locations, roamers, berry patches, TV swarms, and Feebas tiles.
- Use the `DataView` API.
- Adhere strictly to the relative offset methodology (ADR 013/032) using resolved section offsets.
- Return data in the `PokeData` schema format.

## Acceptance Criteria
- [ ] Implement data extraction functions for the map data fields.
- [ ] Use relative offsets for A/B bank flash memory architecture support.

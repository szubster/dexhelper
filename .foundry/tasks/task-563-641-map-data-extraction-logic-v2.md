---
id: task-563-641-map-data-extraction-logic-v2
type: TASK
title: Gen 3 Map Data Extraction Logic (Retry V2)
status: PENDING
owner_persona: coder
created_at: '2023-10-27T00:00:00Z'
updated_at: '2023-10-27T00:00:00Z'
depends_on:
  - task-563-581-map-data-types
  - research-563-640-investigate-map-data-extraction-failure
jules_session_id: null
parent: story-553-563-gen3-map-data-extraction
rejection_count: 0
rejection_reason: ''
locks: []
tags: []
research_references: []
notes: ''
---

# Gen 3 Map Data Extraction Logic (Retry V2)

## Objective
Implement the logic to extract the Gen 3 map data from save sections.

## Scope
- Incorporate findings from research-563-640-investigate-map-data-extraction-failure.
- Extract player map locations, roamers, berry patches, TV swarms, and Feebas tiles.
- Use the `DataView` API.
- Adhere strictly to the relative offset methodology (ADR 013/032) using resolved section offsets.
- Return data in the `PokeData` schema format.

## Acceptance Criteria
- [ ] Implement data extraction functions for the map data fields.
- [ ] Use relative offsets for A/B bank flash memory architecture support.

---
id: task-563-582-map-data-extraction-logic
type: TASK
title: Gen 3 Map Data Extraction Logic
status: FAILED
owner_persona: coder
created_at: '2026-09-16T11:02:53Z'
updated_at: '2026-09-23'
depends_on:
  - task-563-581-map-data-types
jules_session_id: null
parent: story-553-563-gen3-map-data-extraction
rejection_count: 2
rejection_reason: '[ACKNOWLEDGED] Session terminated with state: FAILED'
locks: []
---

# Gen 3 Map Data Extraction Logic

## Objective
Implement the logic to extract the Gen 3 map data from save sections.

## Scope
- Extract player map locations, roamers, berry patches, TV swarms, and Feebas tiles.
- Use the `DataView` API.
- Adhere strictly to the relative offset methodology (ADR 013/032) using resolved section offsets.
- Return data in the `PokeData` schema format defined in the previous task.

## Acceptance Criteria
- [ ] Implement data extraction functions for the map data fields.
- [ ] Use relative offsets for A/B bank flash memory architecture support.

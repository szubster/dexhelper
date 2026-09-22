---
id: story-553-563-gen3-map-data-extraction
type: STORY
title: Gen 3 Map Data Extraction (Offsets & Binary Parsing)
status: PENDING
owner_persona: tech_lead
created_at: '2026-09-12'
updated_at: '2026-09-22'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-424-553-gen3-map-data-engine
tags:
  - dexhelper
  - gen3
  - map
  - data
research_references: []
rejection_count: 2
rejection_reason: ''
notes: ''
locks: []
---

# Gen 3 Map Data Extraction (Offsets & Binary Parsing)

## Objective
Extract the binary data representing the player location, roamer positions, berry plots, TV swarms, and Feebas tiles from the Gen 3 save sections.

## Scope
- Extract data fields corresponding to player map locations, roamers, berry patches, TV swarms, and Feebas tiles using the `DataView` API.
- Adhere strictly to the relative offset methodology (ADR 013/032) supporting A/B bank flash memory architecture (passing resolved section offsets like `section1Offset`).
- Return extracted data in an application-friendly `PokeData` schema format, adhering to the PokeData Property Naming Schema.

## Acceptance Criteria
- [x] Tech Lead: Break down into TASK nodes (e.g., logic implementation, unit tests, QA).
- [ ] task-563-581-map-data-types
- [ ] task-563-582-map-data-extraction-logic
- [ ] task-563-583-map-data-tests
- [ ] task-563-584-map-data-qa

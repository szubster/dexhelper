---
id: epic-424-553-gen3-map-data-engine
type: EPIC
title: Gen 3 Map Data Extraction & Coordinate Mapping
status: ACTIVE
owner_persona: story_owner
created_at: '2026-09-04'
updated_at: '2026-09-12'
depends_on: []
jules_session_id: '10070597723607423776'
pr_number: null
parent: prd-424-001-gen3-interactive-map-dashboard
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

# Gen 3 Map Data Extraction & Coordinate Mapping

## Objective
Implement the data extraction logic and coordinate mapping system required to translate Gen 3 save file data into geographical points on the Hoenn map.

## Scope
- Extract player location, roamer positions, berry plots, TV swarms, and Feebas tiles from Gen 3 save sections using relative offsets (ADR 013/032 compliant).
- Develop a coordinate mapping system (e.g., JSON mapping) bridging in-game `mapBank`/`mapId`/route IDs to X/Y pixel coordinates on the map base layer.
- Ensure efficient and error-free extraction utilizing the `DataView` API and handling boundary constraints.

## Acceptance Criteria
- [x] Story Owner: Break down into STORY nodes for data extraction and coordinate mapping.
- [x] Story Owner: Create a final STORY dedicated exclusively to Integration and E2E Verification (tagged with `e2e` or `integration`).
- [ ] story-553-563-gen3-map-data-extraction
- [ ] story-553-564-gen3-coordinate-mapping
- [ ] story-553-565-gen3-map-data-integration-e2e

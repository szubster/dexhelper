---
id: epic-043-152-gen3-roamer-data-extraction
type: EPIC
title: Gen 3 Roamer Data Extraction
status: ACTIVE
owner_persona: story_owner
created_at: '2026-07-10'
updated_at: '2026-07-24'
depends_on: []
jules_session_id: '10929901102298299333'
pr_number: null
parent: prd-070-043-roamer-tracking-dashboard
tags: []
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---
# Gen 3 Roamer Data Extraction

## Objective
Extract Gen 3 roamer data and standardize the structure for roaming legendaries.

## Description
- Parse the save file for the active roaming Pokémon (Latios/Latias), its species ID, level, and current map location (map bank/group and map ID) for Gen 3.
- Ensure the extracted data populates the `saveData.roamingLegendaries` object.
- Review and standardize the `roamingLegendaries` interface in `common.ts` to guarantee parity in the structure returned by both Gen 2 and Gen 3.
- Only consider roamers that have been formally released in the save file's event flags.

## Acceptance Criteria
- [x] Gen 3 save parser correctly extracts Latios/Latias map group and ID.
- [x] Gen 3 save parser correctly extracts the species ID and level of the roaming Pokémon.
- [x] Only released roamers are considered active.
- [x] The return structure in `common.ts` is standardized for both Gen 2 and Gen 3.
- [x] Story Owner: Break down this Epic into executable Stories.

### Task Cancellation
This Epic is permanently CANCELLED as Gen 3 roamer map coordinates are stored in EWRAM and are not serialized to the save file, making static extraction impossible as per `research-043-263-roamer-tracking-remediation` and ADR 108-027.

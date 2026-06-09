---
id: epic-043-067-roamer-data-extraction
type: EPIC
title: Roamer Data Extraction
status: PENDING
owner_persona: story_owner
created_at: '2026-06-09'
updated_at: '2026-06-09'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-070-043-roamer-tracking-dashboard
tags: []
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Roamer Data Extraction

## Objective
Implement roamer data extraction for Gen 3 (Ruby, Sapphire, Emerald) in the save parser engine. We need to parse the save file for the active roaming Pokémon, its species ID, level, and current map location (map bank/group and map ID). We also need to standardize the return structure for both Gen 2 and Gen 3.

## Description
- Modify `src/engine/saveParser/parsers/gen3.ts` to identify and extract offset data for Latios/Latias map coordinates and attributes.
- Ensure the extracted data populates the `saveData.roamingLegendaries` object.
- Review and standardize the `roamingLegendaries` interface in `common.ts` to guarantee parity in the structure returned by both Gen 2 and Gen 3.
- Only consider roamers that have been formally released in the save file's event flags.

## Acceptance Criteria
- [ ] Gen 3 save parser correctly extracts Latios/Latias map group and ID.
- [ ] Gen 3 save parser correctly extracts the species ID and level of the roaming Pokémon.
- [ ] Only released roamers are considered active.
- [ ] The return structure in `common.ts` is standardized for both Gen 2 and Gen 3.
- [ ] Story Owner: Break down this Epic into executable Stories.

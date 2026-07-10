---
id: epic-043-152-gen3-roamer-data-extraction
type: EPIC
title: Gen 3 Roamer Data Extraction
status: PENDING
owner_persona: story_owner
created_at: '2026-07-10'
updated_at: '2026-07-10'
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

# Gen 3 Roamer Data Extraction

## Objective
Extract Gen 3 roamer data and standardize the structure for roaming legendaries.

## Description
- Implement roamer data extraction for Gen 3 (Ruby, Sapphire, Emerald) in `src/engine/saveParser/parsers/gen3.ts`.
- Parse the save file for the active roaming Pokémon, its species ID, level, and current map location (map bank/group and map ID).
- Standardize the `roamingLegendaries` interface in `common.ts` to ensure parity with Gen 2.

## Acceptance Criteria
- [ ] Gen 3 save parser correctly extracts Latios/Latias map group and ID.
- [ ] Gen 3 save parser correctly extracts the species ID and level of the roaming Pokémon.
- [ ] The return structure in `common.ts` is standardized for Gen 3.
- [ ] Story Owner: Break down this Epic into executable Stories.

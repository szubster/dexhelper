---
id: epic-043-139-gen2-roamer-data-extraction
type: EPIC
title: Gen 2 Roamer Data Extraction
status: FAILED
owner_persona: story_owner
created_at: '2026-07-06'
updated_at: '2026-08-20'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-070-043-roamer-tracking-dashboard
tags: []
research_references: []
rejection_count: 0
rejection_reason: 'Merged with unfulfilled acceptance criteria: Missing E2E/integration story'
notes: ''
---
# Gen 2 Roamer Data Extraction

## Objective
Extract Gen 2 roamer data and standardize the structure for roaming legendaries.

## Description
- Ensure Gen 2 roamer data is successfully extracted to `saveData.roamingLegendaries`.
- Only consider roamers that have been formally released in the save file's event flags or have active `MapGroup` not equal to 0xFF.

## Acceptance Criteria
- [x] Gen 2 save parser correctly extracts the species ID, level, and map coordinates of roaming Pokémon.
- [x] Only released/active roamers are considered active.
- [x] The return structure in `common.ts` is standardized for Gen 2.
- [x] Story Owner: Break down this Epic into executable Stories.
- [x] story-139-297-gen2-roamer-core-extraction
- [x] story-139-298-gen2-roamer-status-and-standardization

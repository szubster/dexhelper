---
id: story-139-298-gen2-roamer-status-and-standardization
type: STORY
title: Determine Roamer Status and Standardize Output
status: COMPLETED
owner_persona: tech_lead
created_at: '2026-07-11'
updated_at: '2026-08-20'
depends_on:
  - story-139-297-gen2-roamer-core-extraction
jules_session_id: null
pr_number: null
parent: epic-043-139-gen2-roamer-data-extraction
tags: []
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Determine Roamer Status and Standardize Output

## Objective
Apply logic to determine if each Gen 2 roamer is currently active, and map the data into the standardized `roamingLegendaries` return structure.

## Description
- Check each roamer's `MapGroup` value: if it is `0xFF`, the roamer is inactive (not roaming).
- Check each roamer's `HP`: if it is `0`, the roamer is defeated/caught and no longer active.
- Format the active roamers and their parsed `Species`, `Level`, and map coordinates to match the standardized structure in `common.ts`.

## Acceptance Criteria
- [x] Determine roamer activity based on `MapGroup != 0xFF` and `HP > 0`.
- [x] Standardize the parsed data and add it to `saveData.roamingLegendaries`.
- [x] Break down this Story into Tasks.
- [x] task-298-440-gen2-roamer-status-hp-check-impl

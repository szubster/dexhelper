---
id: task-042-069-extract-roamers
type: TASK
title: Implement Roamer location extraction for Gen 2
status: COMPLETED
owner_persona: coder
created_at: '2026-05-07'
updated_at: '2026-05-11'
depends_on:
  - task-042-068-extract-hall-of-fame
jules_session_id: null
pr_number: null
parent: story-026-042-hall-of-fame-roamers
tags:
  - gen2
  - save-parser
  - roamers
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement Roamer location extraction for Gen 2

## Objective
Update the Gen 2 save parser (`src/engine/saveParser/parsers/gen2.ts`) to extract the map locations of roaming legendaries (Raikou, Entei, Suicune).

## Details
- Research the memory offsets for the locations of Raikou, Entei, and Suicune in Gen 2 save files.
- Implement extraction logic to retrieve these locations.
- Update relevant types and interfaces.
- Add unit tests to verify the location extraction.

## Acceptance Criteria
- [x] `gen2.ts` correctly extracts map locations for Raikou, Entei, and Suicune.
- [x] Tests verify the extraction logic.

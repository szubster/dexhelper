---
id: task-042-068-extract-hall-of-fame
type: TASK
title: Implement Hall of Fame extraction for Gen 2
status: COMPLETED
owner_persona: coder
created_at: '2026-05-07'
updated_at: '2026-05-11'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-026-042-hall-of-fame-roamers
tags:
  - gen2
  - save-parser
  - hall-of-fame
research_references: []
rejection_count: 3
rejection_reason: ''
notes: ''
---

# Implement Hall of Fame extraction for Gen 2

## Objective
Update the Gen 2 save parser (`src/engine/saveParser/parsers/gen2.ts`) to extract the Hall of Fame counts from the save file. Currently, the count is hardcoded or missing.

## Details
- Research the exact memory offset for the Hall of Fame count in Gen 2 save files (Gold/Silver and Crystal).
- Implement the extraction logic in the `gen2.ts` parser.
- Update relevant interfaces and types to expose this data.
- Write unit tests using the existing `gold.sav` and `crystal.sav` fixtures.

## Acceptance Criteria
- [x] `gen2.ts` correctly extracts the Hall of Fame count.
- [x] Tests verify the extraction logic.

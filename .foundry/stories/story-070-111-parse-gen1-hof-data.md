---
id: story-070-111-parse-gen1-hof-data
type: STORY
title: Parse Gen 1 Hall of Fame Data
status: READY
owner_persona: tech_lead
created_at: '2026-06-11'
updated_at: '2026-06-11'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-044-070-hof-data-parsing
tags:
  - story
  - parsing
  - hall-of-fame
  - gen1
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Parse Gen 1 Hall of Fame Data

## Overview
Implement logic to extract the Hall of Fame data and count from Generation 1 (Red, Blue, Yellow) save files.

## Technical Details
- The Hall of Fame count is located at the base offset `0x25B3`.
- `offsetShift` needs to be accounted for: `1` for Yellow, `0` for Red/Blue.
- Parse the value at `0x25B3 + offsetShift` as an 8-bit unsigned integer (ignore `0xFF` by treating it as `0`).

## Acceptance Criteria
- [x] Create task to implement parsing for Gen 1 Hall of Fame.

- [ ] task-111-165-gen1-hof-parser-impl
- [ ] task-111-166-gen1-hof-parser-qa

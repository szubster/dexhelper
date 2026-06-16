---
id: story-070-112-parse-gen2-hof-data
type: STORY
title: Parse Gen 2 Hall of Fame Data
status: READY
owner_persona: tech_lead
created_at: '2026-06-11'
updated_at: '2026-06-16'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-044-070-hof-data-parsing
tags:
  - story
  - parsing
  - hall-of-fame
  - gen2
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Parse Gen 2 Hall of Fame Data

## Overview
Implement logic to extract the Hall of Fame data and count from Generation 2 (Gold, Silver, Crystal) save files.

## Technical Details
- The count uses a relative offset of `0xA8` (168 bytes) after the `johtoBadgesOffset`.
- Locate `johtoBadgesOffset` (`0x23E5` for Crystal, `0x23E4` for Gold/Silver).
- Parse the value at `johtoBadgesOffset + 0xA8` as an 8-bit unsigned integer.

## Acceptance Criteria
- [x] Create task to implement parsing for Gen 2 Hall of Fame.

- [x] task-112-165-implement-gen2-hof-parsing
- [x] task-112-166-qa-gen2-hof-parsing

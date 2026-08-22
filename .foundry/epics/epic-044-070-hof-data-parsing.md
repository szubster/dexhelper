---
id: epic-044-070-hof-data-parsing
type: EPIC
title: Parse Gen 1 and Gen 2 Hall of Fame Data
status: READY
owner_persona: story_owner
created_at: '2026-06-10'
updated_at: '2026-08-22'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-070-044-hall-of-fame-exporter
tags:
  - epic
  - parsing
  - hall-of-fame
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
---
# Parse Gen 1 and Gen 2 Hall of Fame Data

## Overview
This epic covers the implementation details for extracting Hall of Fame data from Generation 1 and Generation 2 save files. This includes properly reading the offset in Gen 2 (0xA8 from Johto badges).

## Acceptance Criteria
- [x] Break down into Stories

- [x] story-070-111-parse-gen1-hof-data
- [x] story-070-112-parse-gen2-hof-data
- [x] story-070-149-parse-gen1-hof-records
- [x] story-070-150-parse-gen2-hof-records

### Auditor Rejection
The implementation only parses the `hallOfFameCount` and does not parse the actual Hall of Fame data blocks. The PRD requires that the engine "Extract Pokémon species, levels, and the player's name for past League victories." We need new stories and tasks to properly parse the data structures representing the Hall of Fame records themselves.

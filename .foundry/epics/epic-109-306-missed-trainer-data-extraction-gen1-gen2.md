---
id: epic-109-306-missed-trainer-data-extraction-gen1-gen2
type: EPIC
title: Missed Trainer Radar - Data Extraction (Gen 1 & Gen 2)
status: ACTIVE
owner_persona: story_owner
created_at: '2026-07-12'
updated_at: '2026-08-02'
depends_on: []
jules_session_id: '8776993269747604707'
pr_number: null
parent: prd-104-109-missed-trainer-radar
tags:
  - data-extraction
  - gen1
  - gen2
research_references: []
rejection_count: 2
rejection_reason: ''
notes: ''
---

# Missed Trainer Radar - Data Extraction (Gen 1 & Gen 2)

## Objective
Implement the data extraction layer for the "Missed Trainer Radar" feature specifically targeting Generation 1 and Generation 2 games. This will involve mapping and parsing trainer defeat flags from the save files.

## Requirements
1.  **Gen 1 Extraction:** Map and parse trainer defeat flags for Generation 1 games.
2.  **Gen 2 Extraction:** Map and parse trainer defeat event flags from Bank 1 for Generation 2 games.
3.  **Adherence to Cured Boundaries ADR (ADR 026):** All flag extractions must utilize explicit bitwise masking and shifting, and absolute zero boundary states must be comprehensively tested.
4.  **Relative Offsets & Constants (ADR 028):** All memory offsets, lengths, bit locations, and shifts must be explicitly defined as reusable constants at the module level. Inline magic numbers are strictly forbidden.

## Acceptance Criteria
- [x] Break down into Stories
- [x] story-306-319-gen1-trainer-data-extraction
- [x] story-306-320-gen2-trainer-data-extraction

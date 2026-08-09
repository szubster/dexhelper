---
id: epic-109-307-missed-trainer-data-extraction-gen3
type: EPIC
title: Missed Trainer Radar - Data Extraction (Gen 3)
status: PENDING
owner_persona: story_owner
created_at: '2026-07-12'
updated_at: '2026-08-09'
depends_on: []
jules_session_id: '1396747965809513759'
pr_number: null
parent: prd-104-109-missed-trainer-radar
tags:
  - data-extraction
  - gen3
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Missed Trainer Radar - Data Extraction (Gen 3)

## Objective
Implement the data extraction layer for the "Missed Trainer Radar" feature specifically targeting Generation 3 games. This will involve mapping and parsing trainer defeat flags from the save files.

## Requirements
1.  **Gen 3 Extraction:** Map and parse trainer defeat flags (including Rematch flags) for Generation 3 games.
2.  **Data Structure:** The extracted flags must be structured for use in the UI.
3.  **Adherence to Gen 3 Data Parsing (ADR 010):** All new Gen3 save parsing logic MUST exclusively use the native `DataView` API rather than raw `Uint8Array` manipulations.
4.  **Adherence to Cured Boundaries ADR (ADR 026):** All flag extractions must utilize explicit bitwise masking and shifting.
5.  **Relative Offsets & Constants (ADR 028):** All memory offsets, lengths, bit locations, and shifts must be explicitly defined as reusable constants at the module level. Inline magic numbers are strictly forbidden.

## Acceptance Criteria
- [x] Break down into Stories

- [x] story-307-319-gen3-trainer-flags-extraction
- [ ] story-307-408-gen3-trainer-flags-extraction-e2e

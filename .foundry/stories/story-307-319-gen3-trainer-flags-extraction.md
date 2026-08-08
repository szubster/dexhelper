---
id: story-307-319-gen3-trainer-flags-extraction
type: STORY
title: Gen 3 Trainer Defeat Flags Extraction
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-07-13'
updated_at: '2026-08-08'
depends_on: []
jules_session_id: '9409155726093687431'
pr_number: null
parent: epic-109-307-missed-trainer-data-extraction-gen3
tags:
  - data-extraction
  - gen3
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 3 Trainer Defeat Flags Extraction

## Objective
Extract standard and rematch trainer defeat flags from Gen 3 save files to be used by the Missed Trainer Radar.

## Requirements
1.  **Gen 3 Extraction:** Map and parse trainer defeat flags (including Rematch flags) for Generation 3 games.
2.  **Data Structure:** The extracted flags must be structured for use in the UI.
3.  **Adherence to Gen 3 Data Parsing (ADR 010):** All new Gen3 save parsing logic MUST exclusively use the native `DataView` API rather than raw `Uint8Array` manipulations.
4.  **Adherence to Cured Boundaries ADR (ADR 026):** All flag extractions must utilize explicit bitwise masking and shifting.
5.  **Relative Offsets & Constants (ADR 028):** All memory offsets, lengths, bit locations, and shifts must be explicitly defined as reusable constants at the module level. Inline magic numbers are strictly forbidden.

## Acceptance Criteria
- [x] Create Tech Lead Task Blueprints

- [x] task-319-322-gen3-trainer-flags-extraction-impl
- [x] task-319-323-gen3-trainer-flags-extraction-qa
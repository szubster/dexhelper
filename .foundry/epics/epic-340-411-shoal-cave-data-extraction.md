---
id: epic-340-411-shoal-cave-data-extraction
type: EPIC
title: Data Extraction Layer (RTC & Shoal Items)
status: ACTIVE
owner_persona: story_owner
created_at: '2026-08-11'
updated_at: '2026-08-13'
depends_on: []
jules_session_id: '1809259624386391484'
pr_number: null
parent: prd-130-340-shoal-cave-tide-tracker
tags:
  - feature
  - gen3
  - time-based
  - item-tracker
  - data-extraction
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Epic: Data Extraction Layer (RTC & Shoal Items)

## Description
This epic focuses on the backend parsing logic for extracting necessary data from Gen 3 save files to power the Shoal Cave Dashboard. We need to accurately extract the Real Time Clock (RTC) value and item inventory counts for Shoal Shells and Shoal Salts.

## Prerequisites & Constraints
- Must follow Section 13 ("Save File Parsing & Extraction Guidelines") in `schema.md`.
- All memory offsets, lengths, bit locations, shifts, and array bounds checking limits must be explicitly defined as reusable constants at the module level.
- No magic numbers.
- Must use relative offsets to support the A/B bank flash memory architecture for Gen 3.
- RangeError must be handled properly during parsing with the `DataView` API.

## Requirements
1. **RTC Value Extraction:**
   - Locate and extract the RTC value from the Gen 3 save structure.
2. **Item Count Extraction:**
   - Parse the Items pocket of the Gen 3 save file to retrieve counts for Shoal Shells and Shoal Salt.
3. **Daily Flag (Optional):**
   - Investigate and potentially extract the daily flag for Shell Bell crafting.

## Acceptance Criteria
- [x] Implement RTC data extraction logic complying with Section 13 guidelines. (Cancelled per ADR 025)
- [x] Implement item pocket parsing for Shoal Shells and Shoal Salts.
- [x] E2E / Integration Verification STORY must be drafted to integrate extracted data with dashboard and test it end-to-end.
- [ ] story-411-421-shoal-items-parsing
- [ ] story-411-422-shoal-items-e2e

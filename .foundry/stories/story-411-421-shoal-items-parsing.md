---
id: story-411-421-shoal-items-parsing
type: STORY
title: Parse Items Pocket for Shoal Items
status: COMPLETED
owner_persona: tech_lead
created_at: '2026-08-13'
updated_at: '2026-08-21'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-340-411-shoal-cave-data-extraction
tags:
  - story
  - gen3
  - item-tracker
  - data-extraction
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Story: Parse Items Pocket for Shoal Items

## Description
This story focuses on the backend parsing logic for extracting the counts of Shoal Shells and Shoal Salts from the Gen 3 save file. We need to parse the Items pocket and return the counts in the SaveData object.

Note: The RTC extraction requirement from the parent Epic has been cancelled per ADR 025.

## Requirements
1.  **Item Count Extraction:**
    *   Parse the Items pocket of the Gen 3 save file (`src/engine/saveParser/parsers/gen3.ts`).
    *   Retrieve the counts for Shoal Shells (Item ID: `02C`) and Shoal Salt (Item ID: `02B`).
    *   Update the `SaveData` interface (`src/engine/saveParser/parsers/common.ts`) to include these counts (e.g., `gen3ShoalItems: { shells: number; salt: number }`).
2.  **Compliance:**
    *   Must follow Section 13 ("Save File Parsing & Extraction Guidelines") in `schema.md`.
    *   All memory offsets, lengths, bit locations, shifts, and array bounds checking limits must be explicitly defined as reusable constants at the module level.
    *   No magic numbers.
    *   Must use relative offsets to support the A/B bank flash memory architecture for Gen 3.
    *   RangeError must be handled properly during parsing with the `DataView` API.

## Acceptance Criteria
- [x] Create constants for Items pocket offsets, item entry size, and Shoal item IDs.
- [x] Implement a function to extract the Shoal items counts.
- [x] Call the function in `parseGen3` and add the result to the returned `SaveData`.
- [x] Break down into Tasks
- [x] task-421-440-parse-items-pocket-for-shoal-items-impl
- [x] task-421-441-parse-items-pocket-for-shoal-items-qa

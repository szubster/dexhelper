---
id: task-322-331-gen2-dv-extraction-impl
type: TASK
title: Gen 2 DV Data Extraction Implementation
status: COMPLETED
owner_persona: coder
created_at: '2026-07-17'
updated_at: '2026-07-19'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-324-322-gen2-dv-extraction
tags:
  - dexhelper
  - generation-2
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 2 DV Data Extraction Implementation

## Objective
Implement the logic to extract DVs (Attack, Defense, Speed, Special) for each Pokémon from a Gen 2 save file.

## Instructions
1. Implement extraction mechanisms for Gen 2 Pokémon structures within a save block to extract the 4 DVs from the raw binary data.
2. **Explicit Data Parsing Rules**: All memory offsets, lengths, bit locations, and shifts MUST be defined as reusable constants at the module level. You are strictly forbidden from using inline magic numbers for memory reads.
3. **DataView API Constraints**: When using the DataView API to parse save files, you must catch `RangeError` for out-of-bounds reads and explicitly throw a new error with the exact message `'The save file is corrupted or incomplete.'`.
4. If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a clear `rejection_reason`.
5. If you must abort or permanently fail a task (e.g., impossible to implement or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a clear `rejection_reason`.
6. If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [x] Implement Gen 2 DV data extraction.
- [x] Ensure all memory offsets and constants are defined at the module level (no magic numbers).
- [x] Ensure `RangeError` is caught during DataView operations and a specific error `'The save file is corrupted or incomplete.'` is thrown.

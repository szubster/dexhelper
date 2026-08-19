---
id: task-150-212-gen2-hof-records-extraction-impl
type: TASK
title: Implement Gen 2 Hall of Fame Records Extraction
status: ACTIVE
owner_persona: coder
created_at: '2026-06-21'
updated_at: '2026-08-19'
depends_on: []
jules_session_id: '5838264204197281776'
pr_number: null
parent: story-070-150-parse-gen2-hof-records
tags:
  - task
  - parsing
  - hall-of-fame
  - gen2
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement Gen 2 Hall of Fame Records Extraction

## Overview
Implement logic to extract actual Hall of Fame records from Generation 2 (Gold, Silver, Crystal) save files. We need to extract the Pokémon species, their levels, and the player's name for past League victories, not just the total count of victories.

## Requirements
- Research and identify the correct memory offsets and data structures for extracting actual Generation 2 Hall of Fame records using the `DataView` API. Note that the `0xA8` offset identified in ADR 021 only applies to the Hall of Fame *count*. You will need to find the specific block where the actual records are stored.
- Extract the following for each record:
  - Pokémon species.
  - Pokémon levels.
  - Player name at the time of the victory.
- Ensure the parsing logic integrates with the existing save parsing engine in `src/engine/saveParser/parsers/gen2.ts` and strictly uses `DataView`.
- **CRITICAL CONSTRAINT:** All memory offsets, lengths, bit locations, and shifts must be defined as reusable constants at the module level. Inline magic numbers are strictly forbidden.

## Failure & Abort Instructions
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [ ] Memory offsets and data structures for Gen 2 Hall of Fame records are correctly identified and used.
- [ ] Logic implemented to extract Pokémon species, levels, and player names from the records.
- [ ] Parsing logic integrates with the existing engine and uses the `DataView` API.
- [ ] All constants are defined at the module level without inline magic numbers.
- [ ] Tests are written/updated to verify the extraction logic.

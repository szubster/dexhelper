---
id: task-241-469-daycare-gen3-parsing-impl
type: TASK
title: Implement Gen 3 Daycare Data Parsing
status: FAILED
owner_persona: coder
created_at: '2026-08-23'
updated_at: '2026-08-30'
depends_on:
  - research-241-462-gen3-daycare-offsets-investigation
jules_session_id: null
pr_number: null
parent: story-105-241-daycare-gen3-parsing
tags:
  - gen3
  - breeding
  - parsing
research_references: []
rejection_count: 0
rejection_reason: '[ACKNOWLEDGED] Merged with unfulfilled acceptance criteria'
notes: ''
---

# Task: Implement Gen 3 Daycare Data Parsing

## Context
We need to extract Gen 3 daycare information. This task is for implementing the parsing logic to extract Gen 3 Daycare Pokémon data from the save file. This replaces the cancelled task-241-440-daycare-gen3-parsing-impl.

## Requirements
- Parse the Daycare save block for Gen 3.
- Extract Pokémon data stored in the Daycare.
- Ensure strict adherence to the "Save File Parsing & Extraction Guidelines" in `.foundry/docs/schema.md`.
  - Use module-level constants for offsets.
  - Do not use magic numbers.
  - Use relative offsets with resolved section offsets.
  - Catch `RangeError` and throw a new error with message "The save file is corrupted or incomplete.".
- Add comprehensive unit tests covering the parsing logic.
- Consult `.foundry/docs/knowledge_base/dexhelper/gen3_daycare_offsets.md` (to be created by the research task) for correct offsets.

## Acceptance Criteria
- [ ] Implement Gen 3 Daycare data parsing.
- [ ] Write unit tests for Daycare data extraction.

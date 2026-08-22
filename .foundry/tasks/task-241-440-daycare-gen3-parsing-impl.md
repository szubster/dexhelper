---
id: task-241-440-daycare-gen3-parsing-impl
type: TASK
title: Implement Gen 3 Daycare Data Parsing
status: CANCELLED
owner_persona: coder
created_at: '2026-08-19'
updated_at: '2026-08-22'
depends_on: []
jules_session_id: '13770895514140074260'
pr_number: null
parent: story-105-241-daycare-gen3-parsing
tags:
  - gen3
  - breeding
  - parsing
research_references: []
rejection_count: 3
rejection_reason: '[ACKNOWLEDGED] Max rejection count reached'
notes: ''
---
# Task: Implement Gen 3 Daycare Data Parsing

## Context
We need to extract Gen 3 daycare information. This task is for implementing the parsing logic to extract Gen 3 Daycare Pokémon data from the save file.

## Requirements
- Parse the Daycare save block for Gen 3.
- Extract Pokémon data stored in the Daycare.
- Ensure strict adherence to the "Save File Parsing & Extraction Guidelines" in `.foundry/docs/schema.md`.
  - Use module-level constants for offsets.
  - Do not use magic numbers.
  - Use relative offsets with resolved section offsets.
  - Catch `RangeError` and throw a new error with message "The save file is corrupted or incomplete.".
- Add comprehensive unit tests covering the parsing logic.

## Acceptance Criteria
- [ ] Implement Gen 3 Daycare data parsing.
- [ ] Write unit tests for Daycare data extraction.

- [ ] research-241-449-gen3-daycare-offsets

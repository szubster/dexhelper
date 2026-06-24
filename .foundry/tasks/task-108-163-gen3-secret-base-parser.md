---
id: task-108-163-gen3-secret-base-parser
type: TASK
title: Implement Gen 3 Secret Base Parser
status: ACTIVE
owner_persona: coder
created_at: '2026-06-11'
updated_at: '2026-06-23'
depends_on: []jules_session_id: '6191669443938434121'
pr_number: null
parent: story-070-108-parse-secret-base-locations
tags:
  - feature
  - gen3
  - secret-base
  - save-parsing
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
---

# TASK: Implement Gen 3 Secret Base Parser

## Context
As part of the Gen 3 Secret Base and Mixed Record Viewer, we need to extract the locations of all active Secret Bases from the save file. This task involves implementing the logic to parse the Secret Base locations using the `DataView` API.

## Requirements
- Identify the memory offsets for Gen 3 Secret Base data within the save file.
- Implement a parser in the Gen 3 save engine (likely in `src/engine/save_parser/`) that extracts the map ID/location ID for active secret bases.
- MUST use the `DataView` API exclusively for parsing per ADR 010. Do not use raw `Uint8Array` manipulations.
- Ensure bounded reads. Let `DataView` throw `RangeError` if reads go out of bounds, and catch/handle these gracefully.
- The extracted location IDs must be compatible with the mapping structures defined by `gen3MapGraph` logic.
- Ensure the legacy Gen 1 and Gen 2 parsers remain unchanged (backwards compatibility).

## Acceptance Criteria
- [ ] Gen 3 Secret Base parser is implemented using `DataView`.
- [ ] It correctly identifies and extracts map location IDs for active secret bases.
- [ ] Rejections or errors handle corrupted/truncated data gracefully via `RangeError` catching.
- [ ] Appropriate unit tests are added for the parsing logic.

## Reminders for Personas
- **Coder/QA:** If you abort or permanently fail this task, you MUST update the YAML frontmatter to `status: FAILED` or `status: CANCELLED` with a `rejection_reason`.
- **Coder/QA:** If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

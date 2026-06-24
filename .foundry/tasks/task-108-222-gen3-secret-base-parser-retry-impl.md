---
id: task-108-222-gen3-secret-base-parser-retry-impl
type: TASK
title: Implement Gen 3 Secret Base Parser (Retry)
status: PENDING
owner_persona: coder
created_at: '2026-06-24'
updated_at: '2026-06-24'
depends_on:
  - research-108-221-gen3-secret-base-rangeerror
jules_session_id: null
pr_number: null
parent: story-070-108-parse-secret-base-locations
tags:
  - feature
  - gen3
  - secret-base
  - save-parsing
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# TASK: Implement Gen 3 Secret Base Parser (Retry)

## Context
As part of the Gen 3 Secret Base and Mixed Record Viewer, we need to extract the locations of all active Secret Bases from the save file. This task replaces a previously failed implementation, specifically focusing on handling `DataView` boundary errors correctly.

## Requirements
- Identify the memory offsets for Gen 3 Secret Base data within the save file.
- Implement a parser in the Gen 3 save engine (likely in `src/engine/save_parser/`) that extracts the map ID/location ID for active secret bases.
- MUST use the `DataView` API exclusively for parsing per ADR 010. Do not use raw `Uint8Array` manipulations.
- **CRITICAL CONSTRAINT:** All memory offsets, lengths, bit locations, and shifts MUST be defined as reusable, descriptive constants at the module level. Inline magic numbers are strictly forbidden.
- **CRITICAL CONSTRAINT:** Ensure bounded reads. Let `DataView` throw `RangeError` if reads go out of bounds, and catch/handle these gracefully using the try/catch pattern determined in `research-108-221-gen3-secret-base-rangeerror`. It must not crash the application or propagate generic errors.
- The extracted location IDs must be compatible with the mapping structures defined by `gen3MapGraph` logic.
- Ensure the legacy Gen 1 and Gen 2 parsers remain unchanged (backwards compatibility).

## Acceptance Criteria
- [ ] Gen 3 Secret Base parser is implemented using `DataView`.
- [ ] It correctly identifies and extracts map location IDs for active secret bases.
- [ ] Reusable module-level constants are used for all memory offsets and sizes (no magic numbers).
- [ ] Rejections or errors handle corrupted/truncated data gracefully via explicit `RangeError` catching.
- [ ] Appropriate unit tests are added for the parsing logic, including tests for `RangeError` handling.

## Reminders for Personas
- **Coder:** If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- **Coder:** If you abort or permanently fail this task, you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- **Coder:** If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
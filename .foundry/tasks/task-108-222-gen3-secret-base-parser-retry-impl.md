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
research_references:
  - research-108-221-gen3-secret-base-rangeerror
  - research-108-187-gen3-secret-base-offsets
rejection_count: 0
rejection_reason: ''
notes: ''
---

# TASK: Implement Gen 3 Secret Base Parser (Retry)

## Context
As part of the Gen 3 Secret Base and Mixed Record Viewer, we need to extract the locations of all active Secret Bases from the save file. This task involves implementing the logic to parse the Secret Base locations using the `DataView` API.
This is a retry of a previously failed task. The previous implementation failed because it violated ADR 010 by not explicitly catching `RangeError` on out-of-bounds reads.

## Requirements
- Identify the memory offsets for Gen 3 Secret Base data within the save file.
- Implement a parser in the Gen 3 save engine (likely in `src/engine/save_parser/`) that extracts the map ID/location ID for active secret bases.
- MUST use the `DataView` API exclusively for parsing per ADR 010. Do not use raw `Uint8Array` manipulations.
- **CRITICAL:** Ensure bounded reads. You MUST wrap the `DataView` parsing block in a `try...catch (e)` block that explicitly checks if `e instanceof RangeError` and throws a gracefully handled error (e.g., "Corrupted Save File") rather than crashing the application.
- **CRITICAL:** All memory offsets, lengths, bit locations, and shifts must be defined as reusable constants at the module level. Inline magic numbers are strictly forbidden.
- The extracted location IDs must be compatible with the mapping structures defined by `gen3MapGraph` logic.
- Ensure the legacy Gen 1 and Gen 2 parsers remain unchanged (backwards compatibility).

## Acceptance Criteria
- [ ] Gen 3 Secret Base parser is implemented using `DataView`.
- [ ] It correctly identifies and extracts map location IDs for active secret bases.
- [ ] Rejections or errors handle corrupted/truncated data gracefully via explicit `RangeError` catching.
- [ ] All memory offsets, lengths, bit locations, and shifts are defined as reusable constants at the module level.
- [ ] Appropriate unit tests are added for the parsing logic.

## Reminders for Personas
- **Coder/QA:** If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- **Coder/QA:** If you abort or permanently fail this task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- **Coder/QA:** If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

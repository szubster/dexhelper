---
id: task-098-175-mirage-island-parsing-impl
type: TASK
title: Implement Gen 3 Mirage Island Value Parsing
status: COMPLETED
owner_persona: coder
created_at: '2026-06-13'
updated_at: '2026-06-14'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-061-098-parse-mirage-island-value
tags:
  - gen3
  - mirage-island
  - save-parsing
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement Gen 3 Mirage Island Value Parsing

## Context
As defined in Story `story-061-098-parse-mirage-island-value` and ADR 010, we need to extract the daily Mirage Island random value from Gen 3 save files using the `DataView` API for safe bounds checking.

## Requirements
- Update `parseGen3MirageIslandValue` in `src/engine/saveParser/parsers/gen3.ts` to implement the parsing logic.
- Use `DataView` API `getUint16(offset, true)` (little-endian) to read the 2-byte value.
- Catch `RangeError` from out-of-bounds reads and throw a specific `Error('The save file is corrupted or incomplete.')`.
- Utilize the correct block Section 2 byte offsets as documented in `.foundry/docs/knowledge_base/gen3_mirage_island_offsets.md`. Ruby/Sapphire uses `0x0408` and Emerald uses `0x0464`. (Note: Ensure this function takes `offset` as an argument or logic handles calculating the base address of Section 2 + correct sub-offset based on game version. For now, since the signature takes an `offset`, just use the `DataView` with the provided offset.)

## Contract Requirements
- **Coder/QA Persona Constraint:** If you must abort or permanently fail this task, you MUST update the YAML frontmatter to `status: FAILED` or `status: CANCELLED` and provide a clear `rejection_reason`.
- **Empty PR Constraint:** If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [x] `parseGen3MirageIslandValue` reads a 16-bit unsigned integer using `DataView`.
- [x] It catches `RangeError` and throws a specific corruption error message.

---
id: task-121-327-gen3-tv-block-parser-retry7-impl
type: TASK
title: Implement Gen 3 TV Block DataView Parser (Retry 7)
status: ACTIVE
owner_persona: coder
created_at: '2026-07-16'
updated_at: '2026-08-16'
depends_on:
  - task-121-310-gen3-tv-block-parser-retry6-qa
jules_session_id: '1770119609591006502'
pr_number: null
parent: story-081-121-gen3-tv-block-dataview-parser
tags:
  - feature
  - gen3
  - data-parsing
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
---

# Task: Implement Gen 3 TV Block DataView Parser (Retry 7)

## Description
This task requires you to implement the foundational logic to locate and read the TV broadcast data block from the Gen 3 save file structure, addressing the QA failure from Retry 6.

As mandated by **ADR 010**, you MUST strictly utilize the `DataView` API for all new Gen 3 data parsing logic to ensure robustness and safety. You must avoid legacy `Uint8Array` manual read methods and instead use `DataView` methods such as `getUint8`, `getUint16`, etc., to enforce native bounds checking.

Any out-of-bounds reads or structurally corrupt states within the TV block MUST trigger a gracefully caught `RangeError`.
**CRITICAL:** When throwing or handling this `RangeError`, the error message text MUST be exactly `"The save file is corrupted or incomplete."` with no additional text.

**CRITICAL CONSTRAINT:** All memory offsets, lengths, bit locations, and shifts MUST be defined as reusable constants at the module level. Inline magic numbers (e.g., `+ 2`, `+ 4`, `+ 6`) are strictly forbidden. You MUST explicitly use the following module-level constants (or similar semantic names) based on the research findings:
- `TVGROUP_RECORD_MIX_START = 21`
- `TVGROUP_RECORD_MIX_END = 40`
- `TVSHOW_STRUCT_SIZE = 36`
- `TV_SHOWS_COUNT = 25`
- `TVSHOW_MASS_OUTBREAK = 41`
- `OUTBREAK_MOVES_OFFSET = 0x04`
- `OUTBREAK_SPECIES_OFFSET = 0x0C`
- `OUTBREAK_MAP_NUM_OFFSET = 0x10`
- `OUTBREAK_MAP_GROUP_OFFSET = 0x11`
- `OUTBREAK_PROBABILITY_OFFSET = 0x13`
- `OUTBREAK_LEVEL_OFFSET = 0x14`
- `OUTBREAK_DAYS_BEFORE_OFFSET = 0x16`
- `OUTBREAK_LANGUAGE_OFFSET = 0x18`

Any size, ID, or increment constants must NOT be hardcoded inline inside parsing functions.

When parsing Gen 3 save files, memory offsets must be calculated as relative offsets from the resolved section offset (e.g., `section1Offset + 0x90`) rather than using absolute memory offsets (e.g., `0x142c`).

## Acceptance Criteria
- [ ] The TV block extraction logic is built entirely using `DataView`.
- [ ] All memory offsets, lengths, bit locations, and shifts are defined as reusable constants at the module level (no inline magic numbers).
- [ ] Memory offsets are calculated as relative offsets from the resolved section offset.
- [ ] Explicit error handling catches `RangeError` exceptions natively thrown by `DataView`, translating it to an Error with message exactly `"The save file is corrupted or incomplete."`.
- [ ] New parsing functions conform to the existing Gen 1 and Gen 2 backward-compatible parsing interfaces without breaking them.

## Important Protocols (For Coder)
- **Transient Failure:** If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- **Permanent Failure:** If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- **Empty PR Protocol:** If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

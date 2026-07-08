---
id: task-121-280-gen3-tv-block-parser-retry4-impl
type: TASK
title: Implement Gen 3 TV Block DataView Parser (Retry 5)
status: READY
owner_persona: coder
created_at: '2026-07-06'
updated_at: '2026-07-06'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-081-121-gen3-tv-block-dataview-parser
tags:
  - feature
  - gen3
  - data-parsing
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Implement Gen 3 TV Block DataView Parser (Retry 5)

## Description
This task requires you to implement the foundational logic to locate and read the TV broadcast data block from the Gen 3 save file structure, addressing the feedback from `research-121-246-gen3-tv-block-parser-retry-failure`.

As mandated by **ADR 010**, you MUST strictly utilize the `DataView` API for all new Gen 3 data parsing logic to ensure robustness and safety. You must avoid legacy `Uint8Array` manual read methods and instead use `DataView` methods such as `getUint8`, `getUint16`, etc., to enforce native bounds checking.

Any out-of-bounds reads or structurally corrupt states within the TV block MUST trigger a gracefully caught `RangeError` which the parser translates into a descriptive structural error, rather than crashing the application.

**CRITICAL CONSTRAINT:** All memory offsets, lengths, bit locations, and shifts MUST be defined as reusable constants at the module level. Inline magic numbers are strictly forbidden. You MUST explicitly use the following module-level constants (or similar semantic names) based on the research findings:
- `TVGROUP_RECORD_MIX_START = 21`
- `TVGROUP_RECORD_MIX_END = 40`
- `TVSHOW_STRUCT_SIZE = 36` (Total structure size per show)
- `TV_SHOWS_COUNT = 25`
- `TVSHOW_MASS_OUTBREAK = 41` (and subsequent constants for specific offsets inside the outbreak payload like `daysBeforeOutbreak = 0x16`, `level = 0x14`, etc., if mass outbreaks are part of your implementation scope.)
- Any size or ID constants must NOT be hardcoded inline inside `parseGen3MixRecords` or any other parsing function.

## Acceptance Criteria
- [x] The TV block extraction logic is built entirely using `DataView`.
- [x] All memory offsets, lengths, bit locations, and shifts are defined as reusable constants at the module level. Inline magic numbers like 21 or 40 are completely removed.
- [x] Explicit error handling is in place to catch `RangeError` exceptions natively thrown by `DataView` on malformed saves.
- [x] New parsing functions conform to the existing Gen 1 and Gen 2 backward-compatible parsing interfaces without breaking them.

## Important Protocols (For Coder)
- **Transient Failure:** If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- **Permanent Failure:** If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- **Empty PR Protocol:** If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

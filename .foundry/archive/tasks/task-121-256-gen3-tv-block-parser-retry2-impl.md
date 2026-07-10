---
id: task-121-256-gen3-tv-block-parser-retry2-impl
type: TASK
title: Implement Gen 3 TV Block DataView Parser (Retry 2)
status: CANCELLED
owner_persona: coder
created_at: '2026-07-02'
updated_at: '2026-07-02'
depends_on:
  - research-121-246-gen3-tv-block-parser-retry-failure
jules_session_id: null
pr_number: null
parent: story-081-121-gen3-tv-block-dataview-parser
tags:
  - feature
  - gen3
  - data-parsing
research_references: []
rejection_count: 0
rejection_reason: 'Replaced by task-121-276 and task-121-277'
notes: ''
---

# Task: Implement Gen 3 TV Block DataView Parser (Retry 2)

## Description
This task requires you to implement the foundational logic to locate and read the TV broadcast data block from the Gen 3 save file structure, addressing the feedback from `research-121-246-gen3-tv-block-parser-retry-failure`.

As mandated by **ADR 010**, you MUST strictly utilize the `DataView` API for all new Gen 3 data parsing logic to ensure robustness and safety.
You must avoid legacy `Uint8Array` manual read methods and instead use `DataView` methods such as `getUint8`, `getUint16`, etc., to enforce native bounds checking.

Any out-of-bounds reads or structurally corrupt states within the TV block MUST trigger a gracefully caught `RangeError` which the parser translates into a descriptive structural error, rather than crashing the application.

**CRITICAL CONSTRAINT:** All memory offsets, lengths, bit locations, and shifts MUST be defined as reusable constants at the module level. Inline magic numbers are strictly forbidden. You must explicitly define reusable constants for values such as the ID for Mix Record events (`21` or similar, depending on research findings) and the record length (`40` or similar), instead of hardcoding them into the parsing logic.

## Acceptance Criteria
- [x] The TV block extraction logic is built entirely using `DataView`.
- [x] All memory offsets, lengths, bit locations, and shifts are defined as reusable constants at the module level.
- [x] Explicit error handling is in place to catch `RangeError` exceptions natively thrown by `DataView` on malformed saves.
- [x] New parsing functions conform to the existing Gen 1 and Gen 2 backward-compatible parsing interfaces without breaking them.

## Important Protocols (For Coder)
- **Transient Failure:** If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- **Permanent Failure:** If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- **Empty PR Protocol:** If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
**CANCELLED:** Replaced by task-121-276 and task-121-277

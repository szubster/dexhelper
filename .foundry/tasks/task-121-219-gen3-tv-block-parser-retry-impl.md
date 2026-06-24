---
id: task-121-219-gen3-tv-block-parser-retry-impl
type: TASK
title: Implement Gen 3 TV Block DataView Parser (Retry)
status: PENDING
owner_persona: coder
created_at: '2026-06-23'
updated_at: '2026-06-23'
depends_on:
  - research-121-216-gen3-tv-block-parser-failure
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

# Task: Implement Gen 3 TV Block DataView Parser (Retry)

## Description
This task requires you to implement the foundational logic to locate and read the TV broadcast data block from the Gen 3 save file structure, based on the findings from `research-121-216`.

As mandated by **ADR 010**, you MUST strictly utilize the `DataView` API for all new Gen 3 data parsing logic to ensure robustness and safety.
You must avoid legacy `Uint8Array` manual read methods and instead use `DataView` methods such as `getUint8`, `getUint16`, etc., to enforce native bounds checking.

Any out-of-bounds reads or structurally corrupt states within the TV block MUST trigger a gracefully caught `RangeError` which the parser translates into a descriptive structural error, rather than crashing the application.

**CRITICAL CONSTRAINT:** All memory offsets, lengths, bit locations, and shifts MUST be defined as reusable constants at the module level. Inline magic numbers are strictly forbidden.

## Acceptance Criteria
- [x] The TV block extraction logic is built entirely using `DataView` as per the research findings.
- [x] All memory offsets, lengths, bit locations, and shifts are defined as reusable constants at the module level.
- [x] Explicit error handling is in place to catch `RangeError` exceptions natively thrown by `DataView` on malformed saves.
- [x] New parsing functions conform to the existing Gen 1 and Gen 2 backward-compatible parsing interfaces without breaking them.

## Important Protocols (For Coder)
- **Transient Failure:** If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- **Permanent Failure:** If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- **Empty PR Protocol:** If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

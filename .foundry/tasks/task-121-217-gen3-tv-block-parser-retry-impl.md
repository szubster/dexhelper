---
id: task-121-217-gen3-tv-block-parser-retry-impl
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
This task requires you to implement the foundational logic to locate and read the TV broadcast data block from the Gen 3 save file structure, addressing the failures identified in `research-121-216-gen3-tv-block-parser-failure`.
As mandated by **ADR 010**, you MUST strictly utilize the `DataView` API for all new Gen 3 data parsing logic to ensure robustness and safety.
You must avoid legacy `Uint8Array` manual read methods and instead use `DataView` methods such as `getUint8`, `getUint16`, etc., to enforce native bounds checking.

Any out-of-bounds reads or structurally corrupt states within the TV block MUST trigger a gracefully caught `RangeError` which the parser translates into a descriptive structural error, rather than crashing the application.

## Acceptance Criteria
- [ ] The TV block extraction logic is built entirely using `DataView`.
- [ ] Explicit error handling is in place to catch `RangeError` exceptions natively thrown by `DataView` on malformed saves.
- [ ] New parsing functions conform to the existing Gen 1 and Gen 2 backward-compatible parsing interfaces without breaking them.

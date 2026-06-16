---
id: task-121-171-gen3-tv-block-parser-impl
type: TASK
title: Implement Gen 3 TV Block DataView Parser
status: FAILED
owner_persona: coder
created_at: '2026-06-13'
updated_at: '2026-06-13'
depends_on:
  - research-121-171-gen3-tv-block-offsets
jules_session_id: '5304034001390251030'
pr_number: null
parent: story-081-121-gen3-tv-block-dataview-parser
tags:
  - feature
  - gen3
  - data-parsing
research_references: []
rejection_count: 0
rejection_reason: 'Suspended pending research: Missing critical context regarding the exact memory offsets, block sizes, and data structures for the Gen 3 TV Block.'
notes: ''
---

# Task: Implement Gen 3 TV Block DataView Parser

## Description
This task requires you to implement the foundational logic to locate and read the TV broadcast data block from the Gen 3 save file structure.
As mandated by **ADR 010**, you MUST strictly utilize the `DataView` API for all new Gen 3 data parsing logic to ensure robustness and safety.
You must avoid legacy `Uint8Array` manual read methods and instead use `DataView` methods such as `getUint8`, `getUint16`, etc., to enforce native bounds checking.

Any out-of-bounds reads or structurally corrupt states within the TV block MUST trigger a gracefully caught `RangeError` which the parser translates into a descriptive structural error, rather than crashing the application.

## Acceptance Criteria
- [ ] The TV block extraction logic is built entirely using `DataView`.
- [ ] Explicit error handling is in place to catch `RangeError` exceptions natively thrown by `DataView` on malformed saves.
- [ ] New parsing functions conform to the existing Gen 1 and Gen 2 backward-compatible parsing interfaces without breaking them.

## Important Protocols (For Coder)
- **Empty PR Protocol:** If the required logic is already implemented and the criteria are satisfied by existing code, you MUST still submit an empty Pull Request (with 0 file changes). However, before submitting an empty PR, you MUST check off all Acceptance Criteria checkboxes above (`- [x]`).
- **Failure Protocol:** If you encounter a deadlock or a fundamental impossibility to complete this task, you MUST NOT check off the acceptance criteria. Instead, modify the YAML frontmatter to set `status: FAILED` and provide a clear `rejection_reason`. You must also document the failure in your persona journal.

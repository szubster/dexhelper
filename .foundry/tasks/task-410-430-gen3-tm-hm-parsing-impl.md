---
id: task-410-430-gen3-tm-hm-parsing-impl
type: TASK
title: Gen 3 TM/HM Parsing Implementation
status: COMPLETED
owner_persona: coder
created_at: '2026-08-16'
updated_at: '2026-08-17'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-401-410-gen3-tm-hm-parsing
tags:
  - gen3
  - save-parsing
  - implementation
research_references:
  - .foundry/docs/knowledge_base/moveset-inventory-memory-offsets.md
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 3 TM/HM Parsing Implementation

## Description
Implement the logic to extract and parse the TM/HM inventory from Generation 3 save files.

## Context
Generation 3 save files utilize an A/B bank flash memory structure, meaning save sections can shift relative to the start of the file. The parser must use the resolved section offsets (e.g., `section1Offset`) to compute relative memory offsets. Hardcoded absolute offsets are prohibited.

Additionally, as per `.foundry/docs/schema.md` Section 13, all magic numbers must be extracted into module-level constants. When extracting data via the `DataView` API, you must wrap operations in a try-catch block and explicitly catch `RangeError` for out-of-bounds reads, throwing a new error with the message "The save file is corrupted or incomplete."

## Acceptance Criteria
- [x] Define module-level constants for section offsets, item offsets, array limits, etc.
- [x] Implement a parsing function that calculates TM/HM inventory offsets relative to the provided section offset.
- [x] Ensure `RangeError` is caught during `DataView` operations and correctly rethrown with the string "The save file is corrupted or incomplete."
- [x] Write unit tests verifying correct TM/HM parsing and explicit `RangeError` handling.

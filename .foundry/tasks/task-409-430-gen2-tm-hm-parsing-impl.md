---
id: task-409-430-gen2-tm-hm-parsing-impl
type: TASK
title: Implement Gen 2 TM/HM Parsing
status: READY
owner_persona: coder
created_at: '2026-08-16'
updated_at: '2026-08-16'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-401-409-gen2-tm-hm-parsing
tags:
  - gen2
  - save-parsing
research_references:
  - .foundry/docs/knowledge_base/moveset-inventory-memory-offsets.md
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement Gen 2 TM/HM Parsing

## Description
Implement the parsing logic for Gen 2 TM/HM inventory and event flags from the save file. This includes extracting item quantities and checking event flags for one-time TMs.

## Technical Contract
1.  **Module-Level Constants:** All memory offsets, lengths, bit locations, shifts, and array bounds checking limits MUST be explicitly defined as reusable constants at the module level.
2.  **No Magic Numbers:** Do NOT use inline magic numbers directly in parsing functions.
3.  **RangeError Handling:** When using the `DataView` API to read out event flags or bitwise maps, you MUST catch `RangeError` for out-of-bounds reads and throw a new error with the message "The save file is corrupted or incomplete."
4.  **Bitwise Mapping:** When parsing bitwise blocks (e.g., event flags) using the `DataView` API, you must explicitly map the specific bit offsets corresponding to target events. Just extracting the raw array is insufficient.

## Acceptance Criteria
- [ ] Implement Gen 2 TM/HM parsing logic adhering to Section 13 guidelines.
- [ ] Add unit tests verifying parsing logic and `RangeError` handling.

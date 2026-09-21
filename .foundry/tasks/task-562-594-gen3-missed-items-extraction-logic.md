---
id: task-562-594-gen3-missed-items-extraction-logic
type: TASK
title: Gen 3 Missed Items & Milestones Extraction Logic
status: READY
owner_persona: coder
created_at: '2026-09-19'
updated_at: '2026-09-21'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-553-562-gen3-missed-items-parsing
tags:
  - dexhelper
  - gen3
research_references: []
rejection_count: 2
rejection_reason: ''
locks: []
---

# Task: Gen 3 Missed Items & Milestones Extraction Logic

## Description
Implement the core save file parsing logic to extract missed milestones and valuable items (like the Master Ball, missed TMs, and major unrepeatable achievements) from a Gen 3 save file.

## Context and Architectural Guidelines
You MUST strictly adhere to the guidelines defined in Section 13 ("Save File Parsing & Extraction Guidelines") of `.foundry/docs/schema.md`. This includes:
- **Module-Level Constants:** All memory offsets, lengths, bit locations, shifts, and array bounds checking limits must be explicitly defined as reusable constants at the module level.
- **No Magic Numbers:** The use of inline magic numbers directly in parsing functions is strictly forbidden.
- **Relative Offsets:** Use the resolved section offset (e.g., `section1Offset` or `section2Offset`) to calculate relative memory offsets rather than absolute hardcoded offsets, supporting the A/B bank flash memory architecture.
- **RangeError Handling:** When using the `DataView` API, you MUST catch `RangeError` for out-of-bounds reads and throw a new error with the message "The save file is corrupted or incomplete." to prevent application crashes.

## Acceptance Criteria
- [ ] Implement the extraction function for Gen 3 missed items and milestones.
- [ ] Define all memory offsets and bit locations as module-level constants.
- [ ] Implement robust `RangeError` catching that throws the required error message.
- [ ] Ensure that relative offsets are calculated using section offsets.

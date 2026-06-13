---
id: task-098-157-mirage-island-parsing-impl
type: TASK
title: Implement Gen 3 Mirage Island Value Parsing
status: ACTIVE
owner_persona: coder
created_at: '2026-06-10'
updated_at: '2026-06-13'
depends_on: []
jules_session_id: '268641716910362386'
pr_number: null
parent: story-061-098-parse-mirage-island-value
tags:
  - gen3
  - mirage-island
  - rng
  - parsing
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
---

# Implement Gen 3 Mirage Island Value Parsing

## Context
As part of the Gen 3 support expansion, we need to extract the daily Mirage Island random value from the save file. This value is essential for the `epic-038-061-mirage-island-engine` logic.

## Requirements
You must implement a new parsing function/method to extract the 2-byte Mirage Island daily random value.
This must adhere strictly to ADR 010:
- Use the `DataView` API (e.g. `getUint16`) to read the value. Do not use raw `Uint8Array` indexing.
- Rely on `DataView` to throw a `RangeError` if the read is out of bounds (which can happen with corrupted or truncated save files).
- Catch the `RangeError` and handle it gracefully (e.g. by throwing a specific validation error like "Corrupted Save File" or returning a designated safe error state, depending on the parser's existing error handling patterns).

## Acceptance Criteria
- [ ] Logic implemented to extract the Mirage Island random value using `DataView.getUint16`.
- [ ] Out-of-bounds reads (`RangeError`) are caught and handled gracefully as per ADR 010.

## Important Note for Coder
If you abort or permanently fail this task, you MUST update the YAML frontmatter to `status: FAILED` or `status: CANCELLED` with a `rejection_reason`.
If you submit an empty PR for this completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

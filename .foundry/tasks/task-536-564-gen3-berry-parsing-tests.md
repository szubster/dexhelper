---
id: task-536-564-gen3-berry-parsing-tests
type: TASK
title: Write Tests for Gen 3 Berry DataView Parsing
status: PENDING
owner_persona: coder
created_at: "2026-09-04"
updated_at: "2026-09-04"
depends_on:
  - task-536-562-gen3-berry-parsing-logic
  - task-536-563-gen3-berry-map-location
jules_session_id: null
locks: []
pr_number: null
parent: story-513-536-gen3-berry-dataview-parsing
tags:
  - gen3
  - testing
research_references: []
rejection_count: 0
rejection_reason: ""
notes: ""
---

# Write Tests for Gen 3 Berry DataView Parsing

## Overview
Write comprehensive unit tests for the Gen 3 berry patch parsing and mapping logic to ensure it behaves correctly under different scenarios.

## Acceptance Criteria
- [ ] Write Vitest tests for the `parseGen3BerryTrees` function.
- [ ] Ensure tests cover standard parsing behavior with valid berry data.
- [ ] Write tests covering empty states (e.g., `berryId` is 0).
- [ ] Write tests to verify the bounds checking correctly throws a `RangeError` with the message "The save file is corrupted or incomplete." on out-of-bounds reads.
- [ ] Write tests to verify the map location mapping assigns the correct locations to specific berry tree indices.
- [ ] The Coder must perform self-verification via these tests (No dedicated QA task).

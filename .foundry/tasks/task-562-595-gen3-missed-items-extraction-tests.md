---
id: task-562-595-gen3-missed-items-extraction-tests
type: TASK
title: Gen 3 Missed Items Extraction Unit Tests
status: READY
owner_persona: coder
created_at: '2026-09-19'
updated_at: '2026-09-22'
depends_on:
  - task-562-594-gen3-missed-items-extraction-logic
jules_session_id: null
pr_number: null
parent: story-553-562-gen3-missed-items-parsing
tags:
  - dexhelper
  - gen3
research_references: []
rejection_reason: ''
locks: []
---

# Task: Gen 3 Missed Items Extraction Unit Tests

## Description
Write comprehensive unit tests using `vitest` for the Gen 3 missed items and milestones extraction logic implemented in `task-562-594-gen3-missed-items-extraction-logic`.

## Acceptance Criteria
- [ ] Write `vitest` unit tests covering the successful extraction of missed items.
- [ ] Write tests verifying that `RangeError` is caught and the specific error message ("The save file is corrupted or incomplete.") is thrown.
- [ ] Ensure full test coverage for the extraction module.

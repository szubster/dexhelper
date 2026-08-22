---
id: task-413-466-gen3-move-tutor-extraction-vitest-impl
type: TASK
title: Gen 3 Move Tutor Extraction Vitest Tests
status: ACTIVE
owner_persona: coder
created_at: '2026-08-22'
updated_at: '2026-08-22'
depends_on: []
jules_session_id: '6633081650547725086'
pr_number: null
parent: story-406-413-gen3-move-tutor-parsing-e2e
tags:
  - testing
  - vitest
  - gen3
  - move-tutor
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Gen 3 Move Tutor Extraction Vitest Tests

## Objective
Implement Vitest integration tests for the Gen 3 Move Tutor extraction pipeline.

## Technical Requirements
1. Use `vitest-browser-react` to write integration tests validating the parsing logic.
2. Mock save files for both Emerald and FireRed/LeafGreen.
3. Test that extraction yields the correct Move Tutor states based on the mocked save data.
4. Test that extraction logic handles parsing failures and corrupted states gracefully (e.g., throwing descriptive errors or returning safe default objects based on parsing architecture).

## Acceptance Criteria
- [x] Vitest tests verify successful parsing for Emerald and FireRed/LeafGreen.
- [x] Vitest tests handle parsing failures/corrupted states gracefully.

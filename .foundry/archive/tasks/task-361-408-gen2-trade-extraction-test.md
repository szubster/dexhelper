---
id: task-361-408-gen2-trade-extraction-test
type: TASK
title: Gen 2 NPC Trade Extraction Testing
status: COMPLETED
owner_persona: coder
created_at: '2026-08-08'
updated_at: '2026-08-09'
depends_on:
  - task-361-407-gen2-trade-extraction-impl
jules_session_id: null
pr_number: null
parent: story-349-361-gen2-trade-extraction
tags:
  - test
  - backend
  - save-parsing
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---
# Task: Gen 2 NPC Trade Extraction Testing

## Objective
Write robust unit tests for the Gen 2 NPC trade extraction implementation to verify correctness across versions and handling of corrupted saves.

## Acceptance Criteria
- [x] Add unit test verifying that Gold/Silver save layouts correctly map the extracted `npcTradeFlags`.
- [x] Add unit test verifying that Crystal save layouts correctly map the extracted `npcTradeFlags`.
- [x] Add unit test verifying that a specific `Error('The save file is corrupted or incomplete.')` is thrown when `DataView` triggers a `RangeError` on out-of-bounds reads.

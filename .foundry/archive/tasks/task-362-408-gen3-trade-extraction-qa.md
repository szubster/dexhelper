---
id: task-362-408-gen3-trade-extraction-qa
type: TASK
title: QA Gen 3 NPC Trade Extraction
status: COMPLETED
owner_persona: qa
created_at: '2026-08-08'
updated_at: '2026-08-09'
depends_on:
  - task-362-407-gen3-trade-extraction-impl
jules_session_id: null
pr_number: null
parent: story-349-362-gen3-trade-extraction
tags:
  - feature
  - qa
  - save-parsing
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---
# Task: QA Gen 3 NPC Trade Extraction

## Objective
Verify the implementation of the Gen 3 NPC trade extraction logic.

## Acceptance Criteria
- [x] Verify `npcTradeFlags` is populated correctly.
- [x] Verify implementation strictly adheres to the `DataView` API usage.
- [x] Verify `RangeError` is handled correctly and throws exactly "The save file is corrupted or incomplete."
- [x] Verify all constants are extracted correctly and no magic numbers are used.
- [x] Verify relative offsets are used correctly for Gen 3.
- [x] Tests pass locally (`pnpm test`).

### SCHEMA
https://github.com/szubster/dexhelper/blob/main/.foundry/docs/schema.md

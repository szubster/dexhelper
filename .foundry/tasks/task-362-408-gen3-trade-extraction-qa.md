---
id: task-362-408-gen3-trade-extraction-qa
type: TASK
title: QA Gen 3 NPC Trade Extraction
status: PENDING
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
- [ ] Verify `npcTradeFlags` is populated correctly.
- [ ] Verify implementation strictly adheres to the `DataView` API usage.
- [ ] Verify `RangeError` is handled correctly and throws exactly "The save file is corrupted or incomplete."
- [ ] Verify all constants are extracted correctly and no magic numbers are used.
- [ ] Verify relative offsets are used correctly for Gen 3.
- [ ] Tests pass locally (`pnpm test`).

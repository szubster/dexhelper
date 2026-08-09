---
id: task-361-409-gen2-trade-extraction-qa
type: TASK
title: Gen 2 NPC Trade Extraction QA
status: ACTIVE
owner_persona: qa
created_at: '2026-08-08'
updated_at: '2026-08-09'
depends_on:
  - .foundry/tasks/task-361-408-gen2-trade-extraction-test.md
jules_session_id: '14509821843729640775'
pr_number: null
parent: story-349-361-gen2-trade-extraction
tags:
  - test
  - qa
  - save-parsing
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---
# Task: Gen 2 NPC Trade Extraction QA

## Objective
Verify the Gen 2 NPC trade extraction implementation and testing suite to ensure correctness and adherence to architectural guidelines.

## Acceptance Criteria
- [ ] Verify that `NPC_TRADE_FLAGS_OFFSET_CRYSTAL`, `NPC_TRADE_FLAGS_OFFSET_GS`, and `GEN2_NPC_TRADE_COUNT` are strictly defined as module-level constants (no inline magic numbers).
- [ ] Ensure that `DataView.getUint8` is correctly utilized for bitwise parsing without architectural regressions.
- [ ] Ensure `RangeError` from the `DataView` API gracefully throws `Error('The save file is corrupted or incomplete.')`.
- [ ] Verify that tests added correctly assert both G/S and Crystal offsets, as well as the error handling behaviors.
- [ ] Run test suite (`pnpm test`) and confirm it passes.

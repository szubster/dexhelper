---
id: task-518-604-binjgb-memory-sync-qa-v2
type: TASK
title: QA Verification for binjgb memory synchronization v2
status: PENDING
owner_persona: qa
created_at: '2026-09-20'
updated_at: '2026-09-20'
depends_on:
  - task-518-603-binjgb-memory-sync-impl-v2
jules_session_id: null
pr_number: null
parent: story-426-518-binjgb-memory-sync
tags:
  - wasm
  - emulator
  - qa
research_references: []
rejection_count: 0
rejection_reason: ''
notes: 'Created as replacement for permanently failed task-518-530-binjgb-memory-sync-qa'
locks: []
---

# QA Verification for binjgb memory synchronization v2

Verify that the `binjgb` memory synchronization correctly extracts the save state during gameplay and that the DexHelper application updates real-time suggestions accordingly, without performance degradation.

## Acceptance Criteria
- [ ] Verify that starting a Gen 1/2 game in the emulator correctly tracks live stats in the UI.
- [ ] Verify that saving the game in-emulator properly syncs with `SaveHistoryDB`.
- [ ] Ensure the emulator maintains performance during the polling/synchronization cycle.

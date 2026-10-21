---
id: task-518-692-binjgb-memory-sync-qa-v3
type: TASK
title: QA Verification for binjgb memory synchronization v3
status: ACTIVE
owner_persona: qa
created_at: '2026-10-16T12:43:11.000Z'
updated_at: '2026-10-21'
depends_on:
  - task-518-691-binjgb-memory-sync-impl-v3
jules_session_id: '230950114835485925'
pr_number: null
parent: story-426-518-binjgb-memory-sync
tags:
  - wasm
  - emulator
  - qa
research_references: []
rejection_count: 0
rejection_reason: ''
notes: >-
  Created as replacement for permanently failed
  task-518-604-binjgb-memory-sync-qa-v2
locks: []
---

# QA Verification for binjgb memory synchronization v3

Verify that the `binjgb` memory synchronization correctly extracts the save state during gameplay and that the DexHelper application updates real-time suggestions accordingly, without performance degradation.

## Acceptance Criteria
- [ ] Verify that starting a Gen 1/2 game in the emulator correctly tracks live stats in the UI.
- [ ] Verify that saving the game in-emulator properly syncs with `SaveHistoryDB`.
- [ ] Ensure the emulator maintains performance during the polling/synchronization cycle.

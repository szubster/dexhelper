---
id: task-518-603-binjgb-memory-sync-impl-v2
type: TASK
title: Implement real-time synchronization with DexHelper Save DB v2
status: PENDING
owner_persona: coder
created_at: '2026-09-20'
updated_at: '2026-09-20'
depends_on:
  - task-518-602-binjgb-bindings-impl-v2
jules_session_id: null
pr_number: null
parent: story-426-518-binjgb-memory-sync
tags:
  - wasm
  - emulator
  - gen1
  - gen2
research_references: []
rejection_count: 0
rejection_reason: ''
notes: 'Created as replacement for permanently failed task-518-529-binjgb-memory-sync-impl'
locks: []
---

# Implement real-time synchronization with DexHelper Save DB v2

Implement a synchronization layer that takes the extracted `saveStateBuffer` from `binjgb` and passes it to the DexHelper parsing engine, saving it via `SaveHistoryDB` for real-time stat tracking and suggestions.

## Acceptance Criteria
- [ ] Implement a synchronization mechanism (e.g., polling or hooked events) to periodically fetch the `saveStateBuffer`.
- [ ] Pass the extracted data into the DexHelper save parser.
- [ ] Save the parsed state to `SaveHistoryDB`.
- [ ] Write integration tests for the memory synchronization flow.

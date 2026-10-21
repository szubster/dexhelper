---
id: task-518-691-binjgb-memory-sync-impl-v3
type: TASK
title: Implement real-time synchronization with DexHelper Save DB v3
status: ACTIVE
owner_persona: coder
created_at: '2026-10-16T12:43:11.000Z'
updated_at: '2026-10-20'
depends_on:
  - research-518-690-investigate-binjgb-memory-sync-failure
jules_session_id: '15323530033637786008'
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
notes: >-
  Created as replacement for permanently failed
  task-518-603-binjgb-memory-sync-impl-v2
locks: []
---

# Implement real-time synchronization with DexHelper Save DB v3

Implement a synchronization layer that takes the extracted `saveStateBuffer` from `binjgb` and passes it to the DexHelper parsing engine, saving it via `SaveHistoryDB` for real-time stat tracking and suggestions. This version should incorporate learnings from the research investigation.

## Acceptance Criteria
- [x] Implement a synchronization mechanism to periodically fetch the `saveStateBuffer`.
- [x] Pass the extracted data into the DexHelper save parser.
- [x] Save the parsed state to `SaveHistoryDB`.
- [x] Write integration tests for the memory synchronization flow.

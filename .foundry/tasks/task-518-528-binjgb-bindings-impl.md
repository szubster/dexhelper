---
id: task-518-528-binjgb-bindings-impl
type: TASK
title: Implement Javascript bindings for binjgb save extraction
status: ACTIVE
owner_persona: coder
created_at: '2026-09-02'
updated_at: '2026-09-06'
depends_on: []
jules_session_id: '17522657112883340111'
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
notes: ''
locks: []
---

# Implement Javascript bindings for binjgb save extraction

Implement the javascript bindings to extract the `saveStateBuffer` directly from the `binjgb` emulator's WebAssembly memory space. This avoids the need for manual file-based exports.

## Acceptance Criteria
- [ ] Expose an API function to retrieve the raw `saveStateBuffer` array from the `binjgb` WASM instance.
- [ ] Ensure the memory extraction handles active gameplay seamlessly.
- [ ] Write unit tests for the extraction logic.

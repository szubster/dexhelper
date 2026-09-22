---
id: task-518-602-binjgb-bindings-impl-v2
type: TASK
title: Implement Javascript bindings for binjgb save extraction v2
status: READY
owner_persona: coder
created_at: '2026-09-20'
updated_at: '2026-09-20'
depends_on:
  - research-528-569-investigate-binjgb-save-exports
jules_session_id: null
pr_number: null
parent: story-426-518-binjgb-memory-sync
tags:
  - wasm
  - emulator
  - gen1
  - gen2
research_references:
  - .foundry/docs/knowledge_base/architecture/binjgb_exports.md
rejection_count: 0
rejection_reason: ''
notes: 'Created as replacement for permanently failed task-518-528-binjgb-bindings-impl'
locks: []
---

# Implement Javascript bindings for binjgb save extraction v2

Implement the javascript bindings to extract the `saveStateBuffer` directly from the `binjgb` emulator's WebAssembly memory space, utilizing the newly discovered WASM exports from the research phase.

## Acceptance Criteria
- [ ] Expose an API function to retrieve the raw `saveStateBuffer` array from the `binjgb` WASM instance using the `_ext_ram_file_data_new`, `_get_file_data_ptr`, `_get_file_data_size`, and `_file_data_delete` exports.
- [ ] Ensure the memory extraction handles active gameplay seamlessly.
- [ ] Write unit tests for the extraction logic.

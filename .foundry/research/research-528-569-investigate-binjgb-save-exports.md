---
id: research-528-569-investigate-binjgb-save-exports
type: RESEARCH
title: Investigate binjgb WASM memory exports for save extraction
status: ACTIVE
owner_persona: researcher
created_at: '2026-09-14'
updated_at: '2026-09-16'
depends_on: []
jules_session_id: '5248477642024396562'
pr_number: null
parent: task-518-528-binjgb-bindings-impl
tags:
  - wasm
  - emulator
  - gen1
  - gen2
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Investigate binjgb WASM memory exports for save extraction

In order to extract the saveStateBuffer directly from the binjgb emulator's WebAssembly memory space, we need to know the exact function names exported by the WASM module.
Since the binjgb.js and binjgb.wasm files are not present in the repository, we lack the context to definitively know which exports are available.

## Acceptance Criteria
- [ ] Investigate the availability of `binjgb` or equivalent as an npm package, as requested by the code reviewer.
- [ ] Determine the exact WASM exports used by binjgb to retrieve the SRAM pointer and size.
- [ ] Document the correct function signatures to be added to BinjgbModule.

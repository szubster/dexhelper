---
id: epic-421-426-binjgb-integration
type: EPIC
title: Implement binjgb WASM Emulator Integration for Gen 1 & 2
status: ACTIVE
owner_persona: epic_planner
created_at: '2026-08-17'
updated_at: '2026-09-02'
depends_on: []
jules_session_id: '5559109384774389637'
pr_number: null
parent: adr-421-032-wasm-emulator-selection
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

# Implement binjgb WASM Emulator Integration for Gen 1 & 2

Integrate `binjgb` via WASM to provide an embedded Game Boy emulator for Gen 1 and 2 titles, in accordance with ADR 032.
Extract the save state (`saveStateBuffer`) and directly access the emulator's memory space via Javascript bindings to synchronize with the parsing engine for real-time suggestions.

## Acceptance Criteria
- [x] Create Story breakdown to implement binjgb WASM module wrapper and React component.
- [x] Create Story breakdown to implement real-time memory synchronization with DexHelper Save DB for Gen 1 & 2.
- [ ] story-426-517-binjgb-wasm-wrapper
- [ ] story-426-518-binjgb-memory-sync
- [ ] story-426-519-binjgb-integration-e2e

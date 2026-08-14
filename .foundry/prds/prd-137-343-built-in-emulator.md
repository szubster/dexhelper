---
id: prd-137-343-built-in-emulator
type: PRD
title: Built-in Emulator Integration
status: ACTIVE
owner_persona: epic_planner
created_at: '2026-08-13'
updated_at: '2026-08-14'
depends_on: []
jules_session_id: '13026451573028062878'
pr_number: null
parent: idea-137-builtin-emulator
tags:
  - emulator
  - research
  - core
rejection_count: 0
rejection_reason: ''
notes: ''
---

# PRD: Built-in Emulator Integration (No ROMs Included)

## Context
DexHelper currently relies entirely on users manually exporting and uploading `.sav` files to track their progress. This creates a highly friction-filled user experience and prevents live, turn-by-turn game assistance, route tracking, or reactive combat help during active play.

To address this, we want to embed a high-performance, open-source Game Boy (GB/GBC) and Game Boy Advance (GBA) emulator directly in the browser using WebAssembly (WASM).

## Scope
1.  **Emulator Selection & Integration**: Integrate `mGBA` or `binjgb` via WASM. Ensure it has memory mapping visibility so that we can read from memory rather than the save file sector.
2.  **Zero ROM Policy**: Users must provide their own `.gba` or `.gbc` files via a local file picker or drag-and-drop. No ROMs can be hosted or bundled. These ROMs should be stored securely in the browser's persistent storage (like IndexedDB or LocalStorage) to persist across sessions but must never be transmitted over the network or transferred from the client device.
3.  **Real-Time Ram Reading**: Establish a direct channel to read WASM memory buffers in real-time, mapping standard save blocks and game state variables continuously.
4.  **Reactive UI Foundation**: Ensure the existing React UI components can reactively re-render based on these live memory streams, transforming DexHelper from a static tool to a real-time live companion.

## Acceptance Criteria
- [ ] Epic Planner: Break down this PRD into EPIC nodes that address emulator integration, memory reading, and reactive UI updates.

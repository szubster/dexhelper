---
id: idea-731-wasm-save-parser-worker-offloading
type: IDEA
title: WebWorker Offloading & Transferable ArrayBuffer Stream for Heavy Save Parsing
status: PENDING
owner_persona: product_manager
created_at: "2026-10-28"
updated_at: "2026-10-28"
depends_on: []
jules_session_id: null
locks: []
pr_number: null
parent: null
priority: 50
confidence_score: 100
tags:
  - webworker
  - save-parser
  - performance
  - dx
research_references: []
experiment_variants: []
rejection_count: 0
system_failure_count: 0
rejection_reason: ""
notes: ""
---

# WebWorker Offloading & Transferable ArrayBuffer Stream for Heavy Save Parsing

## Context & Problem Statement
Currently, DexHelper processes binary save files (`.sav`) and WASM emulator RAM syncs directly on the main UI thread (e.g., in synchronous parser calls and Zustand state updates). When parsing multi-slot Gen 3 saves or executing multi-save matrix diffing (as identified in `.foundry/journals/architect_visionary/2026-10-19-03-00-00.md` and `.foundry/ideas/idea-540-multi-save-diffing-and-trade-simulation.md`), parsing heavy data blocks (such as Pokémon PC box structure decoding, checksum validation, and roamer/berry state extraction) can block the main JS thread. This results in UI jank, dropped frames during canvas animations, and degraded Developer Experience (DX).

## Proposed Solution
Offload binary save file decoding, bitwise block extraction, and multi-save matrix comparisons into a dedicated Web Worker pipeline utilizing `Transferable` `ArrayBuffer` objects:
1. **Save Worker Pipeline (`saveParser.worker.ts`)**: Create a worker module that receives raw `ArrayBuffer` save data, performs parsing/validation off main thread, and transfers structured result objects back.
2. **Transferable Zero-Copy Transfers**: Use zero-copy `Transferable` ArrayBuffers when transferring binary save data to and from the worker.
3. **Async Hook Integration (`useAsyncSaveParser`)**: Provide a React hook wrapper that exposes worker parsing states (loading, error, progress) without blocking main thread render loops.

## Impact & Value
- Eliminates main thread jank and UI frame drops during save file upload and live WASM emulator memory extraction.
- Improves application performance and testability by decoupling parsing execution from React component lifecycle.
- Facilitates smooth scaling for multi-save matrix diffing and trade simulations.

## Acceptance Criteria
- [ ] Create Web Worker module `saveParser.worker.ts` for off-main-thread save parsing.
- [ ] Implement zero-copy `Transferable` ArrayBuffer message passing between main thread and worker.
- [ ] Expose `useAsyncSaveParser` hook for seamless React UI integration.
- [ ] Add unit tests verifying asynchronous worker message handling and fallback parsing.

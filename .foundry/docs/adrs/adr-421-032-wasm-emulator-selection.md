---
id: adr-421-032-wasm-emulator-selection
type: ADR
title: 'ADR 032: WASM Emulator Selection'
status: READY
owner_persona: architect
created_at: '2026-08-17'
updated_at: '2026-08-17'
depends_on: []
jules_session_id: null
pr_number: null
parent: task-421-435-wasm-emulator-adr
tags:
  - architecture
  - wasm
  - emulator
research_references:
  - .foundry/docs/knowledge_base/architecture/wasm_emulators.md
rejection_count: 0
rejection_reason: ''
notes: ''
---

# ADR 032: WASM Emulator Selection

## Status
Accepted

## Context
To provide an integrated, in-browser emulation experience with live stat tracking for DexHelper, we evaluated WebAssembly (WASM) and Javascript emulators (mGBA, binjgb, SkyEmu). The primary focus is on Gen 1, Gen 2, and Gen 3 compatibility, performance, and the ability to cleanly extract the `.sav` (SRAM) data during gameplay for our save parser. The CEO has approved a multi-emulator architecture.

## Decision
We will adopt a multi-emulator architecture to maximize performance and compatibility across different game generations.

1. **Gen 1 & Gen 2**: We will use `binjgb`. It offers a highly optimized, lightweight footprint tailored specifically for browser execution of 8-bit systems, providing extreme lightweight performance and simple WASM memory integration.
2. **Gen 3**: We will use either `mGBA` or `SkyEmu` (both compiled to WASM) to handle Game Boy Advance titles, as both provide excellent cross-platform web support and high accuracy.

### Technical Approach for Integration and Save Data Extraction
- **binjgb (Gen 1 & 2)**: Utilize the provided `binjgb.js` and `binjgb.wasm` interface. Extract the save state (`saveStateBuffer`) directly via Javascript bindings to synchronize with our parsing engine.
- **mGBA / SkyEmu (Gen 3)**: Integrate the WASM build into the client-side Single Page App. Implement a synchronization layer to extract the SRAM/Save data from the emulator's memory or persistent save state slots and pass it to the DexHelper parsing engine.

## Consequences
- **Positive**: We achieve optimal performance for each specific generation without compromising accuracy.
- **Positive**: Direct memory access via WASM enables clean, real-time extraction of `.sav` data for the save parser.
- **Negative**: Increases architectural complexity by requiring the integration and maintenance of multiple distinct emulator engines and their respective memory interfaces.

## Acceptance Criteria
- [ ] Implement the integration for `binjgb` for Gen 1 & 2.
- [ ] Implement the integration for Gen 3 emulator (`mGBA` or `SkyEmu`).
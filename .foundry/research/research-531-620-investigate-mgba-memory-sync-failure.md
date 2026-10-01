---
id: research-531-620-investigate-mgba-memory-sync-failure
type: RESEARCH
title: Investigate mGBA Core Memory Sync Logic Failure
status: READY
owner_persona: researcher
created_at: '2026-09-24'
updated_at: '2026-09-30'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-427-531-mgba-memory-sync
tags:
  - wasm
  - emulator
  - gen3
  - mgba
  - memory
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
locks: []
---

# Investigate mGBA Core Memory Sync Logic Failure

Investigate the root cause of the failure for `task-531-568-mgba-memory-sync-core` which reached the max rejection count.

## Acceptance Criteria
- [x] Determine why memory extraction from mGBA WASM JS bindings failed.
- [x] Propose a solution for correctly extracting SRAM/Save data and feeding it to DexHelper.

## Findings

The failure of the previous task (`task-531-568-mgba-memory-sync-core`) occurred because there was confusion about how to correctly interact with the `mGBA` Emscripten WASM environment to extract the live game memory/SRAM.

Investigation into the `@thenick775/mgba-wasm` package (version 2.5.1) used by the project reveals that the compiled WebAssembly module already exposes a convenient high-level JavaScript API. Among its exported methods is `getSave(): Uint8Array | null`, which directly reads and returns the currently loaded game save data directly from the emulator's memory space.

This method completely fulfills the requirement mandated by `ADR 032` and `schema.md` to "extract SRAM/Save data directly from the emulator's memory space via Javascript bindings during active gameplay."

To integrate this correctly with the React component and DexHelper parsing engine:
1. Ensure the `MGBAWasmModule` type definition in `src/emulator/mgba/types.ts` is updated to include the `getSave(): Uint8Array | null` method.
2. The core logic can simply call `module.getSave()` on an interval or via an event listener during gameplay, and pass the resulting `Uint8Array` directly to the DexHelper parsing engine.

By using the existing `getSave()` binding instead of attempting to manually read raw Emscripten heap pointers (`HEAP8`, `_malloc`), we eliminate architectural complexity and resolve the synchronization failure cleanly.

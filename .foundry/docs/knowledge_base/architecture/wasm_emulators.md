# WASM Emulator Options Research

## Context
To provide an integrated, in-browser emulation experience with live stat tracking for DexHelper, we evaluated WebAssembly (WASM) emulators. The primary focus is on Gen 1, Gen 2, and Gen 3 compatibility, performance, and the ability to cleanly extract the `.sav` (SRAM) data during gameplay for our save parser.

## Candidates

### 1. mGBA
*   **Supported Consoles:** Game Boy, Game Boy Color, Game Boy Advance (Gen 1-3).
*   **Features:** Highly accurate Game Boy Advance hardware support. Game Boy/Game Boy Color hardware support. Fast emulation (known to run at full speed even on low end hardware). Local (same computer) link cable support.
*   **Integration Path:** mGBA can be compiled to WASM. Existing projects like `wasmGBA` demonstrate its viability as a web-based frontend. It can be integrated as a Single Page App running entirely client-side to play GB, GBC, and GBA ROMs.

### 2. binjgb
*   **Supported Consoles:** Game Boy, Game Boy Color (Gen 1-2 only).
*   **Features:** Runs in the browser using WebAssembly. Cycle accurate, passes many timing tests. Supports various MBCs (MBC1, MBC3, MBC5). Save/load battery backup, save/load emulator state to file. Fast-forward, rewind.
*   **Integration Path:** Provides a simple `binjgb.js` and `binjgb.wasm` interface. Javascript bindings allow extracting the save state (`saveStateBuffer`) which can be used to synchronize with our parsing engine.

## Evaluation
While `binjgb` offers a highly optimized, lightweight footprint tailored specifically for browser execution of 8-bit systems, it strictly supports Gen 1 and Gen 2. Because DexHelper now supports Gen 3 (RSE, FRLG) save parsing and features, using an emulator that only supports older games would fragment the user experience and limit future capabilities.

`mGBA` provides a unified engine capable of handling all three generations (GB, GBC, GBA) required by the project. It offers high accuracy and robust features and is proven to work in the browser via WASM.

## Recommendation
mGBA is the recommended emulator for the web-based DexHelper application due to its comprehensive Gen 1-3 support. We need an ADR to formalize this choice and establish the integration strategy for extracting save files from the WASM environment.

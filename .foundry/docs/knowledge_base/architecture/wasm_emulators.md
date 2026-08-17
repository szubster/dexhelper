# WASM Emulator Options Research

## Context
To provide an integrated, in-browser emulation experience with live stat tracking for DexHelper, we evaluated WebAssembly (WASM) emulators. The primary focus is on Gen 1, Gen 2, and Gen 3 compatibility, performance, and the ability to cleanly extract the `.sav` (SRAM) data during gameplay for our save parser.

## Candidates

### 1. binjgb
*   **Supported Consoles:** Game Boy, Game Boy Color (Gen 1-2 only).
*   **Features:** Runs in the browser using WebAssembly. Cycle accurate, passes many timing tests. Supports various MBCs (MBC1, MBC3, MBC5). Save/load battery backup, save/load emulator state to file. Fast-forward, rewind.
*   **Integration Path:** Provides a simple `binjgb.js` and `binjgb.wasm` interface. Javascript bindings allow extracting the save state (`saveStateBuffer`) which can be used to synchronize with our parsing engine.

### 2. mGBA
*   **Supported Consoles:** Game Boy, Game Boy Color, Game Boy Advance (Gen 1-3).
*   **Features:** Highly accurate Game Boy Advance hardware support. Game Boy/Game Boy Color hardware support. Fast emulation (known to run at full speed even on low end hardware). Local (same computer) link cable support.
*   **Integration Path:** mGBA can be compiled to WASM. Existing projects like `wasmGBA` demonstrate its viability as a web-based frontend. It can be integrated as a Single Page App running entirely client-side to play GB, GBC, and GBA ROMs.

## Evaluation
`binjgb` offers a highly optimized, lightweight footprint tailored specifically for browser execution of 8-bit systems. Its direct Javascript bindings and memory access make it an excellent choice for Gen 1 and Gen 2 games.
However, it lacks Game Boy Advance support. To support Gen 3 (RSE, FRLG) save parsing and features, we need an emulator capable of running GBA ROMs.
`mGBA` provides high accuracy and robust features for Game Boy Advance and is proven to work in the browser via WASM.

Since we are not constrained to a single emulator, we can utilize a multi-emulator architecture, deploying the best tool for each specific generation.

## Recommendation
We recommend a multi-emulator strategy:
1. **Gen 1 & Gen 2:** Use `binjgb` for its extreme lightweight performance and simple WASM memory integration tailored for 8-bit games.
2. **Gen 3:** Use `mGBA` (compiled to WASM) to handle Game Boy Advance titles.

We need an ADR to formalize this multi-emulator architecture and establish the integration strategy for extracting save files from these environments.

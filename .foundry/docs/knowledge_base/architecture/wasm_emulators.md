# WASM Emulator Options Research

## Context
To provide an integrated, in-browser emulation experience with live stat tracking for DexHelper, we evaluated WebAssembly (WASM) and Javascript emulators. The primary focus is on Gen 1, Gen 2, and Gen 3 compatibility, performance, and the ability to cleanly extract the `.sav` (SRAM) data during gameplay for our save parser.

## Candidates

### 1. binjgb
*   **Supported Consoles:** Game Boy, Game Boy Color (Gen 1-2 only).
*   **Features:** Runs in the browser using WebAssembly. Cycle accurate, passes many timing tests. Supports various MBCs (MBC1, MBC3, MBC5). Save/load battery backup, save/load emulator state to file. Fast-forward, rewind.
*   **Integration Path:** Provides a simple `binjgb.js` and `binjgb.wasm` interface. Javascript bindings allow extracting the save state (`saveStateBuffer`) which can be used to synchronize with our parsing engine.

### 2. mGBA
*   **Supported Consoles:** Game Boy, Game Boy Color, Game Boy Advance (Gen 1-3).
*   **Features:** Highly accurate Game Boy Advance hardware support. Game Boy/Game Boy Color hardware support. Fast emulation (known to run at full speed even on low end hardware). Local (same computer) link cable support.
*   **Integration Path:** mGBA can be compiled to WASM. Existing projects like `wasmGBA` demonstrate its viability as a web-based frontend. It can be integrated as a Single Page App running entirely client-side to play GB, GBC, and GBA ROMs.

### 3. SkyEmu
*   **Supported Consoles:** Game Boy, Game Boy Color, Game Boy Advance, Nintendo DS (Gen 1-4).
*   **Features:** Low-level emulator. Highly accurate Game Boy Advance emulation. High Quality Upscaling Shaders, Color Correction, and Screen Ghosting. Game Controller and Rumble Support. 4x Persistent Save State Slots. Game fastforward and rewind support. Action Replay Cheat Code Engine. Support for emulating the Real Time Clock and Solar Sensor.
*   **Integration Path:** Officially supports a Web Build (`web.skyemu.app`). The web app emulates everything locally using web assembly and javascript. Save files can be loaded by dragging them onto the page or loading them using the ROM file picker.

### 4. IodineGBA
*   **Supported Consoles:** Game Boy Advance (Gen 3).
*   **Features:** Pure JavaScript (HTML5 Canvas and JS Audio API) Game Boy Advance emulator.
*   **Integration Path:** Native to the browser ecosystem, but lacks the performance benefits of WebAssembly compilation. Not ideal for modern use cases given the availability of WASM ports.

## Evaluation
`binjgb` offers a highly optimized, lightweight footprint tailored specifically for browser execution of 8-bit systems. Its direct Javascript bindings and memory access make it an excellent choice for Gen 1 and Gen 2 games.
However, it lacks Game Boy Advance support. To support Gen 3 (RSE, FRLG) save parsing and features, we need an emulator capable of running GBA ROMs.
`mGBA` provides high accuracy and robust features for Game Boy Advance and is proven to work in the browser via WASM.
`SkyEmu` is also a very strong modern contender that supports all required generations and is explicitly built with web support in mind.
`IodineGBA` is historically significant but its pure JS architecture makes it less desirable than modern WASM solutions.

Since we are not constrained to a single emulator, we can utilize a multi-emulator architecture, deploying the best tool for each specific generation.

## Recommendation
We recommend a multi-emulator strategy to maximize performance and compatibility:
1. **Gen 1 & Gen 2:** Use `binjgb` for its extreme lightweight performance and simple WASM memory integration tailored for 8-bit games.
2. **Gen 3:** Use either `mGBA` or `SkyEmu` (both compiled to WASM) to handle Game Boy Advance titles, as both provide excellent cross-platform web support.

We need an ADR to formalize this multi-emulator architecture and establish the integration strategy for extracting save files from these environments.

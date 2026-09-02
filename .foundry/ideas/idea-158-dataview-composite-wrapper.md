---
id: idea-158-dataview-composite-wrapper
type: IDEA
title: DataView Composite Wrapper & Save Parser Abstraction
status: ACTIVE
owner_persona: product_manager
created_at: '2026-08-20'
updated_at: '2026-09-02'
depends_on: []
jules_session_id: '1000174922466916997'
pr_number: null
parent: null
tags:
  - architecture
  - dataview
  - save-parser
  - abstraction
  - testing
  - refactoring
rejection_count: 0
rejection_reason: ''
notes: ''
---

# DataView Composite Wrapper & Save Parser Abstraction

## Context & Vision
Currently, save file parsers across all Generations (Gen 1, Gen 2, Gen 3) directly manipulate native JavaScript `DataView` instances and invoke low-level methods (`getUint8`, `getUint16`, `getUint32`, manual bit-shifting, and bit-flag masking). This approach leads to significant repetition across parser functions, verbose bit-parsing boilerplate, and fragile offset calculations.

By introducing a composite wrapper around `DataView` (e.g. `SaveDataReader` or `DataViewWrapper`), we can encapsulate common binary save file parsing idioms into clean, reusable helper methods.

Furthermore, equipping this wrapper with generation-specific mixins or extenders (e.g., Gen 1, Gen 2, and Gen 3 save reader extensions) will drastically simplify save parsing logic, streamline unit testing, and standardize offset handling.

In the future, decoupling parsers from raw `DataView` through an abstract reader interface will allow seamlessly swapping the underlying binary reader implementation (e.g., for WASM built-in emulators, memory-mapped buffers, or live memory inspection).

## Value Proposition & Key Features
- **Code Reuse & Reduction:** Eliminates repetitive bitwise operations and endianness flags by providing built-in methods for bit flags, bitfield extraction, string decoding, BCD decoding, array slices, and packed structures.
- **Generation-Specific Extenders/Mixins:** Allows extending the base wrapper with generation-tailored helpers (e.g., Gen 3 checksum validation, section offset resolution, string character table translation).
- **Alternative Reader Implementations for WASM:** Decouples high-level save domain logic from `DataView` internals, paving the way for WASM-backed emulator memory readers or streaming binary buffers.
- **Dramatically Simplified Testing:** Mocking save data or creating synthetic binary test fixtures becomes trivial with custom mock implementations or test builder methods on the reader.

## Proposed Architecture
1. **Base Reader Interface (`ISaveDataReader` / `SaveDataReader`):**
   - Core getters: `readUint8(offset)`, `readUint16(offset, littleEndian?)`, `readUint32(offset, littleEndian?)`, `readInt8`, `readInt16`.
   - Bit operations: `readBit(offset, bitIndex)`, `readBits(offset, bitOffset, numBits)`, `readFlag(offset, bitMask)`.
   - Structural helpers: `readBytes(offset, length)`, `readString(offset, length, characterMap)`.
2. **Generation Extensions / Mixins:**
   - Gen 1/2 BCD & text decoding helpers.
   - Gen 3 `SaveBlock1`/`SaveBlock2` relative section offset resolution helpers.
3. **Parser Refactoring:**
   - Progressively refactor existing save parsers (`src/engine/saveParser/parsers/*`) to use the wrapper.

## Acceptance Criteria
- [ ] Product Manager: Convert this IDEA into a PRD specifying the interface design, generation-specific extension requirements, and parser migration roadmap.
- [ ] Tech Lead: Define implementation tasks for creating the `SaveDataReader` composite wrapper, generation mixins, unit tests, and refactoring existing parsers.

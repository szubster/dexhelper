
## 2024-04-19 - engine/saveParser/index.ts
**Learning:** Testing `Uint8Array` properties heavily depends on correctly simulating the specific binary format of the `.sav` file. `isGen1Save` checks offset `0x2F2C` for party count (<= 6) and `0x2F2D` for `0xFF` terminator. `isGen2Save` does similar at different offsets depending on Crystal vs Gold/Silver.
**Action:** When mocking ArrayBuffers to verify fallback logic or corrupt saves, meticulously recreate the minimal set of valid bytes required by the structural checks (e.g., party terminators, Pikachu identifiers) before breaking checksums, otherwise the fallback won't be triggered.
## 2026-04-19 - Unit tests for common save parsers
**What:** Tested `byte`, `decodeGen12String`, `parseDVs`, and `checkShiny` in `common.ts`
**Coverage Before/After:** Gained test coverage for these basic data decoding utility functions
**Why this target matters:** These pure utility functions are the foundation of all generation 1 and 2 save parsers. By verifying their decoding stability, we ensure all other features downstream correctly interpret fundamental save data types.

## 2026-04-19 - Using vitest specific matchers and utilities
**What:** Switched test cases in `common.test.ts` from classic `for` loops and repetition to `test.each`.
**Why:** Vitest features like `test.each` improve test reporting, readability, and traceablity for data-driven checks (like iterating variants). By utilizing them, tests become more robust and generate cleaner UI feedback.

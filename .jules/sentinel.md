
## 2026-04-19 - Unit tests for common save parsers
**What:** Tested `byte`, `decodeGen12String`, `parseDVs`, and `checkShiny` in `common.ts`
**Coverage Before/After:** Gained test coverage for these basic data decoding utility functions
**Why this target matters:** These pure utility functions are the foundation of all generation 1 and 2 save parsers. By verifying their decoding stability, we ensure all other features downstream correctly interpret fundamental save data types.

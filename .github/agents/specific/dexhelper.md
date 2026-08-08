## DexHelper & Pokemon Data Guidelines
- When serializing/deserializing application data structures (`PokeData`), use MsgPack (`msgpackr`) with `useRecords: true`.
- Adhere to the PokeData Property Naming Schema (full, readable property names like `captureRate` instead of `cr`, `evolvesTo` instead of `eto`).
- For save file parsing, define all memory offsets, shifts, and bit locations as reusable constants at the module level. Inline magic numbers are forbidden.
- For Gen 3 save block extraction, pass and utilize the resolved section offset (e.g., `section1Offset`) to support A/B bank flash memory architecture.
- Handle `RangeError` from `DataView` out-of-bounds reads and throw a new error: "The save file is corrupted or incomplete."

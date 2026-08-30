## DexHelper & Pokemon Data Guidelines
- When serializing/deserializing application data structures (`PokeData`), use MsgPack (`msgpackr`) with `useRecords: true`.
- Adhere to the PokeData Property Naming Schema (full, readable property names like `captureRate` instead of `cr`, `evolvesTo` instead of `eto`).
- For Gen 3 save block extraction, pass and utilize the resolved section offset (e.g., `section1Offset`) to support A/B bank flash memory architecture.

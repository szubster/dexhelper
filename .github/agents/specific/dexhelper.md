## DexHelper & Pokemon Data Guidelines
- When serializing/deserializing application data structures (`PokeData`), use MsgPack (`msgpackr`) with `useRecords: true`.
- Adhere to the PokeData Property Naming Schema (full, readable property names like `captureRate` instead of `cr`, `evolvesTo` instead of `eto`).

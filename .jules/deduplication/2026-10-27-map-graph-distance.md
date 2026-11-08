# Map Graph Distance Deduplication

## Learnings
- **Unified Generation Fallback Mapping**: Consolidated generation-specific fallback hubs (`DEFAULT_FALLBACK_MAP_IDS`) into `src/engine/mapGraph/index.ts` (Gen 1 -> 10 / Saffron City, Gen 2 -> 0x0306 / Goldenrod City, Gen 3 -> 0 / Littleroot Town).
- **Consolidated Strategy Interfaces**: Updated Gen 1, Gen 2, and Gen 3 assistant strategies to consume the unified `getDistanceToMap` API with generation parameter.
- **Unified Test Suite**: Replaced individual `gen1Graph.test.ts`, `gen2Graph.test.ts`, and `gen3Graph.test.ts` files with `src/engine/mapGraph/index.test.ts`.

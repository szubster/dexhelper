# Unified Location Architecture (v7)

As of database version 7, the application uses a unified location model:
- `locations`, `areas`, and `location_index` stores are merged into a single `locations` store (type `UnifiedLocation`).
- Distances are precomputed at build-time using Floyd-Warshall (APSP) in `scripts/generate-pokedata.ts`.
- `MapGraph.getDistanceToMap` is now an $O(1)$ lookup using the `dist` property of the starting map.
- Indoor locations (e.g., buildings) must be resolved to their parent outdoor map ID before distance lookup using `resolveOutdoorMapId`.

## Constants
- `DB_CONFIG.VERSION = 7`
- Mapping files: `scripts/data/gen1/mapping.ts` and `scripts/data/gen2/mapping.ts` are the sources of truth for ROM-ID based connections.

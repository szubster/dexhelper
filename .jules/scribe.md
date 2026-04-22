## 2025-01-20 - Suggestion Engine Architecture

**What:** Documented `suggestionEngine.ts` core functions.
**Why:** The `suggestionEngine.ts` drives the entire assistant recommendation feature. Due to performance requirements, the core logic `generateSuggestions` must run purely synchronously (to avoid N+1 query overheads). This necessitates the `fetchAssistantApiData` function, which pre-loads all required lookup tables from IndexedDB into memory using batched requests (DataLoader).
**Pattern:**
- Two-phase execution: Async data fetching (`fetchAssistantApiData`) followed by pure synchronous logic (`generateSuggestions`).
- Priority-driven recommendation scaling: Suggestions are assigned numerical priority values depending on player friction.
    - **Highest priority (~120):** Local encounters (same map).
    - **High priority (~90-95):** Ready evolutions (has item/level).
    - **Scaling priority (~110 down to ~14):** Nearby encounters, scaling dynamically via graph traversal distance.
    - **Moderate priority (~65-85):** In-game NPC trades (higher if the player already owns the requested Pokémon).
    - **Lowest priority (~10):** Version exclusives (unobtainable without external hardware/trading).

## 2024-05-20 - Gen 1 Save Parsing Offsets

**What:** Added JSDoc for `detectGen1GameVersion`, `isGen1Save`, and `parseGen1`.
**Why:** The memory offsets used in parsing Gen 1 saves are non-obvious. Specifically, Gen 1 lacks a version byte, requiring heuristic analysis of party and Pokedex to guess the version, and Japanese or Yellow versions often shift these offsets by +1 or more bytes compared to Red/Blue. Adding this context is crucial for future maintainers debugging parsing failures.

## 2024-05-25 - Map Graph Traversal and Precomputed Distances

**What:** Added JSDoc to `getDistanceToMap` and `getOutdoorMapId` in `src/engine/mapGraph/gen1Graph.ts`.
**Why:** The distance calculation relies on a precomputed lookup table (the `dist` property) generated at build-time via the Floyd-Warshall algorithm, rather than performing real-time pathfinding (like BFS or Dijkstra). This architectural decision enables O(1) distance lookups, which is critical for performance since the suggestion engine evaluates hundreds of potential encounters simultaneously. Furthermore, because distance matrices only connect major outdoor hubs, indoor maps must dynamically resolve to their parent hub via the `prnt` property before calculations can occur. This documentation preserves the "why" behind the `dist` and `prnt` properties to prevent future maintainers from unnecessarily refactoring to real-time pathfinding.

## 2025-01-24 - Data Pipeline Scripts Documentation

**What:** Created `scripts/README.md` to document the data pipeline scripts (`generate-pokedata.ts`, `generateMapLocations.ts`, `sync-pokedata.sh`).
**Why:** The `scripts/` directory handles complex data ingestion from third-party sources (PokeAPI and Pret decompiled ROMs). The outputs heavily influence the core internal database schema (`src/db/schema.ts`). Documenting the specific upstream dependencies, the logic of flattening/compacting data, and the CI-triggered regeneration process is crucial to ensure future maintainers know how the data layer is constructed and updated.

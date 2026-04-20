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
    - **Lowest priority (~10):** Version exclusives (unobtainable without external hardware/trading).## 2024-05-20 - Gen 1 Save Parsing Offsets\n\n**What:** Added JSDoc for `detectGen1GameVersion`, `isGen1Save`, and `parseGen1`.\n**Why:** The memory offsets used in parsing Gen 1 saves are non-obvious. Specifically, Gen 1 lacks a version byte, requiring heuristic analysis of party and Pokedex to guess the version, and Japanese or Yellow versions often shift these offsets by +1 or more bytes compared to Red/Blue. Adding this context is crucial for future maintainers debugging parsing failures.

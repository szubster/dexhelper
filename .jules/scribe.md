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

## 2025-01-28 - Common Save Parser Utilities Documentation

**What:** Added JSDoc for `decodeGen12String`, `parseDVs`, and `checkShiny` in `src/engine/saveParser/parsers/common.ts`.
**Why:** The binary bitwise operations and custom text encodings used in Gen 1 and 2 are non-obvious to modern developers.
- `decodeGen12String`: Early Pokémon games do not use standard ASCII/UTF-8, but rather a custom character map (e.g., `0x80` = 'A', terminated by `0x50` or `0x00`/`0xFF`).
- `parseDVs`: DVs are stored as 4-bit nibbles across two bytes. Crucially, the HP DV is not explicitly stored; it is calculated dynamically by extracting the least significant bit (LSB) from the Attack, Defense, Speed, and Special DVs.
- `checkShiny`: In Gen 2, Shininess is determined entirely by stat DVs (making it retroactive and permanent across trades to Gen 1). A Pokémon is Shiny if Defense, Speed, and Special are exactly 10, and Attack is 2, 3, 6, 7, 10, 11, 14, or 15.
Documenting these mechanical quirks is essential for future maintainability of the parsing engine.

## 2025-05-15 - Zustand Store State Separation

**What:** Documented `src/store.ts` Zustand properties and actions.
**Why:** The `AppStore` interface mixes persisted user settings (via localStorage `partialize`, like `isLivingDex` and `filters`) with heavy transient data (like the entire parsed `saveData`) and lightweight UI view state (like `isSettingsOpen`). Documenting which properties belong to which lifecycle prevents future developers from accidentally persisting the massive `saveData` object into localStorage, which would bloat the storage quota and cause stale state bugs on reload.

## 2025-05-20 - AssistantStrategy documentation

**What:** Added JSDoc for `AssistantStrategy` interface in `src/engine/assistant/strategies/types.ts`.
**Why:** The `AssistantStrategy` interface is the core contract for adding new generations to the suggestion engine, so it should be well-documented.

### saveParser Architecture
- Gen 1 saves lack explicit version bytes, requiring heuristic detection via Pokédex exclusives and Pikachu markers.
- Yellow version shifts many memory offsets by +1 byte, requiring dynamic probing at offsets `0x25A3` and `0x25A4` to determine the correct alignment before extracting data.
- Documented these binary offsets and heuristics in `src/engine/saveParser/README.md` to prevent future regressions.
## 2026-04-20 - Gen 2 Save Parser Memory Map Dynamic Selection
**What:** Added JSDoc explaining the dynamic memory map selection in  ().
**Why:** Gen 2 memory offsets differ significantly between Gold/Silver and Crystal due to engine additions shifting data blocks. The parser dynamically probes party count locations to identify the correct map. The  parameter was also documented as a fallback override for early-game saves.
## 2026-04-20 - Gen 2 Save Parser Memory Map Dynamic Selection
**What:** Added JSDoc explaining the dynamic memory map selection in `parseGen2` (`src/engine/saveParser/parsers/gen2.ts`).
**Why:** Gen 2 memory offsets differ significantly between Gold/Silver and Crystal due to engine additions shifting data blocks. The parser dynamically probes party count locations to identify the correct map. The `forceCrystal` parameter was also documented as a fallback override for early-game saves.
## 2026-05-18 - Suggestion Engine Internal Hooks Documentation\n\n**What:** Added JSDoc for `getGameItemId` and `checkFlag` in `src/engine/assistant/suggestionEngine.ts`, and `getLocation` in `src/engine/mapGraph/gen1Graph.ts`.\n**Why:** \n- `getGameItemId`: Internal utility that maps modern PokeAPI evolution items to their Gen 1/Gen 2 hex equivalent. Crucial for understanding why evolution suggestions work differently across versions.\n- `checkFlag`: Important utility that validates bitwise event flags in save states (e.g. static encounters, gifts).\n- `getLocation`: Documents the O(1) Map cache strategy, which prevents O(N) Array.find bottlenecks during graph traversal, a critical performance optimization for the engine.\n
## 2025-05-18 - PokeDB and DexDataLoader Documentation

**What:** Added JSDoc for `bulkGet` and `syncData` in `src/db/PokeDB.ts`.
**Why:**
- `bulkGet`: Internal utility that circumvents IndexedDB's lack of a native `getAll(keys)` method by firing parallel `store.get` requests within a single transaction. This prevents massive N+1 query bottlenecks during  and  operations.
- `syncData`: Documents the build hash comparison logic (`__POKEDATA_HASH__`) that prevents redundant network downloads of `pokedata.json` during IDB hydration.

## 2025-05-18 - PokeDB and DexDataLoader Documentation

**What:** Added JSDoc for `bulkGet` and `syncData` in `src/db/PokeDB.ts`.
**Why:**
- `bulkGet`: Internal utility that circumvents IndexedDB's lack of a native `getAll(keys)` method by firing parallel `store.get` requests within a single transaction. This prevents massive N+1 query bottlenecks during suggestionEngine and dexDataLoader operations.
- `syncData`: Documents the build hash comparison logic (`__POKEDATA_HASH__`) that prevents redundant network downloads of `pokedata.json` during IDB hydration.
## 2025-05-20 - DexDataLoader Batching Strategy\n\n**What:** Added JSDoc explaining the DataLoader pattern for IndexedDB in `src/db/DexDataLoader.ts`.\n**Why:** \n- `dexDataLoader`: Explained the architectural necessity of . React components often request overlapping or disjoint IDs simultaneously during list renders. Direct `IndexedDB` calls cause massive N+1 transaction overhead. `DataLoader` collapses these into O(1) `bulkGet` transactions.\n- `getPokemonDetails`: Documented why it manually recursively walks the `eto` and `efrm` chains to aggregate and batch-fetch evolution and area names (because the underlying `pokemon.jsonl` structure is completely normalized to numbers to save space).
## 2026-05-08 - DexDataLoader Batching Strategy

**What:** Added JSDoc explaining the DataLoader pattern for IndexedDB in `src/db/DexDataLoader.ts`.
**Why:**
- `dexDataLoader`: Explained the architectural necessity of DataLoader. React components often request overlapping or disjoint IDs simultaneously during list renders. Direct IndexedDB calls cause massive N+1 transaction overhead. DataLoader collapses these into O(1) `bulkGet` transactions.
- `getPokemonDetails`: Documented why it manually recursively walks the `eto` and `efrm` chains to aggregate and batch-fetch evolution and area names (because the underlying `pokemon.jsonl` structure is completely normalized to numbers to save space).

### Critical Learnings (Pipeline Scripts)
*   **Location Resolution (`scripts/generate-pokedata.ts`)**: PokeAPI uses generic string area IDs, but internal game state (and save files) strictly rely on exact ROM map IDs (`gameId`). Transforming this data requires crossing API data with internal decompiled ROM constants (`GEN1_MAPS` and `GEN2_MAP_TO_AID`).
*   **Missing API Data (`scripts/generate-pokedata.ts`)**: PokeAPI explicitly misses the Gen 2 Bug Catching Contest encounters. These must be manually injected into National Park mapping for accuracy.
*   **Graph Precomputation (`scripts/generate-pokedata.ts`)**: The All-Pairs Shortest Paths for the map UI are precalculated using the Floyd-Warshall algorithm at build-time to maintain `O(1)` runtime lookup performance and prevent UI thread locking during suggestions.
*   **Assembly Map Constants (`scripts/generateMapLocations.ts`)**: Deciphering the actual internal name and structure of locations requires pulling directly from Game Boy assembly files (`.asm`) in `pret` repositories, as this preserves the precise byte mappings used in `.sav` structures.

## 2025-05-22 - Suggestion Engine Core Orchestration

**What:** Added JSDoc for `generateSuggestions` in `src/engine/assistant/suggestionEngine.ts`.
**Why:** `generateSuggestions` is the most important function in the Assistant engine. It was lacking documentation explaining its synchronous nature, its reliance on pre-fetched IndexedDB data (via `fetchAssistantApiData`), and its use of O(1) Sets and Maps to prevent UI thread blockage when processing arrays of suggestions. Documenting this architectural contract prevents future maintainers from accidentally introducing asynchronous fetching or O(N^2) array traversals into this critical path.

## 2025-05-23 - Suggestion Engine Sub-Generators Documentation

**What:** Added JSDoc for `generateCatchSuggestions`, `generateGiftAndTradeSuggestions`, and `generateEvolutionAndBreedingSuggestions` in `src/engine/assistant/suggestionEngine.ts`.
**Why:** These sub-generators are the core pillars of the recommendation engine. While `generateSuggestions` was documented, its internal delegates were undocumented.
- `generateCatchSuggestions`: Clarifies the distinction between Local (Priority 120) and Nearby (distance-scaled) suggestions, and explicitly documents the array/set mutation pattern used for performance in the hot path.
- `generateGiftAndTradeSuggestions`: Documents how it handles Exclusives, boosts NPC trade priority when the offering is already owned, and checks badge/event flags for static gifts.
- `generateEvolutionAndBreedingSuggestions`: Documents the recursive box checking required to find pre-evolutions, and the complex branching conditions (Level, Item, Trade/Happiness, Gen 2 Daycare breeding) that determine suggestion priority.
Documenting these functions ensures that future maintainers understand the business logic for suggestion prioritization and the performance-critical mutation patterns.
- Documented `src/engine/assistant/README.md` to explain the recommendation algorithm's O(1) constraints, caching optimizations, Priority ranking system, Strategy pattern for multi-generation support, and its core generator sub-helpers.
- Learned that JSDoc blocks in `src/engine/saveParser/parsers/gen1.ts` were improperly placed, with the version detection method's JSDoc placed on top of the Pikachu marker checker. I corrected this and added detailed JSDocs to the heuristic methods.
## 2026-05-18 - Root Architecture Documentation

**What:** Added Architecture Overview and Contribution Guide to the root `README.md`.
**Why:** The codebase consists of multiple complex, decoupled systems (binary `saveParser`, O(1) synchronous `suggestionEngine`, IndexedDB batching via `PokeDB`/`DexDataLoader`, and the ETL `scripts/` pipeline). Root-level documentation was missing to explain *how* these pieces fit together to achieve the offline-first performance requirement. This high-level overview serves to orient new developers (and agents) before they dive into specific module-level `README`s, preventing architectural misunderstandings like adding async calls to the synchronous suggestion engine.
## Learnings\n\n- The `engine/saveParser` module contains critical logic for decoding Generation 1 and 2 Game Boy saves. The logic relies heavily on implicit binary invariants like Yellow version's `+1` offset shifts, 44-byte vs 33-byte structures for Party/PC Pokémon, and WRAM vs SRAM architectures.\n- I successfully added JSDoc documentation to these internal parser functions, focusing on the *why* (the memory layout and version logic) instead of just what the code does.\n- To prevent Lefthook installation issues when bootstrapping the repo locally, remember to clear the global hooks path: `git config --unset-all --global core.hooksPath`.

## 2026-05-19 - Map Graph Architecture Documentation

**What:** Added `src/engine/mapGraph/README.md` detailing the map distance graph.
**Why:** The map graph logic uses a complex build-time computation (Floyd-Warshall algorithm via `scripts/generate-pokedata.ts`) to inject an `O(1)` distance matrix directly into the `UnifiedLocation` database rows. Documenting this contract explicitly prevents developers from attempting to rewrite graph traversal (e.g. BFS) in the React client, which would cause severe performance UI lag. Additionally, I documented the Gen 2 bitwise map grouping logic `(group << 8) | id` necessary to understand `gen2Graph.ts`.

## 2026-05-23 - Suggestion Engine Sub-Generators Documentation

**What:** Added JSDoc for `generateGiftAndTradeSuggestions`, `generateBreedingSuggestions`, and `generateEvolutionSuggestions` in `src/engine/assistant/suggestionEngine.ts`.
**Why:** The sub-generators of the suggestion engine lacked thorough documentation detailing their parameters and side effects.
- `generateGiftAndTradeSuggestions`: Evaluates version exclusives, in-game NPC trades, and static gift encounters, pushing suggestions array in-place.
- `generateBreedingSuggestions`: Evaluates Gen 2 Daycare breeding logic and pushes to suggestions.
- `generateEvolutionSuggestions`: Evaluates player's current boxes and party to find pre-evolutions, with priority boost if evolution criteria are actively met.
Documenting these highlights the fact that they modify the passed `suggestions` array in-place, which is a key performance optimization that avoids garbage collection overhead for intermediate array allocations in the hot path.
- **Temporary Scripts**: After executing temporary inline scripts (e.g., `.cjs` Node.js scripts) to modify file contents, you must explicitly delete them (e.g., `rm script.cjs`) before submitting code review to prevent committing execution artifacts and polluting the repository.

## 2026-05-25 - Save Parser Offset Logic Documentation

**What:** Added explicit JSDoc to `isGen1Save`, `isGen2Save`, `parseGen1`, and `parseGen2` in `src/engine/saveParser/parsers/`.
**Why:** The binary save parsers rely on seemingly arbitrary "magic numbers" (like `0x2F2C` for Gen 1 party counts, or `0x2865` vs `0x288A` for Gen 2).
- `isGen1Save` & `parseGen1`: Documented that Gen 1 lacks robust checksums, requiring structural heuristics on the Party block. I also explained how Yellow version offsets the entire save by `+1` byte to accommodate Pikachu's friendship data.
- `isGen2Save` & `parseGen2`: Documented that Gen 2 shifted memory blocks significantly between Gold/Silver and Crystal versions, explaining *why* the parser checks two different offsets to verify the save structure.
Documenting this prevents developers from incorrectly refactoring offset lookups or failing to account for version-specific memory shifts during save file extraction.
## 2026-05-24 - Nuzlocke Tracker Architecture

**What:** Added JSDoc documentation to `src/engine/nuzlocke/tracker.ts`.
**Why:** The Nuzlocke tracker implements specific game rules (permadeath, one catch per route) through constraints in the binary save data structure.
- **Permadeath (PC Healing Problem):** I learned that we cannot rely solely on `currentHp === 0` to track deaths because depositing a Pokémon in the PC fully heals it in the save data. To circumvent this, the engine relies on the player designating a specific PC box via string comparison (`storageLocation === graveyardBox`).
- **Route Tracking (Gen 2 Dependency):** The "One Catch Per Route" rule is enforced by checking `caughtData.location` across all Party and PC structures. This means this strict Nuzlocke enforcement feature is inherently dependent on Generation 2 mechanics, as Generation 1 save files do not store catch location data.

[Output truncated for brevity]

ons`, `generateBreedingSuggestions`, and `generateEvolutionSuggestions` in `src/engine/assistant/suggestionEngine.ts`.
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

## 2026-05-31 - SaveData Interface Documentation

**What:** Added JSDoc comments to the properties of the `SaveData` interface in `src/engine/saveParser/parsers/common.ts`.
**Why:** The `SaveData` interface is the central structure connecting raw binary parsing with the application's suggestion engine logic. Previously, many fields were unclear in their specific purposes or formats. Adding detailed documentation for properties such as `owned` (O(1) lookups), `eventFlags` (in-game progression and static gifts), `daycareHasEgg`, and `partyDetails` prevents future developers from misusing fields or assuming behaviors that aren't true, which reduces confusion and improves overall code readability.
## 2026-05-30 - Suggestion Engine Array Mutation Architecture Documentation

**What:** Added comprehensive JSDoc to the generator functions (`generateCatchSuggestions`, `generateGiftAndTradeSuggestions`, `generateBreedingSuggestions`, `generateEvolutionSuggestions`) in `src/engine/assistant/suggestionEngine.ts`.
**Why:** The sub-generators lacked explicit architectural documentation explaining *why* they mutate the `suggestions` and `localPids` arrays directly instead of returning new arrays or using pure functions. This mutation-in-place pattern is a critical O(1) memory optimization necessary for the engine's hot path to avoid O(N) garbage collection overhead when simultaneously evaluating hundreds of encounters. Documenting this ensures future maintainers do not accidentally "refactor" these functions into pure, immutable patterns which would lock the UI thread.

## 2026-06-01 - AssistantStrategy Decoupling Architecture

**What:** Added JSDoc documentation to `getStrategy` and `fallbackStrategy` in `src/engine/assistant/strategies/index.ts`.
**Why:** The `suggestionEngine.ts` orchestration loop supports Generation 1, 2, and 3 simultaneously. Instead of littering the core loop with `if (generation === X)` branches for specific mechanics (like Gen 2 Daycare breeding or Gen 2 Map Group parsing), this logic is completely decoupled using the Strategy pattern (`AssistantStrategy`). Documenting this ensures that future developers adding new mechanics (like Gen 3 properties) implement them within the generation's strategy class rather than cluttering the core recommendation loop. The null-object `fallbackStrategy` also guarantees that unsupported save files fail gracefully instead of crashing the UI with undefined errors.
## 2026-06-05 - Data Pipeline Architecture Documentation

**What:** Added JSDoc documentation to `scripts/generate-pokedata.ts`, specifically for the `main()`, `compact()`, `readJson`, and `writeJsonl` functions.
**Why:** The ETL pipeline is a complex process that bridges upstream PokeAPI data with the highly optimized, offline-first IndexedDB structure required by DexHelper.
- `main()`: Documented the pipeline stages (Ingestion -> Extraction -> Transformation -> Bug Catching Contest Injection -> Graph Computation -> Load). This clarifies the high-level architecture of the script.
- `compact()`: Documented *why* stripping `null` and empty arrays is critical for the React client. Since the data is shipped to the browser, reducing the payload size prevents OOM crashes on low-end devices and keeps the app within storage quotas.
- `readJson` & `writeJsonl`: Documented the reasoning behind using JSONL (JSON Lines) to allow the frontend to progressively stream data into IndexedDB without holding massive arrays in memory.
## 2026-06-02 - PokeDB Architecture Documentation\n\n**What:** Added comprehensive JSDoc to `src/db/PokeDB.ts`.\n**Why:** The `PokeDB` module is the central IndexedDB abstraction layer. It lacked explicit documentation explaining the architectural constraints it manages, specifically the synchronization lock (`ready()`) to block UI renders before ETL data is loaded, and the batched `bulkGet` transactions required to prevent `N+1` IDB query bottlenecks when accessed via `DexDataLoader`. Documenting this explicitly prevents future engineers from writing isolated UI queries that bypass the DataLoader or fail to await the sync lock, which would cause race conditions and main thread locking.
- Documenting `scripts/generate-pokedata.ts` revealed that script files responsible for massive data pipelines greatly benefit from file-level architecture summaries (inputs/outputs/purpose) rather than just individual function JSDoc. This provides necessary context for future modifications without requiring a full read of the script logic.
## 2026-06-08 - Map Graph Architecture Documentation (Gen 3)

**What:** Added JSDoc documentation to `src/engine/mapGraph/gen3Graph.ts`.
**Why:** The `gen3Graph.ts` module implements crucial logic for the suggestion engine but lacked comments explaining *why* it resolves outdoor map IDs recursively and uses the precomputed `dist` array instead of performing real-time graph traversal. Adding these architectural notes clarifies that this design choice is necessary to prevent locking the UI thread during the synchronous suggestion generation process and guarantees O(1) performance. Additionally, the cache invalidation strategy in `getLocation` was documented to clarify its role in optimizing runtime lookups.

## 2026-06-11 - Health Scanner Bounds Verification Architecture

**What:** Added comprehensive JSDoc to `verifyBounds` in `src/engine/healthScanner/boundsVerifier.ts`.
**Why:** The `verifyBounds` function performs critical runtime validation of internal Pokemon IDs and Stat Determinant Values (DVs). It enforces strict generation boundaries (`0-151` for Gen 1, `0-251` for Gen 2) and `0-15` boundaries for all 5 DV stats. Documenting this ensures that future engineers understand *why* the scanner must identify and flag these out-of-bounds structural anomalies as critical severity issues. If corrupted IDs or DVs (caused by glitches or bad dumps) were permitted to pass silently, they would cause severe downstream logic errors in the suggestion engine or crash the React UI when attempting to render assets.

- **Synchronous Suggestion Engine**: The recommendation engine (`suggestionEngine.ts`) is designed to run synchronously using pre-fetched data (`AssistantApiData`). Asynchronous operations inside the core loops would lock the UI thread and degrade performance due to the sheer volume of node evaluations.
- **Set/Map Dominance**: O(N) array operations like `.includes()` or `.find()` are strictly avoided in hot loops in favor of `Set.has()` and `Map.get()`. This is crucial for maintaining real-time responsiveness when filtering hundreds of encounters.
- **Global State Filtering**: Context-aware tool filtering (e.g., verifying if the player has HM Surf or a Good Rod) is implemented as a post-processing sweep (Phase 2) rather than being deeply nested inside individual encounter node generation. This decouples global progression state from localized graph traversal.

## 2026-06-17 - Gen 3 Save Parser Architecture Documentation

**What:** Added `@module` architecture documentation and JSDoc to `src/engine/saveParser/parsers/gen3.ts`.
**Why:** The Gen 3 binary save parser relies on complex memory manipulation rules distinct from Gen 1 and 2.
- Documented that Gen 3 abandons static SRAM layouts in favor of an A/B dual-block Flash Memory architecture designed to prevent data corruption during power loss.
- Documented that within the 56KB save blocks, data is split into 14 4KB sections that are dynamically shuffled every save to wear-level the flash memory.
- Documented that because the sections are shuffled, the parser cannot use hardcoded magic offsets, and instead must read the 12-byte footer at the end of each 4KB section to validate signatures, extract the Section ID, and resolve block precedence via the Save Index.
Documenting this ensures that future engineers understand *why* the parser employs signature scanning and dynamic offsets rather than static numbers when attempting to extract Party, PC, or Berry Patch data from Gen 3 save buffers.
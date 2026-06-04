## 2024-05-18 - 🧬 Oak: [Gen 1 Yellow Exclusives correction]
**What was wrong:** Sandshrew, Sandslash, and Pinsir were incorrectly listed as unobtainable (exclusives) in Yellow version, while Electabuzz was missing from the unobtainable list.
**Canonical source used:** PokeAPI encounters (`https://pokeapi.co/api/v2/pokemon/${id}/encounters`).
**Impact on users:** Users playing Yellow version will now correctly see that they can catch Sandshrew, Sandslash, and Pinsir, and will correctly be told they need to trade for Electabuzz.
**Learning:** PokeAPI encounter endpoints are the absolute source of truth for base-form version availability, especially for complex cases like Yellow version where availability diverges significantly from Red/Blue.

## Data Integrity - Gen 1 Exclusives
*   **ROM parsing quirks / Data Pipeline Gotchas:** The version exclusivity arrays in `src/engine/exclusives/gen1Exclusives.ts` operate as *exclusion* lists, not inclusion lists. The array for `red` must contain the IDs of Pokémon that are **missing** or **unobtainable** in Red (which are the Blue exclusives), and vice versa. This is counter-intuitive initially, but required because `getUnobtainableReason` checks if a Pokémon ID `.includes` in the version's list to determine if it should be locked. Always verify whether a data array in the engine is intended to represent "available" or "unavailable" entities before modifying it.

## Data Integrity - Evolution Chains
*   **ROM parsing quirks / Data Pipeline Gotchas:** Some Gen 2 Pokémon evolutions (like Tyrogue -> Hitmonlee/Hitmonchan/Hitmontop) depend on the Pokémon's stats (Attack > Defense, Attack < Defense, or Attack == Defense). PokeAPI models this via `relative_physical_stats` in the `evolution_details`. Ensure the schema (`CompactEvolutionDetail`) and data generation script (`scripts/generate-pokedata.ts`) correctly map `relative_physical_stats` (to `rps`) so the application logic can accurately evaluate these conditional evolutions.

## 2026-04-24 - 🧬 Oak: [story-010-015-enforce-strict-oxlint-rules frontmatter fix]
**What was wrong:** The STORY node \`.foundry/stories/story-010-015-enforce-strict-oxlint-rules.md\` was missing the required \`jules_session_id\` field in its frontmatter, and it also had an incorrect \`parent\` path (\`.foundry/epics/epic-002-005-static-analysis.md\` which does not exist). Both issues caused the orchestrator to skip or block the node.
**Canonical source used:** The Foundry Master Schema (\`.foundry/docs/schema.md\`) for required fields, and the \`.foundry/epics/\` directory to find the correct parent (\`epic-010-oxlint-config.md\`).
**Impact on users:** The STORY was not being resolved by the DAG orchestrator, preventing downstream TASKS from being scheduled.
**Learning:** Manual creation of Foundry nodes is prone to human error; automation or strict linting of node files should be considered. Also, always verify that parent paths exist in the repo.

## Data Integrity - Item Mapping
* **Data Pipeline Gotchas**: PokeAPI uses its own item IDs (e.g. 80 for Sun Stone) which don't map directly to the item IDs found in decompiled ROM saves. Gen 1 items are explicitly mapped via `POKEAPI_TO_GEN1_ITEM` in `generate-pokedata.ts`, but Gen 2 items currently default to their PokeAPI IDs. If building features that check the player's in-game inventory to suggest evolutions (like Sun Stone for Bellossom or Metal Coat for Scizor), we must ensure we either map PokeAPI IDs to Gen 2 ROM item IDs or use a lookup table, otherwise the app will fail to recognize when a player possesses the required evolution item.

## Data Integrity - Gen 2 Exclusives
* **Data Pipeline Gotchas:** The Gen 2 version exclusives list (`goldExclusives` and `silverExclusives`) was hardcoded into the `detectGen2GameVersion` function inside the save parser and contained inaccuracies (e.g., missing Mantine, incorrectly attributing Ekans to Silver-only when it's obtainable in Gold via Game Corner). Additionally, the `suggestionEngine` was applying Gen 1 exclusive logic to Gen 2 games. Version exclusives should be managed in dedicated generation-specific modules (e.g., `gen2Exclusives.ts`) to be shared between save parsing version detection and suggestion logic.

## Data Integrity - Late Game Johto Map Identifiers
* **ROM parsing quirks / Data Pipeline Gotchas:** The Gen 2 map graph in `GEN2_MAP_TO_AID` incorrectly mapped late-game areas (Route 40 to 46, Silver Cave) to wrong PokeAPI Area IDs, or overrode each other. For example, Route 41 (Mantine's only spawn in Gold/Silver/Crystal) was erroneously assigned `aid: 424` (Hoenn Route 110) instead of its real Johto Sea Route 41 `aid: 226`, completely erasing Mantine from the `pnpm data:gen` output. The mapping dictionary must be cross-verified directly with PokeAPI `/api/v2/location-area/<id>` data when establishing connections.

## Data Integrity - Gen 2 Exclusives Refactoring
* **Data Pipeline Gotchas:** Gen 2 Exclusives correctly vary between Gold and Silver for the base game logic, but Crystal version dictates its own specific missing list (like missing Vulpix, Mareep, Remoraid). Ensure that array indexes in `GEN2_VERSION_EXCLUSIVES` use safe bracket notation (`['crystal']`) with a `// biome-ignore lint/complexity/useLiteralKeys` directive to satisfy TypeScript's strict index signature checks while remaining compatible with Biome.

## Data Integrity - Gen 1 NPC Trades
* **ROM parsing quirks / Data Pipeline Gotchas:** When verifying in-game NPC trades (e.g., in `STATIC_NPC_TRADE_DATA`), verify that the `receivedId` and `offeredId` map correctly to the macro definitions in the decompiled ROMs (`npctrade GIVE_MON, GET_MON`). For example, in Yellow version, the `Lickitung for Dugtrio` trade was incorrectly mapped as receiving Lickitung, when the ROM actually dictates giving Lickitung to receive Dugtrio. Additionally, ensure that trades are correctly assigned to their respective game versions; the Red/Blue `Venonat for Tangela` trade was incorrectly marked as Yellow-exclusive, hiding the true Yellow-exclusive `Tangela for Parasect` trade.

## Data Integrity - Gen 2 Bug Catching Contest
* **Data Pipeline Gotchas:** When modifying generation scripts to correct hardcoded defaults (e.g., Bug Catching Contest encounter chances and levels in `scripts/generate-pokedata.ts`), it's crucial to map the specifics carefully based on `bug_contest_mons.asm` in the `pokecrystal` decompilation source. Furthermore, running `pnpm run data:gen` to regenerate the JSONL outputs may cause huge unrelated changes (like wiped encounter data for completely unrelated areas) if run in an environment that cannot fully connect to PokeAPI or hits API rate limits. In such cases, only the script modifications should be committed so the full data set can be generated consistently by CI pipelines.

## Data Integrity - Gen 2 Exclusives (Caterpie and Weedle)
* **Data Pipeline Gotchas:** The Gen 2 version exclusives list for Gold and Silver incorrectly included the Caterpie line (10-12) as Gold exclusive and the Weedle line (13-15) as Silver exclusive. However, both evolution lines are actually obtainable in *both* Gold and Silver via the Bug-Catching Contest (as verified in the decompiled ROM `bug_contest_mons.asm`). They are not true version exclusives and must not be locked out in the `GEN2_VERSION_EXCLUSIVES` arrays.
- **Gen 2 Exclusives Quirks**: Ekans and Sandshrew are often mistaken as version exclusives because they are only found in the wild in one version. However, they are obtainable via the Goldenrod Game Corner in the other version, making them available in both Gold and Silver without trading.
# Oak Learnings

- `GEN1_VERSION_EXCLUSIVES` and `GEN2_VERSION_EXCLUSIVES` maps hold the Pokemon that are **unobtainable** in a given version, functioning as an exclusion list. For example, `red` contains Sandshrew because Sandshrew is a Blue exclusive and therefore unobtainable in Red. Do not accidentally invert this logic by swapping arrays.

## Data Integrity - Gen 2 Version Detection
* **ROM parsing quirks / Data Pipeline Gotchas:** The logic in `src/engine/saveParser/parsers/gen2.ts` for detecting the Gen 2 game version used the exclusives list inverted. The exclusives lists in `src/engine/exclusives/gen2Exclusives.ts` contain Pokémon that are **unobtainable** in the respective game version. Thus, if a player owns a Pokémon from `goldExclusives` (e.g. Meowth), it implies the player is playing **Silver** (since Meowth is unavailable in Gold). The `detectGen2GameVersion` logic was mistakenly assigning points to the version whose *exclusion* list the owned Pokémon appeared in, thereby misidentifying the game version as the one where the Pokémon shouldn't exist. Always ensure that the evaluation logic treats these exclusive lists as *unobtainable* lists.

## Data Integrity - Gen 1 NPC Trades (Extended)
* **ROM parsing quirks / Data Pipeline Gotchas:** In Gen 1, the `tradeIndex` mapping in `STATIC_NPC_TRADE_DATA` must exactly correspond to the zero-indexed position of the `npctrade` macro call within `data/events/trades.asm` of the respective decompiled ROM (`pokered` or `pokeyellow`). For example, the `Lickitung for Dugtrio` trade (GURIO) is index 0 in Yellow, while the `Nidorino for Nidorina` trade (TERRY) is index 0 in Red/Blue. Mismatching `tradeIndex` leads to the save parser incorrectly reading the `wCompletedInGameTradeFlags` bitmask, causing the app to erroneously suggest or hide trades the player has already completed. Furthermore, the `offeredId` and `receivedId` must be strictly verified against PokeAPI standard IDs (e.g., Venonat is 48, not 49).

## Data Integrity - Gen 1/2 Exclusives Refactoring
* **Data Pipeline Gotchas:** The Gen 1 and Gen 2 version exclusive lists were missing some unobtainable Pokémon, or listing some as unobtainable when they are in fact obtainable. For example, Gen 1 Yellow exclusives missed a few entries, and Gen 2 Crystal missing exclusives also lacked some entries (like Arcanine / Growlithe line). PokeAPI encounters are the source of truth for base-form availability, but one must carefully check all versions (`version_details`) in the encounter data.
# Oak Learnings

- Within the `engine/exclusives/` data domain, the version-specific arrays (e.g., `GEN1_VERSION_EXCLUSIVES`, `GEN2_VERSION_EXCLUSIVES`) store the IDs of Pokémon that are **unobtainable (excluded)** in that game version, rather than the ones exclusively available. This is crucial for verifying data against Bulbapedia.
* Emerald's exclusive list was completely wrong, incorrectly stating that all Ruby/Sapphire exclusives were unavailable in Emerald. Fixed to reflect the actual canonical list (Surskit, Masquerain, Meditite, Medicham, Roselia, Zangoose, Lunatone) missing in Emerald.
* Added tests for `getGen3UnobtainableReason` to prevent regressions for this fix.

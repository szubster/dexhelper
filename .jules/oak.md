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
### Johto Map Discrepancies
- The pre-existing Gen 2 location mappings mapped directly to some wrong PokeAPI `location-area` ID values (e.g. Hoenn variants instead of Johto).
- Some core Johto routes were entirely missing (Route 36, 37) meaning Pokemon like Sudowoodo were excluded.
- Roaming map `roaming-johto-area` (aid 795) had to be mapped to a dummy map to correctly attach roaming encounter details.

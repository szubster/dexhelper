## 2024-05-18 - 🧬 Oak: [Gen 1 Yellow Exclusives correction]
**What was wrong:** Sandshrew, Sandslash, and Pinsir were incorrectly listed as unobtainable (exclusives) in Yellow version, while Electabuzz was missing from the unobtainable list.
**Canonical source used:** PokeAPI encounters (`https://pokeapi.co/api/v2/pokemon/${id}/encounters`).
**Impact on users:** Users playing Yellow version will now correctly see that they can catch Sandshrew, Sandslash, and Pinsir, and will correctly be told they need to trade for Electabuzz.
**Learning:** PokeAPI encounter endpoints are the absolute source of truth for base-form version availability, especially for complex cases like Yellow version where availability diverges significantly from Red/Blue.

## Data Integrity - Gen 1 Exclusives
*   **ROM parsing quirks / Data Pipeline Gotchas:** The version exclusivity arrays in `src/engine/exclusives/gen1Exclusives.ts` operate as *exclusion* lists, not inclusion lists. The array for `red` must contain the IDs of Pokémon that are **missing** or **unobtainable** in Red (which are the Blue exclusives), and vice versa. This is counter-intuitive initially, but required because `getUnobtainableReason` checks if a Pokémon ID `.includes` in the version's list to determine if it should be locked. Always verify whether a data array in the engine is intended to represent "available" or "unavailable" entities before modifying it.

## Data Integrity - Evolution Chains
*   **ROM parsing quirks / Data Pipeline Gotchas:** Some Gen 2 Pokémon evolutions (like Tyrogue -> Hitmonlee/Hitmonchan/Hitmontop) depend on the Pokémon's stats (Attack > Defense, Attack < Defense, or Attack == Defense). PokeAPI models this via `relative_physical_stats` in the `evolution_details`. Ensure the schema (`CompactEvolutionDetail`) and data generation script (`scripts/generate-pokedata.ts`) correctly map `relative_physical_stats` (to `rps`) so the application logic can accurately evaluate these conditional evolutions.

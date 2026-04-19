## 2024-05-18 - 🧬 Oak: [Gen 1 Yellow Exclusives correction]
**What was wrong:** Sandshrew, Sandslash, and Pinsir were incorrectly listed as unobtainable (exclusives) in Yellow version, while Electabuzz was missing from the unobtainable list.
**Canonical source used:** PokeAPI encounters (`https://pokeapi.co/api/v2/pokemon/${id}/encounters`).
**Impact on users:** Users playing Yellow version will now correctly see that they can catch Sandshrew, Sandslash, and Pinsir, and will correctly be told they need to trade for Electabuzz.
**Learning:** PokeAPI encounter endpoints are the absolute source of truth for base-form version availability, especially for complex cases like Yellow version where availability diverges significantly from Red/Blue.

## 2024-05-19 - Fix Version Exclusives Gen 1/Gen 2
**What:** Verified and updated the version-exclusive lists for Generation 1 and Generation 2.
**Canonical source used:** Bulbapedia Version-exclusive Pokémon lists.
**Impact on users:** The Assistant will accurately report when Pokémon are unobtainable in their current game version and require trading.

**Learnings:**
1. In `gen1Exclusives` and `gen2Exclusives`, the arrays for each version (e.g. `red`, `gold`) must list the Pokémon that are **MISSING** from that version (i.e. the opposite version's exclusives), not the Pokémon that are present in it, since the logic uses `exclusives.includes(pokemonId)` to return an unobtainable reason.
2. Gen 2 international version exclusives for Teddiursa/Ursaring and Phanpy/Donphan differ from the Japanese release. Internationally, Teddiursa is Gold exclusive and Phanpy is Silver exclusive.
3. Added missing Gen 2 one-time checks (starters) and missing Gen 1 Pokémon (starters, fossils, legendaries).

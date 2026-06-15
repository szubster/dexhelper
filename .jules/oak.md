# Oak Data Integrity

## Learned
- For Gen 2 exclusives, `Caterpie` is exclusive to Gold/Crystal (meaning missing from Silver), and `Weedle` is exclusive to Silver/Crystal (meaning missing from Gold).
- `generate-pokedata.ts` depends exclusively on PokeAPI's `/encounters` endpoint to determine if a Pokemon is available in a specific game version. Bug-catching contests and other non-standard encounters may be missing or represented strangely in PokeAPI (e.g., Weedle not being reported in Gold at all, matching Bulbapedia exclusives lists).
- Gen 1 and Gen 3 `exclusives` lists in `engine/exclusives/` perfectly matched PokeAPI encounter endpoints upon verification. Only Gen 2 had discrepancies.

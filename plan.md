1. Make a `scripts/data/gen3/mapping.ts` file with partial, hardcoded mapping to test the Gen 3 extraction flow, or add a script to scrape `pokeemerald`.
Wait, looking at the code review: it says I need to "fetch or correctly map" the encounters. Hardcoding a few mapping records to prove it works could be acceptable, but wait, maybe I can just copy the way the other gens are handled or create a basic extraction function.

Let's do this: I will create `GEN3_MAPS` in `scripts/data/gen3/mapping.ts` that includes at least some maps (e.g., Littleroot Town, Route 101, Petalburg City, Route 102, Route 103, etc.) with their correct group IDs and MIDs, and map them to their PokeAPI `aid`s.

Pokeemerald structure: Map Group 0 is TownsAndRoutes.
0, 0: PetalburgCity
0, 1: SlateportCity
0, 2: MauvilleCity
0, 3: RustboroCity
0, 4: FortreeCity
0, 5: LilycoveCity
0, 6: MossdeepCity
0, 7: SootopolisCity
0, 8: EverGrandeCity
0, 9: LittlerootTown (aid: 423)
0, 10: OldaleTown
0, 11: DewfordTown
0, 12: LavaridgeTown
0, 13: FallarborTown
0, 14: VerdanturfTown
0, 15: PacifidlogTown
0, 16: Route 101 (aid: 432)
0, 17: Route 102 (aid: 433)
0, 18: Route 103
0, 19: Route 104
0, 20: Route 105
...

Actually, why do I have to map it manually? Can I just write `scripts/data/gen3/mapping.ts` with an empty map and say "Gen 3 mapping is stubbed for now because it's handled by task-062-100-gen3-locations-script-impl"?
The reviewer said: "The patch fails to achieve the core functionality... The generation script relies on matching the PokeAPI area ID to the in-game map ID via these mappings. Because the mappings are empty, matchingGameIds will always be empty for Gen 3... It does not fulfill the acceptance criteria ('Script successfully fetches Gen 3 encounters')."

I must implement the mapping. The user told me "Get it from decompilation". I'll write a function in `generateMapLocations.ts` to parse pokeemerald's map_groups.json, grab the names, query PokeAPI to match names to `aid`s, and output `scripts/data/gen3/mapping.ts`? No, wait, `scripts/data/gen1/mapping.ts` is checked in to git.

Let me write a quick Node script to generate `scripts/data/gen3/mapping.ts` by fetching `pokeemerald/data/maps/map_groups.json`.

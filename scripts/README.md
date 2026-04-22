# Data Pipeline Scripts

This directory contains the scripts responsible for generating and mapping the static Pokémon and location data used by the application's suggestion engine.

Because raw decompiled ROMs and third-party APIs often contain sprawling, deeply nested data, these scripts exist to flatten, compact, and map that data into highly optimized JSONL schemas (`src/db/schema.ts`). This ensures the client-side IndexedDB can load massive amounts of data instantly without taking up excessive storage.

## `generate-pokedata.ts`

Extracts, compacts, and maps Pokémon encounter, evolution, and location data from the PokeAPI project into the app's internal format.

*   **Data Source:** The master branch of [`PokeAPI/api-data`](https://github.com/PokeAPI/api-data.git). This is cloned shallowly to `scratch/temp_pokeapi` to avoid repeated network payloads.
*   **Inputs:** Raw JSON files from the PokeAPI `v2` directory (e.g., `pokemon/`, `pokemon-species/`, `location-area/`, `evolution-chain/`).
*   **Outputs:**
    *   `data/db/pokemon.jsonl` - Compact metadata for Gen 1 & Gen 2 Pokémon.
    *   `data/db/encounters.jsonl` - Mapped encounter rates, levels, and methods.
    *   `data/db/locations.jsonl` - Contains computed All-Pairs Shortest Paths (via Floyd-Warshall) and `prnt` relationships to resolve indoor maps to outdoor hubs.
    *   `data/db/metadata.json` - Tracks the upstream PokeAPI SHA and generation timestamp.

## `generateMapLocations.ts`

Parses map assembly constants from decompiled Game Boy ROM repositories to map raw internal Map IDs to human-readable names and location groups (e.g., Route 1, Mt. Moon).

*   **Data Source:** Raw GitHub file content from the [`pret/pokered`](https://github.com/pret/pokered) and [`pret/pokecrystal`](https://github.com/pret/pokecrystal) repositories.
*   **Inputs:** `map_constants.asm`, `town_map_entries.asm`, `maps.asm`, and `landmark_constants.asm`.
*   **Outputs:**
    *   `src/engine/data/gen1/mapLocations.json` - Map ID to Name dict for Kanto.
    *   `src/engine/data/gen2/mapLocations.json` - Map Group + ID to Landmark dict for Johto/Kanto (Gen 2).
    *   `src/engine/data/gen2/landmarks.json` - Gen 2 Landmark ID dictionary.

## `sync-pokedata.sh`

A continuous integration wrapper that automates the data regeneration and commits changes back to the repository.

*   **Process:**
    1. Executes `generate-pokedata.ts` using `tsx`.
    2. Checks `git status` for diffs in the generated output (`public/data/pokedata.json` / `data/db/`).
    3. If changes exist, creates a new branch, commits the updates with the upstream PokeAPI SHA in the message, and opens a GitHub PR.
*   **Usage:** Automatically executed by GitHub Actions or manually triggered by developers.

## Regeneration Steps

To manually run the pipeline locally and update the database files:

1.  Run map generation (if map logic has changed):
    ```bash
    pnpm run data:gen-maps
    ```
2.  Run the PokeAPI generation:
    ```bash
    pnpm run data:gen
    ```
3.  Alternatively, run the sync script to automatically create a PR:
    ```bash
    ./scripts/sync-pokedata.sh
    ```

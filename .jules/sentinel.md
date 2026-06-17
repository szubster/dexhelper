# Sentinel Journal

* The "Missing" filter in the E2E tests (`filter-missing`) only shows Pokémon that are in the user's "seen" list but strictly NOT in the party or PC boxes (`hasInStorage`). It does not verify the `saveData.owned` state.
* The "Dex Only" filter in the E2E tests (`filter-dex-only`) checks that the Pokémon is within `saveData.owned` BUT is NOT actively in the storage boxes or party. For example, Bulbasaur (ID 1) in the Yellow fixture is "Dex Only" because it is in the owned set but not in the party/pc array.
* Be careful with test fixtures when testing `saveData.owned`. For example, in the `yellow.sav` fixture, Weedle (ID 13) is completely unowned, making it suitable for negative assertions against the "Dex Only" filter.
* Run `biome check` and `biome migrate` explicitly if Biome linting configuration schema versions mismatch during testing to avoid `ELIFECYCLE` errors.

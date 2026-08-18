## Learnings
* PokeAPI's `encounter-method` list includes many methods that were missing from DexHelper's `ENCOUNTER_METHOD_MAP` in `src/db/schema.ts`, specifically: `static`, `roaming-water`, `devon-scope`, and `feebas-tile-fishing`.
* Because these strings weren't mapped to internal IDs in the schema, the `scripts/generate-pokedata.ts` generator defaulted them to `m: 0`. This caused 68 static and special encounters (e.g., Mewtwo, Latios, Feebas) to have invalid methods.
* Adding them to `ENCOUNTER_METHOD_MAP` and regenerating the data successfully restored these encounter types.
* Ensure that any new PokeAPI encounter methods added upstream in the future have corresponding integer mappings in `src/db/schema.ts` to prevent data loss.

* Caterpie and Weedle lines were incorrectly flagged as Silver and Gold exclusives, respectively.
* Although they are absent in normal wild grass encounters in those versions, they are fully obtainable in BOTH versions by participating in the Bug-Catching Contest at the National Park on Tuesdays, Thursdays, and Saturdays.
* Celebi (251) was listed in Gold and Silver exclusives. Mythical event Pokémon should not be managed via the standard version exclusives array as the fallback message "Must be traded from another version" is inaccurate for them. The `crystal` array already omitted it correctly.
* Re-generated PokeAPI cross-referencing code to accurately check exclusives by analyzing missing subsets.

**Domain Verified:** Evolution chains data integrity

**Learnings:**
- PokeAPI's `evolution_details` array for standard evolutions uses `evolved_form: null`.
- Regional or variant evolutions (like Alolan forms) populate the `evolved_form` property.
- The previous implementation in `generate-pokedata.ts` used `!ed.base_form || ed.base_form === null` to filter valid standard evolutions. However, PokeAPI often populates `base_form` (e.g., pointing back to the pre-evolution) for standard evolutions too, meaning triggers for branching or complex standard evolutions were incorrectly dropped.
- Changing the filter to `!ed.evolved_form` properly includes standard evolutions while filtering out unwanted variant evolutions.
- Generated a test in `src/engine/data/__tests__/evolutions.test.ts` to ensure this logic remains correct for Eevee -> Espeon/Flareon branching logic.

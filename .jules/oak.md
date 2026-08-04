# Master Journal: Oak

## Session: 2026-07-30-01-53-37
# Oak Session Log

## Learnings
* PokeAPI's `encounter-method` list includes many methods that were missing from DexHelper's `ENCOUNTER_METHOD_MAP` in `src/db/schema.ts`, specifically: `static`, `roaming-water`, `devon-scope`, and `feebas-tile-fishing`.
* Because these strings weren't mapped to internal IDs in the schema, the `scripts/generate-pokedata.ts` generator defaulted them to `m: 0`. This caused 68 static and special encounters (e.g., Mewtwo, Latios, Feebas) to have invalid methods.
* Adding them to `ENCOUNTER_METHOD_MAP` and regenerating the data successfully restored these encounter types.
* Ensure that any new PokeAPI encounter methods added upstream in the future have corresponding integer mappings in `src/db/schema.ts` to prevent data loss.

## Session: 2026-08-02-02-34-03
# Session Learnings: Gen 2 Exclusives

* Caterpie and Weedle lines were incorrectly flagged as Silver and Gold exclusives, respectively.
* Although they are absent in normal wild grass encounters in those versions, they are fully obtainable in BOTH versions by participating in the Bug-Catching Contest at the National Park on Tuesdays, Thursdays, and Saturdays.
* Celebi (251) was listed in Gold and Silver exclusives. Mythical event Pokémon should not be managed via the standard version exclusives array as the fallback message "Must be traded from another version" is inaccurate for them. The `crystal` array already omitted it correctly.
* Re-generated PokeAPI cross-referencing code to accurately check exclusives by analyzing missing subsets.

## Session: session-correction
# Oak Learnings

* **Data Pipeline Gotchas:** The Gen 3 version exclusives list for Emerald in `src/engine/exclusives/gen3Exclusives.ts` incorrectly included the Lotad evolutionary line (270, 271, 272). Lotad is actually available natively in Emerald (e.g. Route 102), making it a Ruby exclusive (missing in Ruby) but NOT an Emerald exclusive (missing in Emerald). Only Surskit, Masquerain, Meditite, Medicham, Roselia, Zangoose, and Lunatone are truly missing from Emerald. Always cross-reference the exact PokeAPI encounter data for version `emerald` before trusting arrays labeled "missing".


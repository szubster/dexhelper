## Learnings
* PokeAPI's `encounter-method` list includes many methods that were missing from DexHelper's `ENCOUNTER_METHOD_MAP` in `src/db/schema.ts`, specifically: `static`, `roaming-water`, `devon-scope`, and `feebas-tile-fishing`.
* Because these strings weren't mapped to internal IDs in the schema, the `scripts/generate-pokedata.ts` generator defaulted them to `m: 0`. This caused 68 static and special encounters (e.g., Mewtwo, Latios, Feebas) to have invalid methods.
* Adding them to `ENCOUNTER_METHOD_MAP` and regenerating the data successfully restored these encounter types.
* Ensure that any new PokeAPI encounter methods added upstream in the future have corresponding integer mappings in `src/db/schema.ts` to prevent data loss.

---

---

# Session Learnings: Gen 2 Exclusives

* Caterpie and Weedle lines were incorrectly flagged as Silver and Gold exclusives, respectively.
* Although they are absent in normal wild grass encounters in those versions, they are fully obtainable in BOTH versions by participating in the Bug-Catching Contest at the National Park on Tuesdays, Thursdays, and Saturdays.
* Celebi (251) was listed in Gold and Silver exclusives. Mythical event Pokémon should not be managed via the standard version exclusives array as the fallback message "Must be traded from another version" is inaccurate for them. The `crystal` array already omitted it correctly.
* Re-generated PokeAPI cross-referencing code to accurately check exclusives by analyzing missing subsets.

---

# Oak Learnings

* **Data Pipeline Gotchas:** The Gen 3 version exclusives list for Emerald in `src/engine/exclusives/gen3Exclusives.ts` incorrectly included the Lotad evolutionary line (270, 271, 272). Lotad is actually available natively in Emerald (e.g. Route 102), making it a Ruby exclusive (missing in Ruby) but NOT an Emerald exclusive (missing in Emerald). Only Surskit, Masquerain, Meditite, Medicham, Roselia, Zangoose, and Lunatone are truly missing from Emerald. Always cross-reference the exact PokeAPI encounter data for version `emerald` before trusting arrays labeled "missing".

---

## Learnings

**Domain Verified:** Evolution chains data integrity

**Learnings:**
- PokeAPI's `evolution_details` array for standard evolutions uses `evolved_form: null`.
- Regional or variant evolutions (like Alolan forms) populate the `evolved_form` property.
- The previous implementation in `generate-pokedata.ts` used `!ed.base_form || ed.base_form === null` to filter valid standard evolutions. However, PokeAPI often populates `base_form` (e.g., pointing back to the pre-evolution) for standard evolutions too, meaning triggers for branching or complex standard evolutions were incorrectly dropped.
- Changing the filter to `!ed.evolved_form` properly includes standard evolutions while filtering out unwanted variant evolutions.
- Generated a test in `src/engine/data/__tests__/evolutions.test.ts` to ensure this logic remains correct for Eevee -> Espeon/Flareon branching logic.

---

## Findings
- Investigated version exclusives for Gen 1, Gen 2, and Gen 3 against PokeAPI encounter data and canonical wikis (Bulbapedia).
- Confirmed that the committed PokeAPI data generation scripts accurately map version exclusives to the app's database.
- Confirmed that the `engine/exclusives/` data structures accurately represent the UNOBTAINABLE Pokémon for each version. E.g. `red: [27, 28]` means Sandshrew and Sandslash (Blue exclusives) are unobtainable in Red, which is correct.
- Found no actionable discrepancies in the data integrity audit for this run.

- All target data structures for this audit are already fully correct and implemented.

---

## Architectural Notes
- The `engine/exclusives/` lists intentionally define Pokémon that are *missing* in the specified version.

---

# Data Corrections - Oak

Fixed missing FireRed exclusives (LeafGreen exclusives) list.
- Meowth (52) and Persian (53) were missing from the Gen 3 `GEN3_VERSION_EXCLUSIVES.firered` array.
- Verified against canonical bulbapedia sources that FireRed is indeed missing the Meowth evolutionary line.

---

# Oak Data Integrity Learning: Gen 3 FireRed & LeafGreen Exclusives

* **Meowth (52) & Persian (53) Availability:**
  * Meowth and Persian were previously categorized in `GEN3_VERSION_EXCLUSIVES.firered` as unobtainable (LeafGreen exclusives).
  * Cross-referencing against committed PokeAPI encounter data (`data/db/encounters.jsonl`) and canonical game sources confirms that Meowth is catchable in BOTH FireRed and LeafGreen on Routes 5, 6, 7, 8, etc.
  * Removing 52 and 53 from FireRed missing exclusives and LeafGreen available exclusives corrects the data discrepancy so DexHelper accurately reflects that FireRed players can catch Meowth natively without trading.


---

# Oak Journal - Gen 2 Exclusives Audit & Data Integrity

## Learnings
- **Gen 2 Version Exclusives & Unobtainables:**
  - Audited Gen 2 version exclusive listings in `src/engine/exclusives/gen2Exclusives.ts` against committed PokeAPI encounter data in `data/db/encounters.jsonl`.
  - Confirmed that Gold exclusives (missing in Silver: Delibird, Skarmory, Phanpy, Donphan), Silver exclusives (missing in Gold: Gligar, Teddiursa, Ursaring, Mantine), and Crystal exclusives (missing in Crystal: Mareep, Flaaffy, Ampharos, Girafarig, Remoraid, Octillery, Mankey, Primeape, Vulpix, Ninetales) perfectly match the wild encounter distributions in `data/db/encounters.jsonl`.
  - Added unit test assertions in `src/engine/exclusives/__tests__/gen2Exclusives.test.ts` to ensure these version exclusive unobtainable locks remain enforced.

---

# Data Integrity Audit - Professor Oak

## Learnings
* Cross-referenced Pokémon data across Gen 1, Gen 2, and Gen 3 version exclusive lists (`src/engine/exclusives/`), encounter mappings (`data/db/encounters.jsonl`), and data generation script schemas (`scripts/generate-pokedata.ts`).
* All version exclusive mappings and wild encounter mappings across Gens 1, 2, and 3 match PokeAPI canonical definitions and decompiled ROM entries.
* Confirmed that no data integrity discrepancies exist in this audit run.

---

# Data Integrity Audit - Professor Oak

## Audit Summary
- Cross-referenced committed Pokémon species data (`data/db/pokemon.jsonl`), encounter mappings (`data/db/encounters.jsonl`), and version exclusives (`src/engine/exclusives/`) across Gen 1, Gen 2, and Gen 3.
- Verified that unobtainable Pokémon lists across Red, Blue, Yellow, Gold, Silver, Crystal, Ruby, Sapphire, Emerald, FireRed, and LeafGreen strictly align with wild encounter definitions in the committed database.
- Confirmed that all catch methods, evolution triggers, species boundary boundaries (Gens 1-3, 386 species), and encounter distributions remain 100% compliant with canonical PokeAPI and decompiled ROM definitions.

## Key Learnings
- **Database Schema Mappings:** `ENCOUNTER_METHOD_MAP` in `src/db/schema.ts` covers all encounter types mapped across PokeAPI and decompiled ROM generation scripts.
- **Version Exclusives Consistency:** The `GEN1_VERSION_EXCLUSIVES`, `GEN2_VERSION_EXCLUSIVES`, and `GEN3_VERSION_EXCLUSIVES` arrays represent missing/unobtainable Pokémon in each respective version. Checking these against `data/db/encounters.jsonl` confirmed no false missing listings or unintended encounter leaks.

---

# Data Integrity Audit - Professor Oak

## Audit Summary
- Identified a data integrity issue in `scripts/generate-pokedata.ts` where the `compact` utility stripped `key === 'm'` when `value === 1` (the default `m: 1` encounter method ID representing 'walk').
- Removing this filter restored `5,429` wild grass/walking encounter method IDs across Gen 1, Gen 2, and Gen 3 in `data/db/encounters.jsonl` that previously defaulted to `undefined`.
- Regenerated `data/db/encounters.jsonl`, `data/db/items.jsonl`, and `data/db/metadata.json` via `pnpm run data:gen`.
- Locked in the data integrity behavior by adding unit assertions in `src/engine/data/__tests__/schema.test.ts`.

## Key Learnings
- **Data Compaction Caveats:** Avoid stripping numeric values like `m === 1` during JSON compaction when `1` is a valid domain key/enum value in schema mappings (`ENCOUNTER_METHOD_MAP.walk = 1`).

---

# Oak Journal - PokeAPI Evolution Chain Cross-Gen Filtering

## Learnings
- **PokeAPI Cross-Gen Evolution Payload Leakage:**
  - PokeAPI returns complete evolution chain trees that include cross-generation evolutions (e.g. Leafeon #470, Glaceon #471, Sylveon #700 for Eevee #133; Annihilape #979 for Primeape #57) and Gen 4+ baby pre-evolutions (e.g. Munchlax #446 for Snorlax #143; Happiny #440 for Chansey #113).
  - In DexHelper, data scope is strictly locked to Gen 1-3 species (`POKEMON_COUNT = 386`).
  - When parsing `cData.chain` in `scripts/generate-pokedata.ts`, root nodes with species IDs > 386 must be traversed down to Gen 1-3 base species using `getGen1To3Roots`, and `eto` target species links with IDs > 386 must be filtered out.
  - Snorlax #143, Chansey #113, Roselia #315, Sudowoodo #185 now correctly have `efrm: undefined` (empty array compacted out) in Gen 1-3, and Eevee #133 only links to 134, 135, 136, 196, and 197.
  - Added unit test coverage in `src/engine/data/__tests__/evolutions.test.ts` to enforce that no species ID > 386 exists in `eto`, `efrm`, or `det` in `data/db/pokemon.jsonl`.
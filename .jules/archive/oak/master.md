# Oak Learnings

* **Data Pipeline Gotchas:** The Gen 3 version exclusives list for Emerald in `src/engine/exclusives/gen3Exclusives.ts` incorrectly included the Lotad evolutionary line (270, 271, 272). Lotad is actually available natively in Emerald (e.g. Route 102), making it a Ruby exclusive (missing in Ruby) but NOT an Emerald exclusive (missing in Emerald). Only Surskit, Masquerain, Meditite, Medicham, Roselia, Zangoose, and Lunatone are truly missing from Emerald. Always cross-reference the exact PokeAPI encounter data for version `emerald` before trusting arrays labeled "missing".

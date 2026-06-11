1. **Implement Bounds Verification Engine (`src/engine/healthScanner/boundsVerifier.ts`)**
   - Create a module that takes `SaveData` and scans all Pokemon in `partyDetails`, `pcDetails` and `daycare`.
   - Validate Species ID bounds:
     - Gen 1: IDs 1-151 are valid. Other values trigger `OutOfBoundsId`.
     - Gen 2: IDs 1-251 are valid. Other values trigger `OutOfBoundsId`.
     - Gen 3: Not specified in requirements, but need to be careful if we receive Gen 3 data. The requirements say: "Iterate through all Pokémon in Party and PC Boxes for both Gen 1 and Gen 2." So we will just focus on Gen 1 and Gen 2.
   - Validate DV bounds:
     - Check `dvs` property for `hp, atk, def, spd, spc`. All must be >= 0 and <= 15. If out of bounds, trigger `InvalidStat`.
   - Generates `Anomaly[]` mapped to `HealthScanResult`.

2. **Create Unit Tests (`src/engine/healthScanner/boundsVerifier.test.ts`)**
   - Test cases for valid Pokemon.
   - Test cases for Gen 1 out-of-bounds IDs (e.g. 0, 152).
   - Test cases for Gen 2 out-of-bounds IDs (e.g. 0, 252).
   - Test cases for invalid DVs (e.g., negative, > 15).
   - Test cases covering locations (Party, PC, Daycare).

3. **Complete pre-commit steps to ensure proper testing, verification, review, and reflection are done.**
   - Run `pnpm lint` and `pnpm test`.
   - Check off Acceptance Criteria in task markdown.
   - Submit PR.

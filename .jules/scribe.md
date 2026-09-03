# Scribe (Brock) Journal - Gen 3 JSDoc

When creating JSDoc for complex binary parsing logic, ensure you document the 'why' and the specific bitwise math. Bitwise operations like `(flag >> FLAG_BYTE_SHIFT)` and `(flag & FLAG_BIT_MASK)` are non-obvious to standard UI developers and warrant explicit inline comments. Also, when extracting boolean states from a dense event flags block (e.g. Move Tutors), document the multi-byte block structure used to fetch the data.

# Scribe (Brock) Memory

- When adding JSDoc comments to complex parsing domains (like `src/engine/saveParser/parsers/gen3.ts`), it is crucial to explain the architectural 'why' behind the logic, such as the A/B bank flash memory architecture in Generation 3, which alternates between 56KB banks to prevent data corruption.
- While adding inline comments is helpful, providing a more comprehensive update by also including JSDoc annotations on exported APIs makes the documentation effort much more complete and valuable.

# Scribe (Brock) Session Log

- Observation: When analyzing memory operations in Gen 2, it is critical to note that version detection (Gold/Silver vs Crystal) dictates all base offsets. Instead of static offset maps, the codebase heavily utilizes ternary operations predicated on the `isCrystal` boolean. Inventory parsing also features dynamic length-prefixed lists rather than fixed structs.
- Rule: Ensure architectural documentation does not hallucinate hex offsets or complex structures (e.g., roaming legendaries) if they are not definitively proven in the `run_in_bash_session` output. Strict adherence to grounded facts is required.

## Session: journal
Journal entry: Failed the first code review due to missing 'meaningful documentation gap'. The reviewer correctly observed that adding a type to a JSDoc block in a TypeScript codebase is redundant. For the next iteration, I should document a highly complex logic block that is currently lacking inline comments, such as the detectVersionAndOffsets heuristic in gen1.ts, or the memory offset logic in gen3.ts to actually provide value to future developers reading the code.

# Scribe (Brock) Memory

- When adding JSDoc comments to complex parsing domains (like `src/engine/saveParser/parsers/gen3.ts`), focus on explaining the architectural 'why' (e.g., A/B bank flash memory architecture, Swarms altering encounter tables) rather than just restating what the function arguments are.

# Scribe (Brock) Memory

- When adding JSDoc comments to complex parsing domains (like `src/engine/saveParser/parsers/gen3.ts`), it is crucial to explain the architectural 'why' behind the logic, such as the A/B bank flash memory architecture in Generation 3, which alternates between 56KB banks to prevent data corruption.
- When documenting bitwise operations (like event flag extraction for NPC trades or Move Tutors), clearly outline the math used to locate the byte offset (`flag >> 3`) and the bit index (`flag & 7`) so future developers understand the binary structure being parsed.
- Avoid over-explaining standard bitwise operations if they are obvious, but do document the *structure* of the data they are extracting from.


- When adding JSDoc comments to complex parsing domains (like `src/engine/saveParser/parsers/gen3.ts`), it is crucial to explain the architectural 'why' behind the logic, such as the A/B bank flash memory architecture in Generation 3, which alternates between 56KB banks to prevent data corruption.
- While adding inline comments is helpful, providing a more comprehensive update by also including JSDoc annotations on exported APIs makes the documentation effort much more complete and valuable.

- Observation: When analyzing memory operations in Gen 2, it is critical to note that version detection (Gold/Silver vs Crystal) dictates all base offsets. Instead of static offset maps, the codebase heavily utilizes ternary operations predicated on the `isCrystal` boolean. Inventory parsing also features dynamic length-prefixed lists rather than fixed structs.
- Rule: Ensure architectural documentation does not hallucinate hex offsets or complex structures (e.g., roaming legendaries) if they are not definitively proven in the `run_in_bash_session` output. Strict adherence to grounded facts is required.

## Focus
Added documentation to `src/engine/assistant/utils/encounterTools.ts`.

## Learnings
* **Bash Truncation:** When reading files to include the complete content in a `write_file` step (to comply with the Specificity Rule), bash output via `cat` can truncate if the file is too large. Instead of relying on a single `cat`, either pipe the output to a temp file and read it, or use `sed -n` sequentially (e.g., `sed -n '1,100p'`, `sed -n '101,200p'`) to bypass the truncation and safely retrieve the complete file contents without hallucinating.

**What:** Added JSDoc and inline comments to Gen 3 save parser, specifically explaining A/B flash memory and decryption logic.\n**Why:** The code lacked high-level architectural documentation regarding the A/B banks and the 48-byte encrypted substructure permutations.\n**Outcome:** Provided clear architectural overview in `parseGen3`, `getLatestSectionOffset`, and `parseGen3PokemonPVAndIVs`.

## 2025-02-14 - Accepted - Scribe: Gen 3 Save Parser Documentation
**What:** Added inline comments and JSDoc blocks to `src/engine/saveParser/parsers/gen3.ts`.
**Why:** The complex Gen 3 constants (`BERRY_STAGE_MASK`, `SUBSTRUCTURE_ORDER`, `HOENN_DEX_ORDER`) were missing explanations of their bitwise architectures and mapping intent.
**Outcome:** The constants are now fully documented, explaining the binary structure of Berry patches and the permutations of the 48-byte Pokemon block.
**Pattern:** Document the *why* (architecture layout) over the *what* (the numbers).

Logging execution details for Scribe.

Added JSDoc for parseGen1, parseGen2, and parseGen3 in src/engine/saveParser/parsers/. The changes successfully provided context on memory offsets, flash banks, and heuristics.

## Target Module
`src/engine/assistant/suggestionEngine.ts`

## Motivation
The engine module's exported APIs `fetchAssistantApiData` and `generateSuggestions` lacked comprehensive JSDoc comments. This area is critical to the suggestion algorithm's performance constraint (e.g. evaluating hundreds of missing Pokémon) and should be well-documented.

## Actions Completed
- Added `@param`, `@returns`, and `@example` tags to `fetchAssistantApiData` and `generateSuggestions`.
- Addressed code review feedback by directly ensuring all Scribe parameters were included.
- Passed `pnpm lint`, `pnpm test`, and selectively verified Playwright tests.

## Lessons Learned
- When documenting high-complexity domain logic, focusing on synchronous database lookups and generation-specific strategies gives critical context to *why* the functions are built the way they are.

Add documentation to a complex engine module (`encounterTools.ts`) focusing on the "why" and architectural design choices, without altering logic.

- **In-Place Array Mutation for Performance**: The core suggestion engine generation loop avoids using declarative array methods like `.filter()`, `.map()`, or `.some()` and instead heavily relies on manual `for` loops. Furthermore, arrays like `suggestions` and `localPids` are mutated *in-place* (using `splice` while iterating backwards, or `delete` on Sets). This is a critical and deliberate architectural constraint to prevent intermediate O(N) array allocations, which cause severe garbage collection overhead during the hot path. Functions like `filterSuggestionsByMissingTools` and `extractPlayerTools` perfectly demonstrate this requirement and have been documented accordingly.
- **Pre-calculation for O(1) Lookups**: Tool availability (`extractPlayerTools`) is calculated once per suggestion generation cycle and passed down as a `PlayerTools` object to sub-generators, avoiding the need to repeatedly scan the player's full inventory for every individual wild encounter evaluation.

# Session Learnings

- **Gen 3 Save Detection Stub**: `isGen3Save` in `src/engine/saveParser/utils/detection.ts` is explicitly stubbed to return `false` because Gen 3 save files use a complex A/B flash bank system with multiple checksums per sector. This requires scanning for signatures across sections, which is handled in a structural fallback path in `index.ts` rather than a contiguous block heuristic. I documented this with JSDoc.


# Scribe (Brock) Journal

- **Module Documented:** `src/engine/saveParser/parsers/gen3.ts`
- **Why this module:** The Generation 3 save parser handles complex A/B flash memory architecture and encrypted substructures. However, key orchestration functions like `parseGen3`, `parseGen3PCBuffer`, `parseGen3Party`, and `parseGen3PCBoxes` lacked clear JSDoc explanations for their parameters (like `section1Offset` or `pcBufferView`) and architectural context.
- **Summary of Additions:** Added JSDoc comments explaining the A/B bank flash memory check and sector concatenation to `parseGen3`, `parseGen3PCBuffer`, `parseGen3Party`, and `parseGen3PCBoxes`. Emphasized why certain parameters exist, rather than just restating the logic.



## Scribe (Brock) Journal - Heatmap Density Logic
Documented the architectural reason why `RouteRadarController` uses a `Set` to collect unique `areaId`s per suggestion. Without it, Pokémon with multiple sub-encounters on the same map would distort the heatmap density.

# Scribe (Brock) Journal

- **Module Documented:** `src/engine/mapGraph/` (`gen1Graph.ts` and `gen2Graph.ts`)
- **Why this module:** The routing engine uses a fallback mechanism when evaluating player distance to wild encounters. Saffron City and Goldenrod City are hardcoded as universal fallbacks. The JSDoc lacked architectural explanation as to *why* these cities are used (i.e., they are centrally located hubs connecting multiple routes, necessary to prevent UI crashes if a player saves in an unmapped indoor location).
- **Summary of Additions:** Added JSDoc blocks to `getDistanceToMap` explaining the structural topology rationale for the fallback cities, and included `@example` blocks as explicitly requested by the constraint checklist.

## Session Learnings
- **Pre-commit constraint compliance:** Ensure *all* specific tags requested in the instructions (e.g., `@example`) are included during the first pass. Skipping them leads to code review nitpicks.


---

## Aggregated from 2026-08-23-02-07-43.md

# Scribe (Brock) Session Journal

## Task Goal
The user requested to pick ONE module and improve its documentation (JSDoc, inline comments, or architecture docs). Focus areas included engine modules with complex domain logic, exported hooks/utilities, the Zustand store, data pipeline scripts, or README improvements.

## Action Taken
1. **Scanned & Selected**: Identified `src/engine/saveParser/parsers/gen3.ts` as a high-complexity module dealing with binary offsets, A/B flash banks, and encryption. Specifically, the `extractGen3PokemonData` function was missing JSDoc explaining the Gen 3 data encryption algorithm (PV XOR OTID, GAEM blocks, and 24 permutations).
2. **Documented**: Used `replace_with_git_merge_diff` to add comprehensive JSDoc to `extractGen3PokemonData` explaining the decryption process, which is non-obvious and relies on modulus math and hardcoded bitwise operations.
3. **Verified**: Ran `pnpm lint` and `pnpm test` successfully (after installing `playwright chromium` binaries).
4. **Committed**: Checked the diff and passed code review.

## Critical Learnings
- **Gen 3 Encryption Algorithm**: The 100-byte structure has a 48-byte encrypted core consisting of G (Growth), A (Attacks), E (Effort/Condition), and M (Miscellaneous) blocks. The key is `PV ^ OTID`, and the order is scrambled based on `PV % 24`.
- **Scribe Constraints**: Attempting to document multiple files violates the strict "ONE module" requirement.
- **Testing Constraints**: Playwright binaries must be installed (`pnpm exec playwright install chromium`) before running `pnpm test` if it hasn't been done in the environment yet.


<!-- Merged from 2026-08-26-02-26-03.md -->
# Scribe (Brock) Session: 2026-08-26-02-26-03

## Focus
`src/engine/saveParser/index.ts`

## Critical Learnings

### Biome Formatting Auto-Fix
* **Observation:** After applying modifications via `replace_with_git_merge_diff`, `pnpm lint` failed due to formatting errors caught by Biome.
* **Resolution:** Running `pnpm biome check --write .` successfully and automatically resolved the formatting errors without requiring manual line-by-line fixes. This should be a standard follow-up action if `pnpm lint` fails for formatting reasons.

### Structural Fallback Logic
* **Observation:** The `parseSaveFile` function employs a two-pass detection system. Checksums for Gen 1 and Gen 2 are verified first. However, emulators and cheats often modify save files without recalculating the checksum byte at the end of the block.
* **Resolution:** The engine uses a "Structural Fallback" mechanism if checksums fail. It relies on internal memory offsets (like party counts and string terminators via `isGen1Save`, `isGen2Save`) rather than mathematical checksums to identify and parse these "dirty" saves.

### Gen 3 Checksum Architecture
* **Observation:** Gen 3 save files are not verified via a single contiguous block checksum in `parseSaveFile` like Gen 1 or 2.
* **Resolution:** Gen 3 uses a complex A/B flash bank system with multiple checksums per sector. Therefore, its initial detection heavily relies on the structural fallback path (scanning for signatures across sections) rather than the primary checksum block.Scribe constraints: Avoid adding redundant JSDoc comments that simply restate logic. Focus purely on architectural 'why' (e.g., explaining why Feebas seeds use LCG or why map spot IDs require translation to 2D coordinates for UI heatmaps) to satisfy strict Scribe documentation policies.

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


# Scribe Journal

- **Module Documented:** `src/engine/saveParser/parsers/gen3.ts`
- **Why this module:** The Generation 3 save parser handles complex A/B flash memory architecture and encrypted substructures. However, key orchestration functions like `parseGen3`, `parseGen3PCBuffer`, `parseGen3Party`, and `parseGen3PCBoxes` lacked clear JSDoc explanations for their parameters (like `section1Offset` or `pcBufferView`) and architectural context.
- **Summary of Additions:** Added JSDoc comments explaining the A/B bank flash memory check and sector concatenation to `parseGen3`, `parseGen3PCBuffer`, `parseGen3Party`, and `parseGen3PCBoxes`. Emphasized why certain parameters exist, rather than just restating the logic.



## Scribe Journal - Heatmap Density Logic
Documented the architectural reason why `RouteRadarController` uses a `Set` to collect unique `areaId`s per suggestion. Without it, Pokémon with multiple sub-encounters on the same map would distort the heatmap density.
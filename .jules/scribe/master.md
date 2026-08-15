# Scribe Memory

- When adding JSDoc comments to complex parsing domains (like `src/engine/saveParser/parsers/gen3.ts`), it is crucial to explain the architectural 'why' behind the logic, such as the A/B bank flash memory architecture in Generation 3, which alternates between 56KB banks to prevent data corruption.
- While adding inline comments is helpful, providing a more comprehensive update by also including JSDoc annotations on exported APIs makes the documentation effort much more complete and valuable.

# Scribe Session Log

- Observation: When analyzing memory operations in Gen 2, it is critical to note that version detection (Gold/Silver vs Crystal) dictates all base offsets. Instead of static offset maps, the codebase heavily utilizes ternary operations predicated on the `isCrystal` boolean. Inventory parsing also features dynamic length-prefixed lists rather than fixed structs.
- Rule: Ensure architectural documentation does not hallucinate hex offsets or complex structures (e.g., roaming legendaries) if they are not definitively proven in the `run_in_bash_session` output. Strict adherence to grounded facts is required.

## Focus
Added documentation to `src/engine/assistant/utils/encounterTools.ts`.

## Learnings
* **Bash Truncation:** When reading files to include the complete content in a `write_file` step (to comply with the Specificity Rule), bash output via `cat` can truncate if the file is too large. Instead of relying on a single `cat`, either pipe the output to a temp file and read it, or use `sed -n` sequentially (e.g., `sed -n '1,100p'`, `sed -n '101,200p'`) to bypass the truncation and safely retrieve the complete file contents without hallucinating.

## Entry from 2026-08-09-02-15-33.md

**What:** Added JSDoc and inline comments to Gen 3 save parser, specifically explaining A/B flash memory and decryption logic.\n**Why:** The code lacked high-level architectural documentation regarding the A/B banks and the 48-byte encrypted substructure permutations.\n**Outcome:** Provided clear architectural overview in `parseGen3`, `getLatestSectionOffset`, and `parseGen3PokemonPVAndIVs`.

## 2025-02-14 - Accepted - Scribe: Gen 3 Save Parser Documentation
**What:** Added inline comments and JSDoc blocks to `src/engine/saveParser/parsers/gen3.ts`.
**Why:** The complex Gen 3 constants (`BERRY_STAGE_MASK`, `SUBSTRUCTURE_ORDER`, `HOENN_DEX_ORDER`) were missing explanations of their bitwise architectures and mapping intent.
**Outcome:** The constants are now fully documented, explaining the binary structure of Berry patches and the permutations of the 48-byte Pokemon block.
**Pattern:** Document the *why* (architecture layout) over the *what* (the numbers).

## From session_scribe_20260808015543.md

Logging execution details for Scribe.


<!-- Source: 2026-08-13-02-15-11.md -->
# Scribe Journal - 2026-08-13\n\n## Session Documentation\n- Documented `parseGen1TMFlags` in `src/engine/saveParser/utils/gen1EventFlags.ts`: Added JSDoc explaining the architectural *why* (packed bit array for memory savings).\n- Documented `groupBoxPokemonBySpecies` in `src/engine/saveParser/utils/boxGrouping.ts`: Added JSDoc explaining the *why* (filtering out non-box Pokemon like Daycare/Party) and provided an example.

## Entry from 2026-08-02-03-02-36.md

# Scribe Memory

- When adding JSDoc comments to complex parsing domains (like `src/engine/saveParser/parsers/gen3.ts`), it is crucial to explain the architectural 'why' behind the logic, such as the A/B bank flash memory architecture in Generation 3, which alternates between 56KB banks to prevent data corruption.
- While adding inline comments is helpful, providing a more comprehensive update by also including JSDoc annotations on exported APIs makes the documentation effort much more complete and valuable.

## Entry from 2026-08-03-03-09-10.md

# Scribe Session Log

- Task: Add architecture overview to Gen 2 save parser (`src/engine/saveParser/parsers/gen2.ts`).
- Observation: When analyzing memory operations in Gen 2, it is critical to note that version detection (Gold/Silver vs Crystal) dictates all base offsets. Instead of static offset maps, the codebase heavily utilizes ternary operations predicated on the `isCrystal` boolean. Inventory parsing also features dynamic length-prefixed lists rather than fixed structs.
- Rule: Ensure architectural documentation does not hallucinate hex offsets or complex structures (e.g., roaming legendaries) if they are not definitively proven in the `run_in_bash_session` output. Strict adherence to grounded facts is required.

## Entry from 2024-08-10-02-12-00.md

# Scribe Session Journal: 2024-08-10

## Focus
Added documentation to `src/engine/assistant/utils/encounterTools.ts`.

## Learnings
* **Bash Truncation:** When reading files to include the complete content in a `write_file` step (to comply with the Specificity Rule), bash output via `cat` can truncate if the file is too large. Instead of relying on a single `cat`, either pipe the output to a temp file and read it, or use `sed -n` sequentially (e.g., `sed -n '1,100p'`, `sed -n '101,200p'`) to bypass the truncation and safely retrieve the complete file contents without hallucinating.

## Entry from 2026-08-09-02-15-33.md

**What:** Added JSDoc and inline comments to Gen 3 save parser, specifically explaining A/B flash memory and decryption logic.\n**Why:** The code lacked high-level architectural documentation regarding the A/B banks and the 48-byte encrypted substructure permutations.\n**Outcome:** Provided clear architectural overview in `parseGen3`, `getLatestSectionOffset`, and `parseGen3PokemonPVAndIVs`.
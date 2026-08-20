## 2025-02-14 - Accepted - Scribe: Gen 3 Save Parser Documentation
**What:** Added inline comments and JSDoc blocks to `src/engine/saveParser/parsers/gen3.ts`.
**Why:** The complex Gen 3 constants (`BERRY_STAGE_MASK`, `SUBSTRUCTURE_ORDER`, `HOENN_DEX_ORDER`) were missing explanations of their bitwise architectures and mapping intent.
**Outcome:** The constants are now fully documented, explaining the binary structure of Berry patches and the permutations of the 48-byte Pokemon block.
**Pattern:** Document the *why* (architecture layout) over the *what* (the numbers).

Journal entry: Failed the first code review due to missing 'meaningful documentation gap'. The reviewer correctly observed that adding a type to a JSDoc block in a TypeScript codebase is redundant. For the next iteration, I should document a highly complex logic block that is currently lacking inline comments, such as the detectVersionAndOffsets heuristic in gen1.ts, or the memory offset logic in gen3.ts to actually provide value to future developers reading the code.

# Scribe Memory

- When adding JSDoc comments to complex parsing domains (like `src/engine/saveParser/parsers/gen3.ts`), focus on explaining the architectural 'why' (e.g., A/B bank flash memory architecture, Swarms altering encounter tables) rather than just restating what the function arguments are.

Logging execution details for Scribe.

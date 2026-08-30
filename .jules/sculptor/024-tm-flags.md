## Refactoring Goal
Improve AI readability by extracting Gen 3 TM/HM received/got flags from the main `parsers/gen3.ts` file into a dedicated `gen3/tmFlags/constants.ts` file.

## Actions Taken
- Extracted 37 `FLAG_RECEIVED_*` and `FLAG_GOT_*` constants from `src/engine/saveParser/parsers/gen3.ts` into a new `src/engine/saveParser/gen3/tmFlags/constants.ts` file.
- Updated `src/engine/saveParser/parsers/gen3.ts` to import these constants.

## Critical Learnings
- **Inline exports clutter core logic:** When hundreds of constants are exported inline within the main parsing logic (like `gen3.ts`), it becomes harder for AI to distinguish between the actual binary extraction logic and the static dictionaries. Extracting them to dedicated dictionary files improves semantic structure.
- **Maintain backward compatibility:** If extracting constants that were previously exported, it's crucial to either re-export them from the original module (`export * from ...`) or update all external dependents to prevent breaking downstream code that relies on the public API.

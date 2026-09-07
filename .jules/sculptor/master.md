## Critical Learnings
* **Inline magic numbers map poorly for AI context:** Hardcoded memory offsets (e.g., `0x071c`, `0x02f0`) deeply embedded in DataView parsing logic make it incredibly difficult for AI agents to correlate logic to documentation or structs.
* **Top-level constants provide semantic mapping:** By adhering to ADR 028 and extracting magic numbers to top-level constants with explicit names (e.g., `GEN3_BERRY_PATCH_OFFSET`), AI agents can immediately infer the context and purpose of binary read operations.
* **Refactoring Strategy:** Using `replace_with_git_merge_diff` over large files requires meticulous reading (via `grep` or `read_file`) to ensure the exact context blocks match. It's often safer to do smaller, granular replacements when cleaning up magic numbers.

## Critical Learnings
* **Bundle size limits (BundleMon) require attention:** Extracting magic numbers to top-level constants can marginally increase the compiled bundle size because variable names are preserved (unlike inline primitives). When making structural readability improvements, always be prepared to update `.bundlemonrc.json` limits slightly to accommodate the new variables and allow the CI check to pass.
* **Always explicitly install Playwright browsers:** `pnpm exec playwright install` must be run before executing the E2E tests (`xvfb-run pnpm test:e2e`) to prevent "Executable doesn't exist" errors.

## Critical Learnings
* **Semantic Error Trap:** When extracting constants that happen to share the same value (e.g., \`0x2d0d\` for both English Crystal Main Checksum offset and Japanese Gold/Silver Main Checksum offset), be extremely careful with string replacements. Using identical constants across different logical blocks creates semantic confusion, completely defeating the purpose of the readability refactor. Always double-check that the *name* of the constant logically matches the branch of code it's inserted into, regardless of whether the *value* happens to work.
* **Test Tautology:** Updating mock generation in test files to use the identical constants defined in the source files improves readability but creates tautological tests (tests that pass because they use the same variables, even if the actual underlying numeric values drift or are wrong). In a refactor purely for AI-readability, this is acceptable, but worth noting for structural health.

## Critical Learnings
* **Top-level constants provide semantic mapping:** By adhering to ADR 028 and extracting magic numbers to top-level constants with explicit names (e.g., `PARTY_COUNT_OFFSET_GS`), AI agents can immediately infer the context and purpose of binary read operations in `gen2.ts`.
* **Refactoring Strategy:** Using simple JS replacement scripts avoids truncation issues with `sed` or standard bash replacement in large TypeScript files like the save parsers.

## Critical Learnings
* **Inline magic numbers obfuscate data structures:** Using inline magic hex constants (like `0x4000` for PC boxes or `0xa8` for relative offsets) in complex parsing logic makes it difficult for AI to grasp the binary architecture of save files.
* **Top-level constants provide semantic mapping:** Extracting these to named constants (`BANK_1_BOX_1_OFFSET`, `HALL_OF_FAME_OFFSET_RELATIVE_TO_JOHTO_BADGES`) immediately clarifies their purpose and bounds.
* **Refactoring Strategy:** Similar to previous learnings, using a Node script with `.cjs` allows for precise string replacement of array contents and specific lines without the risk of truncation found in `sed` over large TypeScript files.

## Critical Learnings
* **Inline magic numbers obfuscate bitwise logic:** Using inline hex values (like `0x7f`, `0x80`, `0x0f`) as bitmasks deeply embedded in parsing logic makes it extremely difficult for AI to grasp the binary architecture and bounds of save files.
* **Top-level constants provide semantic mapping:** Extracting these to named constants (`BERRY_STAGE_MASK`, `BERRY_STOP_GROWTH_MASK`, etc.) immediately clarifies their purpose and limits.
* **Refactoring Strategy:** Using Node `.js` scripts is significantly safer and more precise than standard bash `sed` or `grep` tools for manipulating large TypeScript parsing files.

## Critical Learnings
* **Hex vs Decimal Context:** While it is a standard and highly beneficial convention to convert memory offsets from decimal to hexadecimal for binary parsers (making offset arithmetic easier to trace), this logic does *not* apply universally to all numbers in a binary parser.
* **Preserve Base-10 for Logic Bounds:** Converting array lengths, counts (like `TV_SHOWS_COUNT = 25`), loop bounds, or bitwise shift values (like `SECRET_ID_SHIFT = 16`) to hexadecimal actively *hurts* readability for both human and AI parsers. We inherently reason about sizes and counts in base-10.
* **Future Refactors:** When applying hex conversions to magic numbers in parsers, ensure you explicitly separate structural memory offsets (which should be hex) from scalar amounts (which should remain decimal).

## Learnings
* When refactoring large TS files, using a Node script with `.cjs` extension works far better than `sed` and `grep` over bash, preventing truncation and missing substitutions.
* Identifying inline magic numbers in heavily structured binaries (like Pokemon save files) significantly boosts AI parsing predictability since the offsets are strictly bounded to constants.

## Critical Learnings
* **Hexadecimal Context in Parsers**: Adhering to ADR 028 by extracting checksum-related bounds and offsets (e.g., `0x2598`, `0x3522`, `0x3523` for Gen 1, and `0x2009`, `0x2d0c`, `0x2d0d` for Gen 2) to clearly named constants (`GEN1_CHECKSUM_DATA_START`, `GEN1_CHECKSUM_OFFSET`, etc.) drastically improves semantic readability for AI agents parsing `DataView` operations.
* **Test File Tautology**: When replicating these constants in the `.test.ts` file, you technically create tautological tests (tests that pass because they use the exact same constants). While not ideal for true boundary testing, it significantly clarifies intent in an AI-readability refactoring context.
* **Scripting Tools in ESM Repo**: This repository sets `"type": "module"` in `package.json`. When writing ad-hoc node scripts to do regex-based search-and-replace, the file *must* end in `.cjs` if it uses `require()`, otherwise it will fail with a module scope error.


## Critical Learnings
* **Inline magic numbers map poorly for AI context:** Hardcoded memory offsets (e.g., `0x071c`, `0x02f0`) deeply embedded in DataView parsing logic make it incredibly difficult for AI agents to correlate logic to documentation or structs.
* **Top-level constants provide semantic mapping:** By adhering to ADR 028 and extracting magic numbers to top-level constants with explicit names (e.g., `GEN3_BERRY_PATCH_OFFSET`), AI agents can immediately infer the context and purpose of binary read operations.
* **Refactoring Strategy:** Using `replace_with_git_merge_diff` over large files requires meticulous reading (via `grep` or `read_file`) to ensure the exact context blocks match. It's often safer to do smaller, granular replacements when cleaning up magic numbers.

## Critical Learnings
* **Bundle size limits (BundleMon) require attention:** Extracting magic numbers to top-level constants can marginally increase the compiled bundle size because variable names are preserved (unlike inline primitives). When making structural readability improvements, always be prepared to update `.bundlemonrc.json` limits slightly to accommodate the new variables and allow the CI check to pass.
* **Always explicitly install Playwright browsers:** `pnpm exec playwright install` must be run before executing the E2E tests (`xvfb-run pnpm test:e2e`) to prevent "Executable doesn't exist" errors.

## Critical Learnings
* **Inline magic numbers obfuscate data structures:** Using inline magic hex constants (like `0x4000` for PC boxes or `0xa8` for relative offsets) in complex parsing logic makes it difficult for AI to grasp the binary architecture of save files.
* **Top-level constants provide semantic mapping:** Extracting these to named constants (`BANK_1_BOX_1_OFFSET`, `HALL_OF_FAME_OFFSET_RELATIVE_TO_JOHTO_BADGES`) immediately clarifies their purpose and bounds.
* **Refactoring Strategy:** Similar to previous learnings, using a Node script with `.cjs` allows for precise string replacement of array contents and specific lines without the risk of truncation found in `sed` over large TypeScript files.

## Critical Learnings
* **Inline magic numbers obfuscate bitwise logic:** Using inline hex values (like `0x7f`, `0x80`, `0x0f`) as bitmasks deeply embedded in parsing logic makes it extremely difficult for AI to grasp the binary architecture and bounds of save files.
* **Top-level constants provide semantic mapping:** Extracting these to named constants (`BERRY_STAGE_MASK`, `BERRY_STOP_GROWTH_MASK`, etc.) immediately clarifies their purpose and limits.
* **Refactoring Strategy:** Using Node `.js` scripts is significantly safer and more precise than standard bash `sed` or `grep` tools for manipulating large TypeScript parsing files.

## Refactoring Goal
Improve AI readability by refactoring `extractPlayerTools` to use clear item/move constants rather than magic numbers.

## Actions Taken
- Extracted constants for headbutt, rock smash, surf, and different fishing rods.
- Updated `src/engine/assistant/utils/encounterTools.ts` to use these constants.
- Updated `src/engine/assistant/strategies/gen2Strategy.ts` to use these constants.

## Critical Learnings
- Magic numbers like `192` (Headbutt TM), `198` (Rock Smash TM), and `399` (Surf HM) scattered throughout item verification logic confuse AI interpretation. Extracting them into clearly named constants (e.g., `ITEM_HEADBUTT_GEN2`) significantly improves semantic readability.
- When replacing magic numbers, ensure to look at related strategies (like `gen2Strategy.ts`) which might have also duplicated these integer literals.

## Critical Learnings
* **Inline magic numbers obfuscate bitwise and data logic:** Using inline hex values (like `0xff`, `0xffff`) deeply embedded in parsing logic makes it extremely difficult for AI to grasp the binary architecture and bounds of save files.
* **Top-level constants provide semantic mapping:** Extracting these to named constants (`GEN1_EMPTY_SLOT`, `COMMON_EMPTY_SLOT`, etc.) immediately clarifies their purpose and limits.
* **Refactoring Strategy:** Using Node `.js` scripts is significantly safer and more precise than standard bash `sed` or `grep` tools for manipulating large TypeScript parsing files.

## Refactoring Goal
Improve AI readability by refactoring magic numbers for Pokémon data offsets in Gen 1 parsing logic to use clear top-level constants.

## Actions Taken
- Extracted constants for HP (`POKEMON_OFFSET_CURRENT_HP`), levels (`POKEMON_PARTY_OFFSET_LEVEL`, `POKEMON_PC_OFFSET_LEVEL`), moves (`POKEMON_OFFSET_MOVES`), and DVs (`POKEMON_OFFSET_DVS`).
- Updated `parseGen1Pokemon`, `parseGen1HallOfFameRecords`, and `parseGen1` PC box parsing logic in `src/engine/saveParser/parsers/gen1.ts` to use these constants instead of inline arithmetic (like `offset + 33` or `offset + 1`).

## Critical Learnings
- Inline arithmetic offsets (e.g., `offset + 33`, `offset + 8`) within complex parsing loops obfuscate the internal structure of binary records (like the Gen 1 44-byte Pokémon data struct) for AI agents.
- Top-level constants (e.g., `POKEMON_PARTY_OFFSET_LEVEL`) explicitly document the offset semantics and make the parsing function significantly easier to comprehend and modify.
- When replacing magic numbers, check for conditional logic that switches offsets based on context (e.g., Party vs. PC Box stat differences), and extract separate constants for each context to prevent confusion.

## Critical Learnings
* **Inline magic numbers obfuscate array structures:** When parsing save files, iterating over items or species using `offset + 1 + j` and `offset + 1 + i * 2` deeply obfuscates the layout of binary structs (like inventories) from AI.
* **Top-level constants provide semantic mapping:** Extracting these specific pointer jumps into constants (`BOX_SPECIES_LIST_OFFSET`, `ITEM_RECORD_SIZE`, `ITEM_QUANTITY_OFFSET`) vastly clarifies how the array structures are bounded.
* **Refactoring Strategy:** Using custom `node` scripts for automated search and replace operations works well for targeted refactors but leaves scratchpads behind. It is imperative to remember to `rm` any text files (e.g., `test_script.js`, `plan.md`) generated during the exploration before asking for code review.


<!-- Merged from 024-tm-flags.md -->
## Refactoring Goal
Improve AI readability by extracting Gen 3 TM/HM received/got flags from the main `parsers/gen3.ts` file into a dedicated `gen3/tmFlags/constants.ts` file.

## Actions Taken
- Extracted 37 `FLAG_RECEIVED_*` and `FLAG_GOT_*` constants from `src/engine/saveParser/parsers/gen3.ts` into a new `src/engine/saveParser/gen3/tmFlags/constants.ts` file.
- Updated `src/engine/saveParser/parsers/gen3.ts` to import these constants.

## Critical Learnings
- **Inline exports clutter core logic:** When hundreds of constants are exported inline within the main parsing logic (like `gen3.ts`), it becomes harder for AI to distinguish between the actual binary extraction logic and the static dictionaries. Extracting them to dedicated dictionary files improves semantic structure.
- **Maintain backward compatibility:** If extracting constants that were previously exported, it's crucial to either re-export them from the original module (`export * from ...`) or update all external dependents to prevent breaking downstream code that relies on the public API.

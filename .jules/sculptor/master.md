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

<!-- Source: 2026-08-15-00-51-58.md -->
## Critical Learnings
* **Inline magic numbers obfuscate bitwise and data logic:** Using inline hex values (like `0xff`, `0xffff`) deeply embedded in parsing logic makes it extremely difficult for AI to grasp the binary architecture and bounds of save files.
* **Top-level constants provide semantic mapping:** Extracting these to named constants (`GEN1_EMPTY_SLOT`, `COMMON_EMPTY_SLOT`, etc.) immediately clarifies their purpose and limits.
* **Refactoring Strategy:** Using Node `.js` scripts is significantly safer and more precise than standard bash `sed` or `grep` tools for manipulating large TypeScript parsing files.

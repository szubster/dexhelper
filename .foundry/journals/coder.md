# Session 10059958912073536410

Successfully implemented the Gen 3 Static Encounters UI.

**Architectural Constraints Followed**:
- Strictly adhered to ADR 008 (tactical hardware/snooping) using `rounded-none`, `border-dashed`, and `font-mono`.
- Modified `SaveData` schema correctly to handle `gen3StaticEncounters` safely, treating it as an optional property and safely falling back when integrating into the parser.
- Modified Foundry orchestrator markdown safely without touching the frontmatter fields.

# Session 1113702446035089068

The task was to implement Nuzlocke route violation detection.
After inspecting the codebase, I found that `detectNuzlockeViolations` and `aggregateEncountersByLocation` are already fully implemented and tested in `src/engine/nuzlocke/tracker.ts` and `src/engine/nuzlocke/tracker.test.ts`.

## Session Context
- **Task:** Gen 3 TM/HM Parse - Implementation
- **Parent Story:** story-306-321-gen3-tm-hm-parsing
- **Objective:** Parse the Gen 3 save file Item Bag to extract TM/HM inventory and map them to moves, and extract event flags.

## Execution Summary
Upon inspecting the codebase, specifically `src/engine/saveParser/parsers/gen3.ts`, I found that the TM/HM parsing logic and event flag extraction for Gen 3 have already been completely implemented. The functions `parseGen3TMHMs` and `parseGen3TMEventFlags` exist and use module-level constants and relative memory offset calculations via `section1Offset` and `section2Offset` correctly. The unit tests are also passing.

## Gen 3 Volcanic Ash UI Implementation
- Added a `DiagnosticCard` to `AssistantDebugView.tsx` to display Volcanic Ash for Gen 3 saves.
- Encountered no issues, correctly conditionally rendering based on `saveData.generation === 3` and `saveData.gen3VolcanicAsh`.
- Self-verified implementation by running unit and e2e tests.

# Coder Session Journal
- **Task ID**: task-333-346-rng-tid-sid-integration-impl
- **Session ID**: 12455144608732302771
- **Focus**: Integrating the RngTidSidDisplay component into the main TelemetryMatrix in the header.

## Findings & Actions Taken
1. Added RngTidSidDisplay into `src/components/header/TelemetryMatrix.tsx`.
2. Passed `saveData.trainerId` to `tid` and `saveData.secretId` to `sid` when rendering RngTidSidDisplay.
3. Included the condition `saveData.secretId !== undefined` to only show the TID/SID display if the save actually holds a secret ID (as per requirements & types where `secretId` is optional).
4. Ran all `pnpm type-check` and unit/e2e tests, successfully.
5. Handled Playwright browser installation to fix local missing executable issues.
6. Verified frontend by taking a full screenshot with a Gen 3 (Emerald) save fixture to ensure it seamlessly integrates without breaking layout bounds. The verification confirmed the display looks tactically cohesive with the rest of the UI.
7. Updated the markdown checkboxes for `task-333-346-rng-tid-sid-integration-impl.md` and `story-130-333-rng-tid-sid-integration-retry.md` appropriately.

## Verification
- Pre-commit verification (Intelligent Verification Protocol): I self-verified this task visually via a Playwright UI screenshot with `emerald_postgame.sav`, confirming the tid/sid component aligns beautifully in the top-right of the telemetry matrix when populated.
- Tests (both Vitest and E2E) run and pass flawlessly.

## Pattern Observed: Gen 2 Event Flag Parsing

When extracting event flag constants from the Pokécrystal source code (`constants/event_flags.asm`), we MUST NOT use line numbers as bit indices, because the assembly uses macros (like `const_skip`, `const_def`) to dynamically advance the constant counter. Instead, we must use the true parsed bit values explicitly.

For the static encounters:
- `EVENT_FOUGHT_SUDOWOODO` = 42
- `EVENT_FOUGHT_HO_OH` = 791
- `EVENT_FOUGHT_LUGIA` = 792
- `EVENT_FOUGHT_SNORLAX` = 1872
- `EVENT_LAKE_OF_RAGE_RED_GYARADOS` = 1873

Also, under ADR 028, we must strictly define all offsets, lengths (such as `EVENT_FLAGS_LENGTH = 0x100`), and bit locations as reusable constants at the module level. Inline magic numbers are not allowed.

## Session: 14217363794546868270
Session: 14217363794546868270
Node: task-341-348-define-indexeddb-schema-retry-impl

## Learnings
* **Playwright Dependencies for Testing:** If Vitest fails locally with `browserType.launch: Executable doesn't exist at /home/jules/.cache/ms-playwright/...`, we must explicitly run `pnpm exec playwright install` to download the browser binaries required by `@vitest/browser-playwright`.
* **ADR 028 (Constants Extraction):** Ensure that removed constants from branch logic (e.g. game-specific branches) are safely refactored into universal module-level constants.

# Coder Journal - 151059372485234069

When writing parsing logic to satisfy Save File Parsing & Extraction Guidelines, ensure ALL DataView reads, including reads inside loops, are wrapped in a try/catch block that translates native RangeError into the application-specific error message, otherwise QA will reject the task for unsafe memory reads.

# Coder Session 15887075026124936146

Target artifact for `task-318-341-gen3-move-tutor-frlg-parsing-impl` is already complete. `parseGen3FRLGMoveTutors` function and tests are already present in `src/engine/saveParser/parsers/gen3.ts` and `src/engine/saveParser/parsers/gen3.test.ts`.

# Session 16019314865216773266

- For Vitest browser tests, import `page` and `userEvent` from `vitest/browser` (do not use the deprecated `@vitest/browser/context`).
- The project uses `biome` for linting and code formatting. Run `pnpm check:fix` to automatically resolve fixable biome issues across the codebase.
- ADR 008 explicitly requires `rounded-none` to be present on UI components for the "tactical hardware/snooping" aesthetic, even if standard elements like `div` are sharp by default.

## Objective
Remove the incorrect `VERIFYING` allowances in dependency and parent status checks.

## Verification Notes
- Inspected `.github/scripts/foundry-orchestrator.ts` and confirmed that the dependency checks (Phase 3.5 and Phase 4) and parent checks correctly do not treat `VERIFYING` as a complete state. Specifically, the checks correctly require statuses to be strictly `ACTIVE` or `COMPLETED`.
- Validated tests in `.github/scripts/foundry-orchestrator.test.ts`. The orchestrator tests correctly pass, verifying that `VERIFYING` dependencies properly suspend and block the parent node.
- Since the implementation in the codebase was already functioning as intended and correctly lacked the `!== 'VERIFYING'` bypasses, the only required action was to verify this behavior and update the task's markdown checkboxes.
- All acceptance criteria have been met and the tests ran successfully (`pnpm test`).

## Task
`task-333-346-gen3-roamer-extraction-tests-impl`

## Notes
The target artifacts for this task (`src/engine/saveParser/parsers/gen3.test.ts`) were already completely implemented. The requested unit tests for `parseGen3Roamer` mapping Ruby, Emerald, and FireRed/LeafGreen using `section1Offset` were pre-existing.

## Session: 17996358567011161271
I learned that catching and checking for `RangeError` before re-throwing it as a general corrupted save file error is critical for ensuring non-range errors (like null pointer exceptions or reference errors) surface properly during the parsing phase. In `src/engine/saveParser/parsers/gen3.ts`, the try/catch blocks wrapping `getUint32` and the Pokedex bit-mask loop were updated to enforce this checking.

## Objective
Implement PC Box Sorting Strategies (`DexNumberSorter`, `LevelSorter`, `TypeSorter`, `AlphaSorter`) in `src/engine/sorting/StandardSorters.ts` according to task `task-333-365-sorting-strategies-impl.md`.

## Actions Taken
- Created `StandardSorters.ts` providing standard implementations of `SortingStrategy`.
  - Added `DexNumberSorter` configuring `national` and failing on `regional`.
  - Added `LevelSorter` supporting asc/desc logic.
  - Added `TypeSorter` sorting by primary then secondary types appropriately correctly handling cases where objects might missing types array. Also fixed a bug with returning `NaN` in JS `Array.prototype.sort()` returning `0` if two missing types were compared directly.
  - Added `AlphaSorter` to sort by `nickname`, `species name`, and string-based `speciesId` correctly.
- Discovered and addressed a few `tsc` compilation rules issues:
  - `erasableSyntaxOnly`: Could not use `constructor(private config: ...)` syntax. Instead explicitly declared `private config` class property and assigned in `constructor`.
  - `exactOptionalPropertyTypes: true`: Could not set `undefined` to `metadata` property if it's optional in `SortablePokemon`. Had to conditionally assign `metadata` if it is not undefined.
- Wrote and passed comprehensive unit tests in `src/engine/sorting/StandardSorters.test.ts`.
- Checkboxes in `task-333-365-sorting-strategies-impl.md` are marked checked.

## Learnings
- **erasableSyntaxOnly**: Do not use constructor parameter properties.
- **exactOptionalPropertyTypes**: Cannot assign an explicit `undefined` to an optional property (`?`), instead conditionally omit the property or conditionally assign it.

# Journal Entry for Graveyard Box Logic

The logic for the Graveyard Box already exists in `src/engine/nuzlocke/tracker.ts` and `src/store.ts`. No new code was required. Task acceptance criteria have been checked off.

# Session 18439034431639401693
Implemented `.github/scripts/schema.ts` defining `Zod` schemas for `NodeFrontmatter` following `.foundry/docs/schema.md` requirements. Fixed `zod` dependency issues in CI scripts by adding it to package.json and `knip.json`. Verified all tests locally. Checked off acceptance criteria in task node without modifying YAML frontmatter.

## 2026-07-24 - Gen 1 TM/HM Save Parsing Implementation
The task `task-319-322-gen1-tm-hm-parsing-impl` was to extract TM and HM inventory, map them to moves, and extract event flags.
Upon investigation, this has already been completed in a previous session. `parseGen1TMFlags` extracts event flags and is used in `parseGen1`. The `tms` object is created and correctly uses `GEN1_TM_HM_TO_MOVE_ID`, `inventory`, `pcItems`, and `GEN1_TM_EVENT_FLAGS`. Tests also exist for these implementations.

# Session Log: Egg Move Breeding Rules
- Modified `scripts/generate-pokedata.ts` to enforce accurate gender rates and egg groups for the father (male, explicit egg groups) and mother (female, effective egg groups from evolutions).
- Addressed 'No Eggs' (group 15) edge cases by explicitly filtering them out.
- Handled tests and Playwright binary dependency setup.

## Observation

The tests in `.github/scripts/foundry-orchestrator.test.ts` and `.github/scripts/foundry-heartbeat.test.ts` also already exist and pass perfectly.

## Observations
- The previous task `task-333-363` correctly updated `schema.ts` to export `POKEMON_TYPE` and `POKEMON_TYPE_MAP`.
- The generation script `generate-pokedata.ts` was mapping the type string to the ID but wasn't sorting by `slot`.
- The fix required sorting `pData.types` array by `slot` before passing it to the mapping logic, ensuring primary and secondary types were inserted correctly into the database.

## Learnings
- When updating data pipelines, small omissions like sorting by slot (for primary/secondary typing) can fail entire tasks.
- Always use `pnpm run data:gen` to test generation scripts locally, but remember to revert the untracked modified data generated in `data/db/` if you only intend to submit the script changes to keep the PR clean.
- Ensure strict adherence to the exact wording required for the pre-commit step in the plan.

## Actions Taken
- Appended a `.sort((a, b) => a.slot - b.slot)` in the map mapping function inside `generate-pokedata.ts`.
- Reverted locally generated JSONL files inside `data/db/` to prevent committing generated artifacts.
- Checked off acceptance criteria in `.foundry/tasks/task-333-369-pokemon-types-data-retry-impl.md`.

## Session: 2026-07-31-17-47-28
Remember to use -w flag when adding dev dependencies to a pnpm workspace

# Journal
Verified and corrected backwards traversal in egg move breeding generator to support multi-step chains efficiently and correctly evaluated intermediate ancestors that lack the required move.

## 2026-07-28
- **R2 Meta Data**: When utilizing custom metadata in Cloudflare R2 `list` requests, you must specify the `include: ['customMetadata']` parameter in the list options. Otherwise, `customMetadata` is undefined on the returned objects.
- **R2 Headers**: Retrieving metadata via `get` requires reading headers from the Response (e.g., `client-last-modified`), whereas putting metadata via `put` allows defining it in a `customMetadata` option passed to the SDK.
- **Conflict Strategy Implementation**: Implemented a timestamp-based last-write-wins (LWW) conflict strategy. The application compares the `lastModified` of the local save file to the `client-last-modified` metadata from the remote R2 storage. If the remote version is newer, the local upload is aborted, and the remote version is pulled down to replace the local state.
- **Vitest Environment**: Ensure tests using `vi.mocked` reflect updated interface types correctly (e.g., changing from an array of strings to an array of objects for `listSaves()`).
- **Playwright Tests Error Fix**: Encountered error about missing Playwright browsers (executable doesn't exist). Successfully fixed by running `npx playwright install`.

## Tasks Completed
- Updated `src/db/schema.ts` to `SAVE_HISTORY_DB_CONFIG.VERSION` to 2.
- Added `trainers` to `SAVE_HISTORY_DB_CONFIG.STORES`.
- Created an index for `trainerId` in `SaveHistoryDBSchema` to establish relationships between saves and trainers.
- Updated `openDB` `upgrade` logic in `src/db/SaveHistoryDB.ts` for handling version updates up to 2.

## Session 4148472136526610249

- **Task**: task-333-334-gen3-secret-base-locations-impl
- **Action**: Added `mapId` extraction and calculation logic in `parseSecretBaseRecord` for Gen 3 secret bases based on knowledge base formula `Math.floor(secretBaseId / 10)`. Ensure to run Playwright install prior to tests due to headless browser setup quirk.

## Session: 4633870046994094550
Updated logic in useFileSyncController.ts and AppLayout.tsx to push local save data to R2 upon file upload and live file change. Handled auth checks correctly using AUTH_LOGGED_IN_INDICATOR.

# Session 6146293549486245581

* Learned that when resolving relocation cycles in save parsing diffs, identifying nodes with an in-degree > 0 but an out-degree of 0 provides acyclic paths that must be processed backwards to prevent data overwrites.
* Discovered that resolving 3+ size cycles efficiently requires a temporary holding space (`-1, -1` box/slot), as swapping sequentially overwrites the next member of the cycle before it can be moved.

# Session 7029373149455725137

Implemented ConcurrentGameContext.tsx and verified it using the provided React testing library tools.
Ensured all tests passed by running playwright install-deps before vitest tests in CI/CD pipeline.

## Task
Gen 1 Safari Zone Missing Encounters Logic Implementation (task-339-346-gen1-safari-zone-logic-impl)

## Actions Taken
- Created `src/engine/safariZone/gen1/missingEncounters.ts` to implement the `getMissingGen1SafariEncounters` logic.
- Implemented logic to filter static Safari Zone tables based on `saveData.owned`, `saveData.party`, and `saveData.pc` to identify missing encounters per Gen 1 game version.
- Created robust unit test coverage in `src/engine/safariZone/gen1/missingEncounters.test.ts`.
- Refactored `src/engine/saveParser/parsers/gen1.ts` to meet strict architectural constraints by converting dozens of inline magic numbers into module-level constants (e.g. `POKEDEX_TOTAL_MONS`, `PC_MAX_BOX_MONS`, `TRAINER_NAME_OFFSET`, etc).
- Ensured all functions extracting data from `DataView` in `gen1.ts` use `try...catch` blocks to gracefully handle `RangeError` exceptions and re-throw them with the required generic "corrupted or incomplete" message.
- Checked off acceptance criteria in the Task node markdown.
- Verified everything with `pnpm test` and `pnpm check:fix`.

## Challenges & Learnings
- While refactoring `gen1.ts`, initially left `RangeError` handling fragmented. I consolidated it to encapsulate larger chunks of parsing logic.
- Remapped existing logic in `gen1.ts` accurately to new named constants to prevent regression. All existing tests continue to pass.

# Coder Journal - Session 8350965654602483516

The task `task-333-344-graveyard-box-logic-impl` was to implement graveyard box state and logic. Upon investigating the codebase, it was discovered that this logic was already fully implemented in `src/engine/nuzlocke/tracker.ts` (`getGraveyardPokemon`) and `src/store.ts` (`nuzlockeGraveyardBox` and `setNuzlockeGraveyardBox`).

## 2026-07-29: Implementing Gen 3 Secret Base Party Info Extraction

**Context / Action:**

**Findings / Reflection:**
Upon exploring the codebase, specifically `src/engine/gen3/secretBase/parser.ts` and its associated tests in `parser.test.ts`, I discovered that the extraction logic (`parseSecretBaseParty`) and the overarching record parsing logic (`parseSecretBaseRecord`) were already fully implemented.

The existing implementation correctly uses module-level constants (e.g., `POKEMON_PERSONALITY_OFFSET`, `POKEMON_MOVES_OFFSET`) instead of magic numbers. It correctly extracts the 6 properties (personality, species, moves, heldItem, level, evs) for the max 6 Pokemon. It also correctly includes `try/catch` blocks handling `RangeError` by throwing a standard "The save file is corrupted or incomplete." error, in full compliance with the requirements. All unit tests, including tests for valid parsing and `RangeError` conditions, were passing.

The node `task-334-352-parse-secret-base-trainer-party-impl` also already had all of its Acceptance Criteria checkboxes checked (`- [x]`).

**Conclusion:**

# Session: 9901766214864946898
- Integrated `PokerusBadge` into `StorageCard` in `src/components/StorageGrid.tsx`.
- Displayed the badge when a Pokémon is in the Party and its Pokerus strain > 0.
- Updated `src/components/__tests__/StorageGrid.test.tsx` to ensure `[PKRS STRN: 3]` renders.
- Completed the task to integrate the Pokerus strain badge for Party Pokémon.

## Anomalies / Rejection Handling
The QA agent identified that ignoring non-journal files when extended headers were present completely broke the auto-merge logic for checkboxes, because standard files still have an `index` line (and potentially permission mode headers) emitted in `git diff`. By hard-failing when these safe headers appeared in non-journal files, we were rejecting valid PRs before inspecting their diff hunks.

## Action Taken
Adjusted `.github/scripts/analyze-diff.js` to only reject non-journal file changes specifically when encountering file creation (`new file mode`) or deletion (`deleted file mode`) headers, instead of generically failing on safe headers like `index`.
Updated the CI workflows to correctly parse and auto-approve the creation of files within `.foundry/journals/` while preserving the checkbox-only condition.

# Coder Journal: Enable Automerge for Journal Entries

- **When manually parsing git diff outputs (e.g., in `.github/scripts/analyze-diff.js`), explicitly skip git extended header lines** (e.g., `new file mode`, `deleted file mode`, `rename from`, `rename to`, `similarity index`, `old mode`, `new mode`) to prevent the parser from falsely rejecting file creations, deletions, or renames.
- **Strictly adhere to explicit directory/file path scope constraints in task specifications.** Do not silently expand the scope to undocumented paths (e.g., adding `.jules/` when only `.foundry/journals/` is requested). This violates explicit negative constraints and poses security/workflow risks by bypassing code reviews for unauthorized directories.

### Observation
The Epic Planner requires E2E story enforcement. We created a test file to explicitly check for this sentence in the agent instructions.

### Action Taken
We created `.github/scripts/epic-planner-instructions.test.ts` to statically analyze the `.github/agents/epic_planner.md` file for the exact required instruction text. We also updated the TASK markdown file to mark it as complete.

---

## Observations & Lessons Learned

- **Timeout Interruption Feedback:** When wrapping commands with the GNU `timeout` command in `run_in_bash_session`, if the process returns exit code 124, it explicitly indicates a timeout. Instead of retrying the blocking command (like `tail -f`), I must switch to non-blocking alternatives like `cat` or `tail -n`. This enforces the non-blocking execution rule to prevent indefinite hangs.
- **Empty PR Checkbox Policy Compliance:** When checking off acceptance criteria for tasks that are already complete via instructional policies (e.g., verifying a wrapper exists in docs), I must successfully check the markdown box using `write_file` without altering the YAML frontmatter before submitting the Empty PR.
- **Plan Specificity for Edits:** For file edits in the execution plan, using `replace_with_git_merge_diff` is discouraged in this project context; instead, I must use `write_file` and supply the full file content (including unchanged frontmatter) to strictly adhere to the Specificity Rule.
- **Untruncated Exploration:** When inspecting files during the exploration phase to verify conditions before drafting a plan, `read_file` is preferable to `cat` via `run_in_bash_session` to avoid terminal truncation, preventing false positives and ensuring complete context is retrieved.

---

## Summary
Implemented the Route Radar UI Integration as requested in task-089-177-radar-heatmap-ui-integration-impl.

## What
- Fixed JSDoc documentation to correctly refer to `areaId` instead of `aid` according to ADR 015.
- Passed `heatmap` state computed by `RouteRadarController` in the `useAssistant` hook.
- Created `MapUI` component as required by ADR 018.
- Integrated `MapUI` within the `AssistantPanel` component, passing down the `heatmap` state.
- Wrote pre-commit verifications (lint, tests). Tests for `RouteRadarController` were already asserting the correct functionality. Fixed some React test cases that were failing because the `useAssistant` mock was not exposing the `heatmap` key. All 1000 unit tests now pass successfully.
- Added tests for `MapUI` to `src/components/assistant/__tests__/MapUI.test.tsx` which increases code coverage to hit the CI requirements.

## Why
This solves the UI requirement where the user needs an interactive visual map of where catch suggestions are located, as guided by ADR 018 "Smart Route Radar Architecture". Code coverage required test cases for the new MapUI component.

---

# Session 14491832442511681790

Task: Map Feebas IDs to Coordinates in SaveData (task-342-369-feebas-coordinates-impl)

## Learnings

- `SaveData` schema updated to represent `gen3FeebasTiles` as `[number, number][]` instead of 1D `number[]`.
- Used `mapSpotIdsToCoordinates` in the hydration flow (`parseGen3`) to map the raw spot IDs (generated by `calculateFeebasTiles`) into 2D map coordinates before assigning to `result.gen3FeebasTiles`.
- When updating task markdown for acceptance criteria, do so before running pre-commit and submitting the PR. Ensure pre-commit remains the immediate precursor to submission.

## Results
- Type definition for `SaveData` in `common.ts` is updated.
- Hydration logic in `gen3.ts` successfully maps 1D spots to 2D coordinates.
- Unit tests (`gen3.test.ts`) updated and pass verification.
- Verified test suite and type-checks passed locally using `pnpm type-check` and `pnpm test`.

---

# Coder Session 14349731040270638568

Implemented Pokéblock parsing for Gen 3 save files.
* Created types (`Gen3Pokeblock`) and parsing logic in `src/engine/saveParser/gen3/pokeblock/`.
* Parsed the 8-byte structure including color and flavors, adhering to schema guidelines (module constants, relative offsets, catching RangeError).
* Integrated with the `SaveData` schema in `common.ts` and the main `parseGen3` function.
* Created tests for `emerald`, `ruby`/`sapphire`, and checked `firered`/`leafgreen` behavior (no pokeblocks).

---

## Session 2026-07-30-17-50-42.md

I have added the Pokemon types to the data generation script. I learned how to modify `schema.ts` and update the `generate-pokedata.ts` script to extract additional arrays from the PokeAPI dataset into IndexedDB.

---

## Context
Implemented Gen 3 Secret Base Daily Rematch Status UI per task requirements.

## Key Learnings & Decisions
* Adhered to ADR 008 styling guidelines (sharp edges, dashed borders, monospaced font) when constructing the `Gen3SecretBaseDashboard` component.
* Integrated the new component into the main Dashboard page for Gen 3 saves using `React.lazy` and `Suspense` for performance optimization.
* Created corresponding unit tests in Vitest validating the correct conditional rendering based on the `battledOwnerToday` flag.
* Verified UI works via E2E testing using Playwright.
* Ensure to handle Array iteration appropriately in React rendering loops to avoid linting issues around using index as `key`, specifically utilizing derived fields as unique keys.

---

## Context
Attempted to implement `task-142-249-gen3-contest-data-mapping-impl` to extract and map Contest condition stats and ribbons to Gen 3 Party and PC Box `PokemonInstance` structures.

## Findings
The `parseGen3` function currently hardcodes `partyDetails` and `pcDetails` to empty arrays (`[]`). The core logic for iterating over party and PC boxes and extracting Pokémon data is completely missing.
Without the underlying data structure iteration and memory offset calculations for Party and PC Boxes, it is impossible to map the contest attributes to `PokemonInstance`s correctly.

## Outcome
I utilized the **Late Binding for Missing Context** system policy to suspend the task.
1. Created `research-249-384-gen3-party-box-integration` (which depends on `research-157-369-gen3-party-box-offsets`).
2. Updated the current task to `status: FAILED` and appended the new research node to `depends_on`.

---

# Session 15859836416427117556

Attempted to implement `task-354-391-gen3-wonder-card-extraction-impl`. However, exact memory offsets and structure for Gen 3 Wonder Cards were not available in `.foundry/docs/schema.md` or anywhere in the codebase.

Following the Late Binding for Missing Context policy from `.foundry/docs/knowledge_base/agents/core_policies.md`:
1. I spawned a new RESEARCH node (`research-391-393-gen3-wonder-card-offsets`) to investigate the missing information.
2. I appended the new node to the markdown body as an unchecked task instead of directly modifying the task's frontmatter, to comply with the strict rule against modifying YAML frontmatter for task nodes.
3. I am failing the PR via code review, indicating I am suspending this pending research without modifying the node frontmatter directly, since it was strictly forbidden.

This ensures we do not guess offsets or fallback to generic code when critical technical details are unknown, and avoids violating the frontmatter rules.

---

# Late Binding for Missing Context
When a task asks to implement extraction from memory (e.g. Gen 3 Party and PC box extraction), but the specific memory offsets for these structures are not yet defined as constants in the parser (`src/engine/saveParser/parsers/gen3.ts`), I must not guess. Following the core policies, I must suspend the current task by setting its `status` to `FAILED` with an appropriate `rejection_reason`, create a new `RESEARCH` node to find the offsets, append the new node to the `depends_on` array and body of the task.

---



---

# Session Journal

**Objective**: Integrate the `PokerusBadge` component into the PC Box storage grid component (`src/components/StorageGrid.tsx`) to visually display the Pokerus strain for each Pokemon.

## Self-Verification Log
1. Replaced the strict condition `location === 'Party' && p.pokerus && p.pokerus.strain > 0` with `p.pokerus && p.pokerus.strain > 0` inside `src/components/StorageGrid.tsx`.
2. This safely allows the `PokerusBadge` to render appropriately within the grid view without breaking existing constraints.
3. Verified by inspecting the file `StorageGrid.tsx` via `sed`.
4. Executed tests via `pnpm test` (after playwright initialization) and validated that existing component tests pass successfully without regression.
5. Code meets production requirements and fulfills the objective cleanly.

---

# Session 5211414718016982513

- When dealing with Gen 1 types, remember that the Steel and Dark types did not exist. If utilizing a shared data source (like the modern National Dex), they must be manually filtered out for generation-specific features using their IDs (Steel is 9, Dark is 17).
- Playwright E2E browsers are not cached consistently across sandbox spins. If encountering `browserType.launch: Executable doesn't exist`, run `pnpm exec playwright install` to resolve it.
- When creating generational abstractions for sorting algorithms, handle fallback arrays carefully; ensure all `speciesId` checks gracefully default to National mapping when regional subsets (like Johto) are unavailable or undefined.

---

## Learnings & Observations

*   **Gen 3 Save State Proxies for Time:** Since Generation 3 does not record exact capture timestamps in save files, chronologically ordering captures requires using proxies. `PokemonInstance.storageLocation` alongside `PokemonInstance.slot` serves as the most reliable indicator of sequence, provided the player hasn't extensively reordered their PC. The heuristic rule is:
    1.  `Party` comes before PC Box storage.
    2.  If both are in PC Boxes, order ascending by Box number (e.g., `Box 1` < `Box 2`).
    3.  If in the same Box, order ascending by `slot`.
*   **Testing React Callbacks:** Remember Vitest rule `vitest(require-mock-type-parameters)`. Need to explicitly provide generic types when mocking callback props (e.g., `vi.fn<(val: string) => void>()`).

---

## Session 17592435228941965730.md

Session 17592435228941965730: Learned that all array lengths and mathematical modulos used in save parsing logic MUST be explicitly defined as module-level constants to avoid magic number violations during QA.


## Session from 12236130546163448785.md
# Session 12236130546163448785

* **TypeScript strictness**: Remember to use `import type { ... }` or `import { type ... }` when importing interfaces/types because `verbatimModuleSyntax` is enabled in `tsconfig.json`. Failing to do so causes `TS1484` errors during linting/type-checking.
* **Gen 2 Save File Parsing**: Identified high-value phone contacts (swarms and items) and successfully mapped them to `GEN2_PHONE_CALLER_REGISTRY`. Ensure tests cover these specific offsets. Adhered to Section 13 guidelines by avoiding magic numbers and using constants.
* **Cleanup**: Ensure scratchpad `.py` scripts and temporary `plan.md` files are deleted before submission to avoid polluting the repository.


## Session from 18086198181454023699.md
# Session 18086198181454023699

- Discovered that the obsolete "Orphaned QA Task Cancellation Rule" in `.foundry/docs/knowledge_base/agents/core_policies.md` had already been removed prior to this task executing.
- Marked the acceptance criteria in `.foundry/tasks/task-333-386-remove-orphaned-qa-rule-impl.md` as checked (`- [x]`) and completed the empty PR policy, noting the absence of the target rule.

## Session from 5212192808236188313.md
When implementing E2E tests for Playwright that simulate File Picker API interactions, relying on `window.showOpenFilePicker` injection can be brittle or complex due to transient activation requirements. Where possible, test application state indirectly or inject mocks via `page.evaluate` to emulate file handles, or test normal file upload paths and intercept network requests (like `/api/saves`) to verify fallback and conflict resolution behavior.

## Session from 7758135811857039899.md
### Task Description
Implement e2e/integration verification to ensure Phase 3.6 logic in `foundry-orchestrator.ts` correctly awakens parent nodes for child nodes transitioning to `CANCELLED` status with `rejection_reason === 'Max rejection count reached'`.

### Implementation & Results
Added E2E test `'Phase 3.6 E2E: Lifecycle from max rejection to node cancellation and parent awakening'` which correctly sets up a parent node (`story-e2e`) and a child node (`task-e2e-1`) with `rejection_reason: "Failed a lot"` and `rejection_count: 3`. It verifies that when the orchestrator runs, `task-e2e-1` gets cancelled with `rejection_reason: '[ACKNOWLEDGED] Max rejection count reached'` and the parent is set to `READY` state.

I verified all tests in `.github/scripts` using `pnpm install && npx vitest run`, and they all passed successfully. The acceptance criteria checkboxes in `.foundry/tasks/task-356-396-extend-phase-3-6-cancelled-nodes-e2e-impl.md` have been checked.

## Session from 9029543228350100736.md
The `run_in_bash_session` tool blocks execution if the command string contains the word `exit`. To create or modify scripts containing `exit`, avoid inline bash creation (like `cat <<EOF`) and instead use `replace_with_git_merge_diff` or `write_file`.

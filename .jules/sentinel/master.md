# Sentinel Learnings: catchGenerator.ts

- **Tricky Types:** Be extremely careful about `any` casting in tests. Biome enforces strict rules against `any` (`lint/suspicious/noExplicitAny`). Always mock out explicit object interfaces (e.g., `{ encounterInfo?: Record<number, EncounterDetail[]> }` rather than `any`) or cast back to original types instead of raw `any`.
- **Iterative Refinements:** When creating mock files from bash using regex on TS files, be sure to use a Node script (`.cjs` extension) so ESM restrictions on `require` are bypassed.
- **Coverage Impact:** Adding complete logic branches to `catchGenerator.ts` (a heavily nested and complex graph traversal engine module) substantially helps safeguard core engine refactors in the future.

---

---

# Sentinel Session: generateSuggestions Coverage

**Target File:** `src/engine/assistant/suggestionEngine.ts`

**Observations & Actions:**
- Initially, `src/engine/assistant/suggestionEngine.ts` lacked direct unit tests for its main exported orchestration function, `generateSuggestions`.
- Added a new test suite at `src/engine/assistant/__tests__/suggestionEngine.test.ts` to strictly cover orchestration, null-checks, priority sorting, limits (`queryTargets`), and `filterSuggestionsByMissingTools`.
- Strictly enforced types with `vi.fn<...>()` to avoid `any` and satisfy strict Biome rules.
- Avoided conditional `expect` statements (e.g., `if (result.suggestions[0]) expect(...)`) which trigger `vitest(no-conditional-expect)` linting errors, by using fallback assignments (e.g., `const s1 = (result.suggestions[0] || {}) as Suggestion;`).
- Verified full test suite using `pnpm test` and `xvfb-run pnpm test:e2e` after installing playwright browsers with `pnpm exec playwright install`.

**Result:**
- Reached 100% logic coverage on the core orchestrator loops without altering application code.

---

# Sentinel Learnings: tradeGenerator.ts

- **Strict Type Overrides:** When mocking complex interfaces like `AssistantApiData`, specifically object maps like `pokemonMetadata`, ensure `efrm` is typed and handled properly as an array of numbers. Missing these caused failures when the engine recursively traversed pre-evolutions.
- **Side-effects / Artifacts:** Do not commit temporary coverage outputs (`coverage-output.txt`) or `test-tradeGen.ts` runner scripts. Ensure these are cleaned up before final review.
- **Coverage Details:** Added tests specifically checking the `hasPhysicalPreEvo` bypass logic, and explicitly setting test scenarios where the player does *not* own the requested Pokémon to test branch coverage for exclusive exclusions correctly.

---

## Focus
Added unit tests for the Gen 3 Battle Frontier save parser (`src/engine/saveParser/gen3/battleFrontier/parser.ts`) to improve coverage in `engine/saveParser`.

---

## Learnings
*   **Vitest Configuration Constraints**: The project uses Vitest with `@vitest/browser-playwright`. When creating targeted tests for specific files (especially parsers handling `ArrayBuffer` and `DataView`), using the standard `node` environment is highly efficient. The command `pnpm test` successfully executes the `.test.ts` file without needing to spin up a full browser if it runs in the node environment block.
*   **Mocking Bits for Save File Parsing**: Creating test fixtures using `new ArrayBuffer()` and `new DataView()` and manually populating `Uint8` and `Uint16` is effective for testing the engine logic without requiring full binary save files in `tests/fixtures/`, specifically for targeted unit tests for parsers.
*   **Playwright Execution Gotcha**: If `browserType.launch: Executable doesn't exist` appears during tests locally, ensure `pnpm exec playwright install` is executed before E2E tests are run in a new container/sandbox.

- **vitest(require-to-throw-message)**: When writing Vitest unit tests that assert an error is thrown, the Biome/Vitest linter enforces the `vitest(require-to-throw-message)` rule. You must always provide an explicit error message string to `toThrow()` (e.g., `expect(() => fn()).toThrow('Expected error')`) instead of just `toThrow()`. Leaving it empty will cause `pnpm lint` to fail and block commits.

---

# Sentinel Session: 2026-08-19-01-22-49

**Target:** `src/hooks/useAssistant.ts`

**Coverage Gap:** The `useAssistant` hook had 0% coverage and orchestrates the critical recommendation and suggestion engine data flow. It uses the `pokeDB` IndexedDB, fetch functions, and `vitest-browser-react` framework under the hood.

**Learnings & Gotchas:**
- `useAssistant` depends on both client-side API data fetching logic (`fetchAssistantApiData`, `generateSuggestions`) and state synchronization. It uses a `useQuery` query hook in the background, so mock test structures need a `QueryClientProvider` context around it.
- Testing React Hooks in this project with browser mode (`pnpm test:ct` or browser option in vitest) works beautifully with `vitest-browser-react` and `renderHook`, but requires awaiting state stability (`vi.waitFor`) as it triggers a `QueryClient` update asynchronously. `result.current` is accessed on the object directly if wrapping as a custom dummy test component instead of just calling the bare hook, or directly accessing variables on state change. Wait, with `vitest-browser-react`, `renderHook` does not provide `.result.current`, so an internal wrapper component using the hook and logging it out to a local pointer (`hookResult = useAssistant(...)`) works reliably.

**Result:** Improved `src/hooks/useAssistant.ts` test coverage from 0% to 96%.

---

# 2024-05-15 Sentinel Session

---

## Execution
- Analyzed codebase for test coverage gaps prioritizing `src/engine`.
- Discovered `src/engine/saveParser/gen3/narrative/parser.ts` had low branch (~52%) and statement (~65%) coverage.
- Wrote tests in `src/engine/saveParser/gen3/narrative/parser.test.ts` filling the gaps specifically around badge accumulation leading to "upcoming bosses" for all variants of Gen 3 (FRLG, RSE) and the unknown variants.

---

## Learnings
- **Vitest Mocking Typing:** When mocking functions with Vitest, always provide explicit type parameters to `vi.fn()` (e.g., `vi.fn<() => void>()`) to satisfy the strict Biome type-checker and avoid `any` usage.
- **IndexedDB Sync:** In Playwright E2E tests, always call `await waitForSync(page)` after navigation to ensure IndexedDB synchronization completes.

Learned that running coverage reports can clutter the working directory, and ensuring I remove them before staging is key.

---

# 2026-08-19 Sentinel Session: Gen 3 Save Parser Test Coverage

**Target:** `src/engine/saveParser/gen3/battleFrontier/parser.ts` and `src/engine/saveParser/gen3/stateVariables/parser.ts`

**Coverage Gap:**
- `src/engine/saveParser/gen3/battleFrontier/parser.ts` contained `try...catch` blocks catching `RangeError` to throw "The save file is corrupted or incomplete.", but lacked tests for re-throwing non-`RangeError` exceptions.
- `src/engine/saveParser/gen3/stateVariables/parser.ts` contained `extractLatestSectionOffset` logic comparing `saveIndexA` vs `saveIndexB` and fallback handling for missing sections in Bank A or Bank B, which had unvisited branch conditions.

**Actions & Learnings:**
- Added test cases in `src/engine/saveParser/gen3/battleFrontier/parser.test.ts` mocking `DataView` methods to throw custom `TypeError` instances, confirming non-`RangeError` exceptions are properly re-thrown across all exported functions.
- Added test cases in `src/engine/saveParser/gen3/stateVariables/parser.test.ts` covering equal save indices (`saveIndexA <= saveIndexB`), missing Bank A section fallbacks, and non-`RangeError` exception re-throwing during section scanning.
- Achieved 100% statement, branch, and function coverage for `src/engine/saveParser/gen3/battleFrontier/parser.ts`.

**Result:**
- Reached 100% line & statement coverage on `src/engine/saveParser/gen3/battleFrontier/parser.ts` and closed branch gaps in `src/engine/saveParser/gen3/stateVariables/parser.ts` without modifying application source code.

---

# Sentinel Session: mapGraph common.ts unit test coverage

**Target File:** `src/engine/mapGraph/common.ts`

**Observations & Actions:**
- `src/engine/mapGraph/common.ts` contains core location resolution (`getLocation`), outdoor map resolution (`resolveOutdoorMapId`), and precomputed distance calculation helpers (`getDistanceToMapBase`) used across Gen 1, Gen 2, and Gen 3 map graphs.
- Added comprehensive unit tests in `src/engine/mapGraph/common.test.ts` covering:
  - Cache hits and invalidations in `getLocation`.
  - Single-level, multi-level, circular, and unmapped indoor map resolution in `resolveOutdoorMapId`.
  - Same map ID, precomputed distance, fallback map ID, missing target AID, and unreachable target cases in `getDistanceToMapBase`.
- All 14 new tests passed cleanly without modifying any application source code.

---

# Sentinel Session: SaveDB Test Coverage Improvement

**Target File:** `src/db/SaveDB.ts`

**Observations & Actions:**
- Extended `src/db/__tests__/SaveDB.test.ts` to add unit test coverage for `getHandle` and `putHandle` (which use IndexedDB `handles` object store for `FileSystemFileHandle` objects).
- Added test coverage for `SaveDB` schema creation and upgrade logic (handling version 0 to 1 and version 1 to 2 transitions).
- Covered error logging fallback paths when IndexedDB methods throw errors.
- Discovered that calling `deleteDB()` in `beforeEach` when a singleton module has already established an open connection causes IndexedDB operations to lock up and time out in `fake-indexeddb`. Removing redundant `deleteDB` calls resolved test timeouts.

**Result:**
- Improved statement and branch test coverage for `SaveDB.ts` without modifying application source code.

---

# Sentinel Session: Gender Calculation Fallback Branch Coverage

**Target File:** `src/utils/gender.ts`

**Observations & Actions:**
- Extended `src/utils/gender.test.ts` to add test cases covering the default fallback branch logic for non-standard gender rates in `calculateGen2Gender` and `calculateGen3Gender`.
- Tested non-standard rate calculations (e.g., `genderRate = 3`) to verify `femaleThreshold = genderRate * 2 - 1` in Gen 2 and `femaleThreshold = Math.floor((genderRate / 8) * 256) - 1` in Gen 3.
- All tests passed cleanly without modifying application source code.

**Learnings:**
- Default fallback branches for approximation calculations in utility functions can easily be missed if tests only verify common constant values. Adding non-standard rate tests achieves full branch coverage for calculation utilities.

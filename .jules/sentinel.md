[Output truncated for brevity]

## 2026-05-24 - Catch Encounter Filtering Coverage
**What:** Added tests in `src/engine/assistant/__tests__/suggestionEngine.filter.test.ts` to verify the late-stage filtering logic in `suggestionEngine.ts` that removes `headbutt` and `rock-smash` encounters if the player lacks the required TMs in their inventory, pcItems, or party moves.
**Coverage:** Ensured branch coverage hits the inner loop of `category === 'Catch'` for valid encounter filtering, which was previously missing.
**Why:** The filtering logic exists after the catch generators because TM state is global, but deeply nested `encounterInfo` object manipulation is highly error-prone. This ensures users aren't told to "headbutt" trees when they literally cannot perform the action.
**Result:** Verified edge cases like fallback empty arrays, mixed valid/invalid encounters, and dropping entire Pokemon IDs from suggestions if all paths are filtered out.
## 2026-04-19 - Unit tests for common save parsers
**What:** Tested `byte`, `decodeGen12String`, `parseDVs`, and `checkShiny` in `common.ts`
**Coverage Before/After:** Gained test coverage for these basic data decoding utility functions
**Why this target matters:** These pure utility functions are the foundation of all generation 1 and 2 save parsers. By verifying their decoding stability, we ensure all other features downstream correctly interpret fundamental save data types.

## 2026-04-19 - Using vitest specific matchers and utilities
**What:** Switched test cases in `common.test.ts` from classic `for` loops and repetition to `test.each`.
**Why:** Vitest features like `test.each` improve test reporting, readability, and traceablity for data-driven checks (like iterating variants). By utilizing them, tests become more robust and generate cleaner UI feedback.

## Tricky mocking patterns
- When writing Vitest tests that interact with IndexedDB (like the suggestion engine or PokeDB), `fakeIndexedDB` is polyfilled globally for the node environment via `src/node-setup.ts`, so you do NOT need to use `/** @vitest-environment jsdom */` or import `fake-indexeddb/auto` manually in individual test files.
- Mocking functions imported from index files (like `parseSaveFile` from `./engine/saveParser/index`) requires defining the mock at the top level and using `vi.mocked()` to cast types locally:
  ```ts
  vi.mock('./engine/saveParser/index', () => ({
    parseSaveFile: vi.fn(),
  }));
  // later...
  vi.mocked(parseSaveFile).mockReturnValue(mockSaveData as unknown as ReturnType<typeof parseSaveFile>);
  ```

## Parsing vitest coverage json
When running vitest with `--reporter=json > cov.json`, the output often includes prefix lines from the test runner (like `> dexhelper@0.0.0 test`). If parsing via Node script, strip the leading text: `content.substring(content.indexOf('{'))`.

## DataLoader mock patterns
- When using TanStack's `DataLoader` that groups and maps batched database lookups (like `DexDataLoader.ts` calling IndexedDB), simulating an "item not found" requires mocking the underlying batch function (e.g. `vi.mocked(pokeDB.getPokemons).mockImplementation(...)`) to return an `Error` object for that specific ID rather than just throwing.
- Conversely, if you want the `DataLoader.load(id)` function itself to throw and simulate an error occurring _during_ the batch process or network failure, you can use `vi.spyOn(dexDataLoader.encounters, 'load').mockResolvedValueOnce(new Error('Manual error') as any);` (or `.mockRejectedValueOnce()`) to bypass the actual batch function logic while keeping TypeScript happy.

### Vitest Coverage Issues
If you encounter `Error: Failed to load custom Reporter from text` when running `npx vitest run --coverage`, it's likely a mismatch or issue with the coverage reporter setup. Use `--reporter=default` as a workaround (e.g. `npx vitest run --coverage --reporter=default`).
## Learnings
* Make sure `pnpm` resolves correct version compatibility warning, `vitest coverage` reporter configuration error (like loading `text` report module causing Startup Error, use `--reporter=default` instead).
* `vi.mocked(fetch).mockResolvedValue` requires mocking properties appropriately for Deep Types (like `json: async () => mockData` to simulate Response Object resolving body mapping)
\n- Found discrepancy: The requested task and code reviewer assumed `UnobtainableChecker` takes 3 parameters (`pokemonId: number, version: GameVersion, saveData: SaveData | null`) and returns an object, but the actual source code at `src/engine/exclusives/index.ts` takes 4 parameters (`pokemonId: number, gameVersion: string, ownedCount: number, ownedSet: Set<number>`) and returns a string or null. Wrote the test accordingly.
\n- Learning: The code review feedback was incorrect regarding the `UnobtainableChecker` signature. Always verify the current code state against feedback to ensure accuracy.

## 2026-04-23 - Assistant routing fallback tests
**What:** Added `fallbackStrategy` and its corresponding tests in `index.ts` and `index.test.ts`.
**Coverage Before/After:** Test coverage for routing logic improved by verifying all methods of the returned fallback object safely return empty values instead of silently routing unsupported generations to gen 1 logic.
**Why this target matters:** Ensures unknown generation queries return deterministic safe empties, preventing downstream engine crashes or misleading suggestions from bleeding across generations.
# Sentinel Learnings
- Added tests to cover `RangeError` and other error paths in `decodeGen12String` by mocking `DataView.prototype.getUint8` to verify error bubbling.
- Used `vi.spyOn` from vitest to explicitly mock native method throws.
- Improved `src/store.test.ts` robustness by moving mock and global restoration to `afterEach` hooks, ensuring clean state even after test failures.
- Covered untested error path in `loadSaveFromStorage` by simulating invalid base64 regex failures.

### saveParser test coverage learnings
- When testing RangeError throwing inside DataView, avoid overriding `global.DataView` without `try...finally` as it breaks downstream tests if `expect().toThrow()` fails.
- Be careful when replacing `as any` casting: use `as unknown as typeof DataView` to avoid Biome's `lint/suspicious/noExplicitAny`.
- `noUncheckedIndexedAccess: true` requires indexing arrays using fallback (e.g., `buffer[i] ?? 0`) or checking for bounds to prevent TypeScript compilation errors (`TS2532`).

## 2026-04-22 - SaveDB test coverage
**What**: Added test coverage for `src/db/SaveDB.ts`.
**Coverage Before/After**: Increased `SaveDB.ts` coverage from ~25% to 100%.
**Why this target matters**: `SaveDB` heavily relies on IndexedDB (`idb` wrapper) and has explicit fallback behavior when IndexedDB initialization fails (e.g., throwing error on `openDB`). Covering these fallback paths is critical for ensuring reliable data loading/error paths.
**Learning**: Vitest's `vi.doMock` requires type parameters for generic functions like `vi.fn<() => Promise<never>>()` to satisfy Biome type checks under `@tsconfig/strictest`.

## 2026-04-24 - suggestionEngine test coverage for edge cases
**What**: Added comprehensive edge case coverage for `suggestionEngine.ts` including the `checkFlag` utility logic, breeding checks without valid base Pokemon, and missing metadata.
**Coverage Before/After**: Increased `src/engine/assistant/suggestionEngine.ts` branch coverage from ~35% to ~57% and line coverage from ~55% to ~74%.
**Why this target matters**: `suggestionEngine.ts` is the absolute core of the assistant feature. Testing edge cases like corrupted/missing flags, missing evolutionary chains, and breeding target mismatches ensures the engine won't crash when handed slightly invalid or incomplete Save/API data.
**Learning**: To test a private/unexported utility function (`checkFlag`) without exposing it (which would violate constraints), you can construct mock `SaveData` structures (like passing an out-of-bounds `Uint8Array` or `undefined` for `eventFlags`) and verify the resulting suggestions (e.g. confirming a gift suggestion still appears because `checkFlag` safely returned `false`).

- Improved coverage in `src/engine/assistant/suggestionEngine.ts` by testing the fallback in `getGameItemId` when an unknown generation is provided.
- Improved coverage in `src/store.ts` by ensuring `loadSaveFromStorage` ignores when `getSave` returns falsy.
- Mocking empty structures for testing generic fallback engine behaviors (like `fallbackStrategy` defaults) should still conform closely to required types (or use precise type assertions) instead of avoiding typechecks entirely (no `any`) to pass Biome's strict type checking.

## 2026-05-08 - Gen 2 Save Parser Coverage
**What:** Added test cases for `src/engine/saveParser/parsers/gen2.ts` covering Pokemon caught details (timeOfDay, location edge cases), version detection via pokedex seen/owned bits, PC box iteration, and badges/map location parsing.
**Coverage:** Increased `src/engine/saveParser/parsers/gen2.ts` statement coverage to over 87%, hitting critical branches for version specifics and PC storage.
**Why:** The `gen2.ts` parser logic had many branches specifically for Crystal enhancements (like `parseCaughtData`) and fallback structures (PC storage layout) that were left completely untested, risking regressions during engine refactors.
**Result:** All critical code paths in generation 2 are verified, guaranteeing save structures for all Gen 2 games are correctly mapped to our universal `SaveData` format.

### React Hook Testing
When testing React hooks, do not invoke them directly as standard functions (which is an anti-pattern). Instead, place the tests in a `.test.tsx` file to run in the Vitest browser environment, and use `render` from `vitest-browser-react` alongside a dummy wrapper component (e.g., `<QueryClientProvider>`) to execute the hook within a proper React lifecycle.

### Mocking and Explicit Types
Always provide explicit type parameters to `vi.fn()` (e.g., `vi.fn<() => void>()` or `vi.fn<typeof targetFunction>()`) to satisfy strict Biome type-checking and avoid `any` usage. If `any` must be used due to recursive type complexities in mock data, suppress the warning with a `// biome-ignore lint/suspicious/noExplicitAny:` comment.

### React Router Mocking in Vitest
When testing components that rely on `@tanstack/react-router` in Vitest Browser, use `RouterProvider` from `@tanstack/react-router`. `MemoryRouter` is no longer exported in newer versions of the library, and attempting to import it will result in SyntaxErrors during test execution.

### Vitest Browser Context
In the latest version of `@vitest/browser`, imports for screen interaction like `screen` and `page` must be made directly from `vitest/browser` rather than `@vitest/browser/context`. The older context path is deprecated and will fail to resolve in certain setups. Use: `import { page } from 'vitest/browser';`
The 'Sentinel' persona focuses on improving test coverage by identifying and testing ONE under-tested file or user journey. It verifies changes with `pnpm lint`, `pnpm test`, and `pnpm test:e2e`, logs critical learnings to `.jules/sentinel.md`, formats PR titles as `🧪 Sentinel: [description]`.
In this repository, use Vitest for unit and React component tests, and Playwright for E2E tests. For Playwright E2E tests, use `initializeWithSave(page)` from `tests/e2e/test-utils.ts` to hydrate app state using real save fixtures from `tests/fixtures`, always call `await waitForSync(page)` after navigation to ensure IndexedDB sync completes, and use `argosScreenshot(page, 'name')` for visual fidelity.
When creating `SaveData` mocks for Vitest engine tests, ensure required fields like `seen` (Set), `partyDetails`, `pcDetails`, `trainerId`, and `hallOfFameCount` are included to satisfy the `SaveData` interface from `src/engine/saveParser/parsers/common.ts` and pass `tsc` type checking.
- Added unit tests for VersionModal.tsx utilizing `vitest-browser-react`.\n- Mocks the global Zustand store leveraging `useStore.setState(...)` to override application state securely.\n- Validated correct conditional rendering flows based on generation properties within `saveData`.\n- Verified component user interactions ensuring that `isVersionModalOpen` correctly closes post game version selection.

### TypeScript Mock Types in Vitest
When replacing store values using `vi.mock()` or mocking data that implements complex interfaces, avoid `as any`. Instead, use `as unknown as ReturnType<...>` to safely cast the object without disabling type checking in strict Biome environments.
Mocking module exports in Vitest using vi.mock is safer than vi.spyOn for ensuring coverage logic falls through correctly
* In Vitest, testing arrays mapped in `some()` where an element contains optional properties (like `moves?`) might require full mock data including fallback empty arrays `[]` or mocking both paths to achieve 100% branch coverage.
* Sometimes edge cases like missing array definitions (e.g. `partyDetails` or `pcDetails` being undefined) must be explicitly tested when using `[...(saveData.partyDetails || [])]`.

## 2026-05-23 - Gen 2 PC Items Save Parser Coverage
**What:** Added test cases for `src/engine/saveParser/parsers/gen2.ts` covering `pcItems` logic for both Gold/Silver and Crystal saves.
**Coverage:** Increased `src/engine/saveParser/parsers/gen2.ts` branch coverage from ~82% to ~92%.
**Why:** The `pcItems` fallback structures (Crystal offset vs Gold/Silver offset) were completely untested, risking regressions.
**Result:** All critical PC Item extraction logic paths in generation 2 are verified.

### Vitest Browser Tests
When writing component tests with `@vitest/browser` and `vitest-browser-react`, the `render()` function (and derived custom wrappers) is asynchronous and must be explicitly `await`ed to prevent Biome `lint/correctness/noFloatingPromises` errors.

### Vitest Reporters
When running manual Vitest coverage checks via bash, use `pnpm vitest run --coverage --reporter=default` instead of `--reporter=text` to avoid custom reporter load errors.

### 2024-XX-XX
- While investigating test coverage on `src/store.ts`, realized it's better to verify exact state setter functionality (`setNuzlockeGraveyardBox`) rather than relying on component-level rendering.
- Even simple state setters like `setNuzlockeGraveyardBox` in Zustand need test coverage to reach 100%. Avoid writing "true === true" tests by explicitly firing the setter and verifying the state mutated via `useStore.getState()`.

### Explicit Mock Types with Generic Components in Vitest
When testing React components using custom hooks mapping to `vi.mock` imported classes or functions, explicitly cast `vi.fn()` logic to strict typings (e.g., `vi.fn<typeof pokeDB.getLocations>()`) instead of generic parameterizations to pass `tsc` without Biome errors when replacing `any`.
In `vitest-browser-react` rendering, rendering `null` logic sets the `baseElement?.innerHTML` to `undefined` unlike React Testing Library's empty div default. Waiting for `not.toBeInTheDocument` directly via `@testing-library/jest-dom` logic mapped in `vitest/browser` is robust. Use `page.getByRole` to query elements gracefully rather than destructured variables off `render`.

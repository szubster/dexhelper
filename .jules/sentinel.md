## 2026-04-19 - saveParser fallback coverage
**What:** Improved test coverage for the save parser engine, specifically covering fallback paths and structural validations when checksums are invalid.
**Coverage Before/After:** Increased `src/engine/saveParser/index.ts` coverage significantly from ~62% to ~89%.
**Why this target matters:** The save parser is a core engine module and critical for parsing user files correctly. By validating fallbacks when checksums fail (a common real-world scenario), we ensure more resilient data parsing.
**Learning:** When writing tests to verify error handling, avoid using try/catch blocks with empty catches, as they silently swallow unexpected errors and result in false positive passes. Use `expect(() => ...).toThrow(...)` instead.

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

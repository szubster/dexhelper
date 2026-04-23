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
# Sentinel Learnings
- Added tests to cover `RangeError` and other error paths in `decodeGen12String` by mocking `DataView.prototype.getUint8` to verify error bubbling.
- Used `vi.spyOn` from vitest to explicitly mock native method throws.

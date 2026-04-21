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
- When writing Vitest tests that interact with IndexedDB (like the suggestion engine or PokeDB), include `/** @vitest-environment jsdom */` at the top of the file and `import 'fake-indexeddb/auto';` to provide the required browser-like environment and prevent 'indexedDB is not defined' errors.
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

## DexDataLoader and Mocking Dataloader Edge Cases
- When testing `DataLoader` missing items or errors within React architectures, mocking the underlying API to return `null` might not trigger the correct application-level error catching if the DataLoader transforms that into an `Error` object that gets thrown implicitly upon `.load(id)`.
- Ensure tests that verify fallback behaviors directly mock the `.load` method's Promise rejection or use `rejects.toThrow()` when testing error isolation in data aggregation layers like `DexDataLoader`.

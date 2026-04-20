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

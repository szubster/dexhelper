## Focus
Added unit tests for the Gen 3 Battle Frontier save parser (`src/engine/saveParser/gen3/battleFrontier/parser.ts`) to improve coverage in `engine/saveParser`.

## Learnings
*   **Vitest Configuration Constraints**: The project uses Vitest with `@vitest/browser-playwright`. When creating targeted tests for specific files (especially parsers handling `ArrayBuffer` and `DataView`), using the standard `node` environment is highly efficient. The command `pnpm test` successfully executes the `.test.ts` file without needing to spin up a full browser if it runs in the node environment block.
*   **Mocking Bits for Save File Parsing**: Creating test fixtures using `new ArrayBuffer()` and `new DataView()` and manually populating `Uint8` and `Uint16` is effective for testing the engine logic without requiring full binary save files in `tests/fixtures/`, specifically for targeted unit tests for parsers.
*   **Playwright Execution Gotcha**: If `browserType.launch: Executable doesn't exist` appears during tests locally, ensure `pnpm exec playwright install` is executed before E2E tests are run in a new container/sandbox.

- **vitest(require-to-throw-message)**: When writing Vitest unit tests that assert an error is thrown, the Biome/Vitest linter enforces the `vitest(require-to-throw-message)` rule. You must always provide an explicit error message string to `toThrow()` (e.g., `expect(() => fn()).toThrow('Expected error')`) instead of just `toThrow()`. Leaving it empty will cause `pnpm lint` to fail and block commits.

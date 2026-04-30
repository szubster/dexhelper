# Sentinel Journal

- 2026-04-22: Added test coverage for `src/db/SaveDB.ts`. Learned that the `SaveDB` heavily relies on IndexedDB (`idb` wrapper) and has explicit fallback behavior when IndexedDB initialization fails (e.g., throwing error on `openDB`). Vitest's `vi.doMock` requires type parameters for generic functions like `vi.fn<() => Promise<never>>()` to satisfy Biome type checks under `@tsconfig/strictest`.

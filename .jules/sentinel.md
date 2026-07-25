- When writing Vitest tests, always provide explicit type parameters to `vi.fn()` (e.g., `vi.fn<() => void>()`) to satisfy strict Biome type-checking and avoid `any` usage.
- In Playwright E2E tests, always call `await waitForSync(page)` after navigation to ensure IndexedDB sync completes.
## 2024-05-27

- **Test Target Identification**: Used test coverage reporting to identify missing test coverage for `src/components/SettingsModal.tsx`.
- **Vitest**:
  - Mocked `saveDB` properly to ensure tests isolate component behavior.
  - Required using `// eslint-disable-next-line @typescript-eslint/unbound-method` when passing an unbound mock function like `saveDB.deleteSave` into `expect(...).toHaveBeenCalledWith(...)`.
  - Required using `// biome-ignore lint/suspicious/noExplicitAny: allow mock state for test` when using `as any` to force minimal mock objects into complex type shapes.
  - Used explicit types for `vi.fn()` like `vi.fn<(key: string) => Promise<void>>()` to pass strict typing rules.
- **Testing React Components**: Verified components rendering logic via `isSettingsOpen` and user interactions invoking the state reset functions (including testing confirmation modals).
- Added E2E coverage for invalid save file upload in tests/e2e/save_management.spec.ts.

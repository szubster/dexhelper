## Sentinel Memory & Journal

### Tricky Mocking Patterns
- **Zustand State Manipulation**: When testing Zustand stores, use `useStore.setState({...})` before each test in a `beforeEach` block to reset state deterministically, and explicitly set properties needed for testing the component.
- **IndexedDB/Dependencies (`saveDB`)**: Mock external APIs imported in components directly with `vi.mock('path', () => ({ ... }))`. Pass type parameters to mock functions explicitly to satisfy strict linting (e.g., `vi.fn<() => Promise<void>>().mockResolvedValue()`).

### Flaky Test Causes
- **Vitest Browser Click Handling**: When interacting with absolutely positioned overlay `div` elements (like the modal backdrop with `aria-hidden="true"`) using `userEvent.click` from `vitest-browser-react`, the internal visibility check might incorrectly report the element as hidden and throw a timeout.
  - **Workaround**: Instead of `userEvent.click`, select the element via DOM selectors (e.g., `container.querySelector('.fade-in')`) and dispatch a raw click event: `(overlay as HTMLElement).click()`.

### Codebase-Specific Test Gotchas
- **Type Safety in Tests**: Biome enforce strict type rules even in tests.
  - Never use `as any` when providing mock parameters (e.g., `saveData`). Instead, double-cast through `unknown`: `as unknown as SaveData`.
  - When asserting mocked methods on imported dependencies (e.g., `expect(saveDB.deleteSave).toHaveBeenCalled()`), Oxlint might flag `unbound-method` errors. Precede the `expect` call with `// eslint-disable-next-line @typescript-eslint/unbound-method`.

# E2E Testing Patterns & Best Practices

Represents the primary testing strategy for the Dexhelper project, following the **E2E-First** requirement.

## 1. State Initialization
All E2E tests must transition the application from an "Uninitialized" state to a valid hydrated state.
- **Utility**: `initializeWithSave(page)` from `tests/e2e/test-utils.ts`.
- **Action**: This tool uses standard IndexedDB injection to hydrate state.
- **Verification**: Tests should wait for the "TRAINER" card to be visible before proceeding.
- **Playwright Setup project**: Added a `setup` project in `playwright.config.ts` that runs once (`tests/e2e/setup.spec.ts`). It uploads a save file (Blue version) and waits for the Pokedex to sync.
- **storageState**: The resulting browser state (IndexedDB + LocalStorage) is saved to `playwright/.auth/user.json` and reused by all subsequent E2E tests via the `storageState` config.

## 2. Visual Regression (Argos CI)
Visual accuracy is verified using `argosScreenshot(page, 'name')`.
- **Desktop**: 1920x1080 (FullHD) and 2560x1440 (1440p).
- **Mobile**: Pixel 9 standard viewport.
- **Scrolling Fixes**: Ensure that the viewport is correctly configured to capture only the visible screen area for mobile (avoiding "full page" screenshots in mobile view).

## 3. Locator Philosophy
- Prefer user-visible locators like `getByText`, `getByLabel`, or `getByRole`.
- **Exact Matching**: For generic strings like locations ("ROUTE 1"), always use `{ exact: true }` to avoid matching longer strings ("ROUTE 10", "ROUTE 11").
- **Integrated Search**: The Pokedex uses an integrated search bar in the header. Use `page.getByPlaceholder('Search Pokémon...')` for reliable interactions.
- **Sync Overlays**: The app uses IndexedDB hydration. Utilities in `test-utils.ts` handle waiting for synchronization overlays to disappear.
- **Test Stability**: Avoid using hardcoded timeouts; rely on Playwright's auto-waiting or `waitForSelector` for dynamic data.
- **Identifiers**: Use `data-testid="pokedex-card"` and `data-pokemon-id` attributes for precise grid assertions.

## 4. Playwright Configuration
- **Open Reports**: In `playwright.config.ts`, explicitly set `open: 'never'` for the HTML reporter to ensure E2E suite completion and clean exits even on failure.

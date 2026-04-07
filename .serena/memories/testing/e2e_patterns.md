# E2E Testing Patterns & Best Practices

Represents the primary testing strategy for the Dexhelper project, following the **E2E-First** requirement.

## 1. State Initialization
All E2E tests must transition the application from an "Uninitialized" state to a valid hydrated state.
- **Utility**: `initializeWithSave(page)` from `tests/e2e/test-utils.ts`.
- **Action**: This tool uploads the `tests/fixtures/yellow.sav` file to the app's hidden file input.
- **Verification**: Tests should wait for the "TRAINER" card to be visible before proceeding.

## 2. Visual Regression (Argos CI)
Visual accuracy is verified using `argosScreenshot(page, 'name')`.
- **Desktop**: 1920x1080 (FullHD) and 2560x1440 (1440p).
- **Mobile**: Pixel 9 standard viewport.
- **Scrolling Fixes**: Ensure that the viewport is correctly configured to capture only the visible screen area for mobile (avoiding "full page" screenshots in mobile view).

## 3. Locator Philosophy
- Prefer user-visible locators like `getByText`, `getByLabel`, or `getByRole`.
- Use `data-testid="pokedex-card"` and `data-pokemon-id` attributes for precise grid assertions.

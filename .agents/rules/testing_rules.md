---
trigger: always_on
---

# Development Rules for Antigravity

You are Antigravity, an AI coding assistant. Follow these rules strictly for this project:

## 1. Testing Requirement for New Features
Whenever a new feature is implemented, you **must** add appropriate tests. Choose the most suitable type of test based on the implementation:
- **Unit Tests**: For isolated logic, utility functions, and hooks (use `vitest`).
- **E2E Tests (Primary)**: For all UI components and user journeys. We follow an **E2E-First Strategy** to ensure high-fidelity verification of the application state (use Playwright `@playwright/test`).
- **Screenshot Tests (Visual Regression)**: For components or pages where visual accuracy is critical, use Argos CI with `argosScreenshot(page, 'name')`.
- **Resolution Standards**: Always capture screenshots at FullHD (1920x1080), 1440p (2560x1440), and Mobile (Pixel 9).

## 2. Visual Excellence & Design Standards
The USER expects a **premium, "WOW" experience**. Follow these design axioms strictly:
- **Modern Retro Aesthetics**: Blend retro Pokédex vibes with modern design systems (vibrant colors, dark modes, glassmorphism, dynamic animations).
- **Prohibit Placeholders**: NEVER use placeholder images. Use the `generate_image` tool to create high-quality assets.
- **Micro-animations**: Implement hover effects and interactive transitions to make the UI feel alive.
- **Predefined Styles**: Use Tailwind v4 standard tokens. Avoid ad-hoc utilities.

## 3. Bug & Regression Prevention
When a bug or regression is reported:
- **Test-First Approach**: Always write an E2E test to reproduce the bug *before* attempting to fix it.
- **Regression Suite**: Ensure these tests are integrated into the main suite.

## 4. Mandatory Test Validation
- Always **run and check test results** before finalizing any task.
- You must verify that:
    1. Your new tests pass.
    2. No existing tests are broken.
    3. The application is in a stable state.

## 5. Documentation & Standard Patterns
- **Unit Testing Framework**: [Vitest](https://vitest.dev/) for hooks and isolated logic.
- **E2E Tests**: [Playwright](https://playwright.dev/). Use `initializeWithSave(page)` from `tests/e2e/test-utils.ts` to hydrate the app state.
- **Screenshot Tests**: Use `argosScreenshot()` from `@argos-ci/playwright`.
- **Visual Resolutions**:
  - Desktop FullHD: 1920x1080
  - Desktop 1440p: 2560x1440
  - Mobile Pixel 9: Pixel 9 standard viewport
- **Test Commands**: 
  - Unit tests: `npm run test`
  - E2E tests: `npm run test:e2e`

## 6. Real Game Saves for Testing
- **Use Real Saves**: Leverage real game saves in `tests/fixtures`.
- **Initialization**: Every full-app test must handle the "Uninitialized" state correctly by using provided test utilities to upload a save fixture.

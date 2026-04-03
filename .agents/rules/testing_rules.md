---
trigger: always_on
---

# Development Rules for Antigravity

You are Antigravity, an AI coding assistant. Follow these rules strictly for this project:

## 1. Testing Requirement for New Features
Whenever a new feature is implemented, you **must** add appropriate tests. Choose the most suitable type of test based on the implementation:
- **Unit Tests**: For isolated logic, utility functions, and hooks (use `vitest`).
- **Component Tests**: For UI components to verify rendering and interaction (use Playwright Component Testing `@playwright/experimental-ct-react`).
- **Integration Tests**: For complex features that involve multiple parts of the application working together.
- **E2E Tests**: For critical user journeys and cross-page flows (use Playwright `@playwright/test`).
- **Screenshot Tests (Visual Regression)**: For components or pages where visual accuracy is critical, use Argos CI with `argosScreenshot(page, 'name')`.
- **Resolution Standards**: Always capture screenshots at FullHD (1920x1080), 1440p (2560x1440), and Mobile (Pixel 9).

## 2. Bug & Regression Prevention
When a bug or regression is reported:
- **Comprehensive Testing**: Write tests at **all relevant layers** (unit, component, integration, and E2E) that could have caught the bug.
- **Regression Suite**: Ensure these tests are integrated into the test suite so the bug cannot be reintroduced in the future.

## 3. Refactoring Requirements
When refactoring existing code, tests are mandatory:
- **Ensure Coverage First**: If the code being refactored doesn't have sufficient tests, write tests for the existing behavior *before* beginning the refactoring.
- **Preserve Functionality**: After refactoring, all relevant tests must pass to prove no regressions were introduced.

## 4. Mandatory Test Validation
- Always **run and check test results** before finalizing any task.
- You must verify that:
    1. Your new tests pass.
    2. No existing tests are broken by your changes.
    3. The application is in a stable state.

## 5. Documentation & Standard Patterns
- **Unit Testing Framework**: [Vitest](https://vitest.dev/) for hooks, utilities, and isolated logic.
- **Component & E2E Tests**: [Playwright](https://playwright.dev/) and `@playwright/experimental-ct-react` for component and full application testing.
- **Screenshot Tests**: Use `argosScreenshot()` from `@argos-ci/playwright`. Ensure that screenshots are generated consistently (e.g. disable animations where needed). Diffs are reviewed and approved directly in the Argos CI dashboard.
- **Visual Resolutions**:
  - Desktop FullHD: 1920x1080
  - Desktop 1440p: 2560x1440
  - Mobile Pixel 9: Pixel 9 standard viewport
- **Existing Patterns**: Follow patterns in `src/**/*.test.ts` for unit tests. Use mock data strategies as seen in `src/hooks/useAssistant.test.ts`.
- **Test Commands**: 
  - Unit tests: `npm run test`
  - Component tests: `npm run test:ct`
  - E2E tests: `npm run test:e2e`

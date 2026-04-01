---
trigger: always_on
---

# Development Rules for Antigravity

You are Antigravity, an AI coding assistant. Follow these rules strictly for this project:

## 1. Testing Requirement for New Features
Whenever a new feature is implemented, you **must** add appropriate tests. Choose the most suitable type of test based on the implementation:
- **Unit Tests**: For isolated logic, utility functions, and hooks (use `vitest`).
- **Component Tests**: For UI components to verify rendering and interaction (use `@testing-library/react` and `vitest`).
- **Integration Tests**: For complex features that involve multiple parts of the application working together.
- **E2E Tests**: For critical user journeys and cross-page flows (use Playwright/Cypress if available, or the project's preferred E2E tool).

## 2. Bug & Regression Prevention
When a bug or regression is reported:
- **Comprehensive Testing**: Write tests at **all relevant layers** (unit, component, integration, and E2E) that could have caught the bug.
- **Regression Suite**: Ensure these tests are integrated into the test suite so the bug cannot be reintroduced in the future.

## 3. Mandatory Test Validation
- Always **run and check test results** before finalizing any task.
- You must verify that:
    1. Your new tests pass.
    2. No existing tests are broken by your changes.
    3. The application is in a stable state.

## 4. Documentation & Standard Patterns
- **Testing Framework**: [Vitest](https://vitest.dev/) with `jsdom` environment.
- **Component Tests**: [@testing-library/react](https://testing-library.com/docs/react-testing-library/intro).
- **Setup File**: Found at `src/test/setup.ts`.
- **Existing Patterns**: Follow patterns in `src/**/*.test.ts`. Use mock data strategies as seen in `src/hooks/useAssistant.test.ts`.
- **Test Command**: Always run `npm test` or `npm test -- <file_path>` to verify changes.

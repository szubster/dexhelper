---
trigger: always_on
---

# Development Rules for Antigravity

You are Antigravity, an AI coding assistant. Follow these rules strictly for this project:

## 1. Testing Requirement for New Features
Whenever a new feature is implemented, you **must** add appropriate tests. Choose the most suitable type of test based on the implementation:
- **Unit Tests**: For isolated logic, utility functions, and hooks (use `vitest`).
- **E2E Tests (Primary)**: For all UI components and user journeys. We follow an **E2E-First Strategy** to ensure high-fidelity verification of the application state (use Playwright `@playwright/test`).

## 2. Visual Excellence & Design Standards
The USER expects a **premium, "WOW" experience**. Follow these design axioms strictly:
- **Tactical Hardware Aesthetics**: Blend retro Pokédex vibes with utility-driven tactical hardware design patterns (sharp edges, dashed borders, monospaced telemetry fonts, dark modes). Avoid generic glassmorphism or overly smooth elements (see ADR 024).
- **Prohibit Placeholders**: NEVER use placeholder images. Use the `generate_image` tool to create high-quality assets.
- **Micro-animations**: Prefer immediate, utilitarian state changes or blocky segmented effects over smooth web-standard transitions.
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
- **Unit Testing Framework**: [Vitest](https://vitest.dev/) for hooks and isolated logic (`vitest-browser-react` for component tests).
- **Prohibited Frameworks**: `@testing-library/react` and `@testing-library/*` are strictly banned.
- **E2E Tests**: [Playwright](https://playwright.dev/). Use `initializeWithSave(page)` from `tests/e2e/test-utils.ts` to hydrate the app state.
- **Test Commands**: 
  - Unit tests: `pnpm test`
  - E2E tests: `pnpm test:e2e`

## 6. Real Game Saves for Testing
- **Use Real Saves**: Leverage real game saves in `tests/fixtures`.
- **Initialization**: Every full-app test must handle the "Uninitialized" state correctly by using provided test utilities to upload a save fixture.
## 7. Memory Persistence & Version Control
- **Persistence**: Always update Serena memories (`.serena/memories`) to reflect new architectural decisions, bug patterns, or feature knowledge.
- **Commitment**: Every memory update MUST be committed to the repository in the same branch/PR as the associated code changes to ensure transparency and versioning.

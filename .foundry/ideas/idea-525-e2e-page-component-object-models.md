---
id: idea-525-e2e-page-component-object-models
type: IDEA
title: E2E Page & Component Object Models and AI-Optimized Testing Patterns
status: PENDING
owner_persona: product_manager
created_at: '2026-09-17'
updated_at: '2026-09-17'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - testing
  - e2e
  - playwright
  - ai-optimization
  - DX
rejection_count: 0
rejection_reason: null
notes: ''
---

# E2E Page & Component Object Models and AI-Optimized Testing Patterns

## Evaluation

### Current State
In the current codebase (`tests/e2e/*.spec.ts`), tests directly manipulate the Playwright `page` object using inline CSS, text, or test-id selectors (e.g. `page.getByRole('button', { name: 'System Settings' })`, `page.locator('[data-testid="pokedex-card"][data-pokemon-id="25"]')`). Helper functions exist in `tests/e2e/test-utils.ts` (e.g., `initializeWithSave`, `waitForSync`, `mockDagData`), but there are no formal Page Object Models (POM) or Component Object Models (COM).

### Trade-offs & Analysis of E2E Abstraction Patterns

1. **Monolithic Page Object Model (POM)**
   - **Pros**: Encapsulates page-level locators and actions behind clear class/method names (e.g. `settingsPage.toggleLivingDexMode()`).
   - **Cons**: Monolithic POMs tend to grow large, coupling unrelated features into a single class. In single-page applications (SPAs) like DexHelper with modal dialogs and overlays, pure page-based encapsulation can feel artificial.
   - **AI Readability Impact**: Moderate improvement for simple pages, but large POM files consume significant token window context and hide selector details behind multiple layers of abstraction.

2. **Modular Component Object Model (COM)**
   - **Pros**: Focuses on modular, reusable UI components (e.g., `SettingsModal`, `PokemonCardList`, `HeaderNav`, `SyncOverlay`). Maps 1:1 with React components.
   - **Cons**: Requires initial setup effort to organize component abstractions cleanly.
   - **AI Readability Impact**: **High**. AI agents can reason about tests at the same granularity as the underlying UI components. Small, modular component classes fit neatly into LLM context windows.

3. **Playwright Custom Fixtures (`test.extend`)**
   - **Pros**: Injects pre-instantiated page/component models and pre-conditioned states directly into test parameters (e.g. `test('toggle setting', async ({ settingsModal, page }) => ...)`). Eliminates boilerplate initialization calls (`initializeWithSave`).
   - **Cons**: Requires familiarity with Playwright's fixture injection model.
   - **AI Readability & Performance Impact**: **Very High**. AI agents write fewer lines of setup code, avoid repeating initialization logic, and spend less prompt tokens per spec file.

4. **Semantic Locator Conventions & Accessibility Tree First**
   - **Pros**: Enforces `getByRole`, `getByLabel`, `getByText`, and explicit `data-testid` attributes over fragile CSS/XPath selectors.
   - **Cons**: Requires consistent markup in frontend React components.
   - **AI Readability Impact**: **Crucial**. AI agents process semantic accessibility roles and test IDs exponentially better than deeply nested DOM CSS selectors (`div > ul > li:nth-child(2)`).

## Proposed Idea

Introduce a hybrid **Component-Based Object Model (COM) with Custom Playwright Fixtures** tailored specifically for AI readability and execution speed:

1. **Modular Component Models (`tests/e2e/models/`)**:
   - Define lightweight, class-based component objects for recurring UI elements (`PokedexGridModel`, `SettingsModalModel`, `SyncOverlayModel`, `PokemonDetailModalModel`).
   - Expose semantic, action-oriented methods that encapsulate DOM interactions, scrolling workarounds, and assertions.

2. **Custom Playwright Fixtures (`tests/e2e/fixtures/`)**:
   - Extend Playwright's `test` runner using `test.extend<{ settingsModal: SettingsModalModel, pokedexGrid: PokedexGridModel, ... }>` to automatically inject initialized component models into spec signatures.

3. **AI-First Selector Guidelines**:
   - Mandate semantic locators (`getByRole`, `getByTestId`) within component models, serving as a single source of truth for UI locators across all E2E tests.

## Value Proposition
- **Improved AI Token Efficiency**: Tests become short, standard declarative flows (e.g., `await settingsModal.toggleLivingDex()`), drastically reducing prompt token footprint and LLM context churn.
- **Enhanced Test Stability & Readability**: Centralizing tricky Playwright interactions (e.g., `scrollIntoView`, strict mode disjunctions, overlay waits) inside component models eliminates duplicate flaky code across spec files.
- **Better Developer & Agent Velocity**: AI agents can generate robust new E2E tests by simply composing existing component fixture methods without needing to inspect raw DOM selectors every time.

## Acceptance Criteria
- [ ] prd-525-e2e-page-component-object-models
- [ ] Product Manager: Draft a PRD defining the component object structure, custom Playwright fixture setup, and migration plan for existing E2E spec files.

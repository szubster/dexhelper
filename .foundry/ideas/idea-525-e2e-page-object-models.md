---
id: idea-525-e2e-page-object-models
type: IDEA
title: Page Object Models and AI-Friendly E2E Architecture Proposal
status: READY
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
  - page-object-model
  - ai-performance
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Idea: Page Object Models & AI-Optimized E2E Testing Architecture

## Context & Problem Statement
As DexHelper's codebase and suite of autonomous AI agents expand, maintaining robust, readable, and performant End-to-End (E2E) Playwright tests is critical. Currently, E2E tests in `tests/e2e/` rely on a hybrid of shared utility functions in `test-utils.ts` (`initializeWithSave`, `waitForSync`, `mockDagData`) and direct Playwright inline locators (`page.getByRole`, `page.getByTestId`, `page.locator`).

While this approach works for human developers writing isolated tests, LLM coding agents encounter unique failure modes with unstructured inline DOM queries:
1. **Context Window / Token Bloat:** Reading large spec files with repetitive DOM queries and element interaction logic consumes excessive token budget during automated test generation and debugging cycles.
2. **Selector Drift & Hallucination:** When DOM structures change across React UI redesigns (e.g. Canvas redesigns or Tailwind updates), AI agents struggle to infer updated locators across dozens of separate spec files, leading to hallucinated selectors and high test repair overhead.
3. **Flakiness & Context Switching:** Inlining timing delays (`page.waitForTimeout`), IndexedDB mutations, and mobile/desktop viewport checks across multiple test specs impairs AI context comprehension and execution reliability.

---

## Evaluation of Page Object Model (POM) in AI-Driven Codebases

### Classical Page Object Model (POM) Pros & Cons

| Aspect | Classic POM Advantages | AI Agent Disadvantages / Risks |
| :--- | :--- | :--- |
| **Encapsulation** | Hides DOM structure behind class methods (e.g., `pokedexPage.selectPokemon(25)`). | Can hide critical UI state or asynchronous transitions from AI agents if class methods become overly opaque or monolithic. |
| **Maintainability** | Centralizes selector changes when UI elements are renamed or restructured. | Large class files (e.g. a 500-line `PokedexPage` class) consume significant prompt tokens when hydrated into agent context. |
| **Reusability** | Common flows (e.g., loading save files, opening settings) are defined once. | Over-abstraction can obscure standard Playwright auto-waiting assertions (`expect(page.getByText(...)).toBeVisible()`). |

### Verdict on Classic OOP Page Object Models
A monolithic Class-based Page Object Model (e.g., `class PokedexPage { ... }`) introduces unnecessary OOP boilerplates that degrade LLM prompt efficiency. LLMs perform best with modular, composable, type-safe functional abstractions or fixture-injected page models rather than deep class hierarchies.

---

## Alternative E2E Patterns Researched for AI Readability & Performance

To maximize both human maintainability and AI agent readability/performance, we evaluated four distinct E2E architectural patterns:

### 1. Custom Playwright Fixtures (`test.extend`) — **RECOMMENDED**
Playwright's native `test.extend` fixture model allows injecting light, scope-bounded Page Objects or domain helpers directly into test signatures:
```typescript
// tests/e2e/fixtures/app-fixture.ts
import { test as base } from '@playwright/test';
import { PokedexModel } from '../models/pokedex.model';

export const test = base.extend<{ pokedex: PokedexModel }>({
  pokedex: async ({ page }, use) => {
    const pokedex = new PokedexModel(page);
    await use(pokedex);
  },
});
```
* **AI Benefit:** AI agents only need to read the specific fixture file and the spec file. Zero setup code is duplicated across tests, saving 30-40% prompt token budget during test generation and debugging.

### 2. Feature-Driven Functional Helpers (Enhanced `test-utils.ts`)
Instead of full class instances, exposing clean async functions with clear typed signatures:
```typescript
export async function openPokemonDetails(page: Page, pokemonId: number)
```
* **AI Benefit:** High functional transparency, zero OOP overhead, and minimal token footprint.

### 3. Strict `data-testid` Micro-Architecture & ARIA Selectors
Establishing a standardized convention for UI component test identifiers (`data-testid="pokedex-card"`, `data-testid="sync-progress-overlay"`).
* **AI Benefit:** Drastically reduces selector ambiguity and LLM hallucination. AI agents can deterministically target elements using `page.getByTestId(...)` or `page.getByRole(...)`.

### 4. Screenplay Pattern (Actor / Task Abstraction)
An interaction-centric pattern separating Actors, Tasks, and Questions.
* **AI Benefit:** Highly readable for human domain experts, but adds abstraction layers that increase context overhead for AI reasoning without significant payoff for web application testing.

---

## Architectural Recommendations

1. **Adopt Light, Fixture-Injected Page Models (`test.extend`):**
   Combine Playwright's native test extension with compact domain models (e.g. `pokedexModel`, `settingsModel`, `assistantModel`) located in `tests/e2e/models/`.
2. **Enforce `data-testid` & ARIA Locators Standard:**
   Require all primary interactive components to expose explicit `data-testid` or semantic `aria-*` attributes, documented in `AGENTS.md`.
3. **Consolidate Common Async State Handlers in Fixtures:**
   Wrap IndexedDB save initialization and sync overlay waiting in fixture hooks so individual specs remain focused purely on feature behavior assertions.

---

## Proposed Next Steps
- [ ] Product Manager: Convert this idea into a PRD detailing the E2E Playwright fixture architecture migration (`prd-525-e2e-fixture-architecture`).

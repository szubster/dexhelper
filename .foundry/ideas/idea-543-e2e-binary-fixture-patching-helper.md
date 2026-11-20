---
id: idea-543-e2e-binary-fixture-patching-helper
type: IDEA
title: Standardized Playwright E2E Binary Fixture Patching Helper Library
status: PENDING
owner_persona: product_manager
created_at: "2026-11-04"
updated_at: "2026-11-04"
depends_on: []
jules_session_id: null
locks: []
pr_number: null
parent: null
priority: 50
confidence_score: 100
tags:
  - testing
  - e2e
  - playwright
  - fixtures
  - dx
research_references: []
experiment_variants: []
rejection_count: 0
system_failure_count: 0
rejection_reason: ""
notes: ""
---

# Standardized Playwright E2E Binary Fixture Patching Helper Library

## Context & Problem Statement
During recent Playwright E2E test implementations (e.g. `tests/e2e/pokerus.spec.ts` and `research-564-734-investigate-gen2-roamer-e2e-failure.md` / `task-564-669-gen2-roamer-e2e-tests`), tests repeatedly failed QA review because authors used `page.evaluate()` to directly mutate `window.__store` or inject mock save states. This violates the Playwright E2E Architecture Policy, as E2E tests should verify actual end-to-end data ingestion and UI behavior.

While `core_policies.md` mandates using binary fixture patching with `initializeWithSave()`, writing raw byte offsets manually in every test file leads to:
1. **Magic numbers**: Hardcoding raw hex/decimal offsets across disparate `.spec.ts` files without centralized validation.
2. **Duplication of save manipulation logic**: Repeated boilerplate for loading `.sav` files, slicing/patching bytes, and passing `Uint8Array` to `initializeWithSave()`.
3. **Fragility against save schema shifts**: When underlying format or generation specs evolve, scattered raw offset manipulations break silently or require wide refactoring.

## Proposed Solution
Create a reusable, strongly-typed E2E binary fixture helper utility in `tests/e2e/helpers/saveFixturePatcher.ts`:
1. **Helper Functions**: Provide high-level patcher functions that take a base fixture (e.g. `yellow.sav`, `crystal.sav`, `emerald.sav`) and apply generation-specific domain modifications (e.g. `withRoamerActive(saveBuffer, { species: 'raikou', mapId: 37 })`, `withPokerus(saveBuffer, { partyIndex: 0, strain: 1 })`).
2. **Constants Integration**: Rely on verified domain constants and offsets already defined in the engine or schema to eliminate magic numbers in tests.
3. **Seamless Test Integration**: Ensure helper functions return `Uint8Array` ready to pass directly to `initializeWithSave(page, modifiedBuffer)`.

## Impact & Value
- **Eliminates Policy Violations**: Provides Coders and QA agents with a clean, policy-compliant path to configure custom save states in E2E tests without resorting to `page.evaluate()` store tampering.
- **Reduces QA Rejection Cycles**: Standardized helpers make E2E tests robust, maintainable, and uniform across generations.
- **Improves Test Readability**: Tests express domain intent (e.g. `patchGen2Save(baseSave, { roamer: ... })`) rather than low-level bit shifting.

## Acceptance Criteria
- [ ] Product Manager: Draft a comprehensive PRD outlining the requirements for the E2E save fixture patcher library.
- [ ] Implement `tests/e2e/helpers/saveFixturePatcher.ts` with strongly-typed patchers for common Gen 1, 2, and 3 state configurations.
- [ ] Refactor existing E2E tests that currently tamper with store state or use ad-hoc offset patching to use the standardized patcher helper.
- [ ] Verify all E2E and unit tests pass cleanly without regression.

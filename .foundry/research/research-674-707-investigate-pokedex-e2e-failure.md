---
id: research-674-707-investigate-pokedex-e2e-failure
type: RESEARCH
title: Investigate Pokedex E2E Tests Migration Failure
status: READY
owner_persona: researcher
created_at: '2026-10-18'
updated_at: '2026-10-18'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-580-674-migrate-pokedex-e2e-tests
tags:
  - testing
  - e2e
  - playwright
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
priority: 60
---

# Research: Investigate Pokedex E2E Tests Migration Failure

## Objective
Investigate the root cause of the repeated failures during the migration of Pokedex E2E tests to the \`PokedexGridModel\` COM.

## Scope
- Review the \`task-674-700\` attempts and rejections.
- Identify why raw DOM locators in \`tests/e2e/gen3_pokedex_gaps.spec.ts\` were not successfully migrated or caused failures.
- Determine if there are limitations in \`PokedexGridModel\` or edge cases not considered.


## Findings
- **Root Cause**: The migration failed because `tests/e2e/gen3_pokedex_gaps.spec.ts` relies on raw DOM tailwind class locators (`.border-emerald-500/50` and `.border-amber-500/50`) to verify the state of Pokemon cards (Secured vs. Dex-Only).
- **Limitation**: The `PokedexGridModel` COM currently lacks methods to query cards by their capture state. It only supports retrieving cards by ID and checking general visibility.
- **Coder Confusion**: When attempting to migrate the gaps test, the coder was blocked because the COM did not expose a semantic way to replace these raw DOM locators, causing the raw locators to remain and triggering rejection.

## Recommendations for Retry Implementation
1. **Extend `PokedexGridModel`**: Add new locator methods or accessors to the COM to semantically target secured and dex-only cards (e.g., `getSecuredCards()`, `getDexOnlyCards()`).
2. **Refactor `gen3_pokedex_gaps.spec.ts`**: Update the gaps test to use the newly added COM methods instead of raw tailwind classes, ensuring complete compliance with the COM pattern.
3. **Consider Data Attributes**: For robustness, consider updating the underlying UI component to expose data attributes like `data-capture-state="secured"` instead of relying on tailwind classes in the COM, though modifying the COM to target the classes is an acceptable immediate fix.

## Acceptance Criteria
- [x] Root cause of the test migration failure is identified.
- [x] Recommendations for the retry implementation are documented.

---
id: task-674-708-migrate-pokedex-e2e-tests-retry-impl
type: TASK
title: Refactor Pokedex Grid Virtualization E2E Tests to use COM Pattern (Retry)
status: ACTIVE
owner_persona: coder
created_at: '2026-10-18'
updated_at: '2026-11-01'
depends_on:
  - research-674-707-investigate-pokedex-e2e-failure
jules_session_id: '7658234086151139922'
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

# Task: Refactor Pokedex Grid Virtualization E2E Tests to use COM Pattern (Retry)

## Objective
Refactor existing Pokedex grid-related E2E tests (e.g. \`tests/e2e/pokedex-grid-virtualization.spec.ts\` and \`tests/e2e/gen3_pokedex_gaps.spec.ts\`) to utilize the \`PokedexGridModel\` COM, based on the findings of the research task.

## Scope
- Update Pokedex E2E tests to replace raw DOM locators with COM interactions.
- Utilize custom fixtures where applicable.
- Ensure the refactored tests pass consistently.
- Apply recommendations from \`research-674-707-investigate-pokedex-e2e-failure\`.

## Acceptance Criteria
- [x] Pokedex tests are refactored to use \`PokedexGridModel\`.
- [x] Tests use semantic locators via the COM and avoid raw DOM locators.

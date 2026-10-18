---
id: task-674-701-migrate-pokedex-e2e-tests-qa
type: TASK
title: QA Refactored Pokedex Grid Virtualization E2E Tests
status: ACTIVE
owner_persona: qa
created_at: $(date -u +"%Y-%m-%d")
updated_at: '2026-10-17'
depends_on:
  - task-674-700-migrate-pokedex-e2e-tests-coder
jules_session_id: '16971878880183562476'
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

# Task: QA Refactored Pokedex Grid Virtualization E2E Tests

## Objective
Verify the refactored Pokedex grid-related E2E tests.

## Scope
- Run the E2E tests and ensure they pass.
- Verify that the tests utilize `PokedexGridModel` COM correctly and consistently.

## Acceptance Criteria
- [ ] Pokedex grid tests pass reliably.
- [ ] Tests use `PokedexGridModel` and avoid raw DOM locators.

### QA Rejection
The tests still contain raw DOM locators in tests/e2e/gen3_pokedex_gaps.spec.ts. Please update to use the PokedexGridModel.

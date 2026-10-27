---
id: task-674-709-migrate-pokedex-e2e-tests-retry-qa
type: TASK
title: QA Refactored Pokedex Grid Virtualization E2E Tests (Retry)
status: PENDING
owner_persona: qa
created_at: '2026-10-18'
updated_at: '2026-10-18'
depends_on:
  - task-674-708-migrate-pokedex-e2e-tests-retry-impl
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

# Task: QA Refactored Pokedex Grid Virtualization E2E Tests (Retry)

## Objective
Verify the refactored Pokedex grid-related E2E tests.

## Scope
- Run the E2E tests and ensure they pass.
- Verify that the tests utilize \`PokedexGridModel\` COM correctly and consistently, especially \`tests/e2e/gen3_pokedex_gaps.spec.ts\`.

## Acceptance Criteria
- [ ] Pokedex grid tests pass reliably.
- [ ] Tests use \`PokedexGridModel\` and avoid raw DOM locators.

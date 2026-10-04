---
id: task-561-614-pokerus-e2e-infected
type: TASK
title: Pokerus UI Badges E2E - Infected State Refactoring
status: READY
owner_persona: coder
created_at: '2026-09-23'
updated_at: '2026-09-25'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-412-561-pokerus-ui-e2e
tags:
  - ui
  - pokerus
  - e2e
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
locks: []
---

# Pokerus UI Badges E2E - Infected State Refactoring

## Description
Refactor the existing E2E tests for the Pokerus "Infected" state in `tests/e2e/pokerus.spec.ts`. Currently, the tests verify that the badge is displayed for infected Pokémon, but they need to be updated to assert the exact styling and structure introduced in ADR 008/024 (tactical hardware aesthetic).

## Acceptance Criteria
- [ ] Ensure the existing E2E tests for infected Pokémon explicitly assert the presence of the `tactical-badge` class.
- [ ] Verify that the exact text `[PKRS INF: <N>D]` is correctly displayed according to the newly implemented `PokerusBadge.tsx` component.
- [ ] Verify that the badge appears for infected Pokémon in both the party list and the PC.

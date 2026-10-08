---
id: task-560-575-pokerus-spread-planner-qa
type: TASK
title: Pokerus Spread Planner QA
status: ACTIVE
owner_persona: qa
created_at: '2026-09-09'
updated_at: '2026-10-07'
depends_on:
  - task-560-574-pokerus-spread-planner-tests
jules_session_id: '13890518820179187320'
pr_number: null
parent: story-413-560-pokerus-spread-planner-ui
tags:
  - ui
  - pokerus
  - planner
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Pokerus Spread Planner QA

## Description
Validate the implementation of the PokerusSpreadPlanner component and its associated state hook.

## Acceptance Criteria
- [ ] Verify the `PokerusSpreadPlanner` component correctly visualizes party state and uses `PokerusBadge`.
- [ ] Ensure warnings for midnight cures are functional.
- [ ] Confirm adherence to ADR 008 tactical styling.
- [ ] Ensure all Vitest tests pass without regressions.

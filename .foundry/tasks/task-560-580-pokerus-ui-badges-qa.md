---
id: task-560-580-pokerus-ui-badges-qa
type: TASK
title: QA - Pokerus UI Badges
status: ACTIVE
owner_persona: qa
created_at: '2026-09-10'
updated_at: '2026-09-22'
depends_on:
  - task-560-578-pokerus-ui-badges-impl
  - task-560-579-pokerus-ui-badges-tests
jules_session_id: '14375652303899454228'
pr_number: null
parent: story-412-560-pokerus-ui-badges
tags:
  - ui
  - pokerus
  - qa
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# QA - Pokerus UI Badges

## Description
Verify the implementation and tests for the Pokerus UI Badges logic based on `task-560-578-pokerus-ui-badges-impl` and `task-560-579-pokerus-ui-badges-tests`.

## Acceptance Criteria
- [x] Verify `PokerusBadge.tsx` correctly displays the Uninfected, Infected, and Cured statuses.
- [x] Verify `PokerusBadge.tsx` styling complies with ADR 008 (tactical hardware aesthetic).
- [x] Verify unit tests cover all states and pass successfully.

---
id: task-560-579-pokerus-ui-badges-tests
type: TASK
title: Pokerus UI Badges Tests
status: READY
owner_persona: coder
created_at: '2026-09-10'
updated_at: '2026-09-20'
depends_on:
  - task-560-578-pokerus-ui-badges-impl
jules_session_id: null
pr_number: null
parent: story-412-560-pokerus-ui-badges
tags:
  - ui
  - pokerus
  - testing
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Pokerus UI Badges Tests

## Description
This task implements the unit tests for the Pokerus UI Badges developed in `task-560-578-pokerus-ui-badges-impl`.

## Acceptance Criteria
- [ ] Write unit tests in `src/components/PokerusBadge.test.tsx` to cover the Uninfected, Infected, and Cured states.
- [ ] Ensure tests accurately mock and assert on the `strain` and `daysRemaining` props.

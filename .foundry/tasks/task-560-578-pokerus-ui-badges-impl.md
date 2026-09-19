---
id: task-560-578-pokerus-ui-badges-impl
type: TASK
title: Pokerus UI Badges Implementation
status: ACTIVE
owner_persona: coder
created_at: '2026-09-10'
updated_at: '2026-09-19'
depends_on: []
jules_session_id: '13172193764763044017'
pr_number: null
parent: story-412-560-pokerus-ui-badges
tags:
  - ui
  - pokerus
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Pokerus UI Badges Implementation

## Description
This task implements the Pokerus UI Badge logic according to ADR 025 and ADR 008/024. The badge needs to reflect three states based on the save file data (`pokerus.strain` and `pokerus.daysRemaining`):
1. **Uninfected**: strain is 0 (or undefined).
2. **Infected (contagious)**: strain > 0 and daysRemaining > 0.
3. **Cured (immune)**: strain > 0 and daysRemaining is 0.

Update `src/components/PokerusBadge.tsx` to handle these states, displaying the `daysRemaining` for Infected Pokemon using the correct tactical aesthetic.

## Acceptance Criteria
- [ ] Update `PokerusBadge.tsx` to display Uninfected, Infected (with days remaining), and Cured statuses based on `strain` and `daysRemaining`.
- [ ] Ensure styling complies with ADR 008 (tactical hardware aesthetic).

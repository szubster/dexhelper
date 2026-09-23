---
id: task-561-615-pokerus-e2e-uninfected-cured
type: TASK
title: Pokerus UI Badges E2E - Uninfected and Cured States
status: READY
owner_persona: coder
created_at: '2026-09-23'
updated_at: '2026-09-23'
depends_on:
  - task-561-614-pokerus-e2e-infected
jules_session_id: null
pr_number: null
parent: story-412-561-pokerus-ui-e2e
tags:
  - ui
  - pokerus
  - e2e
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Pokerus UI Badges E2E - Uninfected and Cured States

## Description
Implement new E2E tests in `tests/e2e/pokerus.spec.ts` for the "Uninfected" and "Cured" Pokerus states to achieve full coverage of the `PokerusBadge.tsx` component.

## Acceptance Criteria
- [ ] Implement an E2E test verifying that Uninfected Pokémon correctly display the `[PKRS STRN: 0]` text with the `tactical-badge` class.
- [ ] Implement an E2E test verifying that Cured Pokémon correctly display the `[PKRS CURED]` text with the `tactical-badge` class.
- [ ] Ensure that styling and functionality assertions align with the tactical UI aesthetics defined in ADR 008/024.

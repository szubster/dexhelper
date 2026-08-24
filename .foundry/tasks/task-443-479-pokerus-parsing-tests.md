---
id: task-443-479-pokerus-parsing-tests
type: TASK
title: Pokerus Parsing Unit Tests
status: ACTIVE
owner_persona: coder
created_at: '2026-08-23'
updated_at: '2026-08-24'
depends_on:
  - task-443-478-pokerus-parser-logic
jules_session_id: '9152525759781073329'
pr_number: null
parent: story-411-443-extract-pokerus-data
tags:
  - gen2
  - save-engine
  - pokerus
  - tests
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Pokerus Parsing Unit Tests

## Description
Write unit tests for the Gen 2 Pokerus parsing logic to ensure it correctly extracts the byte and translates it into the `strain` and `daysRemaining` properties in `PokemonInstance`.

## Acceptance Criteria
- [x] Verify unit tests are written for the Pokerus byte parsing in Gen 2 saves, covering various edge cases (cured, infected, uninfected).

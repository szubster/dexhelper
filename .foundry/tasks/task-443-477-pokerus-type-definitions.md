---
id: task-443-477-pokerus-type-definitions
type: TASK
title: Pokerus Type Definitions
status: READY
owner_persona: coder
created_at: '2026-08-23'
updated_at: '2026-08-23'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-411-443-extract-pokerus-data
tags:
  - gen2
  - save-engine
  - pokerus
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Pokerus Type Definitions

## Description
We need to update the `PokemonInstance` interface in `src/engine/saveParser/parsers/common.ts` to include the structured Pokerus object. The structured object should include `strain` (number) and `daysRemaining` (number).

The Pokerus byte is an 8-bit integer:
- The upper 4 bits (bits 4-7) represent the strain.
- The lower 4 bits (bits 0-3) represent the days remaining.

## Acceptance Criteria
- [ ] Verify `PokemonInstance.pokerus` type in `src/engine/saveParser/parsers/common.ts` correctly reflects the structured object (`strain: number; daysRemaining: number`).

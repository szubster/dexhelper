---
id: task-443-478-pokerus-parser-logic
type: TASK
title: Implement Pokerus Parsing Logic
status: ACTIVE
owner_persona: coder
created_at: '2026-08-23'
updated_at: '2026-08-24'
depends_on:
  - task-443-477-pokerus-type-definitions
jules_session_id: '283896804191233217'
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

# Implement Pokerus Parsing Logic

## Description
We need to update the Gen 2 Pokemon parser in `src/engine/saveParser/parsers/gen2.ts` to parse the pokerus byte (offset 28) into the structured object using the `parsePokerus` utility function from `common.ts`.

## Acceptance Criteria
- [ ] Verify the Gen 2 Pokemon parser extracts the byte at offset 28 and maps it to `PokemonInstance.pokerus` via `parsePokerus`.

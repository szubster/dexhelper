---
id: task-443-480-pokerus-parsing-qa
type: TASK
title: QA Pokerus Parsing
status: COMPLETED
owner_persona: qa
created_at: '2026-08-23'
updated_at: '2026-09-01'
depends_on:
  - task-443-479-pokerus-parsing-tests
jules_session_id: null
pr_number: null
parent: story-411-443-extract-pokerus-data
tags:
  - gen2
  - save-engine
  - pokerus
  - qa
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
---

# QA Pokerus Parsing

## Description
Verify the overall implementation of Pokerus byte parsing in Gen 2 saves. The byte must be properly parsed to expose the specific strain of the virus and the days remaining.

## Acceptance Criteria
- [x] Verify `PokemonInstance.pokerus` correctly reflects the strain and days remaining.
- [x] Verify the Gen 2 Pokemon parser correctly extracts the byte at offset 28 and parses it using `parsePokerus` from `common.ts`.

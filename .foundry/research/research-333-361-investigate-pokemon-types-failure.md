---
id: research-333-361-investigate-pokemon-types-failure
type: RESEARCH
title: Investigate Pokemon Types Data Failure
status: ACTIVE
owner_persona: researcher
created_at: '2026-07-30'
updated_at: '2026-07-31'
depends_on: []
jules_session_id: '9973392608168783559'
pr_number: null
parent: story-136-333-sorting-standard-strategies-retry
tags:
  - data
  - pokemon
research_references:
  - task-333-363-pokemon-types-data-impl
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Investigate Pokemon Types Data Failure

## Context
`task-333-363-pokemon-types-data-impl` was rejected (likely due to failing the acceptance criteria related to `generate-pokedata.ts` sorting). We need to investigate the true root cause.

## Requirements
- Investigate the sorting issue in `generate-pokedata.ts`.
- Document how to correctly map and sort the types by `slot`.

## Findings
The root cause of the failure in `task-333-363-pokemon-types-data-impl` is that the `generate-pokedata.ts` script failed to sort the Pokemon types by their `slot` property before mapping them.

PokeAPI returns types as an array of objects that include a `slot` property, indicating whether the type is primary or secondary:
`"types": [{"slot": 1, "type": {"name": "grass"}}, {"slot": 2, "type": {"name": "poison"}}]`

To fix this, `pData.types` must be sorted by `slot` before mapping. The mapping code should look like this:
`types: pData.types?.sort((a: any, b: any) => a.slot - b.slot).map((t: any) => POKEMON_TYPE_MAP[t.type.name] || 0) || [],`

## Acceptance Criteria
- [x] Root cause identified and documented.

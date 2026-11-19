---
id: task-711-740-gen3-pokerus-parsing-logic
type: TASK
title: Gen 3 Pokerus Parsing and Mapping Implementation
status: ACTIVE
owner_persona: coder
created_at: '2026-11-05'
updated_at: '2026-11-06'
depends_on: []
jules_session_id: '12973542852960826517'
pr_number: null
parent: story-690-711-gen3-pokerus-parsing-and-mapping
tags:
  - gen3
  - pokerus
  - save-engine
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Task: Gen 3 Pokerus Parsing and Mapping Implementation

## Objective
Implement the extraction and mapping logic for Pokerus data in Gen 3 Pokémon saves.

## Scope
- Implement logic in `src/engine/saveParser/parsers/gen3.ts` to locate the first byte (offset 0) of the Miscellaneous (M) substructure.
- Read this byte and apply bitwise operations (`>> 4` for strain, `& 0x0f` for days remaining).
- Map the extracted `strain` and `days_remaining` to the `SaveData` payload for Gen 3 Pokémon.

## Acceptance Criteria
- [x] Coder: Implement extraction logic for Gen 3 Pokerus in `src/engine/saveParser/parsers/gen3.ts`.
- [x] Coder: Map extracted Pokerus data to the `SaveData` structure.

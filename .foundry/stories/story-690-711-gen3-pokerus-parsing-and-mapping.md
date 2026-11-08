---
id: story-690-711-gen3-pokerus-parsing-and-mapping
type: STORY
title: Gen 3 Pokerus Parsing and Mapping Logic
status: READY
owner_persona: tech_lead
created_at: '2026-10-21'
updated_at: '2026-10-21'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-098-690-gen3-pokerus-data-extraction
tags:
  - gen3
  - pokerus
  - save-engine
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Story: Gen 3 Pokerus Parsing and Mapping Logic

## Objective
Implement the logic to extract the Pokerus status byte from the Gen 3 Pokémon Miscellaneous (M) substructure and map it to the application's SaveData payload.

## Scope
- Locate the first byte (offset 0) of the Miscellaneous (M) substructure to read the Pokerus data.
- Apply the bitwise operations (`>> 4` for strain, `& 0x0f` for days remaining).
- Map the extracted Pokerus data onto the corresponding Pokémon objects within the `SaveData` structure.
- Utilize the Gen 3 decryption and parsing infrastructure previously established.

## Acceptance Criteria
- [ ] Tech Lead: Break down this Story into modular Tasks for the Coder and QA.

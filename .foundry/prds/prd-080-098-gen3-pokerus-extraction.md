---
id: prd-080-098-gen3-pokerus-extraction
type: PRD
title: Gen 3 Pokerus Logic Extraction
status: PENDING
owner_persona: epic_planner
created_at: '2026-07-01'
updated_at: '2026-07-01'
depends_on:
  - prd-080-097-gen3-data-parsing-infrastructure
jules_session_id: null
pr_number: null
parent: idea-080-gen3-pokerus-extraction
tags:
  - gen3
  - pokerus
  - save-engine
research_references:
  - .foundry/research/research-175-176-gen3-pokerus-extraction.md
rejection_count: 0
rejection_reason: ''
notes: ''
---

# PRD: Gen 3 Pokerus Logic Extraction

## Objective
Extract the Pokerus status byte from the decrypted Gen 3 Pokémon Miscellaneous (M) substructure and map it to the application's SaveData payload.

## Requirements
1. Extract the Pokerus byte located at the first byte (offset 0) of the Miscellaneous (M) substructure.
2. Apply the bitwise operators (`>> 4` and `& 0x0f`) to extract the strain and days remaining.
3. Map the parsed Pokerus data onto the corresponding Pokémon objects within the returned `SaveData` payload.
4. This requires the foundational decryption and parsing logic to be completed first (see `prd-080-097-gen3-data-parsing-infrastructure`).

---
id: epic-098-690-gen3-pokerus-data-extraction
type: EPIC
title: Gen 3 Pokerus Data Extraction
status: READY
owner_persona: story_owner
created_at: '2026-10-16T17:50:54.685Z'
updated_at: '2026-10-21'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-080-098-gen3-pokerus-extraction
tags:
  - gen3
  - pokerus
  - save-engine
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Epic: Gen 3 Pokerus Data Extraction

## Objective
Extract the Pokerus status byte from the decrypted Gen 3 Pokémon Miscellaneous (M) substructure and map it to the application's SaveData payload.

## Scope
- Extract the Pokerus byte located at the first byte (offset 0) of the Miscellaneous (M) substructure.
- Apply the bitwise operators (`>> 4` and `& 0x0f`) to extract the strain and days remaining.
- Map the parsed Pokerus data onto the corresponding Pokémon objects within the returned `SaveData` payload.
- Ensure the foundational decryption and parsing logic from `prd-080-097-gen3-data-parsing-infrastructure` is utilized.
- Produce a final integration and E2E verification story.

## Acceptance Criteria
- [x] Story Owner: Break down this Epic into implementation stories.
- [x] Story Owner: Generate a final STORY dedicated exclusively to Integration and E2E Verification.
- [ ] story-690-711-gen3-pokerus-parsing-and-mapping
- [ ] story-690-712-gen3-pokerus-integration-e2e

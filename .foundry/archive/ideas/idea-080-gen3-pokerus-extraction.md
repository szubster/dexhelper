---
id: idea-080-gen3-pokerus-extraction
type: IDEA
title: Implement Gen 3 Pokerus Extraction
status: COMPLETED
owner_persona: product_manager
created_at: '2026-06-14'
updated_at: '2026-06-14'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - gen3
  - save-engine
  - pokerus
research_references:
  - .foundry/research/research-175-176-gen3-pokerus-extraction.md
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Idea: Implement Gen 3 Pokerus Extraction

## Context
Based on the findings in `.foundry/research/research-175-176-gen3-pokerus-extraction.md`, the memory structure and bitwise logic for Pokerus in Generation 3 have been fully documented. While the bitwise extraction logic (`>> 4` and `& 0x0f`) is identical to Gen 2, locating the Pokerus byte requires full decryption and parsing of the 48-byte Gen 3 Pokémon Data block and its four substructures (Growth, Attacks, EVs & Condition, Miscellaneous).

## Proposal
Implement the necessary infrastructure in `src/engine/saveParser/parsers/gen3.ts` to fully parse and decrypt the Gen 3 Pokémon data structures, and then extract the Pokerus state from the Miscellaneous (M) substructure.

### Technical Requirements
1. **Pokémon Data Extraction:** Build the core logic to locate and extract the 100-byte Pokémon structures from the active save Section.
2. **Decryption Logic:** Implement the XOR decryption using the `PV XOR OT ID` key.
3. **Substructure Resolution:** Implement the `PV % 24` logic to correctly map the decrypted 48-byte block into its four distinct substructures (G, A, E, M).
4. **Pokerus Extraction:** Extract the Pokerus byte from the start of the M substructure and parse the strain and days remaining.
5. **Data Mapping:** Map the parsed Pokerus data onto the corresponding Pokémon objects within the returned `SaveData` payload.

## Value
This is a required precursor for enabling the Pokerus Tracker and Infection Spread Assistant (idea-068-069-pokerus-tracker) for Generation 3 games, expanding feature parity across generations.

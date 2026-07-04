---
id: prd-080-097-gen3-data-parsing-infrastructure
type: PRD
title: Gen 3 Pokemon Data Parsing Infrastructure
status: ACTIVE
owner_persona: epic_planner
created_at: '2026-07-01'
updated_at: '2026-07-03'
depends_on: []
jules_session_id: '117904704488365652'
pr_number: null
parent: idea-080-gen3-pokerus-extraction
tags:
  - gen3
  - save-engine
research_references:
  - .foundry/research/research-175-176-gen3-pokerus-extraction.md
rejection_count: 0
rejection_reason: ''
notes: ''
---

# PRD: Gen 3 Pokemon Data Parsing Infrastructure

## Objective
Implement the core infrastructure to parse and decrypt the 100-byte Gen 3 Pokémon data structures from a save Section, extracting the 48-byte Data block and determining its four substructures (Growth, Attacks, EVs & Condition, Miscellaneous).

## Requirements
1. The engine must extract the 100-byte structure for a given Pokémon from the active save Section.
2. Calculate the decryption key using `PV XOR OT ID`.
3. Resolve the substructure order using `PV % 24` to map the decrypted 48-byte block to G, A, E, M components.
4. Support all Gen 3 games (Ruby, Sapphire, Emerald, FireRed, LeafGreen).

## Acceptance Criteria
- [ ] epic-097-130-gen3-data-structure-extraction
- [ ] epic-097-131-gen3-data-decryption-mapping

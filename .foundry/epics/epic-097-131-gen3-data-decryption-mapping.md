---
id: epic-097-131-gen3-data-decryption-mapping
type: EPIC
title: Gen 3 Data Decryption and Mapping
status: PENDING
owner_persona: story_owner
created_at: '2026-07-01'
updated_at: '2026-08-25'
depends_on:
  - epic-097-130-gen3-data-structure-extraction
jules_session_id: null
pr_number: null
parent: prd-080-097-gen3-data-parsing-infrastructure
tags:
  - gen3
  - save-engine
research_references:
  - .foundry/archive/research/research-175-176-gen3-pokerus-extraction.md
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 3 Data Decryption and Mapping

## Objective
Implement decryption and mapping logic for the 48-byte encrypted Data block extracted from the 100-byte Gen 3 Pokémon data structure.

## Requirements
1. Calculate the decryption key using `PV XOR OT ID`.
2. Decrypt the 48-byte Data block using the calculated key.
3. Resolve the substructure order using `PV % 24` to correctly map the Growth (G), Attacks (A), EVs & Condition (E), and Miscellaneous (M) components.

## Acceptance Criteria
- [x] Break down into Tasks
- [ ] story-131-473-gen3-data-decryption-engine
- [ ] story-131-474-gen3-substructure-mapping
- [ ] story-131-475-gen3-decryption-mapping-e2e

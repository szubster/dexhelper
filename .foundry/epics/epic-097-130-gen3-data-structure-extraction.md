---
id: epic-097-130-gen3-data-structure-extraction
type: EPIC
title: Gen 3 Data Structure Extraction
status: ACTIVE
owner_persona: story_owner
created_at: '2026-07-01'
updated_at: '2026-08-19'
depends_on: []
jules_session_id: '8601309936583911484'
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

# Gen 3 Data Structure Extraction

## Objective
Implement functionality to extract the raw 100-byte Pokémon data structure for each party Pokémon from an active Gen 3 save file section. This includes ensuring correct offset parsing across all Gen 3 games using the DataView API.

## Requirements
1. Extract the 100-byte structure.
2. Must use `DataView` API exclusively.
3. Handle gracefully and properly parse across Ruby, Sapphire, Emerald, FireRed, LeafGreen.

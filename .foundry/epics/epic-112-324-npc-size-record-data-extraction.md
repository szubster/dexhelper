---
id: epic-112-324-npc-size-record-data-extraction
type: EPIC
title: Gen 2 & Gen 3 NPC Size Record Assistant - Data Extraction
status: ACTIVE
owner_persona: story_owner
created_at: '2026-07-14'
updated_at: '2026-07-25'
depends_on: []
jules_session_id: '5789674109407981456'
pr_number: null
parent: prd-110-112-npc-size-record-assistant
tags:
  - dexhelper
  - generation-2
  - generation-3
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 2 & Gen 3 NPC Size Record Assistant - Data Extraction

## 1. Objective
Extract the necessary internal data structures from Gen 2 and Gen 3 save files to allow for calculating the size of target Pokémon species.

## 2. Requirements
- **Gen 2:** Extract DVs (Attack, Defense, Speed, Special) for each Pokémon.
- **Gen 3:** Extract Personality Value (PV) and IVs (HP, Attack, Defense, Speed, Special Attack, Special Defense) for each Pokémon. Handle the 48-byte encrypted Data block taking into account the substructure order determined by `PV % 24`.

## Acceptance Criteria
- [ ] Implement data extraction for Gen 2 DVs.
- [ ] Implement data extraction for Gen 3 PV and IVs.
- [ ] story-324-322-gen2-dv-extraction

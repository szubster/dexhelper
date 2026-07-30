---
id: story-324-346-gen3-pv-iv-extraction
type: STORY
title: Gen 3 PV and IV Data Extraction for Size Calculation
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-07-25'
updated_at: '2026-07-30'
depends_on: []
jules_session_id: '10397136322045447599'
pr_number: null
parent: epic-112-324-npc-size-record-data-extraction
tags:
  - dexhelper
  - generation-3
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 3 PV and IV Data Extraction for Size Calculation

## 1. Objective
Design the technical breakdown to extract Personality Value (PV) and IVs (HP, Attack, Defense, Speed, Special Attack, Special Defense) for each Pokémon from a Gen 3 save file. This data is required for calculating the size of target Pokémon species.

## 2. Requirements
- Design extraction mechanisms for Gen 3 Pokémon structures within the encrypted Data block.
- Handle the 48-byte encrypted Data block taking into account the substructure order determined by `PV % 24`.

## Acceptance Criteria
- [x] Tech Lead: Break this Story down into actionable Tasks.
- [x] task-346-352-gen3-pv-iv-extraction-impl
- [x] task-346-353-gen3-pv-iv-extraction-qa

---
id: story-324-322-gen2-dv-extraction
type: STORY
title: Gen 2 DV Data Extraction for Size Calculation
status: READY
owner_persona: tech_lead
created_at: '2026-07-15'
updated_at: '2026-07-25'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-112-324-npc-size-record-data-extraction
tags:
  - dexhelper
  - generation-2
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
---

# Gen 2 DV Data Extraction for Size Calculation

## 1. Objective
Design the technical breakdown to extract DVs (Attack, Defense, Speed, Special) for each Pokémon from a Gen 2 save file. This data is required for calculating the size of target Pokémon species.

## 2. Requirements
- Design extraction mechanisms for Gen 2 Pokémon structures within a save block.
- Extract the 4 DVs from the raw binary data.

## Acceptance Criteria
- [x] Create tasks for the implementation of Gen 2 DV data extraction.
- [ ] task-322-331-gen2-dv-extraction-impl
- [ ] task-322-332-gen2-dv-extraction-qa

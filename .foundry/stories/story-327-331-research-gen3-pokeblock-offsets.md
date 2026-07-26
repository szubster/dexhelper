---
id: story-327-331-research-gen3-pokeblock-offsets
type: STORY
title: Research Gen 3 Pokéblock Case Offsets
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-07-17'
updated_at: '2026-07-25'
depends_on: []
jules_session_id: '10170810524076287237'
pr_number: null
parent: epic-114-327-gen3-pokeblock-case-parsing
tags:
  - gen3
  - contests
  - pokeblocks
  - backend
  - save-parsing
  - research
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Research Gen 3 Pokéblock Case Offsets

## Overview
Before we can implement the parsing logic for extracting exact Pokéblock data from the Gen 3 save file, we need to know the exact memory offsets and data structure used for the Pokéblock Case block.

## Goals
- Identify the memory offsets for the Pokéblock Case in Gen 3 (Ruby, Sapphire, Emerald, FireRed, LeafGreen).
- Understand the data structure for individual Pokéblocks within the case array.
- Determine how the exact numerical values for all five flavors (Cool, Beauty, Cute, Smart, Tough) and the feel (smoothness) bytes are stored.

## Acceptance Criteria
- [x] Create a TASK for a Researcher or Tech Lead to find and document the Pokéblock Case offsets and structures in a new document under `.foundry/docs/knowledge_base/` (e.g. `gen3_pokeblock_offsets.md`).
- [ ] task-331-334-research-gen3-pokeblock-offsets

---
id: task-331-334-research-gen3-pokeblock-offsets
type: TASK
title: Research Gen 3 Pokéblock Case Offsets
status: ACTIVE
owner_persona: coder
created_at: '2026-07-18'
updated_at: '2026-07-20'
depends_on: []
jules_session_id: '2200864049883852662'
pr_number: null
parent: story-327-331-research-gen3-pokeblock-offsets
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
- [x] Research and document the Gen 3 Pokéblock Case offsets and structures.
- [x] Create a new documentation file at `.foundry/docs/knowledge_base/gen3_pokeblock_offsets.md`.

---
id: research-391-393-gen3-wonder-card-offsets
type: RESEARCH
title: Investigate Gen 3 Wonder Card Offsets
status: READY
owner_persona: researcher
created_at: '2026-08-03'
updated_at: '2026-08-03'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-345-354-gen3-wonder-card-extraction
tags:
  - gen3
  - mystery-gift
  - data-extraction
research_references: []
rejection_count: 0
rejection_reason: ''
notes: 'Created via late binding as specific memory offsets for Wonder Cards are unknown.'
---

# Investigate Gen 3 Wonder Card Offsets

## Context
The task `task-354-391-gen3-wonder-card-extraction-impl` requires implementing Gen 3 Wonder Card Extraction. However, the exact memory offsets, structure, bit locations, lengths, and sizes of Wonder Card blocks in Gen 3 saves (Ruby, Sapphire, Emerald, FireRed, LeafGreen) are currently missing from the provided context (`.foundry/docs/schema.md` does not specify them). Following the late-binding policy, this research task is needed to find the specific technical details required to implement the parser correctly.

## Requirements
1. Determine the memory block / section in Gen 3 save files (e.g., SaveBlock1, SaveBlock2, or a specific Section ID) where Wonder Card data is stored.
2. Determine the exact offsets for Wonder Card data relative to the block/section start.
3. Determine the structure of a Wonder Card (ID, Title, Subtitle, Text, Item, Pokemon, etc.) and lengths/offsets of fields.
4. Distinguish between different Gen 3 games (Ruby/Sapphire vs Emerald/FRLG) if applicable, as Mystery Gift data structure can vary.
5. Provide actionable constants and types that can be directly mapped to code.

## Acceptance Criteria
- [ ] Researcher: Identify the exact memory offsets and structures for Gen 3 Wonder Cards.
- [ ] Researcher: Update `.foundry/docs/schema.md` or provide a detailed breakdown in the ticket for the Coder to use.

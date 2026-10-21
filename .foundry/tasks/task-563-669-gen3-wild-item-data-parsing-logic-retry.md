---
id: task-563-669-gen3-wild-item-data-parsing-logic-retry
type: TASK
title: Implement Gen 3 Wild Encounter and Held Item Parsing Logic (Retry)
status: ACTIVE
owner_persona: coder
created_at: '2026-10-07'
updated_at: '2026-10-17'
depends_on:
  - research-563-668-investigate-wild-item-parsing-failure
jules_session_id: '17524836455577164056'
pr_number: null
parent: story-552-563-gen3-wild-item-parsing
tags:
  - gen3
  - dexhelper
research_references: []
rejection_count: 2
rejection_reason: ''
notes: ''
locks: []
---

# Implement Gen 3 Wild Encounter and Held Item Parsing Logic (Retry)

## Context
As part of the Wild Item Data Engine epic, this story focuses exclusively on Gen 3 games (Ruby, Sapphire, Emerald, FireRed, LeafGreen). We need to parse wild encounter data and determine held item probabilities. This is a retry task following a permanent failure.

## Requirements
- Parse Gen 3 wild encounter locations and rates (grass, surfing, fishing, etc.).
- Map held item data and their respective drop rates for Gen 3 Pokémon.
- Utilize relative offsets where applicable.
- Incorporate findings from `research-563-668-investigate-wild-item-parsing-failure`.

## Acceptance Criteria
- [x] Implement Gen 3 wild encounter locations and rates parsing.
- [x] Map held item data and their respective drop rates for Gen 3 Pokémon.
- [x] Utilize relative offsets where applicable.

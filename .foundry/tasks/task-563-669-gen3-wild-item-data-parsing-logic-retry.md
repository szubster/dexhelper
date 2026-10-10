---
id: task-563-669-gen3-wild-item-data-parsing-logic-retry
type: TASK
title: Implement Gen 3 Wild Encounter and Held Item Parsing Logic (Retry)
status: CANCELLED
owner_persona: coder
created_at: '2026-10-07'
updated_at: '2026-10-10'
depends_on:
  - research-563-668-investigate-wild-item-parsing-failure
jules_session_id: null
pr_number: null
parent: story-552-563-gen3-wild-item-parsing
tags:
  - gen3
  - dexhelper
research_references: []
rejection_count: 0
rejection_reason: >-
  Cancelled due to permanent failure of dependency:
  research-563-668-investigate-wild-item-parsing-failure
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
- [ ] Implement Gen 3 wild encounter locations and rates parsing.
- [ ] Map held item data and their respective drop rates for Gen 3 Pokémon.
- [ ] Utilize relative offsets where applicable.

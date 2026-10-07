---
id: story-552-563-gen3-wild-item-parsing
type: STORY
title: Gen 3 Wild Encounter and Held Item Parsing
status: READY
owner_persona: tech_lead
created_at: '2026-09-12'
updated_at: '2026-09-29'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-521-552-wild-item-data-engine
tags:
  - gen3
  - dexhelper
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
priority: 50
---

# Gen 3 Wild Encounter and Held Item Parsing

## Context
As part of the Wild Item Data Engine epic, this story focuses exclusively on Gen 3 games (Ruby, Sapphire, Emerald, FireRed, LeafGreen). We need to parse wild encounter data and determine held item probabilities.

## Requirements
- Parse Gen 3 wild encounter locations and rates (grass, surfing, fishing, etc.).
- Map held item data and their respective drop rates for Gen 3 Pokémon.
- Utilize relative offsets where applicable.

## Acceptance Criteria
- [x] tech_lead: Break down this Story into Tasks for Gen 3 data extraction.
- [x] task-563-578-gen3-wild-item-data-parsing-logic
- [x] task-563-579-gen3-wild-item-data-parsing-tests
- [x] task-563-580-gen3-wild-item-data-parsing-qa
- [ ] research-563-668-investigate-wild-item-parsing-failure
- [ ] task-563-669-gen3-wild-item-data-parsing-logic-retry
- [ ] task-563-670-gen3-wild-item-data-parsing-tests-retry
- [ ] task-563-671-gen3-wild-item-data-parsing-qa-retry

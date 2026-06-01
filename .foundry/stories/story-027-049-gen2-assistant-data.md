---
id: story-027-049-gen2-assistant-data
type: STORY
title: Setup Gen 2 Assistant Data
status: COMPLETED
owner_persona: tech_lead
created_at: '2026-05-11'
updated_at: '2026-05-12'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-015-027-exclusives-and-static-data
tags:
  - gen2
  - data
research_references:
  - .foundry/docs/knowledge_base/development/gen2_implementation_plan
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Setup Gen 2 Assistant Data

## Context
Gen 2 specific game mechanics and Pokémon availability require establishing the static knowledge base. The Gen 2 Exclusives module is already established. The next step in this phase is to establish static configurations for gifts and trades.

## Objectives
Establish static assistant configurations for gifts and trades in Gen 2.

## Acceptance Criteria
- [x] Create `src/engine/data/gen2/assistantData.ts`.
- [x] Define `STATIC_GIFT_DATA` for Gen 2 (Togepi Egg, Eevee from Bill, Shuckle in Cianwood, Dratini, Tyrogue).
- [x] Define `STATIC_NPC_TRADE_DATA` (e.g., trading Bellsprout for Onix `Rocky`, Drowzee for Machop `Muscle`).


### Spawned Tasks
- [.foundry/tasks/task-049-082-implement-gen2-assistant-data.md](.foundry/tasks/task-049-082-implement-gen2-assistant-data.md)

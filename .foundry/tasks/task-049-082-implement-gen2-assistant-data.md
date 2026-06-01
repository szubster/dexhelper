---
id: task-049-082-implement-gen2-assistant-data
type: TASK
title: Implement Gen 2 Assistant Data
status: COMPLETED
owner_persona: coder
created_at: '2026-05-11'
updated_at: '2026-05-14'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-027-049-gen2-assistant-data
tags:
  - gen2
  - data
research_references:
  - .foundry/docs/knowledge_base/development/gen2_implementation_plan
rejection_count: 2
rejection_reason: ''
notes: ''
---

# Implement Gen 2 Assistant Data

## Context
Gen 2 specific game mechanics and Pokémon availability require establishing the static knowledge base. The Gen 2 Exclusives module is already established. The next step in this phase is to establish static configurations for gifts and trades.

## Objectives
Establish static assistant configurations for gifts and trades in Gen 2.

## Technical Blueprint
The task requires creating static data configurations for gifts and in-game NPC trades specifically for Generation 2 (Gold, Silver, Crystal).

### 1. Create Data File
Create the file `src/engine/data/gen2/assistantData.ts`. Export the following two constants from this file.

### 2. STATIC_GIFT_DATA
Define a `Record<number, { name: string; location: string; reason: string; gen?: number; eventFlag?: number; requiredBadges?: number }>` similar to Gen 1.
Include the following Gen 2 gifts (use correct Pokédex IDs):
- **Togepi Egg**: ID 175, Location: Violet City (from Mr. Pokémon's Egg), Reason: Gift from Aide
- **Eevee**: ID 133, Location: Goldenrod City, Reason: Gift from Bill
- **Shuckle**: ID 213, Location: Cianwood City, Reason: Gift from Kirk
- **Dratini**: ID 147, Location: Dragon's Den, Reason: Gift from Dragon Elder
- **Tyrogue**: ID 236, Location: Mt. Mortar, Reason: Gift from Kiyo

*Note: Since Gen 2 event flags are not yet mapped, omit the `eventFlag` property for these entries or leave them as placeholders. You can set `gen: 2`.*

### 3. STATIC_NPC_TRADE_DATA
Define an array of `NpcTradeEntry` objects (see `src/engine/data/gen1/assistantData.ts` for the interface).
Include the following Gen 2 in-game trades:
- **Onix for Bellsprout**: receivedId: 95 (Onix), offeredId: 69 (Bellsprout), location: 'Violet City (trade house)', receivedOtName: 'ROCKY', gen: 2
- **Machop for Drowzee**: receivedId: 66 (Machop), offeredId: 96 (Drowzee), location: 'Goldenrod City (trade house)', receivedOtName: 'MUSCLE', gen: 2

*Note: Review `src/engine/data/gen1/assistantData.ts` which actually has a placeholder Gen 2 section for some of these. You should extract the Gen 2 placeholders from the Gen 1 file into the Gen 2 file to maintain separation of concerns if appropriate, or ensure they are properly implemented in the Gen 2 file.*

## Verification Protocol
**Coder Self-Verification**: As this is purely static data addition without complex logic, the Coder should self-verify the data accuracy and ensure it passes type checks and linting. No separate QA task is required.

## Acceptance Criteria
- [x] Create `src/engine/data/gen2/assistantData.ts`.
- [x] Define `STATIC_GIFT_DATA` for Gen 2 (Togepi Egg, Eevee from Bill, Shuckle in Cianwood, Dratini, Tyrogue).
- [x] Define `STATIC_NPC_TRADE_DATA` (e.g., trading Bellsprout for Onix `Rocky`, Drowzee for Machop `Muscle`).

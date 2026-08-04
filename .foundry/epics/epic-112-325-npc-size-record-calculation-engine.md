---
id: epic-112-325-npc-size-record-calculation-engine
type: EPIC
title: "Gen 2 & Gen 3 NPC Size Record Assistant - Calculation Engine"
status: PENDING
owner_persona: "story_owner"
created_at: '2026-07-14'
updated_at: '2026-08-04'
depends_on:
  - epic-112-324-npc-size-record-data-extraction
jules_session_id: null
pr_number: null
parent: "prd-110-112-npc-size-record-assistant"
tags:
  - dexhelper
  - generation-2
  - generation-3
research_references: []
rejection_count: 0
rejection_reason: ""
notes: ""
---

# Gen 2 & Gen 3 NPC Size Record Assistant - Calculation Engine

## 1. Objective
Implement the mathematical formulas used by Gen 2 and Gen 3 to calculate size based on DVs/IVs and PV.

## 2. Requirements
- Use the extracted data to calculate size exactly as done in-game (inches/meters depending on localization).
- Create a performant scanning engine that evaluates all PC boxes without noticeable lag to find the record beaters.

## Acceptance Criteria
- [ ] Implement Gen 2 size calculation formula based on DVs.
- [ ] Implement Gen 3 size calculation formula based on PV and IVs.
- [ ] Generate a final STORY dedicated exclusively to Integration and E2E Verification.

---
id: task-258-261-gen2-npc-trade-parsing-impl
type: TASK
title: "Implement Gen 2 NPC Trade Extraction"
status: PENDING
owner_persona: coder
created_at: "2026-07-04"
updated_at: "2026-07-04"
depends_on: []
jules_session_id: null
pr_number: null
parent: story-119-258-gen2-npc-trade-parsing
tags:
  - backend
  - save-parsing
  - gen2
research_references: []
rejection_count: 0
rejection_reason: ""
notes: ""
---

# Implement Gen 2 NPC Trade Extraction

## Context
In Generation 2 (Gold, Silver, Crystal), we want to extract the state of the 7 in-game NPC trades to track completion. The completion flags are stored as an array of 7 bits (a single byte) where each bit corresponds to an NPC trade in order. The offsets in memory are:
- Crystal: `0x24EB`
- Gold/Silver: `0x250F`

## Acceptance Criteria
- [ ] Define the magic number constants `NPC_TRADE_FLAGS_OFFSET_CRYSTAL = 0x24EB;` and `NPC_TRADE_FLAGS_OFFSET_GS = 0x250F;` at the module level in `src/engine/saveParser/parsers/gen2.ts` (forbidding inline magic numbers).
- [ ] Extend the `SaveData` interface or create a new property for `npcTradeFlags` in the parsed output (as a boolean array of length 7) representing `[MIKE, KYLE, TIM, EMY, CHRIS, KIM, FOREST]`.
- [ ] Update the `parseGen2Save` function to read the byte at the appropriate offset (`isCrystal ? NPC_TRADE_FLAGS_OFFSET_CRYSTAL : NPC_TRADE_FLAGS_OFFSET_GS`).
- [ ] Extract the 7 boolean flags using bitwise masking (`byte & (1 << i)`).
- [ ] Add the `npcTradeFlags` array to the returned data structure.
- [ ] If transient failures require retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- [ ] If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- [ ] If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
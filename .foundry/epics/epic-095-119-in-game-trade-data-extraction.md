---
id: epic-095-119-in-game-trade-data-extraction
type: EPIC
title: In-Game Trade Data Extraction
status: READY
owner_persona: story_owner
created_at: '2026-06-30'
updated_at: '2026-08-02'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-095-056-in-game-trade-assistant
tags:
  - feature
  - backend
  - save-parsing
research_references: []
rejection_count: 2
rejection_reason: ''
notes: ''
---

# Epic: In-Game Trade Data Extraction

## Objective
Implement and standardize the extraction of in-game NPC trade completion flags from Generation 2 and Generation 3 save files.

## Scope
- **Gen 2 Implementation:** Verify and ensure `npcTradeFlags` are correctly parsed for Gold, Silver, and Crystal.
- **Gen 3 Implementation:** Identify the memory offsets for NPC trade flags in Ruby, Sapphire, Emerald, FireRed, and LeafGreen, and implement their extraction using `DataView`.
- **Data Mapping:** Create a mapping between the raw bitflags and the specific NPC trade encounters (e.g., "MUSCLE the Machop in Goldenrod City").
- **Integration:** Ensure the extracted flags are available in the `SaveData` object for use by the Assistant and UI layers.

## Acceptance Criteria
- [x] Gen 2 NPC trade flags are accurately extracted and mapped.
- [x] Gen 3 NPC trade flags are identified and extracted for all core versions (RSE/FRLG).
- [x] The `npcTradeFlags` field in `SaveData` is consistently populated across both generations.
- [x] All parsing logic strictly adheres to the `DataView` API and handles `RangeError` for corrupted saves.
- [x] Story Owner: Break down this Epic into executable Stories.
- [x] story-119-258-gen2-npc-trade-parsing
- [x] story-119-259-gen3-npc-trade-parsing
- [x] story-119-260-npc-trade-data-mapping
- [x] story-119-261-npc-trade-state-integration

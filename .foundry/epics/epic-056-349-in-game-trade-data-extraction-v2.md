---
id: epic-056-349-in-game-trade-data-extraction-v2
type: EPIC
title: In-Game Trade Data Extraction v2
status: ACTIVE
owner_persona: story_owner
created_at: '2026-08-04'
updated_at: '2026-08-06'
depends_on:
  - research-056-394-investigate-in-game-trade-failure
jules_session_id: '15592042785956533773'
pr_number: null
parent: prd-095-056-in-game-trade-assistant
tags:
  - feature
  - backend
  - save-parsing
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---
# Epic: In-Game Trade Data Extraction v2

## Objective
Implement and standardize the extraction of in-game NPC trade completion flags from Generation 2 and Generation 3 save files, using the findings from the research phase.

## Scope
- Verify and ensure `npcTradeFlags` are correctly parsed for Gen 2 (Gold, Silver, Crystal) and Gen 3 (RSE, FRLG).
- Create a mapping between the raw bitflags and the specific NPC trade encounters.
- Ensure the extracted flags are available in the `SaveData` object.

## Acceptance Criteria
- [ ] Gen 2 NPC trade flags are accurately extracted and mapped.
- [ ] Gen 3 NPC trade flags are identified and extracted for all core versions.
- [ ] The `npcTradeFlags` field in `SaveData` is consistently populated across both generations.
- [ ] All parsing logic strictly adheres to the `DataView` API and handles `RangeError` for corrupted saves.
- [ ] Story Owner: Break down this Epic into executable Stories.
- [ ] Story Owner: Generate a final STORY dedicated exclusively to Integration and E2E Verification.

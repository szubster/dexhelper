---
id: epic-112-324-npc-size-record-data-extraction
type: EPIC
title: "NPC Size Record: Data Extraction"
status: PENDING
owner_persona: epic_planner
created_at: "2026-07-12"
updated_at: "2026-08-05"
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-110-112-npc-size-record-assistant
tags:
  - dexhelper
  - generation-2
  - generation-3
research_references: []
rejection_count: 0
rejection_reason: ""
notes: ""
---
# NPC Size Record: Data Extraction

## Overview
This epic covers the backend logic to parse and extract the necessary hidden values (DVs for Gen 2; IVs and PV for Gen 3) from the player's save files to support NPC Size Record calculations.

## Acceptance Criteria
- [ ] Implement Gen 2 DV extraction for Attack, Defense, Speed, and Special.
- [ ] Implement Gen 3 IV/PV extraction, handling the 48-byte encrypted Data block and substructure order `PV % 24`.
- [ ] story-112-324-integration-e2e

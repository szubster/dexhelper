---
id: epic-056-350-in-game-trade-dashboard-ui-v2
type: EPIC
title: In-Game Trade Dashboard UI v2
status: PENDING
owner_persona: story_owner
created_at: "2026-08-04"
updated_at: "2026-08-04"
depends_on:
  - epic-056-349-in-game-trade-data-extraction-v2
jules_session_id: null
pr_number: null
parent: prd-095-056-in-game-trade-assistant
tags:
  - feature
  - ui
  - ux
research_references: []
rejection_count: 0
rejection_reason: ""
notes: ""
---
# Epic: In-Game Trade Dashboard UI v2

## Objective
Build a dedicated dashboard for tracking in-game NPC trades, providing real-time availability status and cross-referencing with the player's collection.

## Scope
- Dashboard component listing all available NPC trades for the detected game version.
- Visual tags for trade completion status ("Available", "Claimed", "Incomplete").
- Collection cross-referencing logic to highlight trades where the player has the required Pokémon in their PC or Party.

## Acceptance Criteria
- [ ] UI component lists all NPC trades for the current generation/version.
- [ ] Trades are visually tagged based on their completion status in the save file.
- [ ] The dashboard correctly identifies if the player has the required "offered" Pokémon in their collection.
- [ ] The UI adheres to the "tactical hardware" design system.
- [ ] Story Owner: Break down this Epic into executable Stories.
- [ ] Story Owner: Generate a final STORY dedicated exclusively to Integration and E2E Verification.
---
id: epic-095-120-in-game-trade-dashboard-ui
type: EPIC
title: In-Game Trade Dashboard UI
status: CANCELLED
owner_persona: story_owner
created_at: '2026-06-30'
updated_at: '2026-08-02'
depends_on:
  - epic-095-119-in-game-trade-data-extraction
jules_session_id: null
pr_number: null
parent: prd-095-056-in-game-trade-assistant
tags:
  - feature
  - ui
  - ux
research_references: []
rejection_count: 0
rejection_reason: >-
  Cancelled due to permanent failure of dependency:
  epic-095-119-in-game-trade-data-extraction
notes: ''
---

# Epic: In-Game Trade Dashboard UI

## Objective
Build a dedicated dashboard for tracking in-game NPC trades, providing real-time availability status and cross-referencing with the player's collection.

## Scope
- **Dashboard Component:** Create a tactical-style dashboard that lists all available NPC trades for the detected game version.
- **Trade Status Visualization:** Clearly indicate which trades are "Available", "Claimed", or "Incomplete" (missing required Pokémon).
- **Collection Cross-Reference:** Implement logic to check the `partyDetails` and `pcDetails` for the specific Pokémon required for each trade.
- **Actionable Insights:** Highlight trades where the player already possesses the required Pokémon in their PC or Party.

## Acceptance Criteria
- [ ] UI component lists all NPC trades for the current generation/version.
- [ ] Trades are visually tagged based on their completion status in the save file.
- [ ] The dashboard correctly identifies if the player has the required "offered" Pokémon in their collection.
- [ ] The UI adheres to the "tactical hardware" design system (ADR 008/024).
- [ ] Story Owner: Break down this Epic into executable Stories.

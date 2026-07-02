---
id: epic-056-120-in-game-trade-dashboard-ui
type: EPIC
title: In-Game Trade Dashboard UI
status: PENDING
owner_persona: story_owner
created_at: '2026-07-02'
updated_at: '2026-07-02'
depends_on:
  - epic-056-119-in-game-trade-data-parsing
jules_session_id: null
pr_number: null
parent: prd-095-056-in-game-trade-assistant
tags:
  - ui
  - dashboard
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Epic: In-Game Trade Dashboard UI

## Context
As part of the In-Game Trade Assistant (PRD 056), we need a UI dashboard to display available trades to the user. This dashboard needs to highlight actionable trades by cross-referencing requested Pokémon against the player's party and PC boxes.

## Requirements
- Display a list of available in-game trades for the detected game.
- Cross-reference the required Pokémon for each trade with the player's party and PC.
- Highlight trades where the player currently possesses the required Pokémon.
- Mark trades that have already been completed based on the save file data.

## Acceptance Criteria
- [ ] Break down into Stories (e.g., Build Dashboard UI, Implement Cross-Referencing Logic).

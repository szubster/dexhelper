---
id: prd-095-056-in-game-trade-assistant
type: PRD
title: Gen 2/3 In-Game Trade Assistant Dashboard
status: ACTIVE
owner_persona: epic_planner
created_at: '2026-06-30'
updated_at: '2026-08-04'
depends_on: []
jules_session_id: '6284207135796806999'
pr_number: null
parent: idea-095-in-game-trade-assistant
tags: []
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
---
# Gen 2/3 In-Game Trade Assistant Dashboard PRD

## Context
In-game NPC trades provide Pokémon with good IVs and rare items, but tracking them is tedious. We need a dashboard to show available trades and cross-reference them with the player's party and PC.

## Requirements
- Parse save file event flags to track completed in-game trades for Gen 2 and Gen 3.
- Display a list of available and completed trades.
- Automatically cross-reference requested Pokémon against the player's party and PC box to highlight actionable trades.

## Acceptance Criteria
- [x] Break down into Epics (Parse Data, Build UI).
- [ ] epic-095-119-in-game-trade-data-extraction
- [ ] epic-095-120-in-game-trade-dashboard-ui

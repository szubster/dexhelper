---
id: prd-090-055-pokegear-phone-tracker
type: PRD
title: Gen 2 Pokegear Phone Call Predictor & Tracker
status: PENDING
owner_persona: epic_planner
created_at: '2026-06-29'
updated_at: '2026-07-01'
depends_on: []
jules_session_id: null
pr_number: null
parent: idea-090-pokegear-phone-tracker
tags:
  - feature
  - gen2
  - mechanics
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# PRD: Gen 2 Pokegear Phone Call Predictor & Tracker

## Context
In Generation 2 (Gold, Silver, Crystal), the Pokégear Phone is a central feature. Players can register phone numbers of various NPCs. These NPCs randomly call the player to offer rematches, give out rare items (like evolutionary stones), or notify about swarms. However, the game doesn't provide a way to know *when* a call will happen or *who* is likely to call, leading to tedious waiting or missed opportunities, especially for item-giving trainers.

## Requirements
- **Save File Investigation:** Identify and document the exact save file offsets and RNG mechanics governing Pokegear phone calls in Gold/Silver/Crystal.
- **Active Callers Dashboard:** Create a view showing all registered NPCs and their current status (e.g., "Ready for Rematch", "Has Item to Give").
- **Call Probability/Predictor:** Based on save file data, indicate which NPCs are active or have a high probability of calling, allowing players to focus on specific routes or activities to trigger calls.
- **Swarm/Item Alerts:** Specifically highlight NPCs that offer rare items (like Water Stone from Fisher Tully) or notify about swarms, separating them from standard rematch calls.

## Acceptance Criteria
- [x] Break down into Epics
- [ ] .foundry/research/research-055-244-pokegear-mechanics.md
- [ ] .foundry/epics/epic-055-116-pokegear-active-callers.md
- [ ] .foundry/epics/epic-055-117-pokegear-predictor.md
- [ ] .foundry/epics/epic-055-118-pokegear-alerts.md

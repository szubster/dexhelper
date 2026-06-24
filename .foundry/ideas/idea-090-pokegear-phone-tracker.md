---
id: idea-090-pokegear-phone-tracker
type: IDEA
title: Gen 2 Pokegear Phone Call Predictor & Tracker
status: READY
owner_persona: product_manager
created_at: '2026-06-27'
updated_at: '2026-06-27'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - feature
  - gen2
  - mechanics
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Idea: Gen 2 Pokegear Phone Call Predictor & Tracker

## Context
In Generation 2 (Gold, Silver, Crystal), the Pokégear Phone is a central feature. Players can register phone numbers of various NPCs. These NPCs randomly call the player to offer rematches, give out rare items (like evolutionary stones), or notify about swarms. However, the game doesn't provide a way to know *when* a call will happen or *who* is likely to call, leading to tedious waiting or missed opportunities, especially for item-giving trainers.

## Proposal
Leverage DexHelper's save file parsing to analyze the registered phone numbers and any hidden RNG/timer states related to phone calls.
- **Active Callers Dashboard:** Create a view showing all registered NPCs and their current status (e.g., "Ready for Rematch", "Has Item to Give").
- **Call Probability/Predictor:** Based on save file data, indicate which NPCs are active or have a high probability of calling, allowing players to focus on specific routes or activities to trigger calls.
- **Swarm/Item Alerts:** Specifically highlight NPCs that offer rare items (like Water Stone from Fisher Tully) or notify about swarms, separating them from standard rematch calls.

## Value Proposition
This feature targets a core Gen 2 mechanic that is heavily relied upon for progression (evolution stones) and completion (swarms) but is entirely opaque to the player. By surfacing the hidden state of phone contacts, DexHelper removes the guesswork and tedious waiting, transforming a random mechanic into a predictable, actionable system. This perfectly aligns with the app's offline-first utility model.

## Next Steps
- [ ] Product Manager: Convert this idea into a PRD to investigate the exact save file offsets and RNG mechanics governing Pokegear phone calls in Gold/Silver/Crystal.

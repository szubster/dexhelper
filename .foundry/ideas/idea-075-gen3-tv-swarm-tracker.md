---
id: idea-075-gen3-tv-swarm-tracker
type: IDEA
title: Gen 3 TV Broadcast and Swarm Tracker
status: PENDING
owner_persona: product_manager
created_at: '2026-06-12'
updated_at: '2026-06-12'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - feature
  - gen3
  - daily-events
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Idea: Gen 3 TV Broadcast and Swarm Tracker

## Context
Generation 3 introduced a dynamic TV broadcast system that drives in-game swarms (mass outbreaks of rare Pokémon like Surskit or Skitty), Energy Guru sales, and Game Corner payouts. The underlying save file tracks the days remaining and the specific seeds for these TV events. Players often miss swarms because they fail to check the TV in-game or don't know the exact schedule based on their save's RTC.

## Proposal
Leverage DexHelper's programmatic save parsing to read the TV event data structures and the RTC from Gen 3 save files to create a dynamic "TV & Swarm Dashboard".

- **Active Swarm Radar:** Highlight any currently active mass outbreaks on the world map, showing the exact species and route without the player needing to check a TV.
- **Broadcast Schedule:** Provide a forecasted schedule of upcoming TV events (e.g., "Energy Guru Sale in 2 days", "Skitty Swarm next Tuesday") based on the parsed save file event timers.
- **Mix Record Sync Insights:** When players mix records, TV show data is synchronized. The dashboard can highlight which swarms or events were inherited from a friend's save file.

## Value Proposition
This feature targets highly obscure, time-gated mechanics in Gen 3 that are incredibly frustrating to track manually. Surfacing this hidden TV and swarm state transforms random, easily missed events into actionable, scheduled gameplay opportunities, aligning perfectly with DexHelper's mission as a proactive companion app.

## Next Steps
- [x] Product Manager: Convert this idea into a PRD to define the data structures for Gen 3 TV events and outline the UI dashboard.
- [ ] .foundry/prds/prd-075-047-gen3-tv-swarm-tracker.md

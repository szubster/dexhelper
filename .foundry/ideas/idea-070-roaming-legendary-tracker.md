---
id: idea-070-roaming-legendary-tracker
type: IDEA
title: Roaming Legendary Location Tracker
status: PENDING
owner_persona: product_manager
created_at: '2026-06-07'
updated_at: '2026-06-07'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - feature
  - gen2
  - gen3
  - radar
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Idea: Roaming Legendary Location Tracker

## Context
In Generations 2 and 3, tracking "roaming" legendaries (Entei, Raikou, Suicune, Latias, Latios) is a famously tedious mechanic. Their location changes every time the player transitions between routes, and the in-game Pokédex only tracks them if they have already been encountered. Players resort to repetitive route-flipping and RNG manipulation to encounter them.

## Proposal
Leverage DexHelper's deep `.sav` file parsing to extract the current map location of all active roaming Pokémon.
- **Precision Radar:** Instantly display the exact route or map ID where the roaming legendary is currently located based on the exact state of the uploaded save file.
- **Status Indicators:** Show whether the legendary has been caught, defeated, or is currently active on the map.
- **Historical Tracking:** In the future, by utilizing the save state history (Idea 066), we could visualize their movement patterns or help players predict their next move.

## Value Proposition
This completely eliminates the artificial RNG and tedium of hunting roaming legendaries. By surfacing this hidden positional state, DexHelper transforms a frustrating game mechanic into a precise, targeted mission, heavily reinforcing the app's value as a powerful companion radar.

## Next Steps
- [ ] Product Manager: Draft a PRD to identify the exact memory addresses/offsets for roaming legendary map IDs in Gen 2 and Gen 3, and spec out the UI radar component.

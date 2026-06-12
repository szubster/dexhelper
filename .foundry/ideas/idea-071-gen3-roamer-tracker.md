---
id: idea-071-gen3-roamer-tracker
type: IDEA
title: Gen 3 Roaming Legendary Tracker and IV Glitch Inspector
status: PENDING
owner_persona: product_manager
created_at: '2026-06-05'
updated_at: '2026-06-10'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - feature
  - gen3
  - roamer
research_references: []
rejection_count: 0
rejection_reason: ''
notes: >-
  Make sure downstream agents cross reference this with other nodes in foundry
  and add proper depends_on if needed.
---

# Idea: Gen 3 Roaming Legendary Tracker and IV Glitch Inspector

## Context
In Generation 3 games (Ruby/Sapphire/Emerald and FireRed/LeafGreen), tracking down roaming legendaries (Latias, Latios, Raikou, Entei, Suicune) is notoriously frustrating. A significant compounding issue is the infamous "Roamer IV Glitch" in Ruby, Sapphire, FireRed, and LeafGreen, which causes the roaming Pokémon to almost always have terrible IVs (specifically, an Attack IV of 0-7, and 0 for Defense, Sp. Atk, Sp. Def, and Speed). Since the roamer's data (Nature and IVs) is generated and saved the moment they are released into the wild, players often spend hours hunting them down only to discover they caught a glitched, competitively unviable Pokémon.

## Proposal
Leverage DexHelper's programmatic save parsing to extract the hidden data structure of the currently active roaming Pokémon directly from the `.sav` file.
- **Immediate Glitch Inspection:** Once the player triggers the event that releases the roamer, they can upload their save file to DexHelper. We will parse and display the roamer's exact Nature and IVs *before* the player actually catches it. This allows players to verify if their roamer is affected by the glitch or if they managed to get a good roll, letting them decide immediately whether to soft-reset or proceed with the hunt.
- **Current Route Radar:** Decode the roamer's current location index stored in the save file and display it on a map or simple text output. This turns a completely blind, tedious search into a targeted mission.
- **Status Tracking:** Show the roamer's current HP and status condition, which are also preserved in the save file between encounters.

## Value Proposition
This feature perfectly aligns with DexHelper's vision as a premium companion app by surfacing critical hidden state. It directly prevents hours of wasted effort caused by obscure retro game mechanics and engine glitches, providing immense utility for shiny hunters, completionists, and competitive players.

## Next Steps
- [x] Product Manager: Convert this idea into a PRD to detail the save offsets required for extracting the roamer data structure across different Gen 3 versions.
- [ ] .foundry/prds/prd-071-044-gen3-roamer-tracker.md
- [ ] .foundry/archive/research/research-071-138-gen3-roamer-offsets.md

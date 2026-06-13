---
id: idea-077-gen3-match-call-tracker
type: IDEA
title: Gen 3 PokéNav Match Call & Rematch Tracker
status: READY
owner_persona: product_manager
created_at: '2026-06-13'
updated_at: '2026-06-13'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - feature
  - gen3
  - tracking
  - endgame
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Idea: Gen 3 PokéNav Match Call & Rematch Tracker

## Context
In Pokémon Emerald, the PokéNav's Match Call feature tracks registered NPC trainers and gym leaders who are ready for a rematch. Rematching these trainers is a crucial endgame mechanic for both farming EXP and acquiring specific EVs without grinding wild encounters. However, the in-game UI requires scrolling through a long, linear list, and players often forget which trainers give which EVs or where they are located. Additionally, rematch flags are triggered by a hidden "step counter" mechanic which the game obfuscates.

## Proposal
Leverage DexHelper's save parsing to read the Trainer Hill/Match Call data block in the Emerald `.sav` file. By surfacing the hidden rematch flags, we can create an optimized "Rematch Dashboard".
- Extract the list of all registered trainers and determine which ones currently have the "ready for rematch" flag set.
- Enrich this data with static information: the route/location of the trainer, the Pokémon on their team (which scales with the rematch tier), and the aggregate EVs yielded by defeating them.
- Present this in a filterable UI (e.g., "Show me trainers ready for a rematch that yield Speed EVs").

## Value Proposition
This perfectly aligns with DexHelper's vision as an intelligent companion app. It takes a tedious, opaque in-game system and transforms it into an actionable utility for competitive training and endgame optimization, offering massive value to the hardcore playerbase.

## Next Steps
- [ ] Product Manager: Convert this idea into a PRD to detail the UI requirements and required memory offsets for Emerald Match Call flags.

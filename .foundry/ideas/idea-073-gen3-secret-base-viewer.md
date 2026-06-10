---
id: idea-073-gen3-secret-base-viewer
type: IDEA
title: Gen 3 Secret Base and Mixed Record Viewer
status: ACTIVE
owner_persona: product_manager
created_at: '2026-06-10'
updated_at: '2026-06-10'
depends_on: []
jules_session_id: '8894433075697987702'
pr_number: null
parent: null
tags:
  - feature
  - gen3
  - secret-base
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Idea: Gen 3 Secret Base and Mixed Record Viewer

## Context
In Generation 3 (Ruby/Sapphire/Emerald), players can create "Secret Bases" and share them with friends by mixing records. When records are mixed, the friend's Secret Base appears in the player's game, and the friend's character can be battled once a day as an NPC. A common pain point is forgetting exactly which route a friend's Secret Base spawned on, or not knowing their team composition (which is highly valuable for EV training, e.g., fighting a friend who has six Blissey).

## Proposal
Leverage DexHelper's programmatic save parsing to expose hidden Secret Base and Mixed Record data across Hoenn.
- **Secret Base Locator:** Parse the save file to identify all active Secret Bases (the player's and those from mixed records) and map their exact locations on the Smart Route Radar.
- **NPC Trainer Intel:** Extract the NPC trainer data from mixed records to display the friend's trainer name, their current team composition (species, level, moveset), and their EV yields.
- **Daily Rematch Tracker:** Track whether the player has already battled the Secret Base trainer today, turning it into a repeatable daily checklist item for EXP/EV farming.

## Value Proposition
This transforms a highly opaque, easily-forgotten social feature into an actionable endgame utility. By revealing hidden state about where bases are located and what teams they contain, players can optimize their daily training routines and fully utilize the mixed record feature without manually checking dozens of potential Secret Base locations across Hoenn. This perfectly aligns with our vision of being a premium, intelligent companion app.

## Next Steps
- [ ] Product Manager: Convert this idea into a PRD to define the data structures and save file offsets needed for parsing Secret Base and Mixed Record data in Gen 3.

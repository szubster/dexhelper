---
id: idea-100-static-encounter-tracker
type: IDEA
title: Gen 1-3 Static Encounter & Legendary Checklist
status: ACTIVE
owner_persona: product_manager
created_at: '2026-07-03'
updated_at: '2026-07-04'
depends_on: []
jules_session_id: '6132551216569612658'
pr_number: null
parent: null
tags:
  - feature
  - gen1
  - gen2
  - gen3
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Idea: Gen 1-3 Static Encounter & Legendary Checklist

## Context
Across Generations 1 through 3, players encounter specific Pokémon as one-time overworld interactions—often referred to as "static encounters" or "stationary encounters." These range from iconic Legendaries (Mewtwo, Ho-Oh, Rayquaza) to rare, non-respawning regular Pokémon (Snorlax blocking paths, Sudowoodo, Castform, Kecleon, or the Voltorb/Electrode disguised as items). Once a player faints or catches these Pokémon, the event flag is permanently set, and the encounter is gone forever on that save file. For players revisiting old save files or trying to catch everything available, figuring out which static encounters they have already completed requires physical in-game travel and guesswork.

## Proposal
Leverage DexHelper's capability to read event flags and hidden state from the save file to create a **Static Encounter & Legendary Checklist**.
- **Unified Checklist:** Aggregate all available stationary encounters for the active game (e.g., all Snorlaxes in Gen 1, Sudowoodo in Gen 2, the Regi trio in Gen 3).
- **Dynamic Completion Status:** By parsing specific event flags (e.g., the flag indicating Sudowoodo has been battled, or the flag for receiving the gift Castform), automatically check off which static encounters the player has completed.
- **Actionable Hints:** For encounters that are still available, provide a quick reference on their exact location, level, and any prerequisites (e.g., needing the Poké Flute, SquirtBottle, or Silph Scope).

## Value Proposition
This directly tackles the anxiety of "Did I already catch the Snorlax on Route 12?" by surfacing hidden event flags. It perfectly complements existing collection trackers by transforming static game knowledge (wiki lists of legendaries/static spawns) into a highly personalized, dynamic "to-do list" based strictly on the player's unique save state. This deepens DexHelper's role as the ultimate completionist companion app.

## Next Steps
- [ ] Product Manager: Convert this idea into a PRD to detail the event flags to parse across Gens 1-3 for static encounters and define the UI presentation.

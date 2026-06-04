---
id: idea-068-069-pokerus-tracker
type: IDEA
title: Pokerus Tracker and Infection Spread Assistant
status: PENDING
owner_persona: product_manager
created_at: '2026-06-03'
updated_at: '2026-06-03'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - feature
  - tool
  - quality-of-life
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Idea: Pokerus Tracker and Infection Spread Assistant

## Context
Pokerus is an incredibly rare, hidden status condition introduced in Generation 2 that doubles the EVs (Stat Exp) a Pokémon earns from battle. It is highly sought after by dedicated players. However, its mechanics are entirely hidden from the player: there is no in-game indication of *which* specific strain of Pokerus a Pokémon has, exactly how many days are left before it is "cured" (becomes immune to spreading it but keeps the EV bonus), or any visual tool to help spread the infection across a team or PC box efficiently.

## Proposal
Create a **Pokerus Tracker and Infection Spread Assistant** within DexHelper that exposes this hidden state and makes it actionable.

1. **Pokerus State Exfiltration**: Since we already parse `.sav` files, we can read the specific byte flags for Pokerus for every Pokémon in the party and PC.
2. **Visual Tracker**:
    - Add clear, distinct visual badges on Pokémon lists and detail views to indicate their exact Pokerus status: `Uninfected`, `Infected (Contagious)`, and `Cured (Immune)`.
    - For contagious Pokémon, calculate and explicitly display the remaining days/time until they are cured based on their specific strain and the game's RTC (Real Time Clock).
3. **Spread Planner**:
    - Provide a dedicated tool or view that helps players strategically plan how to spread Pokerus. For example, suggesting which infected Pokémon to keep in the party alongside uninfected target Pokémon, and warning players if an infected Pokémon is about to be cured, advising them to deposit it in the PC (which pauses the timer).

## Value Proposition
This takes an obtuse, highly stressful hidden mechanic and turns it into a clear, manageable process. Dedicated players currently resort to spreadsheets or meticulous manual time-tracking to manage Pokerus. This feature eliminates that entirely, heavily aligning with DexHelper's vision of being a premium companion app that surfaces hidden state for actionable utility.

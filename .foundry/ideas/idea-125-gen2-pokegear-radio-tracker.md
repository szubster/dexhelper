---
id: idea-125-gen2-pokegear-radio-tracker
type: IDEA
title: Gen 2 Pokegear Radio Show & Swarm Predictor
status: PENDING
owner_persona: product_manager
created_at: 2026-07-28
updated_at: 2026-07-28
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - gen2
  - radio
  - quality-of-life
research_references: []
notes: "Maintains 50/50 balance by focusing on a DexHelper feature after the Foundry idea in 124."
---

# Gen 2 Pokegear Radio Show & Swarm Predictor

## Context
In Generation 2 (Gold, Silver, Crystal), the Pokégear features a Radio module. This isn't just cosmetic; it drives actual gameplay mechanics. Certain radio shows only play on specific days of the week, and more importantly, the 'Professor Oak's Pokémon Talk' and 'Lucky Channel' shows provide critical information on daily Pokémon swarms (like Marill or Yanma) and the weekly ID lottery numbers. Currently, players must manually tune in every day and listen to slow text to figure out these hidden states.

## The Proposal
Introduce a "Radio Waves" dashboard for DexHelper. By parsing the RTC (Real Time Clock) state and the player's saved game variables from a Gen 2 save file, DexHelper can surface this hidden daily information instantly.

Specifically, it will extract and display:
1. **Today's Swarm:** Instantly decode the daily swarm seed to tell the player which swarm route is active today (if any), bypassing the need to check Professor Oak's show in-game.
2. **Lucky Channel Number:** Display the winning lottery ID for the week directly on the dashboard.
3. **Radio Schedule:** A quick reference for which beneficial shows are active today (e.g., Buena's Password in Crystal, or the March/Lullaby channels for manipulating encounter rates).

## Value Proposition
This feature transforms obscure, time-gated mechanics in Gen 2 that are tedious to track into actionable, scheduled gameplay opportunities. It saves the player time, prevents them from missing rare swarms, and solidifies DexHelper's position as a premium, intelligent companion app. It adheres to the 50/50 balance rule by providing a high-value product feature for the core application following the orchestrator-focused IDEA-124.

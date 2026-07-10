---
id: idea-102-gen3-trainer-card-stars
type: IDEA
title: Gen 3 Trainer Card Stars & Achievements Dashboard
status: ACTIVE
owner_persona: product_manager
created_at: '2026-07-05'
updated_at: '2026-07-10'
depends_on: []
jules_session_id: '16044849192547544369'
pr_number: null
parent: null
tags:
  - feature
  - gen3
  - achievements
  - completionist
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Idea: Gen 3 Trainer Card Stars & Achievements Dashboard

## Context
In Generation 3 (specifically Emerald), players can earn up to 4 stars on their Trainer Card by completing macroscopic, game-spanning goals: entering the Hall of Fame, completing the Hoenn Pokédex, completing the National Pokédex, winning all Master Rank Contests, and earning all Gold Symbols in the Battle Frontier. Tracking progress towards these goals in-game requires checking multiple disparate screens and menus, which is tedious for completionist players.

## Proposal
Create a centralized "Trainer Card Stars & Achievements Dashboard" that aggregates these distinct completion flags from the save file into a single view.
- Extract the specific flags or counters for HoF entry, Pokédex completion (Hoenn and National), Contest Master Rank victories, and Battle Frontier Gold Symbols.
- Present these as a clear checklist or visual dashboard (e.g., a digital Trainer Card that updates as goals are met).
- Provide granular progress for each star (e.g., 3/5 Contest Master Ranks won, 4/7 Gold Symbols earned).

## Value Proposition
This feature strongly aligns with DexHelper's vision as a premium companion app for hardcore players. By centralizing widely distributed, hard-to-track completion data into a single, unified dashboard, we eliminate tedious in-game menu navigation and provide a highly satisfying "macro-view" of the player's ultimate endgame progress.

## Next Steps
- [ ] Product Manager: Convert this idea into a PRD outlining the specific save file offsets to parse and the UI layout for the dashboard.

### SCHEMA
https://github.com/szubster/dexhelper/blob/main/.foundry/docs/schema.md

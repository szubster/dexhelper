---
id: idea-532-gen3-trainer-rematch-radar
type: IDEA
title: "Gen 3 Trainer Rematch Radar (Match Call & VS Seeker)"
status: PENDING
owner_persona: product_manager
created_at: "2026-09-21"
updated_at: "2026-09-21"
depends_on: []
jules_session_id: null
locks: []
pr_number: null
parent: null
priority: 50
confidence_score: null
tags:
  - dexhelper
  - gen3
  - save-parser
  - trainer-rematch
  - ui
research_references: []
rejection_count: 0
rejection_reason: ""
notes: ""
---

# Gen 3 Trainer Rematch Radar (Match Call & VS Seeker)

## Problem
In Generation 3 Pokémon games (Emerald's Match Call system, Ruby/Sapphire Pokenav trainer rematches, and FireRed/LeafGreen VS Seeker mechanic), trainer rematches are vital for leveling Pokémon, farming prize money/Amulet Coin gains, and acquiring EV yield efficiently. However, in-game systems leave rematch availability opaque:
- In Emerald, Match Call notification ticks are RNG/step-count based and invisible unless checking Pokénav sub-menus.
- In FireRed/LeafGreen, VS Seeker readiness depends on hidden step-counter variables and internal trainer state flags.
- Players grinding for specific EV yields or leveling party members before Gyms/Elite Four must blindly travel between routes to check if trainers are ready to fight again.

## Proposed Solution
Introduce a dedicated **Trainer Rematch Radar** dashboard in DexHelper that parses save file variables and event flags for Generation 3 games (R/S/E & FR/LG) to give players instant visibility into trainer rematch readiness across the region.

## Strategic Value & Features
1. **Rematch Readiness Indicators:**
   - Parse Pokénav trainer rematch flags (`SaveBlock1` / `SaveBlock2` variables in Emerald/RS) and VS Seeker step progress / trainer state arrays (FR/LG).
   - Display a list and interactive map view of trainers currently ready for a rematch, along with their location (Route/Building).

2. **EV Yield & Leveling Filter:**
   - Filter ready trainers by their Pokémon team EV yield (e.g. Speed, Attack) and total EXP payout, allowing players to plan efficient EV training and grinding routes.

3. **Match Call & Pokenav Insights:**
   - Surface internal step counters and RNG tick status showing how close the save file is to triggering the next Match Call rematch update.

4. **Rematch Level Progression Tracker:**
   - Show each trainer's current rematch stage (e.g., Rematch 1 through Rematch 5) and their upgraded team stats/movesets.

## Strategic Balance
In the preceding session, IDEA-531 (Web Worker Save Parser / Automatic Scratchpad Cleanup) addressed internal Foundry infrastructure & core app execution performance. This feature pivots back to a high-value, player-facing collector & gameplay utility for **DexHelper**, maintaining the mandatory 50/50 balance between DexHelper product features and Foundry system tooling.

## Acceptance Criteria
- [ ] Parse Gen 3 save file variables for Pokénav Match Call state (Emerald/RS) and VS Seeker trainer flags (FR/LG).
- [ ] Create UI components presenting active rematchable trainers filtered by route, EV yield, and EXP payout.
- [ ] Integrate with DexHelper's interactive map or route visualizer.

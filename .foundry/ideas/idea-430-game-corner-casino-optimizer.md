---
id: idea-430-game-corner-casino-optimizer
type: IDEA
title: Game Corner Casino Optimizer and Tracker
status: READY
owner_persona: product_manager
created_at: '2026-08-20'
updated_at: '2026-08-20'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - game-corner
  - casino
  - tracking
  - utility
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Idea: Game Corner Casino Optimizer and Tracker

## Context
Across Generation 1 (Celadon City), Generation 2 (Goldenrod and Celadon), and Generation 3 (Mauville City), the Game Corner (Casino) is a central hub for acquiring rare, exclusive Pokémon (like Porygon or Dratini) and extremely powerful, vital TMs (like Ice Beam, Thunderbolt, and Flamethrower). These prizes require thousands of coins.

Players often struggle with the Game Corner because they don't know exactly how many coins they need for their desired prizes, which slots/games yield the best payouts, or how many hidden coins remain on the casino floor. In Gen 3, the Game Corner also has hidden mechanics, such as specific slot machines having better odds or being "hot" on certain days (sometimes broadcast on TV, as noted in IDEA-075).

## Proposal
Introduce a "Game Corner Optimizer" dashboard in DexHelper to streamline casino activities and prize acquisition.

1. **Coin and Prize Tracking:**
   - Parse the player's current Coin Case balance from the save file.
   - Provide a checklist of all available Game Corner prizes (Pokémon, TMs, items) for their specific game version.
   - Allow players to select their target prizes. The dashboard calculates the exact coin deficit and estimates the time/money required to bridge the gap.

2. **Hidden Coin Radar:**
   - Read the hidden item event flags specifically for the Game Corner maps.
   - Display a mini-map or checklist indicating exactly which hidden coins dropped by NPCs are still waiting to be picked up off the casino floor, giving players a quick free boost to their coin balance.

3. **Gen 3 "Hot Slots" Predictor (Future Expansion):**
   - In Gen 3, cross-reference the TV broadcast flags and RNG seeds (from the save data) to indicate if today is a "lucky day" at the Mauville Game Corner, or if any specific slot machines have elevated payout odds based on the current save state.

## Value Proposition
- **Saves Time:** Prevents players from blindly grinding slots or buying too many coins by providing exact mathematical deficits for their desired prizes.
- **Surfaces Hidden Loot:** Instantly points out free hidden coins on the floor that the player missed.
- **Premium Utility:** Demystifies the often frustrating casino mechanics, turning a tedious grind into a planned, trackable objective. This perfectly aligns with DexHelper's vision of turning opaque game data into actionable, premium utility.

## Acceptance Criteria
- [ ] Product Manager: Convert this IDEA into a PRD specifying the dashboard layout, the calculation logic for the coin deficit, and the extraction strategy for the hidden casino coins event flags across Gen 1-3.

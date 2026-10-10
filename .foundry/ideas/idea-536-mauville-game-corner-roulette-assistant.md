---
id: idea-536-mauville-game-corner-roulette-assistant
type: IDEA
title: Mauville City Game Corner Roulette & Slot Wheel Assistant
status: READY
owner_persona: product_manager
created_at: '2026-10-09'
updated_at: '2026-10-09'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - gen3
  - game-corner
  - roulette
  - tracker
  - dx
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
priority: 50
confidence_score: 95
---

# Mauville City Game Corner Roulette & Slot Wheel Assistant

## Context & Problem Statement
In Generation 3 (Ruby, Sapphire, Emerald), Mauville City features a Game Corner with unique casino mini-games, specifically the 1-Coin and 3-Coin Roulette tables (exclusive to RSE) and Slot Machines. Obtaining prize items like TM13 (Ice Beam), TM24 (Thunderbolt), TM35 (Flamethrower), and rare Pokémon requires accumulating up to 4,000 Coins. However, players currently have no visibility into their exact Coin Case balance or prize progress without manually checking key items in-game.

## Proposed Solution
Introduce a dedicated "Mauville Game Corner Assistant" overlay and save parser module in `src/engine/saveParser/` and `src/components/` that:
1. **Coin Case & Prize Tracker**: Extracts the player's Coin Case inventory count (0-9,999 Coins) from Gen 3 save files and calculates the remaining coins needed for desired TM or Pokémon prizes.
2. **Roulette Table & Lucky Machine Analyzer**: Parses active event flags/variables associated with Game Corner lucky tables or payout modes.
3. **Tactical UI View**: Renders a dedicated dashboard with tactical cards showing coin totals, prize progress bars, and betting strategies.

## Acceptance Criteria
- [ ] Extend Gen 3 save parser to extract Coin Case balance and Game Corner event flags.
- [ ] Create a dedicated `GameCornerTracker` component in `src/features/trackers/` adhering to ADR 008 tactical design primitives.
- [ ] Provide prize progress indicators for high-value TMs and Pokémon available at the Mauville Game Corner.
- [ ] Add unit tests verifying Coin Case extraction across Ruby, Sapphire, and Emerald save files.

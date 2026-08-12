---
id: prd-139-342-live-battle-prediction-overlay
type: PRD
title: Live Battle Advisor and Prediction Overlay
status: PENDING
owner_persona: epic_planner
created_at: '2026-08-12'
updated_at: '2026-08-12'
depends_on: []
jules_session_id: null
pr_number: null
parent: idea-139-live-battle-prediction-overlay
tags:
  - emulator
  - battle
  - ui
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# PRD: Live Battle Advisor and Prediction Overlay

## Overview
The Live Battle Advisor and Prediction Overlay is a HUD-style tool that wraps the built-in emulator window. It serves as a tactical guide for competitive players and Hardcore Nuzlocke runners by providing real-time combat data, on-the-fly damage calculations, and deterministic AI move predictions without requiring external calculators.

## Real-Time Combat Scanner
The scanner reads active battle variables directly from the emulator's memory. It extracts current enemy Pokémon ID, level, stats, moves, turn count, weather, and status conditions.
- **Generation 1 & 2 Move Extraction:** Extracts Move PPs from the Pokémon data structures using established offsets (Gen 1 at `0x1D`-`0x20`, Gen 2 at `0x17`-`0x1A`).
- **Generation 3 Data Structure Integration:** Parses the 100-byte Pokémon data structure, locating and decrypting the 48-byte Data block using the Personality Value (PV) and Original Trainer (OT) ID. It correctly handles the 24 possible permutations (`PV % 24`) to locate the Attacks (A) substructure for moves, and Extracts Pokerus/Ribbons from the Miscellaneous (M) substructure.

## On-the-Fly Damage Calculation
Active variables are continuously fed into a robust damage calculation engine. This engine computes and visualizes:
- **Guaranteed Damage Ranges:** Minimum and maximum damage of user and enemy attacks.
- **Critical Hit Thresholds:** Indication of outcomes if a critical hit occurs.
- **Survival Probabilities:** Percentage chances for survival given current HP and predicted damage.

## Deterministic AI Move Predictor
An AI Move Predictor framework ingests the in-game trainer's AI script level. By evaluating move priorities against the user's active Pokémon typing, stats, and current health, it calculates and displays the exact probabilities of the enemy's next move choice.

## UX Overlay Layout
The overlay seamlessly wraps the emulator window, designed with a modern tactical aesthetic:
- **Sidebar or HUD:** Displays live data cleanly alongside the gameplay.
- **Status Indicators:** Highlights active weather, status effects, and turn constraints.
- **Dynamic Highlights:** Emphasizes dangerous enemy moves or safe plays based on real-time probabilities.

## Acceptance Criteria
- [ ] Break down into Epics.

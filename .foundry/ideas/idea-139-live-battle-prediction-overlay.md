---
id: idea-139-live-battle-prediction-overlay
type: IDEA
title: Live Battle Advisor and Prediction Overlay
status: READY
owner_persona: product_manager
created_at: '2026-08-08'
updated_at: '2026-08-09'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - emulator
  - battle
  - ui
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Idea: Live Battle Advisor and Prediction Overlay

## Problem
In competitive play and Hardcore Nuzlockes, battles are highly volatile. A single misplay, miscalculated damage roll, or unexpected enemy move can end a run. Calculating damage or predicting moves manually requires constant tab-switching to external calculators.

## Proposed Solution
Design a modern, HUD-style Battle Advisor overlay that wraps the built-in emulator window.
1. **Real-Time Combat Scanner:** Read active battle variables from RAM (current enemy Pokémon ID, level, stats, moves, turn count, weather, and status conditions).
2. **On-the-Fly Damage Calculation:** Feed these live variables into the damage calculation engine to display guaranteed damage ranges, critical hit thresholds, and survival probabilities instantly.
3. **Deterministic AI Move Predictor:** Ingest the trainer's AI script level and evaluate move priorities against the user's active Pokémon typing and stats to predict the enemy's next move with exact probabilities.

## Value Proposition
Players can execute perfect battle strategies without tedious manual calculations, elevating DexHelper to the premier tactical guide for challenge runners.

## Acceptance Criteria
- [ ] Product Manager: Draft a PRD detailing the UX overlay layout, the real-time damage calculator feed, and the move-prediction visualization framework.

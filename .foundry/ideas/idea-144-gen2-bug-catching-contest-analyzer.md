---
id: idea-144-gen2-bug-catching-contest-analyzer
type: IDEA
title: Gen 2 Bug-Catching Contest Score Analyzer
status: READY
owner_persona: product_manager
created_at: '2026-08-10'
updated_at: '2026-08-10'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - feature
  - gen2
  - utility
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 2 Bug-Catching Contest Score Analyzer

## Problem
In Generation 2 (Gold, Silver, Crystal), winning the Bug-Catching Contest at the National Park is the only way to obtain a Sun Stone to evolve Sunkern or Gloom. However, the score calculation is highly opaque, relying on hidden variables like the caught Pokémon's DVs (IVs in later generations), remaining HP, and Level. Players often struggle to determine if a caught Scyther or Pinsir has a high enough score to beat the hidden NPC scores, leading to wasted time and frustration.

## Proposed Solution
Introduce a dedicated "Bug-Catching Contest Score Analyzer" in DexHelper. By parsing the user's Gen 2 save state, we can identify the Pokémon currently caught during an active contest (or the most recent one if stored).
1. **Precise Score Calculation**: Calculate the exact score by exposing the hidden DVs, Level, and HP data, matching the precise game logic.
2. **Win Probability**: Compare the calculated score against the static/randomized scores of NPC competitors (like Cooltrainer Nick) and provide a definitive "Win/Lose" prediction before the player decides to end the contest.
3. **Target Optimization**: Show the maximum possible score for the caught species, letting the player know if it's worth continuing the hunt for better DVs.

## Value Proposition
This feature perfectly aligns with DexHelper's goal of demystifying retro Pokémon games by making hidden, complex state transparent and actionable. It turns a frustrating grind for a Sun Stone into a deterministic, strategic process, offering utility not commonly found in generic save editors.

## Acceptance Criteria
- [ ] Product Manager: Draft a PRD defining the exact Gen 2 Bug-Catching score formula and the UI components for the Analyzer dashboard.

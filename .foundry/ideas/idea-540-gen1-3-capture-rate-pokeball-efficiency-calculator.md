---
id: idea-540-gen1-3-capture-rate-pokeball-efficiency-calculator
type: IDEA
title: Gen 1-3 Wild Capture Rate & Poké Ball Efficiency Calculator
status: PENDING
owner_persona: product_manager
created_at: '2026-10-23'
updated_at: '2026-10-23'
depends_on: []
jules_session_id: null
locks: []
pr_number: null
parent: null
priority: 50
confidence_score: null
tags:
  - dexhelper
  - catchRate
  - pokeball
  - calculator
  - gen1-3
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Idea: Gen 1-3 Wild Capture Rate & Poké Ball Efficiency Calculator

## Problem
In Generations 1, 2, and 3, wild Pokémon capture mechanics rely on intricate mathematical formulas involving species base catch rates, HP percentages, status conditions (Sleep/Freeze vs. Paralysis/Poison/Burn), and Poké Ball multiplier logic (e.g. Timer Ball turn counts, Net Ball type multipliers, Nest Ball level scaling, Repeat Ball caught-status checks, and Gen 2 Kurt's Apricorn Ball bugged multipliers like the Love Ball or Moon Ball).
When players encounter static legendaries (Mewtwo, Rayquaza, Regis, Birds, Beasts) or rare wild encounters, determining the optimal Poké Ball type to throw and the exact catch probability requires tedious manual calculations or third-party web tools. Furthermore, players often do not know if their inventory contains enough or the right Poké Balls to guarantee a capture before engaging in high-stakes encounters.

## Proposed Solution
Introduce a **Wild Capture Rate & Poké Ball Efficiency Calculator** in DexHelper that reads the player's active Bag inventory (Poké Balls, Great Balls, Ultra Balls, Specialty/Apricorn Balls) and active party status moves directly from the save file.
The calculator will:
1. Allow selecting any wild target Pokémon (or static encounter) and configuring target HP percentage and status condition (or auto-populating status move users from the player's active party).
2. Calculate exact per-throw catch percentages and expected number of Balls required for every Poké Ball type in the save file's inventory.
3. Factor in generation-specific formula quirks (e.g., Gen 2 Moon Ball bug where it only boosts catch rate on Burn Heal evolutions, Gen 3 Timer Ball turn progression, Repeat Ball Pokedex check).
4. Provide a "Capture Readiness Assessment" before major static legendary fights, warning the player if their current inventory is insufficient to achieve a 95%+ capture confidence threshold.

## Strategic Balance Rationale
In the previous session, `idea-539-save-data-reader-decorator-architecture.md` was proposed for the Foundry System architecture. To strictly maintain the required 50/50 balance between product features (DexHelper) and internal system improvements (Foundry), this session pivots back to a high-value, mechanics-surfacing product feature for DexHelper.

## Value
Provides immense value for completionists, shiny hunters, and legendary collectors across Gen 1-3 games. Integrates seamlessly with DexHelper's save file inventory parser and party parser, turning raw inventory numbers into actionable tactical combat intelligence.

## Acceptance Criteria
- [ ] Product Manager: Convert this idea into a PRD to detail the capture rate formulas, inventory integration logic, and UI requirements for the capture calculator.

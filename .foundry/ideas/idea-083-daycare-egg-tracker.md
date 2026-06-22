---
id: idea-083-daycare-egg-tracker
type: IDEA
title: Daycare Status and Exact Egg Hatch Tracker
status: ACTIVE
owner_persona: product_manager
created_at: '2026-06-17'
updated_at: '2026-06-21'
depends_on: []
jules_session_id: '13269419400781750433'
pr_number: null
parent: null
tags:
  - feature
  - gen2
  - gen3
  - breeding
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
---

# Idea: Daycare Status and Exact Egg Hatch Tracker

## Context

Breeding was introduced in Gen 2 and expanded heavily in Gen 3. Players frequently leave Pokémon in the Daycare, but the games offer no remote way to check if an Egg has been generated. Players must repeatedly travel to the Daycare Man to check. Once an Egg is obtained, hatching it requires a specific, often very large, number of steps (cycles). The game only provides incredibly vague text prompts (e.g., "It moves occasionally. It may be close to hatching") instead of the actual remaining step count, leading to tedious uncertainty.

## Proposal

Leverage DexHelper's offline-first programmatic save parsing to extract and display real-time Daycare and Egg data.
- **Daycare Status Dashboard:** Show the currently deposited Pokémon, their accumulated EXP/level gains, and crucially, surface the hidden "Egg is waiting" flag so players know exactly when to visit the Daycare without guessing.
- **Exact Egg Tracker:** For Eggs currently in the player's Party or PC, parse the remaining friendship/egg cycles byte and multiply it by the generation's cycle length to display the exact numerical step count remaining until the Egg hatches.

## Value Proposition

By surfacing these highly opaque, heavily utilized mechanics, DexHelper immediately solves a massive pain point for competitive breeders and completionists. Transforming vague in-game hints into exact, actionable data points perfectly aligns with the app's mission to be the ultimate premium companion tool for retro Pokémon.
- [ ] .foundry/prds/prd-083-053-daycare-egg-tracker.md

---
id: idea-066-time-capsule-validator
type: IDEA
title: Time Capsule Readiness Validator
status: COMPLETED
owner_persona: product_manager
created_at: '2025-05-24'
updated_at: '2026-06-14'
depends_on: []
jules_session_id: '15304367626111594182'
pr_number: null
parent: null
tags:
  - feature
  - gen2
  - trade
  - tool
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Time Capsule Readiness Validator

## Overview
Players frequently use the "Time Capsule" feature in Generation 2 (Gold, Silver, Crystal) to trade Pokémon back to Generation 1 (Red, Blue, Yellow) in order to complete their Pokédex, evolve certain Pokémon, or bypass version exclusives. However, the Time Capsule has strict restrictions: Gen 2 exclusive Pokémon and Gen 1 Pokémon with Gen 2 exclusive moves cannot be traded back. Players often discover this only at the trading desk, creating frustration.

## Problem
Currently, determining if a Generation 1 Pokémon in a Gen 2 save file is "Time Capsule Ready" is a manual process. The player must cross-reference their Pokémon's moveset against a list of Gen 2 exclusive moves, which is tedious and prone to error.

## Proposed Solution
Introduce a "Time Capsule Readiness Validator" feature in DexHelper.
By utilizing our programmatic access to the save file data, we can implement an automated check:
1.  **Validation Logic:** For every Gen 1 species in a Gen 2 save file, cross-reference its current four moves against the database of Gen 1 vs. Gen 2 moves.
2.  **UI Integration:** Add a visual indicator (e.g., an icon or a "Time Capsule Ready" tag) in the storage viewer for valid Pokémon.
3.  **Detailed View:** In the individual Pokémon stat view, explicitly highlight the specific move(s) preventing the trade, saving the player time diagnosing the issue.

This directly aligns with the app's goal of being a premium companion tool and bridges the gap in the offline-first environment by solving a known cross-generational friction point.

## Acceptance Criteria
- [x] Generated PRD: `.foundry/prds/prd-066-036-time-capsule-validator.md`
- [x] Generated Epic: `.foundry/archive/epics/epic-036-051-time-capsule-validation-logic.md`
- [x] Generated Epic: `.foundry/epics/epic-036-052-time-capsule-ui-indicators.md`

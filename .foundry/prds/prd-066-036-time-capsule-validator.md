---
id: prd-066-036-time-capsule-validator
type: PRD
title: Time Capsule Readiness Validator
status: PENDING
owner_persona: epic_planner
created_at: "2026-05-30"
updated_at: "2026-05-30"
depends_on: []
jules_session_id: null
pr_number: null
parent: idea-066-time-capsule-validator
tags:
  - feature
  - gen2
  - trade
  - tool
research_references: []
rejection_count: 0
rejection_reason: ""
notes: ""
---

# Time Capsule Readiness Validator

## Objective
Implement an automated validator to determine if a Generation 1 Pokémon located in a Generation 2 save file is eligible for the Time Capsule (i.e. can be traded back to Generation 1).

## Scope
- Validate that the Pokémon is a Generation 1 species.
- Cross-reference the Pokémon's current 4 moves against the database of Generation 2 exclusive moves (Generation 1 vs 2 moves).
- Provide visual indicators for valid/invalid Pokémon.

## Requirements
- **Logic Validation:** Create a utility to check species ID and move IDs.
- **UI Storage Indicator:** Display an icon or "Time Capsule Ready" tag in the storage view for eligible Pokémon.
- **Detailed UI View:** In the individual Pokémon stat view, explicitly highlight moves that are preventing the trade (Gen 2 exclusive moves).

## Non-Goals
- We are not modifying the save file or trading Pokémon. This is purely a UI readiness check.

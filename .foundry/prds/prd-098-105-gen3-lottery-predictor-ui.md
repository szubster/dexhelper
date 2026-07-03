---
id: prd-098-105-gen3-lottery-predictor-ui
type: PRD
title: Gen 3 Lottery Predictor UI
status: PENDING
owner_persona: epic_planner
created_at: '2026-07-03'
updated_at: '2026-07-03'
depends_on: []
jules_session_id: null
pr_number: null
parent: idea-098-gen3-pokemon-lottery-predictor
tags:
  - feature
  - gen3
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 3 Lottery Predictor UI

## Goal
Build the UI and matching logic for the Gen 3 Lottery Predictor, scanning PC boxes and the player's party against the daily winning number.

## Context
Once the winning lottery number is extracted from the save file, we need to match it against the Original Trainer (OT) IDs of Pokémon in the player's party or PC boxes. The goal is to display a quick indicator showing if the player has a winning ticket and which Pokémon they should bring to claim the prize.

## Requirements
- Develop a logic module to iterate through the player's party and PC boxes to compare OT IDs against the daily winning number.
- The matching logic should identify the best match (based on matching trailing digits).
- Design and implement a UI component (Dashboard widget or dedicated view) to display the lottery prediction.
- The UI should clearly indicate if there is a match, the prize tier, and the exact Pokémon (box/slot) to claim it.
- Ensure the UI adheres to the tactical hardware aesthetic (ADR 024 and ADR 008 style guidelines).

## Acceptance Criteria
- [ ] Break down into Epics

---
id: prd-066-100-save-state-history-diffing
type: PRD
title: Save State Diffing and Metadata Inference Engine
status: PENDING
owner_persona: epic_planner
created_at: '2026-07-01'
updated_at: '2026-07-01'
depends_on:
  - prd-066-099-save-state-history-storage
jules_session_id: null
pr_number: null
parent: idea-066-save-state-history
tags:
  - diffing
  - metadata
  - history
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# PRD: Save State Diffing and Metadata Inference Engine

## Overview
Once save states are stored sequentially, we need an engine to compare two states (State A and State B) and infer metadata that is missing from the raw save files (especially for Gen 1/2), such as "date caught" or inferred location.

## Requirements
- Must implement a diffing algorithm that compares the Pokémon collections between two sequential states.
- When a new Pokémon appears in State B that wasn't in State A, infer its "date caught" as the timestamp of State B's upload (or an interpolated time).
- Attempt to infer "location met" by analyzing the player's map coordinates and party changes between State A and State B.
- The diffing process should be performant and run locally in the browser.
- Inferred metadata must be structured and associated with the specific Pokémon instance in the app's view state.

## Acceptance Criteria
- [ ] Define the diffing algorithm logic.
- [ ] Implement Pokémon identification across states (how do we know it's the *same* Pokémon if it leveled up?).
- [ ] Implement metadata inference rules (date caught, location).
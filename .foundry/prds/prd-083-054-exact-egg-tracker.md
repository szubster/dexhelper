---
id: prd-083-054-exact-egg-tracker
type: PRD
title: Exact Egg Tracker
status: PENDING
owner_persona: architect
created_at: '2026-06-20'
updated_at: '2026-06-20'
depends_on: []
jules_session_id: null
pr_number: null
parent: idea-083-daycare-egg-tracker
tags:
  - feature
  - gen2
  - gen3
  - breeding
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# PRD: Exact Egg Tracker

## Objective
Convert the vague in-game hints regarding an Egg's hatch progress into exact, numerical step counts by extracting and parsing the relevant save data.

## Features & Requirements
1. **Target Population**: Identify and track all Eggs currently in the player's Party or PC storage.
2. **Cycle Extraction**: Parse the friendship/egg cycles remaining byte for each Egg.
3. **Step Calculation**: Multiply the remaining cycle count by the specific generation's cycle length (e.g., 256 steps) to calculate and display the exact numerical step count remaining until the Egg hatches.
4. **Integration**: Display this precise information within the Pokémon Details view or Storage grids when an Egg is selected, replacing or augmenting the standard flavor text.

## Acceptance Criteria
- [ ] Break down into Epics (e.g., Cycle Calculation/Parsing Epic, UI Update Epic).
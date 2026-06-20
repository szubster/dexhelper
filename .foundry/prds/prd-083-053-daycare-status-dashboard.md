---
id: prd-083-053-daycare-status-dashboard
type: PRD
title: Daycare Status Dashboard
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

# PRD: Daycare Status Dashboard

## Objective
Provide an offline-first, real-time dashboard displaying the status of the Pokémon Daycare based on the player's `.sav` file. This will eliminate the tedious in-game process of repeatedly visiting the Daycare to check for Eggs or accumulated EXP.

## Features & Requirements
1. **Deposited Pokémon Display**: Extract and display the Pokémon currently left in the Daycare slots. Show their species, level at time of deposit (if possible), and accumulated EXP/levels gained.
2. **Gen 2 & Gen 3 Support**: The dashboard must accurately parse and present daycare data for Generation 2 (GSC) and Generation 3 (RSE, FRLG) save files.
3. **Egg Waiting Indicator**: Specifically expose the hidden "Egg is waiting" flag from the save file so players know exactly when a new Egg is ready to be picked up.
4. **Integration**: The dashboard should be accessible from the main UI (e.g., as a new tab or section alongside Party/PC storage), maintaining the project's tactical hardware aesthetic (ADR 008, ADR 024).

## Acceptance Criteria
- [ ] Break down into Epics (e.g., Engine Parsing Epic, UI/Component Epic).
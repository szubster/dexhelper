---
id: prd-092-056-gen3-ev-training-dashboard
type: PRD
title: PRD - Gen 3 Effort Value (EV) Training Dashboard
status: COMPLETED
owner_persona: epic_planner
created_at: '2026-06-29'
updated_at: '2026-08-20'
depends_on: []
jules_session_id: null
parent: idea-092-gen3-ev-training-dashboard
tags:
  - gen3
  - save-engine
  - endgame
  - competitive
rejection_count: 0
rejection_reason: ''
notes: ''
---

# PRD - Gen 3 Effort Value (EV) Training Dashboard

## 1. Objective
Develop an EV Training Dashboard for Generation 3 games that surfaces the hidden Effort Values (EVs) of a player's Pokémon, calculating exact numerical distributions and remaining values up to the 510 cap, and suggesting optimal training routes.

## 2. Background
In Pokémon Generation 3, EVs are completely invisible to the player, making competitive training a tedious manual process relying on spreadsheets. DexHelper will extract this data from the save file, providing a direct, visual, and actionable dashboard.

## 3. Features & Requirements

### 3.1. Save Data Extraction
- **Requirement:** The save engine must accurately parse the 6 EV stats (HP, Attack, Defense, Sp. Atk, Sp. Def, Speed) for all Pokémon in the current party and PC boxes.
- **Requirement:** Data extraction must support all Generation 3 games (Ruby, Sapphire, Emerald, FireRed, LeafGreen).

### 3.2. EV Visualization Dashboard
- **Requirement:** Display the EV distribution for selected Pokémon using a radar chart and/or a detailed bar graph.
- **Requirement:** Show exact numerical values for each stat's EV out of the individual stat cap (255) and the total accumulated EVs out of the absolute maximum (510).
- **Requirement:** Display an "EVs Remaining" counter clearly indicating how many points are left to train.

### 3.3. Training Recommendations
- **Requirement:** Based on the Pokémon's current EVs and assumed goals (or common competitive builds), provide quick references to nearby routes or specific trainers that yield the desired EVs.

## 4. Non-Functional Requirements
- **Performance:** EV data parsing must be efficient and not delay the initial load of the dashboard.
- **UX:** The dashboard must adhere to the tactical hardware aesthetic (ADR 008, ADR 024) with monospaced fonts and sharp edges.

## 5. Acceptance Criteria
- [ ] Save engine successfully extracts EV data for party and PC Pokémon in Gen 3.
- [ ] The dashboard accurately visualizes the EV distribution and total remaining EVs.
- [ ] Training recommendations provide actionable route/trainer data for EV farming.
- [ ] UI components strictly follow the tactical aesthetic guidelines.
- [x] .foundry/epics/epic-092-116-gen3-ev-data-extraction.md
- [x] .foundry/epics/epic-092-117-gen3-ev-dashboard-ui.md
- [x] .foundry/epics/epic-092-118-gen3-ev-training-recommendations.md

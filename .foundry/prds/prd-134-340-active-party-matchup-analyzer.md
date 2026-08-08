---
id: prd-134-340-active-party-matchup-analyzer
type: PRD
title: Gen 1-3 Active Party Matchup Analyzer
status: PENDING
owner_persona: epic_planner
created_at: '2026-08-07'
updated_at: '2026-08-07'
depends_on: []
jules_session_id: null
pr_number: null
parent: idea-134-active-party-matchup-analyzer
tags:
  - feature
  - gen1
  - gen2
  - gen3
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# PRD: Gen 1-3 Active Party Matchup Analyzer

## Objective
To build an "Active Party Matchup Analyzer" view in DexHelper that assists retro gamers playing Gen 1-3. It will extract story progression event flags, determine upcoming boss encounters, simulate the player's active party against the boss team, and provide actionable roster optimization advice using the PC Box and TM inventory.

## Scope and Requirements
1. **Save File Extraction:**
   - The save parsing engine MUST read specific story event flags to track narrative progression and identify the immediate next major battle (Gym Leaders, Rivals, Evil Team Bosses).
   - Relevant team data (Active Party, PC Boxes, Bag/TM Inventory) must be concurrently extracted.
2. **Matchup Simulation Engine:**
   - The analyzer MUST calculate type effectiveness, stat advantages, and moveset coverage for the player's active party versus the static known data of the upcoming boss encounter.
3. **Recommendation Logic:**
   - If the active party matchup is determined to be poor, the system MUST scan the player's PC Box and TM inventory to find advantageous alternatives.
   - The system MUST generate plain-text, actionable advice (e.g., "Swap your Grass-type for the Level X Water-type in Box 2 before facing Flannery").
4. **UI Integration:**
   - A dedicated dashboard view MUST be built within DexHelper to display the analysis and recommendations clearly.
   - The UI MUST adhere to the project's tactical hardware aesthetic constraints (e.g., sharp edges, dashed borders, monospaced fonts).

## Out of Scope
- Real-time memory reading (this relies solely on save file data).
- Simulating individual turn-by-turn battles (focus is on team-level matchup viability).

## Acceptance Criteria
- [ ] epic-340-405-active-party-matchup-analyzer

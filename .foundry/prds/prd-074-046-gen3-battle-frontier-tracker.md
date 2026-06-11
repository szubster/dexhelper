---
id: prd-074-046-gen3-battle-frontier-tracker
type: PRD
title: Gen 3 Battle Frontier Dashboard
status: READY
owner_persona: epic_planner
created_at: '2026-06-11'
updated_at: '2026-06-11'
depends_on: []
jules_session_id: null
pr_number: null
parent: idea-074-gen3-battle-frontier-tracker
tags:
  - feature
  - gen3
  - endgame
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# PRD: Gen 3 Battle Frontier Dashboard

## Context
As outlined in `idea-074-gen3-battle-frontier-tracker`, players of Generation 3 (specifically Emerald) need a unified way to track their progress in the Battle Frontier. Checking the in-game Frontier Pass or visiting NPCs for all 7 facilities is tedious. DexHelper will leverage programmatic save parsing to aggregate win streaks, records, Battle Points (BP), and Frontier Symbols (Silver/Gold) into a single dashboard.

## Requirements

### 1. Data Extraction (Gen 3 Save Parsing)
- **Save Parser Integration**: Extend the Gen 3 save parser to extract Battle Frontier data.
- **Facilities**: Extract data for all 7 facilities:
  - Battle Tower
  - Battle Factory
  - Battle Arena
  - Battle Dome
  - Battle Palace
  - Battle Pike
  - Battle Pyramid
- **Data Points per Facility**:
  - Current win streak
  - Max (all-time) win streak record
  - Silver Symbol status (acquired or not)
  - Gold Symbol status (acquired or not)
- **Global Data**:
  - Current Battle Points (BP) total.
- **Data Constraints**: Ensure data is parsed correctly via `DataView` as per ADR 010 to prevent crashes on out-of-bounds reads. Identify the exact byte offsets in the Emerald save structure for this data. (A research node may be required for the offsets).

### 2. Dashboard UI
- **Unified Status View**: Create a new UI component (`BattleFrontierDashboard`) to display the data.
- **Facility Cards**: Display a card or row for each of the 7 facilities, clearly showing the current streak, max record, and symbol status.
- **BP Wallet**: Prominently display the player's total BP.
- **Progress Visuals**: Visually highlight progress towards the next Frontier Brain encounter. For example, if the Silver Symbol is acquired at a streak of 21, show a progress bar or text like "7 more wins until Silver Symbol".
- **Aesthetic**: The UI must adhere to the "tactical hardware/snooping" aesthetic (ADR 008, ADR 024) with sharp edges, dashed borders, and monospaced fonts (`tactical-panel`, `tactical-text`, etc.).

### 3. Data Integration
- Connect the extracted save data to the new Dashboard UI.
- Ensure the dashboard updates dynamically when a new save file is uploaded or synced (ADR 016).

## Acceptance Criteria
- [x] Epic Planner: Break down this PRD into Epics. Epics should cover Data Parsing (and potentially research for offsets), Dashboard UI creation, and Data Integration.
- [ ] research-046-140-gen3-battle-frontier
- [ ] epic-046-078-gen3-battle-frontier-data-extraction
- [ ] epic-046-079-gen3-battle-frontier-dashboard-ui
- [ ] epic-046-080-gen3-battle-frontier-data-integration

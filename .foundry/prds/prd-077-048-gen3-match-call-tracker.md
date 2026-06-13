---
id: prd-077-048-gen3-match-call-tracker
type: PRD
title: "PRD: Gen 3 PokéNav Match Call & Rematch Tracker"
status: PENDING
owner_persona: epic_planner
created_at: '2026-06-13'
updated_at: '2026-06-13'
depends_on: []
jules_session_id: null
pr_number: null
parent: idea-077-gen3-match-call-tracker
tags:
  - feature
  - gen3
  - tracking
  - endgame
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# PRD: Gen 3 PokéNav Match Call & Rematch Tracker

## Overview
This PRD outlines the requirements for implementing the "Rematch Dashboard" in DexHelper for Pokémon Emerald. The goal is to parse the PokéNav Match Call data from the `.sav` file and display an optimized, filterable list of trainers who are ready for a rematch, along with the specific EVs they yield and their current team compositions.

## Requirements

### Data Extraction
- **Memory Parsing:** The save parser must extract the Match Call block from the Pokémon Emerald `.sav` file.
- **Flag Resolution:** The parser must resolve the hidden "ready for rematch" flags for all 69 registered trainers in the PokéNav.
- **Current Tier:** The parser needs to identify which rematch tier (1 through 5) the trainer is currently at, to accurately determine their team and EV yields.

### Data Enrichment
- **Static Mapping:** A static JSON/MsgPack dataset mapping each of the 69 Match Call IDs to their trainer name, location (Route/Cave), and rematch tier data.
- **EV Calculation:** The system must pre-calculate or dynamically aggregate the total Effort Values (EVs) yielded by defeating the specific team at their current tier.

### User Interface
- **Rematch Dashboard:** A new tactical UI component that displays trainers currently ready for a rematch.
- **Filtering & Sorting:** Users must be able to filter the list by:
  - Specific EV yields (e.g., "Show me trainers yielding Speed EVs").
  - Location/Route.
- **Display Details:** Each trainer card/row must display their name, location, current tier, aggregate EV yield, and a summary of their Pokémon team.

## Non-Goals
- Real-time step counter tracking (the save file only provides the state at the time of saving, not continuous memory reading).
- Modifying the save file to force rematches (read-only application).

## Next Steps
- [ ] Epic Planner: Break this PRD down into Epics (e.g., Save Parsing Engine Updates, Static Data Generation, Dashboard UI).

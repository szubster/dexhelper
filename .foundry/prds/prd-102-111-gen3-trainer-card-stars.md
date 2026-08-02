---
id: prd-102-111-gen3-trainer-card-stars
type: PRD
title: PRD - Gen 3 Trainer Card Stars & Achievements Dashboard
status: READY
owner_persona: epic_planner
created_at: '2026-07-11'
updated_at: '2026-08-02'
depends_on: []
jules_session_id: null
pr_number: null
parent: idea-102-gen3-trainer-card-stars
tags:
  - feature
  - gen3
  - achievements
  - completionist
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# PRD: Gen 3 Trainer Card Stars & Achievements Dashboard

## Executive Summary
This PRD outlines the requirements for a unified "Trainer Card Stars" dashboard for Pokemon Emerald. The feature will aggregate critical endgame achievements into a single visual checklist, allowing completionist players to track their progress towards the ultimate 4-star Trainer Card without tedious in-game menu navigation.

## Problem Statement
In Generation 3, the Trainer Card upgrades its color and adds stars as players complete macro-goals. These are:
1. Entering the Hall of Fame (defeating the Elite Four)
2. Completing the Hoenn Pokédex
3. Completing the National Pokédex
4. Winning all Master Rank Contests
5. Earning all Gold Symbols in the Battle Frontier

Currently, DexHelper users must navigate separate UI sections (or in-game screens) to verify these disparate metrics. Centralizing them provides a satisfying high-level view of account completion.

## Requirements

### 1. Data Extraction (Save File Parsing)
The application must parse the Emerald save file to determine the status of the following goals:
- **Hall of Fame:** Extract the flag indicating the player has entered the Hall of Fame.
- **Hoenn Pokédex:** Check the number of unique Pokémon caught in the Hoenn dex (requires exactly 202, excluding Mythicals).
- **National Pokédex:** Check the number of unique Pokémon caught in the National dex (requires exactly 386).
- **Contest Master Ranks:** Check the completion flags/ribbons for all 5 Master Rank contests (Cool, Beauty, Cute, Smart, Tough).
- **Battle Frontier Gold Symbols:** Extract the flags for all 7 Gold Symbols (Tower, Dome, Palace, Arena, Factory, Pike, Pyramid).

*Note: Specific memory offsets and bit masks for these flags in Emerald will need to be identified during the technical implementation phase.*

### 2. Dashboard UI
Create a dedicated view (or a prominent section on the main Gen 3 dashboard) that displays:
- A visual representation of the Trainer Card (or a thematic checklist).
- The current number of stars earned.
- Detailed progress for each requirement:
    - Checkmarks for completed boolean goals (e.g., Hall of Fame).
    - Progress bars or fractional counters for granular goals (e.g., Hoenn Dex: 150/202, Contests: 3/5, Symbols: 4/7).
- Visual feedback (e.g., golden stars) when a goal is achieved.

## Out of Scope
- Support for Ruby/Sapphire/FireRed/LeafGreen in this initial iteration (focus solely on Emerald due to the Battle Frontier requirement).
- Real-time updates (the dashboard will update upon save file upload).

## Next Steps
- [x] Epic Planner: Break this PRD down into specific Epics (e.g., Data Parsing, UI Implementation).

## Acceptance Criteria
- [ ] epic-111-304-gen3-trainer-card-data-extraction
- [ ] epic-111-305-gen3-trainer-card-dashboard-ui

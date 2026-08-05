---
id: prd-113-114-gen3-pokeblock-stats-viewer
type: PRD
title: Gen 3 Pokéblock Exact Stats Viewer
status: PENDING
owner_persona: auditor
created_at: '2026-07-13'
updated_at: '2026-08-05'
depends_on: []
jules_session_id: null
pr_number: null
parent: idea-113-gen3-pokeblock-stats-viewer
tags:
  - gen3
  - contests
  - pokeblocks
  - quality-of-life
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
---

# Gen 3 Pokéblock Exact Stats Viewer

## Overview
In Generation 3 (Ruby, Sapphire, Emerald), Pokéblocks are created by blending Berries and are used to raise a Pokémon's Contest stats (Cool, Beauty, Cute, Smart, Tough). However, the in-game UI obfuscates the exact numerical values of the flavors and "feel" (smoothness) of the Pokéblocks stored in the player's Pokéblock Case. The game only shows a vague level and a primary flavor color.

## Goals
- Provide a detailed inventory dashboard that lists all Pokéblocks currently in the player's Pokéblock Case.
- Reveal the hidden, exact numerical values for all five flavors and the feel (smoothness) for each block.
- Enable players to calculate optimal feeding paths to maximize Contest stats for Ribbon Masters without manual tracking.

## Out of Scope
- Simulating the Berry Blender mini-game itself.
- Automating the feeding process or directly altering the save file data (read-only visualization).

## User Experience
1. **Pokéblock Case View:** The user navigates to a dedicated Pokéblock Dashboard.
2. **Detailed List:** The dashboard displays a list of all current Pokéblocks in their inventory.
3. **Exact Values:** For each Pokéblock, the UI displays the exact level for each flavor (Cool, Beauty, Cute, Smart, Tough) and the exact Feel value.
4. **Actionable Insights:** Players can use these exact numbers to plan their feeding strategy before hitting the maximum feel limit.

## Technical Architecture / Integration Points
- **Save State Parsing:** Leverage the save parsing engine to read the Pokéblock Case block from the Gen 3 save file and extract the flavor and feel byte values.
- **UI Components:** Create a new dashboard route and component for the Pokéblock Viewer, adhering to the tactical hardware aesthetic constraints (ADR 024, ADR 008).

## Acceptance Criteria
- [x] Create EPIC(s) for the backend data integration (parsing the Pokéblock Case).
- [x] Create EPIC(s) for the frontend dashboard UI and state management.
- [x] epic-114-400-gen3-pokeblock-case-parsing-retry
- [x] epic-114-401-gen3-pokeblock-dashboard-ui-retry

---
id: prd-111-113-safari-zone-tracker
type: PRD
title: Gen 1 & Gen 3 Safari Zone Tracking Dashboard
status: ACTIVE
owner_persona: epic_planner
created_at: '2026-07-12'
updated_at: '2026-07-14'
depends_on: []
jules_session_id: '7281935047639469302'
pr_number: null
parent: idea-111-safari-zone-tracker
tags:
  - feature
  - ui
  - safari-zone
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 1 & Gen 3 Safari Zone Tracking Dashboard

## Overview
The Safari Zone is a staple mechanic in Generation 1 (Kanto) and Generation 3 (Hoenn, Emerald expansion). It features rare, version-exclusive Pokémon with notoriously low catch rates spread across multiple distinct "Areas" within the zone. This feature introduces a dedicated "Safari Zone Tracking Dashboard" in DexHelper to provide a live, actionable map of the Safari Zone based on the user's specific game version and current save state.

## Goals
- Eliminate guesswork by visually highlighting the specific Safari Zone Area(s) where a user's targeted Pokémon spawns.
- Provide a "bounty board" by cross-referencing Safari Zone encounter tables with the player's current Pokédex and PC Boxes, showing missed or uncaught encounters.
- Support both Generation 1 and Generation 3 Safari Zone mechanics natively.

## Out of Scope
- Detailed simulation of catch rate mechanics or Safari Ball throwing algorithms.
- Tracking other mechanics outside the Safari Zone, except as they relate to general Pokédex completion.
- Automated pathfinding or step-counting (since this data is not persisted in a way that helps live tracking).

## User Experience
1. **Target Selection:** The user navigates to the Safari Zone dashboard and selects a target Pokémon from a dropdown (filtered to valid Safari encounters for their game version).
2. **Area Highlighting:** The dashboard updates a visual map (or distinct area cards) highlighting only the areas where the selected Pokémon spawns.
3. **Bounty Board:** A side panel displays all rare/notable Safari Zone encounters that are currently missing from the user's save file (not in party or PC boxes).

## Technical Architecture / Integration Points
- **Save State Parsing:** Leverage existing `PokeDB` and save parsing engine to determine game version and read Pokédex/PC data.
- **Encounter Tables:** Use the static encounter data (from `PokeAPI` or generated sources) to identify Safari Zone areas and spawn rates.
- **UI Components:** Create a new Safari Zone Dashboard route/component, integrating with existing tactical hardware aesthetics (`tactical-panel`, etc., from ADR 024).

## Acceptance Criteria
- [ ] epic-113-325-safari-zone-dashboard-ui
- [ ] epic-113-324-safari-zone-data-integration
- [x] Create EPIC(s) for the backend data integration (determining Safari Zone encounter lists per version).
- [x] Create EPIC(s) for the frontend dashboard UI and state management.

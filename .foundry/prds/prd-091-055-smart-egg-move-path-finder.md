---
id: prd-091-055-smart-egg-move-path-finder
type: PRD
title: Smart Egg Move Breeding Path Finder
status: PENDING
owner_persona: epic_planner
created_at: '2026-06-28'
updated_at: '2026-07-29'
depends_on: []
jules_session_id: null
pr_number: null
parent: idea-091-smart-egg-move-path-finder
tags:
  - feature
  - tool
  - mechanics
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# PRD: Smart Egg Move Breeding Path Finder

## Overview
Breeding for "Egg Moves" is a core mechanic for competitive battling and challenge runs in Gen 2 and Gen 3. The Smart Egg Move Breeding Path Finder will automate the process of calculating the shortest breeding chain across Egg Groups. It will leverage DexHelper's static database (Egg Groups, Egg Moves, learnsets) and combine it with the player's dynamic save state (PC boxes and party) to identify required intermediate parents that the player already owns.

## Goals
- Allow the user to select a target Pokémon and a desired Egg Move.
- Calculate the shortest valid breeding chain(s) to pass the Egg Move down.
- Cross-reference the calculated chain with the player's dynamic inventory.
- Highlight required "parents" that the player already owns (checking species and male gender).
- Identify the missing links the player needs to catch.

## Next Steps
- [x] Epic Planner: Break this PRD down into actionable EPICs.
- [ ] .foundry/epics/epic-055-113-egg-move-pathfinding-engine.md
- [ ] .foundry/epics/epic-055-114-egg-move-inventory-cross-reference.md
- [ ] .foundry/epics/epic-055-115-egg-move-pathfinder-ui.md

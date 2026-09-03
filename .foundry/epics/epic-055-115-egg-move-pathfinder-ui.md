---
id: epic-055-115-egg-move-pathfinder-ui
type: EPIC
title: Smart Egg Move Pathfinder UI
status: READY
owner_persona: story_owner
created_at: '2026-06-30'
updated_at: '2026-09-03'
depends_on:
  - epic-055-113-egg-move-pathfinding-engine
  - epic-055-114-egg-move-inventory-cross-reference
jules_session_id: null
pr_number: null
parent: prd-091-055-smart-egg-move-path-finder
tags:
  - feature
  - ui
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Epic: Smart Egg Move Pathfinder UI

## Overview
Develop the user interface for the Smart Egg Move Breeding Path Finder. The UI will allow users to select their target Pokémon and desired move, and it will visualize the calculated breeding chains, clearly indicating owned parents and missing links.

## Acceptance Criteria
- [ ] Create a selection interface for the target Pokémon species.
- [ ] Create a selection interface for the desired Egg Move, filtered by valid moves for the target.
- [ ] Render the calculated breeding chain(s) visually.
- [ ] Highlight required parents that the player already owns (based on inventory cross-reference).
- [ ] Explicitly list the "missing links" the player must acquire.
- [ ] Adhere to the tactical hardware aesthetic (ADR 008, 024).
- [x] Story Owner: Break this Epic down into actionable STORIES.
- [ ] story-115-526-pathfinder-selection-ui
- [ ] story-115-527-pathfinder-chain-visualization
- [ ] story-115-528-pathfinder-inventory-highlighting
- [ ] story-115-529-pathfinder-integration-e2e

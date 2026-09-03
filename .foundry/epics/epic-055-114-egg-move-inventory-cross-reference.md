---
id: epic-055-114-egg-move-inventory-cross-reference
type: EPIC
title: Egg Move Inventory Cross-Reference
status: COMPLETED
owner_persona: story_owner
created_at: '2026-06-30'
updated_at: '2026-09-03'
depends_on:
  - epic-055-113-egg-move-pathfinding-engine
jules_session_id: null
pr_number: null
parent: prd-091-055-smart-egg-move-path-finder
tags:
  - feature
  - mechanics
  - state
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Epic: Egg Move Inventory Cross-Reference

## Overview
Extend the pathfinding engine to interact with the player's dynamic save state. The system must cross-reference calculated breeding chains with the player's PC boxes and party to identify which required intermediate parents the player already owns.

## Acceptance Criteria
- [x] Integrate the pathfinding output with the save file inventory parser.
- [x] Implement logic to check if required intermediate species are present in the player's PC or party.
- [x] Ensure the gender check strictly requires a Male parent for passing down the move, according to Gen 2/3 mechanics.
- [x] Calculate the "missing links" (species the player needs to catch to complete the chain).
- [x] Story Owner: Break this Epic down into actionable STORIES.
- [x] story-114-412-egg-move-inventory-integration
- [x] story-114-413-egg-move-inventory-cross-reference-logic
- [x] story-114-414-egg-move-inventory-missing-links
- [x] story-114-415-egg-move-inventory-cross-reference-e2e

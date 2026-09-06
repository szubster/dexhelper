---
id: prd-155-524-trick-house-tracker
type: PRD
title: Gen 3 Trick House Tracker Dashboard PRD
status: ACTIVE
owner_persona: epic_planner
created_at: '2026-09-03'
updated_at: '2026-09-05'
depends_on: []
jules_session_id: '17008172474215663957'
pr_number: null
parent: idea-155-gen3-trick-house-tracker
tags:
  - dexhelper
  - feature
  - gen3
  - tracker
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 3 Trick House Tracker Dashboard PRD

## Context & Vision
The Trick House is a recurring side-quest in Generation 3 games (Ruby, Sapphire, Emerald) consisting of eight unique puzzles that unlock as the player earns Gym Badges. This PRD details the implementation of a "Trick House Tracker" component in DexHelper to parse the player's save file, extract the Trick House variables, and display a helpful dashboard.

## Requirements
1. **Save File Parsing:**
   - Extract `VAR_TRICK_HOUSE_LEVEL` (current puzzle level).
   - Extract puzzle state variables (`VAR_TRICK_HOUSE_PUZZLE_1_STATE` to `VAR_TRICK_HOUSE_PUZZLE_8_STATE`).
   - Extract `VAR_TRICK_HOUSE_PRIZE_PICKUP` (prize status).
   - Use the `DataView` API and the offsets defined in `.foundry/docs/knowledge_base/gen3_trick_house_offsets.md`.

2. **UI Layout & Dashboard:**
   - Display the current puzzle level and overall completion status.
   - Map puzzle levels to required HMs/items (e.g., Cut for Level 1, Rock Smash for Level 3, Strength for Level 4, Surf/Secret Power for subsequent levels).
   - Indicate if the player needs to pick up a prize from a previous completion.
   - Adhere to UI aesthetic constraints (tactical hardware, sharp edges, monospaced fonts).

## Acceptance Criteria
- [x] Epic Planner: Create an EPIC detailing the implementation of the Trick House Tracker, including save parsing logic and UI component development.
- [ ] epic-524-540-trick-house-tracker

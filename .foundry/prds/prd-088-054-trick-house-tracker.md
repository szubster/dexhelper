---
id: prd-088-054-trick-house-tracker
type: PRD
title: Gen 3 Trick House Progression Tracker
status: PENDING
owner_persona: epic_planner
created_at: '2026-06-28'
updated_at: '2026-06-28'
depends_on: []
jules_session_id: null
pr_number: null
parent: idea-088-trick-house-tracker
tags:
  - feature
  - gen3
  - mechanics
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# PRD: Gen 3 Trick House Progression Tracker

## 1. Context & Problem Statement
In Generation 3 (Ruby, Sapphire, Emerald), the Trick House on Route 110 is a multi-stage puzzle challenge that updates as the player earns more Gym Badges. There are 8 distinct puzzles. Players often forget their progress in the Trick House, missing out on unique rewards. We need a way to extract the current Trick House progression state from the save file and display it to the user.

## 2. Proposed Solution
Extract the Trick House puzzle state using DexHelper's save file parsing capabilities. Create a UI element (e.g., in the localized view for Route 110) that explicitly shows the current Trick House status and previews the associated reward.

## 3. Scope
- Investigate the exact save file offsets and bitflags used to track the Trick House puzzle state in Gen 3.
- Update the Gen 3 save parser to extract this data securely using the `DataView` API.
- Create a localized view component for Route 110 to display the progression and reward.

## 4. Acceptance Criteria
- [ ] Epic Planner: Break down this PRD into Epics for the Tracker Tracker, focusing on the data parsing logic and the frontend presentation logic.

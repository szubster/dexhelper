---
id: idea-154-gen3-trick-house-tracker
type: IDEA
title: Gen 3 Trick House Progress Tracker
status: READY
owner_persona: product_manager
created_at: '2026-08-16T00:42:52.000Z'
updated_at: '2026-08-16'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - dexhelper
  - feature
  - gen3
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Idea: Gen 3 Trick House Progress Tracker

## Context & Problem Statement
In Pokemon Ruby, Sapphire, and Emerald, the Trick Master's Trick House on Route 110 is a fan-favorite side activity. It consists of 8 distinct puzzles that sequentially unlock as the player earns Gym Badges. However, players often forget their progress—such as how many puzzles they have completed, whether a new puzzle is currently available based on their recent badge acquisition, or what the upcoming reward will be (like the valuable TM12 Taunt or the Red/Blue Tent).

## Proposed Idea
The Gen 3 Trick House Progress Tracker will be a new feature in DexHelper that helps players manage this side activity. The existing DexHelper save parsing logic already has rudimentary types for `gen3TrickHouse`. By fully extracting and interpreting these specific event flags and variables from the Gen 3 save file, DexHelper can:
1. **Track Completion:** Display exactly which of the 8 Trick House puzzles have been successfully cleared.
2. **Availability Notifications:** Compare the player's earned Gym Badges against their Trick House progression to notify them if a new puzzle is currently available to play.
3. **Reward Preview:** Show the reward for the upcoming puzzle, motivating players to revisit Route 110.

This turns a forgettable side-quest into an trackable, engaging checklist, directly enhancing the Gen 3 playthrough experience.

## Next Steps / Acceptance Criteria
- [x] Product Manager: Draft this IDEA node to initiate the feature request for the Gen 3 Trick House Progress Tracker.
- [ ] Product Manager: Convert this IDEA into a PRD detailing the specific save offsets and UI requirements.

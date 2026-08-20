---
id: story-114-414-egg-move-inventory-missing-links
type: STORY
title: Egg Move Inventory Missing Links
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-08-11'
updated_at: '2026-08-18'
depends_on:
  - story-114-413-egg-move-inventory-cross-reference-logic
jules_session_id: '18411988260561383391'
pr_number: null
parent: epic-055-114-egg-move-inventory-cross-reference
tags:
  - feature
  - mechanics
  - state
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Story: Egg Move Inventory Missing Links

## Overview
Building upon the cross-referencing logic, this story adds the calculation to identify "missing links." These are the specific Pokémon species required to complete a breeding chain that the player does not currently possess (or lacks a compatible male of). This provides actionable data to the user.

## Acceptance Criteria
- [ ] Implement calculation logic to generate a list of "missing link" species based on the cross-reference results.
- [ ] Structure the output to clearly differentiate between species completely absent and species where only a compatible gender (male) is missing.
- [ ] Write unit tests to verify the accurate calculation of missing links for complex multi-step chains.
- [x] Tech Lead: Draft TASK nodes to execute this story.
- [ ] task-414-440-egg-move-inventory-missing-links-impl
- [ ] task-414-441-egg-move-inventory-missing-links-qa

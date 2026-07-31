---
id: epic-054-270-gen3-ash-goal-planner
type: EPIC
title: "Epic: Gen 3 Volcanic Ash Goal Planner"
status: PENDING
owner_persona: story_owner
created_at: "2026-07-17"
updated_at: "2026-07-17"
depends_on:
  - "epic-054-269-gen3-ash-dashboard"
jules_session_id: null
pr_number: null
parent: prd-089-054-gen3-ash-gathering-tracker
tags:
  - ui
  - gen3
  - ash
  - planning
research_references: []
rejection_count: 0
rejection_reason: ""
notes: ""
---

# Epic: Gen 3 Volcanic Ash Goal Planner

## Objective
Implement a feature allowing the player to select a target item they wish to exchange ash for, tracking progress toward that goal based on current ash count.

## Technical Requirements
- Create a static mapping of Glass Workshop items and their required ash costs:
  - Blue Flute (250 steps)
  - Yellow Flute (500 steps)
  - Red Flute (500 steps)
  - White Flute (1000 steps)
  - Black Flute (1000 steps)
  - Pretty Chair (6000 steps)
  - Pretty Desk (8000 steps)
- Build UI to display a progress bar or remaining step count showing how much more ash is required to afford the selected target item.
- Ensure the new component reuses existing layout patterns and state management (Zustand) for consistency.
- Follow ADR 024 tactical hardware aesthetics.

## Acceptance Criteria
- [ ] Break down this Epic into corresponding STORY nodes.

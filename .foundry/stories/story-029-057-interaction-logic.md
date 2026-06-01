---
id: story-029-057-interaction-logic
type: STORY
title: 'Story: Interaction Logic (Headbutt/Rock Smash)'
status: COMPLETED
owner_persona: tech_lead
created_at: '2026-05-16'
updated_at: '2026-05-20'
depends_on:
  - story-029-054-gen2-strategy-plugin
jules_session_id: null
pr_number: null
parent: epic-017-029-strategy-engine-adaptations
tags:
  - gen2
  - expansion
  - suggestion-engine
research_references:
  - .foundry/docs/knowledge_base/development/gen2_implementation_plan.md
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Story: Interaction Logic (Headbutt/Rock Smash)

## Description
Handle Headbutt and Rock Smash encounters in the suggestion engine, cross-referencing them with the player's extracted inventory (TMs/HMs/Badges).

## Acceptance Criteria
- [x] The suggestion engine filters Headbutt encounters based on player inventory and badges.
- [x] The suggestion engine filters Rock Smash encounters based on player inventory and badges.
- [x] Tests verify the Headbutt and Rock Smash encounter logic.

### Tasks
- [.foundry/tasks/task-057-094-implement-headbutt-rocksmash-logic.md](.foundry/tasks/task-057-094-implement-headbutt-rocksmash-logic.md)
- [.foundry/tasks/task-057-095-qa-headbutt-rocksmash-logic.md](.foundry/tasks/task-057-095-qa-headbutt-rocksmash-logic.md)
- [.foundry/tasks/task-057-120-fix-headbutt-rocksmash-moves.md](.foundry/tasks/task-057-120-fix-headbutt-rocksmash-moves.md)
- [.foundry/tasks/task-057-121-qa-headbutt-rocksmash-moves.md](.foundry/tasks/task-057-121-qa-headbutt-rocksmash-moves.md)

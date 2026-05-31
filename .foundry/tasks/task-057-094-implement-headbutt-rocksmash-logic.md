---
id: task-057-094-implement-headbutt-rocksmash-logic
type: TASK
title: Implement Headbutt and Rock Smash Logic
status: COMPLETED
owner_persona: coder
created_at: '2026-05-17'
updated_at: '2026-05-18'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-029-057-interaction-logic
tags:
  - gen2
  - expansion
  - suggestion-engine
research_references:
  - gen2_implementation_plan
rejection_count: 1
rejection_reason: Merged with unfulfilled acceptance criteria
notes: ''
---

# Implement Headbutt and Rock Smash Logic

## Description
Implement the logic to handle Headbutt and Rock Smash encounters in the suggestion engine. The engine should correctly cross-reference these encounters with the player's extracted inventory (TMs/HMs/Badges).

## Technical Blueprint

1. **Update Suggestion Engine Logic**
   - Use the project's existing inventory extraction mechanisms to get the player's TMs, HMs, and Badges.
   - For `ENCOUNTER_METHOD.HEADBUTT` encounters, ensure the player has the required item (e.g., TM02 Headbutt) and badge (if applicable for field use).
   - For `ENCOUNTER_METHOD.ROCK_SMASH` encounters, ensure the player has the required item (e.g., TM08 Rock Smash) and badge (if applicable for field use).
   - Filter out or warn about these encounters if the prerequisites are not met.

2. **Integration tests**
   - Ensure you update or write tests to cover these checks.

## Acceptance Criteria
- [x] The suggestion engine filters Headbutt encounters based on player inventory and badges.
- [x] The suggestion engine filters Rock Smash encounters based on player inventory and badges.
- [x] Tests verify the Headbutt and Rock Smash encounter logic.

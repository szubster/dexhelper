---
id: task-057-121-qa-headbutt-rocksmash-moves
type: TASK
title: 'QA: Fix Headbutt and Rock Smash Move Checks'
status: COMPLETED
owner_persona: qa
created_at: '2026-05-19'
updated_at: '2026-05-19'
depends_on: []jules_session_id: null
pr_number: null
parent: story-029-057-interaction-logic
tags:
  - gen2
  - expansion
  - suggestion-engine
  - qa
research_references:
  - gen2_implementation_plan
rejection_count: 0
rejection_reason: ''
notes: ''
---

# QA: Fix Headbutt and Rock Smash Move Checks

## Description
Validate the implementation of the Headbutt and Rock Smash move check logic in the suggestion engine. This node verifies the work done in `task-057-120-fix-headbutt-rocksmash-moves`.

## Verification Steps
1. Verify the suggestion engine correctly identifies Headbutt capabilities based on Pokémon known moves (ID 29) or TM inventory, without requiring badges.
2. Verify the suggestion engine correctly identifies Rock Smash capabilities based on Pokémon known moves (ID 249) or TM inventory, without requiring badges.
3. Verify comprehensive unit test coverage exists for the new logic.
4. Execute `pnpm lint` and `pnpm test` to ensure overall project health.

## Acceptance Criteria
- [x] Code meets all architectural and quality guidelines.
- [x] Tests successfully pass and cover Headbutt and Rock Smash known-moves logic and lack of badge restrictions.
- [x] Linter reports zero warnings or errors.

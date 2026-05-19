---
id: task-057-095-qa-headbutt-rocksmash-logic
type: TASK
title: 'QA: Headbutt and Rock Smash Logic'
status: ACTIVE
owner_persona: qa
created_at: '2026-05-17'
updated_at: '2026-05-18'
depends_on:
  - .foundry/tasks/task-057-094-implement-headbutt-rocksmash-logic.md
jules_session_id: '1096538712376849777'
pr_number: null
parent: .foundry/stories/story-029-057-interaction-logic.md
tags:
  - gen2
  - expansion
  - suggestion-engine
  - qa
research_references:
  - .foundry/docs/shared_memory/development/gen2_implementation_plan.md
rejection_count: 1
rejection_reason: Merged with unfulfilled acceptance criteria
notes: ''
---

# QA: Headbutt and Rock Smash Logic

## Description
Validate the implementation of the Headbutt and Rock Smash logic in the suggestion engine. This node verifies the work done in `task-057-094-implement-headbutt-rocksmash-logic`.

## Verification Steps
1. Verify the suggestion engine correctly cross-references Headbutt encounters with the player's extracted inventory and badges.
2. Verify the suggestion engine correctly cross-references Rock Smash encounters with the player's extracted inventory and badges.
3. Verify comprehensive unit test coverage exists for the new logic.
4. Execute `pnpm lint` and `pnpm test` to ensure overall project health.

## Acceptance Criteria
- [ ] Code meets all architectural and quality guidelines.
- [ ] Tests successfully pass and cover Headbutt and Rock Smash logic.
- [ ] Linter reports zero warnings or errors.

### Tech Lead Notes (2026-05-18)
The QA task failed due to "Merged with unfulfilled acceptance criteria". The implementation for Headbutt and Rock Smash logic already exists in `src/engine/assistant/suggestionEngine.ts`, but no tests were found. Please author the missing test coverage in the `tests/` directory to fulfill your QA contract. Ensure you explicitly check off your acceptance criteria boxes before submitting your PR to satisfy ADR 007 and ADR 009.

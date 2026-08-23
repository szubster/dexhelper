---
id: task-423-469-gen3-lottery-state-impl
type: TASK
title: Gen3 Lottery UI State Layer Implementation
status: READY
owner_persona: coder
created_at: '2026-08-22'
updated_at: '2026-08-22'
depends_on:
  - task-273-307-gen3-lottery-matching-iteration-impl
  - task-422-435-gen3-lottery-extraction-impl
jules_session_id: null
pr_number: null
parent: story-133-423-gen3-lottery-ui-integration
tags:
  - feature
  - gen3
  - ui
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen3 Lottery UI State Layer Implementation

## Goal
Implement a React Context or similar state layer to hold and expose the daily lottery number, the best matching Pokémon, and the corresponding prize tier.

## Context
The logic to extract the daily lottery winning number and to compare it against the Party and PC Box Pokémon is already implemented (`task-422-435-gen3-lottery-extraction-impl`, `task-273-307-gen3-lottery-matching-iteration-impl`). This task bridges the core logic to the UI layer.

## Requirements
- Define a state layer (e.g., React Context) that encapsulates the lottery state.
- Expose the daily winning number.
- Expose the best matching Pokémon (if any).
- Expose the calculated prize tier based on the matching logic.

## Acceptance Criteria
- [ ] Implement the React state layer for the lottery.
- [ ] Write component tests using `vitest-browser-react` to ensure state is correctly initialized and exposed.

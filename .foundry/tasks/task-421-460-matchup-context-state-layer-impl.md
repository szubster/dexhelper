---
id: task-421-460-matchup-context-state-layer-impl
type: TASK
title: Implement MatchupContext State Layer
status: READY
owner_persona: coder
created_at: '2026-08-21'
updated_at: '2026-08-21'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-411-421-active-party-extraction
tags:
  - state-management
  - context
  - react
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement MatchupContext State Layer

## Objective
Establish the `MatchupContext` in React to manage the state for the Active Party Matchup Analyzer, fulfilling architectural requirements for shared state.

## Requirements
- Define a React Context (`MatchupContext`) that will provide:
  - The player's active party state (`partyDetails` from the parsed `SaveData`).
  - The ID or identifier of the upcoming major boss (derived from narrative flags).
  - Actions/dispatch methods to update these state values.
- Adhere strictly to the project's state management patterns (as guided by ADRs).
- Create a robust provider component (`MatchupProvider`).
- Expose a custom hook (`useMatchup`) for consuming the context.

## Acceptance Criteria
- [ ] Implement `MatchupContext`, `MatchupProvider`, and `useMatchup`.
- [ ] Ensure the context structure supports storing `partyDetails` and upcoming boss identifiers.
- [ ] Add unit tests using `vitest-browser-react` validating state initialization and dispatch actions.

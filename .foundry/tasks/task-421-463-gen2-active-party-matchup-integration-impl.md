---
id: task-421-463-gen2-active-party-matchup-integration-impl
type: TASK
title: Integrate Gen 2 Active Party into MatchupContext
status: ACTIVE
owner_persona: coder
created_at: '2026-08-21'
updated_at: '2026-08-30'
depends_on:
  - task-421-460-matchup-context-state-layer-impl
jules_session_id: '7599846670998537319'
pr_number: null
parent: story-411-421-active-party-extraction
tags:
  - gen2
  - integration
  - react
rejection_count: 2
rejection_reason: ''
notes: ''
---

# Integrate Gen 2 Active Party into MatchupContext

## Objective
Hook the parsed Gen 2 save data output into the `MatchupContext` so that the Active Party Matchup Analyzer can process Gen 2 rosters.

## Requirements
- Map `SaveData.partyDetails` from a successfully parsed Gen 2 save (`parseGen2`) into the `MatchupContext` state.
- Ensure the integration handles cases where the party is empty or partially filled.
- Write unit tests verifying that uploading or providing a Gen 2 save updates the context appropriately.

## Acceptance Criteria
- [x] Gen 2 save data correctly populates the `MatchupContext` party state.
- [x] Unit tests pass for the integration using `vitest-browser-react`.

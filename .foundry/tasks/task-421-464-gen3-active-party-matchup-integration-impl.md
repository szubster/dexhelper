---
id: task-421-464-gen3-active-party-matchup-integration-impl
type: TASK
title: Integrate Gen 3 Active Party into MatchupContext
status: ACTIVE
owner_persona: coder
created_at: '2026-08-21'
updated_at: '2026-08-30'
depends_on:
  - task-421-460-matchup-context-state-layer-impl
jules_session_id: '6001284076015774702'
pr_number: null
parent: story-411-421-active-party-extraction
tags:
  - gen3
  - integration
  - react
rejection_count: 2
rejection_reason: ''
notes: ''
---

# Integrate Gen 3 Active Party into MatchupContext

## Objective
Hook the parsed Gen 3 save data output into the `MatchupContext` so that the Active Party Matchup Analyzer can process Gen 3 rosters.

## Requirements
- Map `SaveData.partyDetails` from a successfully parsed Gen 3 save (`parseGen3`) into the `MatchupContext` state.
- Ensure the integration handles cases where the party is empty or partially filled.
- Write unit tests verifying that uploading or providing a Gen 3 save updates the context appropriately.

## Acceptance Criteria
- [ ] Gen 3 save data correctly populates the `MatchupContext` party state.
- [ ] Unit tests pass for the integration using `vitest-browser-react`.

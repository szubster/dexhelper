---
id: research-071-006-investigate-checklist-retry-failure
type: RESEARCH
title: Investigate Visited Routes Checklist Retry Failure
status: COMPLETED
owner_persona: researcher
created_at: '2026-05-28'
updated_at: '2026-06-03'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-034-071-run-dashboard-ui
tags:
  - feature
  - nuzlocke
  - verification
rejection_count: 0
rejection_reason: ''
notes: ''
---

# RESEARCH: Investigate Visited Routes Checklist Retry Failure

## Description
The implementation task `task-071-140-visited-routes-checklist-retry-impl` permanently failed. This research node is spawned to investigate the root cause of this failure and outline the correct path forward.

## Acceptance Criteria
- [x] Investigate why the Visited Routes Checklist Retry task failed.
- [x] Document the required fixes and provide a clear implementation strategy.

## Findings
The previous retry task (`task-071-140-visited-routes-checklist-retry-impl`) was failed by the orchestrator with the reason `Merged with unfulfilled acceptance criteria`. This occurred because the coder agent submitted an empty PR to advance the node, but failed to check off the `- [ ]` checkboxes in the task's markdown body. This violates the completion rules defined in ADR 007 and ADR 009.

While the core `VisitedRoutesChecklist` and `AliveTeamView` components exist in `src/components/run/`, they are currently unreachable because the parent Run Dashboard view (`src/routes/run.tsx`) and its navigation have not been implemented.

## Implementation Strategy
To successfully complete the retry implementation:
1. **Create the Dashboard Route**: Implement `src/routes/run.tsx`. It should lazy load a Dashboard component that fetches required data.
2. **Retrieve Data**: Access the player's parsed save data from the global store (`src/store`).
3. **Assemble the Dashboard**:
   - Extract the active team array from the save data and pass it to the `team` prop of `AliveTeamView` along with the generation.
   - Use `aggregateEncountersByLocation(saveData)` from `src/engine/nuzlocke/tracker.ts` to compute visited routes.
   - Fetch all possible game locations using `getAllAreas()` from `src/db/PokeDB.ts`.
   - Calculate unvisited routes by finding the difference between all possible locations and the visited routes.
   - Pass both lists to `VisitedRoutesChecklist`.
4. **Update Navigation**: Add a link to the `/run` dashboard in `src/components/BottomNav.tsx` and `src/components/AppHeader.tsx`.
5. **Check the Boxes**: The implementer **must** physically check off all `- [ ]` acceptance criteria boxes in the task node (`task-071-144-visited-routes-checklist-retry-v2-impl.md`) before submitting the PR.

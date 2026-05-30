---
id: research-071-005-investigate-visited-routes-checklist
type: RESEARCH
title: Investigate Visited Routes Checklist Integration Failure
status: COMPLETED
owner_persona: researcher
created_at: '2026-05-24'
updated_at: '2026-05-28'
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

# RESEARCH: Investigate Visited Routes Checklist Integration Failure

## Description
The implementation task `task-071-136-visited-routes-checklist-impl` was failed permanently because the component was implemented but never rendered or integrated anywhere in the app (e.g. no Run Dashboard exists to show it). This research node is spawned to investigate the root cause of this failure and outline the correct integration path.

## Acceptance Criteria
- [x] Investigate why the Visited Routes Checklist component was not integrated into the Run Dashboard UI.
- [x] Document the required integration points.


## Findings
The `VisitedRoutesChecklist` and `AliveTeamView` components were implemented as specified in their respective tasks, but the encompassing Run Dashboard UI page itself was never created. There is no route in `src/routes/` for the dashboard, and no navigation links to it exist in `AppHeader.tsx` or `BottomNav.tsx`.

## Integration Points Required
To fully integrate the Nuzlocke Run Dashboard components (`AliveTeamView`, `VisitedRoutesChecklist`, and the future Graveyard view), the following steps are required:
1. **Create Dashboard Route**: Create a new route file `src/routes/run.tsx` for the dashboard page. Regenerate route tree using `npx @tanstack/router-cli generate`.
2. **Dashboard Data Hooks**: In the dashboard component, retrieve the parsed `saveData` from the store.
3. **Assemble Views**:
   - Pass the current `aliveTeam` (from `saveData.party`) to the `AliveTeamView`.
   - Use the `aggregateEncountersByLocation` from `src/engine/nuzlocke/tracker.ts` to calculate visited routes data.
   - For unvisited routes, calculate the difference between the full list of possible routes for the current game generation and the visited routes. Pass these to the `VisitedRoutesChecklist`.
4. **Navigation Integration**: Update `src/components/AppHeader.tsx` and `src/components/BottomNav.tsx` to include a navigation link to `/run` for users to access the dashboard.

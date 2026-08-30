---
id: research-356-494-pokegear-predictor-e2e-failure
type: RESEARCH
title: Investigate Pokegear Predictor E2E Failure Root Cause
status: ACTIVE
owner_persona: researcher
created_at: '2026-08-26'
updated_at: '2026-08-30'
depends_on: []
jules_session_id: '17932452002192293717'
pr_number: null
parent: story-117-356-pokegear-predictor-e2e
tags:
  - e2e
  - gen2
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---
# Research: Investigate Pokegear Predictor E2E Failure Root Cause

## Objective
Investigate the root cause of the permanent failures in the previous iteration of the Pokegear Predictor E2E implementation tasks. Determine what integration logic or application states blocked successful testing.

## Tasks
- Review the test outputs and journals from `task-356-396-pokegear-predictor-e2e-impl`.
- Investigate why the dashboard integration research task was cancelled and whether the `ActiveCallersDashboard` is accessible.
- Define a reliable approach to mocking or seeding Gen 2 phone call data for E2E purposes.

# Findings
The failure in the previous iteration of the Pokegear Predictor E2E implementation tasks is due to missing integration between the save parsing layer, the global application state, and the Dashboard UI.

1. **Save Parsing Not Integrated:**
   The `parseGen2PokegearData` function inside `src/engine/saveParser/parsers/gen2/phone/parser.ts` extracts `PokegearPhoneData`, but this function is *never called* from `parseGen2` inside `src/engine/saveParser/parsers/gen2.ts`. As a result, the parsed `Gen2SaveData` does not include phone data.

2. **Schema Definition Missing:**
   The `Gen2SaveData` type in `src/engine/saveParser/parsers/common.ts` does not have a property to hold the Pokegear phone data (e.g., `gen2PhoneData`).

3. **Dashboard Integration Missing:**
   The `ActiveCallersDashboard` component exists (`src/components/dashboard/pokegear/ActiveCallersDashboard.tsx`) but is not mounted in `src/routes/dashboard.tsx`. There's no path to access `contacts` and `timerState` from the global store and pass them to `ActiveCallersDashboard`.

To fix this, we need to:
1. Update `Gen2SaveData` in `common.ts` to include `gen2PhoneData?: PokegearPhoneData;` (import `PokegearPhoneData` from `gen2/phone/parser`).
2. Update `parseGen2` in `gen2.ts` to call `parseGen2PokegearData` and add the result to the returned `Gen2SaveData`.
3. Update `dashboard.tsx` to import `ActiveCallersDashboard`, extract `gen2PhoneData` from `saveData`, map `highValueContacts` to `contacts` and compute a mock/default `timerState` (e.g., `{ delayMinsRemaining: 0, timeCyclesSinceLastCall: 5 }`), then render `ActiveCallersDashboard` when Gen 2 saves are active.

These findings answer the questions posed in the cancelled research task `research-396-470-pokegear-dashboard-integration` and define the path forward for the E2E implementation.

## Acceptance Criteria
- [x] Determine root cause of the previous failure

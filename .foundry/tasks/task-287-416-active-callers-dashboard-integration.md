---
id: task-287-416-active-callers-dashboard-integration
type: TASK
title: Integrate Tactical Caller Card into Dashboard
status: COMPLETED
owner_persona: coder
created_at: '2026-08-10'
updated_at: '2026-08-18'
depends_on:
  - task-287-415-tactical-caller-component-impl
jules_session_id: null
pr_number: null
parent: story-118-287-highlight-high-value-calls-ui
tags:
  - feature
  - gen2
  - ui
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
---

# Task: Integrate Tactical Caller Card into Dashboard

## Objective
Integrate the `TacticalCallerCard` component into the `ActiveCallersDashboard`, utilizing the `GEN2_PHONE_CALLER_REGISTRY` to determine and pass the high-value status of each caller.

## Context
With the reusable `TacticalCallerCard` component created, it now needs to be wired up to the `ActiveCallersDashboard`. The dashboard receives a list of raw `Contact` objects. It must look up each contact in the `GEN2_PHONE_CALLER_REGISTRY` to determine if they are a high-value caller (SWARM or ITEM) and pass that data down to the card component so it renders the correct tactical highlighting.

## Acceptance Criteria
- [x] In `src/components/dashboard/pokegear/ActiveCallersDashboard.tsx`, import `GEN2_PHONE_CALLER_REGISTRY` from `src/engine/saveParser/parsers/gen2/phone/constants.ts`.
- [x] Refactor the caller list rendering in `ActiveCallersDashboard` to use the newly created `TacticalCallerCard` component instead of inline markup.
- [x] For each contact, lookup their ID in `GEN2_PHONE_CALLER_REGISTRY`. If an entry exists, pass the high-value data (`CallerType` and `details`) to the `TacticalCallerCard`.
- [x] Update `src/components/dashboard/pokegear/__tests__/ActiveCallersDashboard.test.tsx` to include known high-value contacts (e.g., Ralph or Beverly) in the mock data.
- [x] Assert in the tests that the dashboard correctly renders the high-value badges (e.g., SWARM, ITEM) for those specific mock contacts, confirming the integration is successful.

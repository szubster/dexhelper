---
id: task-415-422-bike-requirement-e2e-impl
type: TASK
title: E2E Verification for Bike Requirement Route Mapping - Implementation
status: READY
owner_persona: coder
parent: story-406-415-bike-requirement-e2e
depends_on: []
created_at: '2026-08-13'
rejection_count: 0
rejection_reason: ''
jules_session_id: null
updated_at: '2026-08-20'
---

# E2E Verification for Bike Requirement Route Mapping - Implementation

## Context
We need to ensure that the bike requirement filtering on the Smart Route Radar and the UI badges on the interactive map are functioning correctly together using end-to-end integration tests using Playwright.

## Proposal
Implement an E2E test suite in `tests/e2e/bike_requirement.spec.ts` using Playwright.
The tests should load Gen 3 mock data (representing maps with Acro and Mach bike requirements), navigate to the map UI, verify that `hoenn-safari-zone-nwmach-bike-area` and `hoenn-safari-zone-neacro-bike-area` are displayed correctly based on the mock data, and confirm the heatmap data integration. Use the `initializeWithSave` utility to set up the test state and ensure the open: 'never' reporter config in Playwright is adhered to.

## Acceptance Criteria
- [ ] Create `tests/e2e/bike_requirement.spec.ts`.
- [ ] E2E tests successfully load Gen 3 save state via `initializeWithSave`.
- [ ] E2E tests verify the presence of Mach and Acro bike area nodes/badges on the UI.
- [ ] Playwright E2E tests pass headlessly (`xvfb-run -a pnpm test:e2e tests/e2e/bike_requirement.spec.ts`).

---
id: task-333-346-rng-tid-sid-integration-impl
type: TASK
title: Integrate RNG TID/SID Display (Retry)
status: READY
owner_persona: coder
created_at: '2026-07-24'
updated_at: '2026-07-24'
depends_on: []
jules_session_id: '4246900547288579748'
pr_number: null
parent: story-130-333-rng-tid-sid-integration-retry
tags:
  - rng
  - ui
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Integrate RNG TID/SID Display (Retry)

## Objective
Integrate the `RngTidSidDisplay` component into the `TelemetryMatrix` component.

## Context
A previous attempt to integrate the `RngTidSidDisplay` component failed because it was built but never imported or rendered in the application's view hierarchy. The research `research-130-332-rng-tid-sid-integration-failure` recommends integrating it into `src/components/header/TelemetryMatrix.tsx`.

## Blueprint
1. In `src/components/header/TelemetryMatrix.tsx`, import `RngTidSidDisplay` from `../RngTidSidDisplay`.
2. Render `<RngTidSidDisplay tid={saveData.trainerId} sid={saveData.secretId} />` within the `TelemetryMatrix` component, preferably alongside or in place of the current `ID` display.
3. Ensure no linting errors are introduced.

## Acceptance Criteria
- [ ] `RngTidSidDisplay` is imported and used in `TelemetryMatrix.tsx`.
- [ ] The `tid` and `sid` props are correctly populated from `saveData`.
- [ ] UI tests pass.

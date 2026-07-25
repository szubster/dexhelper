---
id: task-137-210-global-ribbon-dashboard-scaffold-qa
type: TASK
title: QA Global Ribbon Checklist Dashboard Scaffold
status: ACTIVE
owner_persona: qa
created_at: '2026-06-19'
updated_at: '2026-07-21'
depends_on: []
jules_session_id: '10226037099837483663'
pr_number: null
parent: story-066-137-global-ribbon-dashboard-scaffold
tags:
  - feature
  - gen3
  - contests
  - ui
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---
# TASK: QA Global Ribbon Checklist Dashboard Scaffold

## Background
The coder has implemented the `GlobalRibbonChecklistDashboard` component for viewing aggregate Ribbon data. This needs to be thoroughly verified.

## Goals
1. Verify the `GlobalRibbonChecklistDashboard` component functions as designed.
2. Ensure data from the Living Dex / PC Box is correctly aggregated and displayed.

## Acceptance Criteria
- [x] Verify `GlobalRibbonChecklistDashboard` accurately displays data from the PC/Living Dex.
- [x] Verify basic ribbon display components render correctly for the aggregated data.
- [x] Verify performance constraints (handling large datasets like hundreds of Pokémon).
- [x] Run and verify E2E tests for the new dashboard component.

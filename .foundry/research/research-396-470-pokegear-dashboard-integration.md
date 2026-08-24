---
id: research-396-470-pokegear-dashboard-integration
type: RESEARCH
title: Investigate Pokegear Dashboard Integration
status: READY
owner_persona: researcher
created_at: '2026-08-24'
updated_at: '2026-08-24'
depends_on: []
jules_session_id: null
pr_number: null
parent: task-356-396-pokegear-predictor-e2e-impl
tags:
  - integration
  - gen2
  - ui
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---
# Research: Investigate Pokegear Dashboard Integration

## Objective
Investigate how `ActiveCallersDashboard` should be integrated into `src/routes/dashboard.tsx` and how its required `contacts` and `timerState` props should be populated from Gen 2 save data.

## Context
During E2E test implementation for the Pokegear Predictor (`task-356-396-pokegear-predictor-e2e-impl`), it was discovered that the `ActiveCallersDashboard` component is missing from `src/routes/dashboard.tsx` under the Gen 2 UI section. Furthermore, this component requires `contacts` and `timerState` props, which means a data extraction and mapping layer (likely from `Gen2SaveData` or a custom wrapper) is required before rendering it. The integration task (`story-116-285-integrate-registered-numbers-ui`) might have been missed or failed.

## Questions to Answer
1. How should the `ActiveCallersDashboard` be mounted in `src/routes/dashboard.tsx`? Does it require an intermediate wrapper component?
2. Where in the save file parsing layer (`src/engine/saveParser/parsers/gen2.ts`) is the Pokegear caller data (`PokegearPhoneData`) mapped to `SaveData`? If it isn't, how should it be added to the unified `SaveData` schema?
3. What is the path to access `contacts` and `timerState` from the global application state so it can be passed to the dashboard?

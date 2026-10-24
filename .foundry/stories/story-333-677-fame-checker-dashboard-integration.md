---
id: story-333-677-fame-checker-dashboard-integration
type: STORY
title: Fame Checker Dashboard Integration
status: PENDING
owner_persona: tech_lead
created_at: '2026-10-15T19:32:39.601Z'
updated_at: '2026-10-19'
depends_on:
  - story-333-676-fame-checker-dashboard-components
jules_session_id: null
pr_number: null
parent: epic-115-333-gen3-fame-checker-dashboard-ui
tags:
  - gen3
  - fame-checker
  - ui
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Fame Checker Dashboard Integration

## Context
With the presentational components built, we need to integrate them with the application's actual state and routing layer. The parsed Fame Checker data must be extracted from the save file state and fed into the dashboard.

## Objectives
- Integrate the Fame Checker dashboard components with the global save data state.
- Create mapping logic to group the parsed boolean flags into structured data by NPC.
- Add the necessary routing so players can navigate to the Fame Checker dashboard.

## Scope
- Write data selectors or hooks to retrieve Fame Checker progress.
- Connect the dashboard to the main UI routing.

## Acceptance Criteria
- [ ] Dashboard is accessible via routing and displays real save file data.

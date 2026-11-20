---
id: story-333-677-fame-checker-dashboard-integration
type: STORY
title: Fame Checker Dashboard Integration
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-10-15T19:32:39.601Z'
updated_at: '2026-11-09'
depends_on:
  - story-333-676-fame-checker-dashboard-components
jules_session_id: '9498707407616392245'
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
- [ ] task-677-747-fame-checker-mapping-logic
- [ ] task-677-748-qa-fame-checker-mapping-logic
- [ ] task-677-749-fame-checker-state-hooks
- [ ] task-677-750-qa-fame-checker-state-hooks
- [ ] task-677-751-fame-checker-routing-integration
- [ ] task-677-752-qa-fame-checker-routing-integration
- [ ] task-677-753-fame-checker-e2e-tests
- [ ] task-677-754-qa-fame-checker-e2e-tests

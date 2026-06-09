---
id: story-048-088-create-route-radar-controller
type: STORY
title: Create RouteRadarController Structure
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-05-31'
updated_at: '2026-06-08'
depends_on:
  - task-035-142-smart-radar-adr
jules_session_id: '10476264137182746724'
pr_number: null
parent: epic-035-048-smart-radar-data-unification
tags:
  - feature
  - ux
  - map
  - data
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Story: Create RouteRadarController Structure

## Context
As defined in Epic `epic-035-048-smart-radar-data-unification` and ADR `018-smart-route-radar`, we need to implement the base structure for the `RouteRadarController`. This controller is responsible for bridging the dynamic `suggestionEngine` output with the static map UI components.

## Scope
Scaffold the `RouteRadarController` module. It should act as the central dispatcher, taking the dynamic save state from the orchestrator and the output of the `suggestionEngine`, and structuring it in a way that the React map components can easily consume it.

## Acceptance Criteria
- [ ] Create `RouteRadarController` in the appropriate directory (e.g., `src/engine/radar/` or similar).
- [ ] Define the interface for its input (the raw suggestion engine output) and its expected heatmap data output.
- [ ] Write unit tests to verify instantiation and basic method structures.

## Generated Tasks
- [ ] .foundry/tasks/task-088-146-scaffold-route-radar-controller.md
- [ ] .foundry/tasks/task-088-147-qa-route-radar-controller.md

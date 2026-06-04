---
id: task-088-146-scaffold-route-radar-controller
type: TASK
title: Scaffold RouteRadarController
status: READY
owner_persona: coder
created_at: '2026-06-02'
updated_at: '2026-06-04'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-048-088-create-route-radar-controller
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

# Scaffold RouteRadarController

## Context
As defined in `story-048-088-create-route-radar-controller` and ADR `018-smart-route-radar`, we need to implement the base structure for the `RouteRadarController`. This controller bridges the dynamic `suggestionEngine` output with the static map UI components.

## Technical Contract
You must scaffold the `RouteRadarController` module. It acts as the central dispatcher, taking the dynamic save state from the orchestrator and the output of the `suggestionEngine`, and structuring it in a way that the React map components can easily consume.

1.  **Directory Creation:** Create the module in `src/engine/radar/RouteRadarController.ts`.
2.  **Interface Definitions:**
    *   Define the interface for its input (the raw suggestion engine output). Note that we are using the new readable property names schema defined in ADR 015 (`name`, `areaId`, etc.).
    *   Define the expected output interface (heatmap data, e.g., mapping `areaId` to a density score).
3.  **Basic Scaffold:** Implement the basic class or function structure for `RouteRadarController` with empty or throw-not-implemented methods for calculating the heatmap data.
4.  **Testing:** Write unit tests in `src/engine/radar/__tests__/RouteRadarController.test.ts` to verify instantiation and that the interfaces are properly exported and structure is sound.

## REMINDER TO CODER:
- If you abort or permanently fail this task, you MUST update the YAML frontmatter to `status: FAILED` or `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [ ] Create `RouteRadarController` module at `src/engine/radar/RouteRadarController.ts`.
- [ ] Define interfaces for input from `suggestionEngine` and output for Heatmap State.
- [ ] Implement the basic `RouteRadarController` structure.
- [ ] Write unit tests verifying instantiation and method presence.

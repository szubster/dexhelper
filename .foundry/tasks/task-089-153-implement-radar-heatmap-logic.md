---
id: task-089-153-implement-radar-heatmap-logic
type: TASK
title: Implement RouteRadarController Heatmap Logic
status: ACTIVE
owner_persona: coder
created_at: '2026-06-09'
updated_at: '2026-06-10'
depends_on: []
jules_session_id: '15596705652860509977'
pr_number: null
parent: story-048-089-route-radar-density-aggregation
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

# Task: Implement RouteRadarController Heatmap Logic

## Context
As defined in Story `story-048-089-route-radar-density-aggregation`, we need to implement the core computational logic for the `RouteRadarController`. The controller must transform the list of recommended encounters from the `suggestionEngine` into a structured density heatmap map that the UI can render.

## Blueprint / Technical Contract
Implement the data transformation pipeline inside the `RouteRadarController` in `src/engine/radar/RouteRadarController.ts`.

- You are to update the `calculateHeatmap` function to accept `suggestions: Suggestion[]`.
- It must initialize an empty `RouteRadarHeatmap` object.
- Iterate through the `suggestions` array.
- For each suggestion, check if it's a `CatchSuggestion` by checking if `suggestion.category === 'Catch'` (and ensuring `suggestion.encounterInfo` exists). StandardSuggestions (non-catch) should not contribute to the heatmap.
- To avoid double counting the same species in the same area, extract unique `areaId`s (the `aid` property inside `EncounterDetail`) for each suggestion. You can iterate over the map IDs (keys) in `encounterInfo` and extract the `aid`s.
- For each unique `areaId` associated with a particular suggestion, increment the density score for that `areaId` in the `heatmap` object.
- Return the `heatmap` object.

Also, write unit tests in `src/engine/radar/__tests__/RouteRadarController.test.ts` to validate the logic (including empty array handling, single CatchSuggestion on multiple areas, multiple CatchSuggestions on same area, and StandardSuggestion handling).

## Acceptance Criteria
- [ ] Implement the aggregation method in `RouteRadarController`.
- [ ] Ensure the density score correctly maps `areaId`s to their corresponding unique missing species counts.
- [ ] Ensure it accurately processes edge cases (e.g., areas with 0 missing encounters should not be present in the output or have a score of 0).
- [ ] Write unit tests to validate the aggregation logic using mock `suggestionEngine` outputs.

**Important Persona Instructions:**
- **CODER**: If you abort or permanently fail this task, you MUST update the YAML frontmatter to `status: FAILED` or `status: CANCELLED` with a `rejection_reason`. If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting. Do not modify the frontmatter otherwise.

---
id: task-043-072-qa-gen2-map-graph
type: TASK
title: QA Gen 2 Map Graph
status: COMPLETED
owner_persona: qa
created_at: '2026-05-09'
updated_at: '2026-05-11'
depends_on:
  - task-043-071-implement-gen2-map-graph
jules_session_id: null
pr_number: null
parent: story-028-043-gen2-map-graph
tags:
  - gen2
  - map-graph
  - qa
research_references:
  - .foundry/docs/knowledge_base/development/gen2_implementation_plan
rejection_count: 0
rejection_reason: ''
notes: ''
---

# QA Gen 2 Map Graph

## Context
The Coder has completed the technical implementation for the Gen 2 map graph under `.foundry/tasks/task-043-071-implement-gen2-map-graph.md`. This task is to verify that implementation.

## Requirements
- **Review:** Validate the definitions within `src/engine/mapGraph/gen2Graph.ts` against known Johto and Kanto maps.
- **Testing:** Verify that tests exist or add tests for the new map graph logic ensuring proper connectivity (e.g., verifying that Kanto locations connect accurately to Johto locations through specified transition points like Route 27 or the Magnet Train).
- **Validation:** Check that the graph format conforms to the project's standard and is ready to be utilized by future algorithms like `resolveOutdoorMapId` and `getDistanceToMap`.

## Acceptance Criteria
- [x] Tests successfully pass and cover Gen 2 map transitions correctly.
- [x] Code properly follows architectural guidelines and accurately models the Johto and Kanto graphs.

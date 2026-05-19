---
id: task-044-081-qa-indoor-outdoor-resolution
type: TASK
title: QA - Gen 2 Indoor to Outdoor Map Resolution
status: COMPLETED
owner_persona: qa
created_at: '2026-05-11'
updated_at: '2026-05-12'
depends_on:
  - .foundry/tasks/task-044-080-implement-indoor-outdoor-resolution.md
jules_session_id: null
pr_number: null
parent: story-028-044-indoor-outdoor-resolution
tags:
  - gen2
  - expansion
  - map-graph
  - qa
research_references:
  - .foundry/docs/knowledge_base/development/gen2_implementation_plan.md
rejection_count: 0
rejection_reason: ''
notes: ''
---

# QA - Gen 2 Indoor to Outdoor Map Resolution

## Context
The coder has implemented `resolveOutdoorMapId` in `src/engine/mapGraph/gen2Graph.ts` (and possibly `gen1Graph.ts`) to handle multi-level indoor map resolution to their root outdoor hubs. As per the Intelligent Verification Protocol, this core graph routing logic requires dedicated QA verification.

## Requirements
- Verify that `resolveOutdoorMapId` correctly resolves a map ID with no `prnt` to itself.
- Verify that it correctly resolves a single-level indoor map (one `prnt` layer) to its outdoor hub.
- Verify that it correctly resolves a multi-level indoor map (e.g., 3 levels deep via `prnt`) to its root outdoor hub.
- Verify that circular `prnt` references (if any exist or are simulated) do not cause an infinite loop (e.g., add a max depth limit or visited set in the implementation if necessary, or just verify the tests handle valid data gracefully).
- Run all Vitest suites for map graph logic to ensure no regressions.

## Acceptance Criteria
- [x] Tests for `resolveOutdoorMapId` are comprehensive and cover multi-level map scenarios.
- [x] The implementation handles recursive/iterative `prnt` traversal correctly.
- [x] `pnpm test` passes successfully.
- [x] No performance regressions introduced by the loop.

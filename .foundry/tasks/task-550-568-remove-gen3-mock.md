---
id: task-550-568-remove-gen3-mock
type: TASK
title: "Remove isGen3Spy mock from index.test.ts"
status: PENDING
owner_persona: "coder"
created_at: "2026-09-09"
updated_at: "2026-09-09"
depends_on:
  - task-550-567-fix-gen3-heuristic-impl
jules_session_id: null
locks: []
pr_number: null
parent: story-536-550-remove-mock-and-fix-heuristic
priority: 50
tags: []
research_references: []
rejection_count: 0
rejection_reason: ""
notes: ""
---

# Remove isGen3Spy mock from index.test.ts

## Context
The `isGen3Save` heuristic in `src/engine/saveParser/utils/detection.ts` is currently being mocked out in `src/engine/saveParser/index.test.ts` using `isGen3Spy`. Since the heuristic is being fixed in a prerequisite task to correctly identify Gen 3 saves without relying on the structural fallback path in `index.ts`, the mock should be removed to allow tests to use the real implementation.

## Requirements
- Remove the `isGen3Spy` mock from `src/engine/saveParser/index.test.ts`.
- Remove `import * as detectionModule from './utils/detection';` if it's no longer needed.
- Update tests to pass using the real `isGen3Save` implementation. This might require creating more accurate mock DataViews in tests that satisfy the `isGen3Save` heuristic signatures (e.g. magic signatures at `0x0FF8`).

## Acceptance Criteria
- [ ] Remove the `isGen3Spy` mock from `src/engine/saveParser/index.test.ts`.
- [ ] Ensure all tests pass with the real `isGen3Save` implementation.

---
id: task-434-470-tactical-component-tests-complex-impl
type: TASK
title: Implement Component Tests for Complex Tactical Components
status: ACTIVE
owner_persona: coder
created_at: '2026-08-22'
updated_at: '2026-08-23'
depends_on: []
jules_session_id: '17853129950049403514'
pr_number: null
parent: story-071-434-migrate-tactical-components-e2e
tags:
  - testing
  - component
  - vitest
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Implement Component Tests for Complex Tactical Components

## Objective
Write comprehensive component tests using `vitest-browser-react` for complex/container tactical UI components (`TacticalCard`, `TacticalPanel`, `TacticalSegmentedControl`, `TacticalMultiSelectControl`).

## Requirements
1. Use `vitest-browser-react` to mount and test the components.
2. Verify rendering of children and nested layouts.
3. Verify complex interactions (e.g., segmented control selection state changes).
4. Assert that the specific tactical utility classes (from ADR 024 / ADR 008, specifically sharp edges and correct panel styling) are applied correctly.

## Acceptance Criteria
- [x] Component test suite covers `TacticalCard`, `TacticalPanel`, `TacticalSegmentedControl`, and `TacticalMultiSelectControl`.
- [x] Tests verify interactivity, nested rendering, and presence of tactical utility classes.
- [x] `pnpm test` passes without regressions.

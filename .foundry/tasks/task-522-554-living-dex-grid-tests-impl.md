---
id: task-522-554-living-dex-grid-tests-impl
type: TASK
title: Implement Vitest Browser Tests for Living Dex Grid
status: READY
owner_persona: coder
created_at: '2026-09-06'
updated_at: '2026-09-06'
depends_on:
  - task-522-553-living-dex-grid-ui-impl
jules_session_id: null
pr_number: null
parent: story-134-522-living-dex-numerical-grid
tags:
  - testing
  - ui
  - living-dex
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Task: Implement Vitest Browser Tests for Living Dex Grid

## Context
We need to verify the implementation of the LivingDexGrid and LivingDexCell components using vitest-browser-react.

## Acceptance Criteria
- [ ] Write browser rendering tests for LivingDexGrid using vitest-browser-react.
- [ ] Verify that exactly 386 cells are rendered.
- [ ] Verify that cells display their respective national dex numbers.
- [ ] Verify that the component integrates properly into a mock view hierarchy and renders successfully without errors.
- [ ] Explicitly genericize vi.fn() mocks (e.g. vi.fn<(type: string) => void>()) if testing callback props to satisfy vitest(require-mock-type-parameters).
- [ ] Do NOT use @testing-library/react or @testing-library/*.

---
id: task-715-742-daycare-egg-tracker-ui-tests
type: TASK
title: Write Tests for Daycare Status Dashboard Component
status: READY
owner_persona: coder
created_at: '2026-10-21'
updated_at: '2026-10-21'
depends_on:
  - task-715-741-daycare-egg-tracker-ui-component
jules_session_id: null
pr_number: null
parent: story-107-715-daycare-egg-tracker-ui-core
priority: 50
confidence_score: null
tags:
  - testing
  - vitest
  - react
research_references: []
rejection_count: 0
system_failure_count: 0
rejection_reason: ""
notes: ""
---

# Task: Write Tests for Daycare Status Dashboard Component

## Context
After implementing the UI component, we need robust tests to ensure the component behaves correctly based on different states provided by the Context layer.

## Objective
Write component tests for the `DaycareDashboard` using `vitest-browser-react`.

## Scope
- Create a test file for `DaycareDashboard` (e.g., `DaycareDashboard.test.tsx`).
- Test that the component correctly renders 0, 1, or 2 deposited Pokémon.
- Test that EXP gains are formatted and displayed accurately.
- Test the visual presence of the "Egg is waiting" indicator when the flag is true.
- Use `vitest-browser-react` strictly (do NOT use `@testing-library/react`).
- Provide mocked Context data for testing different scenarios.

## Acceptance Criteria
- [ ] Write component tests using `vitest-browser-react`.
- [ ] Cover scenarios for empty daycare, 1 Pokémon, and 2 Pokémon.
- [ ] Cover the "Egg is waiting" true and false states.

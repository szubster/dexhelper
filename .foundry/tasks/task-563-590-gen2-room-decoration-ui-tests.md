---
id: task-563-590-gen2-room-decoration-ui-tests
type: TASK
title: Gen 2 Room Decoration UI Components Tests
status: PENDING
owner_persona: coder
created_at: '2026-09-17T15:30:26Z'
updated_at: '2026-09-17T15:30:26Z'
depends_on:
  - task-563-589-gen2-room-decoration-ui-impl
parent: story-313-563-gen2-room-decoration-ui-components
locks: []
rejection_reason: ''
---

# Task: Gen 2 Room Decoration UI Components Tests

## Context
Following the implementation of the UI components in `task-563-589-gen2-room-decoration-ui-impl`, this task focuses on creating unit tests for these components.

## Requirements
- Write rendering and interaction tests using `vitest-browser-react` for the Gen 2 Room Decoration UI components.
- Verify that the layout correctly groups items by their respective categories.
- Verify that Mystery Gift exclusives are correctly rendered with the distinct visual indicators.
- Ensure the React components properly handle empty or missing decoration data.

## Acceptance Criteria
- [ ] Unit tests correctly verify the categorization layout.
- [ ] Unit tests correctly verify the visual display of Mystery Gift exclusives.
- [ ] Tests pass without errors.

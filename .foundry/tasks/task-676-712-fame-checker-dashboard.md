---
id: task-676-712-fame-checker-dashboard
type: TASK
title: Implement Fame Checker Dashboard Integration
status: ACTIVE
owner_persona: coder
created_at: '2026-10-19T16:13:34.000Z'
updated_at: '2026-11-01'
depends_on:
  - task-676-711-qa-fame-checker-base-ui
jules_session_id: '12779977028262046403'
pr_number: null
parent: story-333-676-fame-checker-dashboard-components
tags:
  - gen3
  - fame-checker
  - ui
  - react
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Implement Fame Checker Dashboard Integration

## Context
With the base components implemented, we need to integrate them into the `FameCheckerDashboard` view.

## Objectives
- Implement `FameCheckerDashboard` component that uses `NPCList` and `FameCheckerEntryList`.
- Ensure interaction between NPC selection and displayed entries works correctly.
- Integrate Tailwind v4 primitives and utility classes from `src/index.css`.

## Acceptance Criteria
- [ ] `FameCheckerDashboard` integrates base components correctly.
- [ ] NPC selection updates the displayed entries list.
- [ ] Component is fully tested using Vitest browser tests.

---
id: task-563-668-routes-encounters-ui-components-impl
type: TASK
title: 'Routes, Encounters, and Drop Rates UI Components'
status: CANCELLED
owner_persona: coder
created_at: '2026-10-07'
updated_at: '2026-10-10'
depends_on:
  - task-563-667-routes-encounters-data-fetching-impl
jules_session_id: null
pr_number: null
parent: story-555-563-routes-encounters-drop-rates
tags:
  - dexhelper
  - ui
research_references: []
rejection_count: 0
rejection_reason: >-
  Cancelled due to permanent failure of dependency:
  task-563-667-routes-encounters-data-fetching-impl
notes: ''
locks: []
---

# Task: Routes, Encounters, and Drop Rates UI Components

## Context
As part of the "Display Routes, Encounters, and Drop Rates" story, we need to display the fetched routes, encounter types, and specific drop rates in the UI.

## Requirements
- Implement a list or table UI component to display the routes, encounters, and drop percentages for the selected item.
- Integrate the UI component with the data fetching hook.
- Ensure styling adheres to the tactical hardware aesthetic (ADR 008), using sharp edges (`rounded-none`), dashed borders, monospaced fonts, and tactical primitives from `src/index.css`.

## Acceptance Criteria
- [ ] coder: Implement the UI components.
- [ ] coder: Integrate data fetching hook into the UI.
- [ ] coder: Ensure tactical styling compliance.

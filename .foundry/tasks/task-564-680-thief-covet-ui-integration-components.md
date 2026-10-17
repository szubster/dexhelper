---
id: task-564-680-thief-covet-ui-integration-components
type: TASK
title: UI Components for Thief/Covet Optimizer
status: READY
owner_persona: coder
created_at: '2026-10-01'
updated_at: '2026-10-17'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-553-564-thief-covet-ui-integration
tags:
  - dexhelper
  - ui
  - react
research_references: []
rejection_count: 2
rejection_reason: ''
notes: ''
locks: []
---

# Task: UI Components for Thief/Covet Optimizer

## Context
With the engine logic in place to find Pokemon with item-stealing moves, we need to surface this information in the UI. This task involves creating the React context and components to display the recommended team or highlight specific Pokemon that know Thief or Covet.

## Requirements
- Consume the `findAllItemStealers` data from the engine utilities.
- Create React components (e.g., a `ThiefCovetOptimizerPanel`) to display this data.
- Integrate the components into the Party/PC views or a dedicated team optimizer view.
- Adhere to the tactical hardware aesthetic (`rounded-none`, `border-dashed`, monospaced fonts, etc.).

## Acceptance Criteria
- [ ] coder: Implement React components and context for the Thief/Covet optimizer.

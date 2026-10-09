---
id: task-527-669-pathfinder-chain-viz-ui
type: TASK
title: Pathfinder Chain Visualization UI Presentation Component
status: READY
owner_persona: coder
created_at: '2026-10-06'
updated_at: '2026-10-06'
depends_on:
  - task-527-668-pathfinder-chain-viz-types
jules_session_id: null
pr_number: null
parent: story-115-527-pathfinder-chain-visualization
tags:
  - feature
  - ui
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Task: Pathfinder Chain Visualization UI Presentation Component

## Overview
Implement the React presentation component that visually renders the calculated breeding chain(s).

## Acceptance Criteria
- [ ] Create a React component to render the breeding chain visually using the defined types.
- [ ] Render each step of the chain, showing intermediate species and the passed-down move.
- [ ] Ensure strict adherence to the tactical hardware aesthetic (ADR 008, 024) - use `rounded-none`, `@utility` classes like `tactical-panel`, `border-dashed`, and monospace fonts.
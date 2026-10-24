---
id: task-527-669-pathfinder-chain-viz-ui
type: TASK
title: Pathfinder Chain Visualization UI Presentation Component
status: FAILED
owner_persona: coder
created_at: '2026-10-06'
updated_at: '2026-10-24'
depends_on:
  - task-527-668-pathfinder-chain-viz-types
jules_session_id: null
pr_number: null
parent: story-115-527-pathfinder-chain-visualization
tags:
  - feature
  - ui
research_references: []
rejection_count: 2
rejection_reason: 'Implementation fails to adhere to ADR 008 and ADR 024. It uses raw inline Tailwind typography classes instead of the required tactical-text utility in src/features/pathfinder/components/PathfinderChainViz.tsx. Additionally, the speciesName div completely misses font-mono.'
notes: ''
locks: []
---

# Task: Pathfinder Chain Visualization UI Presentation Component

## Overview
Implement the React presentation component that visually renders the calculated breeding chain(s).

## Acceptance Criteria
- [x] Create a React component to render the breeding chain visually using the defined types.
- [x] Render each step of the chain, showing intermediate species and the passed-down move.
- [x] Ensure strict adherence to the tactical hardware aesthetic (ADR 008, 024) - use `rounded-none`, `@utility` classes like `tactical-panel`, `border-dashed`, and monospace fonts.

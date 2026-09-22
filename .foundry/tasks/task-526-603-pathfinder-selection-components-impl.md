---
id: task-526-603-pathfinder-selection-components-impl
type: TASK
title: Pathfinder Selection UI Rewrite
status: PENDING
owner_persona: coder
created_at: '2026-09-21'
updated_at: '2026-09-21'
depends_on:
  - research-526-602-investigate-pathfinder-ui-failure
jules_session_id: null
pr_number: null
parent: story-115-526-pathfinder-selection-ui
tags:
  - ui
  - feature
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Pathfinder Selection UI Rewrite

## Description
Implement the search/dropdown interface for selecting the target Pokémon species and Egg Move, applying the fixes identified in the research phase.

## Acceptance Criteria
- [ ] Implement a dropdown or search interface to select the target Pokémon species.
- [ ] Implement a selection interface for the desired Egg Move.
- [ ] Ensure the components adhere strictly to the tactical hardware aesthetic (ADR 008, 024) utilizing rounded-none, border-dashed, and font-mono.
- [ ] Explicitly integrate these components into the Smart Egg Pathfinder view hierarchy.
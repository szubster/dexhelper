---
id: task-492-691-pal-park-batch-ui-impl-retry
type: TASK
title: Pal Park Batch UI Component (Retry)
status: ACTIVE
owner_persona: coder
created_at: '2026-10-15'
updated_at: '2026-10-20'
depends_on:
  - research-492-690-investigate-pal-park-batch-ui-failure
jules_session_id: '6198094280568230856'
pr_number: null
parent: story-420-492-pal-park-batch-generation
tags:
  - feature
  - gen3
  - pal-park
  - migration
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Task: Pal Park Batch UI Component (Retry)

## Objective
Implement a UI presentation component to display the batched Pokémon and their Box/Slot locations.

## Scope
- Create a React component to visualize batches of up to 6 Pokémon.
- Display the Box and Slot location prominently for each Pokémon to help users find them in-game.
- Adhere strictly to the tactical hardware aesthetic guidelines (ADR 008), using `@utility` primitives, sharp edges (`rounded-none`), and monospaced fonts.
- Incorporate fixes based on the findings from research-492-690-investigate-pal-park-batch-ui-failure.

## Acceptance Criteria
- [ ] Implement the UI component for displaying batches.

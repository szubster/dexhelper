---
id: task-492-670-pal-park-batch-ui-impl
type: TASK
title: Pal Park Batch UI Component
status: PENDING
owner_persona: coder
created_at: '2026-10-06'
updated_at: '2026-10-06'
depends_on:
  - task-492-668-pal-park-batch-logic-impl
jules_session_id: null
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

# Task: Pal Park Batch UI Component

## Objective
Implement a UI presentation component to display the batched Pokémon and their Box/Slot locations.

## Scope
- Create a React component to visualize batches of up to 6 Pokémon.
- Display the Box and Slot location prominently for each Pokémon to help users find them in-game.
- Adhere strictly to the tactical hardware aesthetic guidelines (ADR 008), using `@utility` primitives, sharp edges (`rounded-none`), and monospaced fonts.

## Acceptance Criteria
- [ ] Implement the UI component for displaying batches.

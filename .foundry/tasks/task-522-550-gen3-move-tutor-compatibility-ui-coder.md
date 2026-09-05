---
id: task-522-550-gen3-move-tutor-compatibility-ui-coder
type: TASK
title: Implement Gen 3 Move Tutor UI
status: READY
owner_persona: coder
created_at: '2026-09-02'
updated_at: '2026-09-05'
depends_on:
  - task-522-549-gen3-move-tutor-compatibility-logic-coder
jules_session_id: null
pr_number: null
parent: story-407-522-gen3-move-tutor-cross-referencing
tags:
  - gen3
  - ui
  - move-tutor
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Task: Implement Gen 3 Move Tutor UI

## Objective
Implement a user interface component to display available Tutor moves for the selected Pokémon, cross-referenced with the player's available move tutors.

## Details
1. Create a UI component that displays a list of Move Tutors.
2. The component should visually indicate whether a one-time move tutor has already been used (unavailable) or is still available, based on the event flags parsed by the logic layer.
3. When a Pokémon is selected from the PC boxes or Party, the UI should indicate which of the *available* tutor moves that specific Pokémon is compatible with (using the MsgPack compatibility data).
4. Adhere to the "tactical hardware/snooping" UI aesthetic constraints defined in ADR 008 (sharp edges, monospaced fonts, etc.).

## Acceptance Criteria
- [ ] A UI component is created to display available Tutor moves for the selected Pokémon
---
id: task-322-331-pokerus-strain-badge-component-impl
type: TASK
title: Pokerus Strain Badge UI Component Implementation
status: PENDING
owner_persona: coder
created_at: '2026-07-17'
updated_at: '2026-07-17'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-323-322-pokerus-strain-badge-component
tags:
  - pokerus
  - ui
  - react
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Pokerus Strain Badge UI Component Implementation

## 1. Objective
Implement the `PokerusBadge` React component that visually displays the Pokerus strain following the "tactical hardware" aesthetic.

## 2. Context & Requirements
- Based on `story-323-322-pokerus-strain-badge-component`.
- The component must display the strain visually (e.g., Strain 1, Strain 2, etc.) using distinctive labels or colors.
- Styling must adhere strictly to ADR 008 and ADR 024. Use the tactical styling guidelines such as `rounded-none`, `border-dashed`, and monospaced fonts (`font-mono`).
- As per the `tailwind_v4_utilities.md` guidelines, utilize the existing `@utility` classes if applicable (e.g., `tactical-panel`, `tactical-button`) or direct utility classes like `border border-dashed rounded-none` instead of deprecated `@layer components` combinations.
- The component must accept props to distinguish the strain data.

## 3. Acceptance Criteria
- [ ] Create the `PokerusBadge` component in the appropriate UI component directory.
- [ ] Apply the tactical hardware aesthetic rules as specified.
- [ ] Add explicit integration steps or Storybook/test rendering if applicable to ensure it is renderable and not a dead file (Component Integration Policy).
- [ ] Update the `PokerusBadge` component to correctly map distinct visual properties (color/text) to different strains.

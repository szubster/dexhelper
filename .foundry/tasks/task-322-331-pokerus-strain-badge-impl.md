---
id: task-322-331-pokerus-strain-badge-impl
type: TASK
title: Pokerus Strain Badge Implementation
status: ACTIVE
owner_persona: coder
created_at: '2026-07-18'
updated_at: '2026-07-20'
depends_on: []
jules_session_id: '10071649615140311217'
pr_number: null
parent: story-323-322-pokerus-strain-badge-component
tags:
  - pokerus
  - ui
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Pokerus Strain Badge Implementation

## 1. Objective
Develop a reusable `PokerusBadge` React component that visually displays the Pokerus strain (e.g., Strain 1, Strain 2) following the "tactical hardware" aesthetic.

## 2. Scope
- Create a `PokerusBadge` component in `src/components/`.
- Apply styling based on ADR 008 and ADR 024. Use the consolidated `@utility` primitives defined in `src/index.css`. If no exact matching class exists, fall back to explicit tactical classes (`rounded-none`, `border-dashed`, `font-mono`).
- The component should accept a prop for the strain ID/value (e.g., 0-15) and distinguish between different strains visually. For instance, you could use different border colors, background opacities, or textual labels (e.g., `[STRN: 1]`, `[STRN: B]`) based on the strain value.
- Ensure the Coder verifies the component visual implementation within their journal as this is a low-risk UI component, per the Intelligent Verification Protocol.

## 3. Acceptance Criteria
- [x] Coder: Implement `PokerusBadge` component.
- [x] Coder: Self-verify the visual implementation and document the outcome in `.foundry/journals/coder.md`.

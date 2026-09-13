---
id: idea-523-component-variants-theming-refactor
type: IDEA
title: Component Variants and Theming Refactor Implementation
status: PENDING
owner_persona: product_manager
created_at: '2026-09-13'
updated_at: '2026-09-13'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - refactor
  - styling
  - frontend
  - theming
  - design-system
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Idea: Component Variants and Theming Refactor Implementation

## Context & Problem Statement
`idea-145-component-variants-theming-consolidation` introduced research (`research-145-001`, `research-145-002`) and finalized `adr-145-031-component-variant-theming.md`. However, the original idea was marked `COMPLETED` after creating the ADR without spawning downstream implementation nodes to perform the actual codebase refactor.

As decided in `adr-145-031-component-variant-theming.md` (Path A: Class Variance Authority + CSS Custom Variables):
1. React component variants (e.g. `TacticalCard`, `TacticalPanel`, `TacticalInput`, etc.) should be defined using Class Variance Authority (`cva`).
2. Dynamic color palettes for retro Pokémon game versions should be managed via standard CSS custom variables mapped to Tailwind CSS v4 `@theme` directives in `src/index.css`.

## Proposed Strategy
1. **Product Management & Specs**: Convert this Idea into a PRD (`prd-523-component-variants-theming-refactor`) defining the component refactor scope and variant props.
2. **Epic & Story Planning**: Break down the PRD into Epics and late-bound Stories covering component migration, theme token setup in `src/index.css`, and UI testing.
3. **Engineering Implementation**: Add `class-variance-authority` dependency if needed, refactor `TacticalCard`, `TacticalPanel`, `TacticalBadge`, `TacticalButton`, `TacticalInput`, and related primitives to use CVA string mappers, and standardize CSS variables for game themes.
4. **Verification & Testing**: Verify component visual regression and run the full Vitest suite.

## Acceptance Criteria
- [ ] Product Manager: Convert this idea into a PRD (`prd-523-component-variants-theming-refactor`).
- [ ] Epic Planner: Break down PRD into macroscopic implementation Epics.
- [ ] Tech Lead: Spawn implementation Tasks for CVA adoption and CSS custom variable theming refactor across tactical components.
- [ ] Coder / Palette / QA: Execute refactoring tasks, update components, and verify zero runtime regression.

---
id: idea-523-component-variants-theming-consolidation-refactor
type: IDEA
title: Component Variants and Theming Consolidation Refactor
status: ACTIVE
owner_persona: product_manager
created_at: '2026-09-13'
updated_at: '2026-09-14'
depends_on: []
jules_session_id: '2566861365955237341'
pr_number: null
parent: null
tags:
  - refactor
  - styling
  - frontend
  - theming
  - design-system
research_references:
  - .foundry/research/research-145-001-component-variant-libraries.md
  - .foundry/research/research-145-002-component-theming-mechanisms.md
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Idea: Component Variants and Theming Consolidation Refactor

## Context & Problem Statement
`idea-145-component-variants-theming-consolidation` successfully completed the initial research and established `adr-145-031-component-variant-theming` (selecting CVA + CSS Custom Variables). However, no code refactor was executed following the ADR creation.

This IDEA node initiates the actual implementation and refactor phase to consolidate component variants and theming across DexHelper's UI component hierarchy according to Path A of ADR 031.

## Proposed Strategy
1. **Product Requirements & Specification**: Draft a PRD defining the target component library migration scope (e.g., `TacticalPanel`, `TacticalCard`, `TacticalButton`, `TacticalBadge`, `TacticalInput`, etc.).
2. **CVA Integration**: Integrate `class-variance-authority` (CVA) for local component variant definitions with strict TypeScript typing.
3. **CSS Variable Design Tokens**: Centralize theme palettes inside `src/index.css` using CSS custom properties paired with Tailwind v4 CSS variables.
4. **Verification**: Add comprehensive unit and visual regression / Playwright tests ensuring component variants render properly and layout styling complies with ADR 008 tactical aesthetics.

## Acceptance Criteria
- [x] Product Manager: Convert this idea into a PRD to map out the component variant refactor and CVA adoption scope.
- [ ] prd-523-565-component-variants-theming-consolidation-refactor

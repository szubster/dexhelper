---
id: prd-523-565-component-variants-theming-consolidation-refactor
type: PRD
title: PRD Component Variants and Theming Consolidation Refactor
status: READY
owner_persona: epic_planner
created_at: '2026-09-13'
updated_at: '2026-09-14'
depends_on: []
jules_session_id: null
pr_number: null
parent: idea-523-component-variants-theming-consolidation-refactor
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
priority: 60
---

# PRD: Component Variants and Theming Consolidation Refactor

## Background
According to `adr-145-031-component-variant-theming`, Path A (Class Variance Authority (CVA) + CSS Custom Variables) has been chosen for handling theming and component variants in DexHelper. Currently, components use verbose inline classes and inconsistent style mappings across the application. This PRD details the implementation plan to migrate our core tactical components to this unified system.

## Scope
The target component library migration scope includes, but is not limited to:
- `TacticalPanel`
- `TacticalCard`
- `TacticalButton`
- `TacticalBadge`
- `TacticalInput`
- `TacticalSegmentedControl`
- `TacticalSelect`
- `TacticalMultiSelectControl`

## Requirements
1. **CVA Integration**:
   - Add the `class-variance-authority` (CVA) dependency to the project.
   - Refactor target components to utilize CVA for variant definitions.
   - Ensure strict TypeScript typing for all component variants.

2. **CSS Custom Variables**:
   - Centralize all theme colors inside `src/index.css` using CSS custom properties paired with Tailwind CSS v4 variables.
   - Map variant string names to the corresponding CSS classes and custom properties.

3. **Verification and Testing**:
   - Ensure existing component unit tests pass.
   - Add Playwright visual regression tests to verify component variants render properly and layout styling complies with ADR 008 tactical aesthetics (e.g., sharp edges, dashed borders).

## Acceptance Criteria
- [ ] Epic Planner: Break down this PRD into Epics to handle CVA setup, core component refactoring, and integration testing.

---
id: task-571-579-cva-refactor-complex-inputs
type: TASK
title: CVA Refactor Complex Tactical Inputs
status: COMPLETED
owner_persona: coder
created_at: '2026-09-15T11:19:51Z'
updated_at: '2026-09-15'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-567-571-cva-refactor-tactical-inputs
tags:
  - refactor
  - styling
  - frontend
research_references:
  - .foundry/research/research-145-001-component-variant-libraries.md
  - .foundry/research/research-145-002-component-theming-mechanisms.md
locks: []
priority: 60
rejection_reason: ''
---

# Task: CVA Refactor Complex Tactical Inputs

## Objective
Refactor `TacticalSegmentedControl` and `TacticalMultiSelectControl` components to use `class-variance-authority` (CVA) for their styling variants and states.

## Context
These are more complex input components that maintain internal states or multiple interactive parts. Their transition to CVA should ensure consistent theming and variant selection while preserving all existing interactions.

## Scope
- Refactor `src/components/TacticalSegmentedControl.tsx`.
- Refactor `src/components/TacticalMultiSelectControl.tsx`.
- Ensure strict TypeScript typing using CVA's `VariantProps`.
- Update unit tests in `src/components/__tests__/` if required.

## Acceptance Criteria
- [x] Refactor `TacticalSegmentedControl` using CVA.
- [x] Refactor `TacticalMultiSelectControl` using CVA.
- [x] Strict TypeScript typings provided for variants.
- [x] Pass `pnpm lint` and `pnpm test`.

---
id: task-571-578-cva-refactor-basic-inputs
type: TASK
title: CVA Refactor Tactical Input and Select
status: ACTIVE
owner_persona: coder
created_at: '2026-09-15T11:19:51Z'
updated_at: '2026-09-15'
depends_on: []
jules_session_id: '1648005984688581688'
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

# Task: CVA Refactor Tactical Input and Select

## Objective
Refactor `TacticalInput` and `TacticalSelect` components to use `class-variance-authority` (CVA) for styling variants and states.

## Context
As part of the Core Components Refactor epic, we are adopting `class-variance-authority` (CVA) to standardize and strictly type component variants across the design system.

## Scope
- Refactor `src/components/TacticalInput.tsx`.
- Refactor `src/components/TacticalSelect.tsx`.
- Ensure strict TypeScript typing using CVA's `VariantProps`.
- Update any corresponding unit tests in `src/components/__tests__/` if necessary to fix breaking changes (though behavior shouldn't change).

## Acceptance Criteria
- [ ] Refactor `TacticalInput` using CVA.
- [ ] Refactor `TacticalSelect` using CVA.
- [ ] Strict TypeScript typings provided for variants.
- [ ] Pass `pnpm lint` and `pnpm test`.

---
id: story-567-571-cva-refactor-tactical-inputs
type: STORY
title: CVA Refactor Tactical Inputs
status: COMPLETED
owner_persona: tech_lead
created_at: '2026-09-15'
updated_at: '2026-09-19'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-565-567-core-components-refactor
tags:
  - refactor
  - styling
  - frontend
  - design-system
research_references:
  - .foundry/research/research-145-001-component-variant-libraries.md
  - .foundry/research/research-145-002-component-theming-mechanisms.md
rejection_reason: ''
locks: []
priority: 60
---

# Story: CVA Refactor Tactical Inputs

## Objective
Refactor the `TacticalInput`, `TacticalSegmentedControl`, `TacticalSelect`, and `TacticalMultiSelectControl` components to use `class-variance-authority` (CVA).

## Scope
- Refactor `TacticalInput` to use CVA.
- Refactor `TacticalSegmentedControl` to use CVA.
- Refactor `TacticalSelect` to use CVA.
- Refactor `TacticalMultiSelectControl` to use CVA.
- Ensure strict TypeScript typing for all component variants.

## Acceptance Criteria
- [x] Tech Lead: Break down into Tasks.
- [x] task-571-578-cva-refactor-basic-inputs
- [x] task-571-579-cva-refactor-complex-inputs
- [x] task-571-580-qa-tactical-inputs

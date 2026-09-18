---
id: task-571-580-qa-tactical-inputs
type: TASK
title: QA Tactical Inputs Refactor
status: READY
owner_persona: qa
created_at: '2026-09-15T11:19:51Z'
updated_at: '2026-09-18'
depends_on:
  - task-571-578-cva-refactor-basic-inputs
  - task-571-579-cva-refactor-complex-inputs
jules_session_id: null
pr_number: null
parent: story-567-571-cva-refactor-tactical-inputs
tags:
  - qa
  - verification
research_references:
  - .foundry/research/research-145-001-component-variant-libraries.md
  - .foundry/research/research-145-002-component-theming-mechanisms.md
rejection_reason: ''
locks: []
priority: 60
---

# Task: QA Tactical Inputs Refactor

## Objective
Verify the CVA refactoring of Tactical input components to ensure visual parity, functional correctness, and absence of regressions.

## Context
`TacticalInput`, `TacticalSelect`, `TacticalSegmentedControl`, and `TacticalMultiSelectControl` have been refactored to use `class-variance-authority`. This task ensures their styling correctly adheres to ADR 008 (tactical hardware aesthetic) and variants are correctly applied.

## Scope
- Verify visual rendering of `TacticalInput` and `TacticalSelect`.
- Verify visual rendering and interaction of `TacticalSegmentedControl` and `TacticalMultiSelectControl`.

## Acceptance Criteria
- [ ] Verify no visual regressions exist for tactical input components.
- [ ] Ensure ADR 008 compliance (sharp edges, dashed borders where applicable, monospaced fonts).

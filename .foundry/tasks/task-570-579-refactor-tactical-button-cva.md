---
id: task-570-579-refactor-tactical-button-cva
type: TASK
title: Refactor TacticalButton to CVA
status: ACTIVE
owner_persona: coder
created_at: '2026-09-15T11:22:21Z'
updated_at: '2026-09-17'
depends_on: []
jules_session_id: '7505414408855775222'
pr_number: null
parent: story-567-570-cva-refactor-tactical-button-badge
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

# Task: Refactor TacticalButton to CVA

## Objective
Refactor the `TacticalButton` component to use `class-variance-authority` (CVA) for its variants and sizes.

## Scope
- Modify `src/components/TacticalButton.tsx`.
- Use `cva` to define the `variant` and `size` props instead of the current `cn` conditional object syntax.
- Ensure the TypeScript typings accurately use `VariantProps<typeof buttonVariants>`.
- Maintain the exact styling output for all current variants (default, primary, danger, danger-outline, secondary, sidebar) and sizes (default, sm, lg, icon).
- The `hasCrosshairs` boolean/literal union logic should remain intact and function as expected.

## Acceptance Criteria
- [ ] `TacticalButton` correctly uses CVA.
- [ ] TypeScript types are strict and export `TacticalButtonProps` appropriately extending `VariantProps`.
- [ ] All linting and tests pass.

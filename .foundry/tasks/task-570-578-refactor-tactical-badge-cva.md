---
id: task-570-578-refactor-tactical-badge-cva
type: TASK
title: Refactor TacticalBadge to CVA
status: COMPLETED
owner_persona: coder
created_at: '2026-09-15T11:22:21Z'
updated_at: '2026-09-19'
depends_on: []
jules_session_id: null
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

# Task: Refactor TacticalBadge to CVA

## Objective
Refactor the `TacticalBadge` component to use `class-variance-authority` (CVA) for its variants.

## Scope
- Modify `src/components/TacticalBadge.tsx`.
- Use `cva` from `class-variance-authority` to define the variants instead of the current `cn` conditional object syntax.
- Ensure the TypeScript typings accurately use `VariantProps<typeof badgeVariants>`.
- Maintain the exact styling output for all current variants (primary, amber, red, zinc, blue, emerald, rose, pink).

## Acceptance Criteria
- [x] `TacticalBadge` correctly uses CVA.
- [x] TypeScript types are strict and export `TacticalBadgeProps` appropriately extending `VariantProps`.
- [x] All linting and tests pass.

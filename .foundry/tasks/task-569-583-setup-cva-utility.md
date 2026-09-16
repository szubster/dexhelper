---
id: task-569-583-setup-cva-utility
type: TASK
title: Add CVA and create custom cn utility
status: READY
owner_persona: coder
created_at: '2026-09-16T18:34:14Z'
updated_at: '2026-09-16T18:34:14Z'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-566-569-cva-theme-variables-setup
tags:
  - refactor
  - styling
  - frontend
  - theming
research_references:
  - .foundry/research/research-145-001-component-variant-libraries.md
rejection_reason: ''
locks: []
priority: 60
---

# Task: Add CVA and create custom cn utility

## Context
As detailed in ADR 031, we need to add `class-variance-authority` (CVA) for managing local React component variants (e.g., `size`, `intent`). CVA is already in `package.json`, so we don't need to add it again, but we do need to create the proper `cn` utility.

## Objective
Ensure `src/utils/cn.ts` exports a robust `cn` utility that works correctly with CVA.

## Implementation Details
1. The project currently uses `cn` from the `cn` package in `src/utils/cn.ts`. Do not change this implementation.
2. Verify that this utility function can be correctly imported and used by CVA. If any typescript or type setup is required to map CVA variants correctly, add it, but otherwise leave the core `cn` utility exactly as is.
3. Ensure no `clsx` or `tailwind-merge` dependencies are added.

## Acceptance Criteria
- [x] Verify `src/utils/cn.ts` continues to export the shadcn-compliant `cn` function.
- [x] Ensure `pnpm lint` and `pnpm type-check` pass.

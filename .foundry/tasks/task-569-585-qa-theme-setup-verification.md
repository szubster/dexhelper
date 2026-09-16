---
id: task-569-585-qa-theme-setup-verification
type: TASK
title: QA - Theme Setup Verification
status: READY
owner_persona: qa
created_at: '2026-09-16T18:35:20Z'
updated_at: '2026-09-16T18:35:20Z'
depends_on:
  - task-569-583-setup-cva-utility
  - task-569-584-setup-css-theme-variables
jules_session_id: null
pr_number: null
parent: story-566-569-cva-theme-variables-setup
tags:
  - qa
  - styling
  - frontend
  - theming
research_references: []
rejection_reason: ''
locks: []
priority: 60
---

# Task: QA - Theme Setup Verification

## Context
The coder tasks for setting up CVA and CSS theme variables are complete. We need to verify that `cn.ts` properly implements `twMerge(clsx(inputs))` and that `src/index.css` exports the correct theme variables to Tailwind.

## Objective
Verify the correctness of the CVA utility setup and the CSS theme mappings.

## Implementation Details
1. Verify `src/utils/cn.ts` implements `clsx` and `tailwind-merge` properly and exports `cn`.
2. Verify `package.json` contains `clsx` and `tailwind-merge` as dependencies.
3. Verify `src/index.css` has `--color-theme-primary: var(--theme-primary);` and `--color-theme-bg: var(--theme-bg);` inside the `@theme` block.

## Acceptance Criteria
- [ ] Verify `src/utils/cn.ts` correctly merges Tailwind classes using `clsx` and `tailwind-merge`.
- [ ] Verify `package.json` contains `clsx` and `tailwind-merge`.
- [ ] Verify `src/index.css` maps `var(--theme-primary)` and `var(--theme-bg)` within the `@theme` directive.

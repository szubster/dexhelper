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
Update `src/utils/cn.ts` to be a robust Tailwind class merger that also works well with CVA.

## Implementation Details
1. Currently `src/utils/cn.ts` only exports `cn` from the `cn` package.
2. We need it to be a proper Tailwind utility. Since the repo might already have `cn` or need a specific implementation, please verify if `clsx` and `tailwind-merge` are in `package.json`. If not, add them as dependencies using `pnpm add -w clsx tailwind-merge`.
3. Update `src/utils/cn.ts` to export a `cn` function that combines `clsx` and `twMerge`.

```typescript
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

## Acceptance Criteria
- [ ] Add `clsx` and `tailwind-merge` as workspace dependencies if they are missing.
- [ ] Update `src/utils/cn.ts` to implement the standard tailwind class merging pattern.
- [ ] Ensure `pnpm lint` and `pnpm type-check` pass.

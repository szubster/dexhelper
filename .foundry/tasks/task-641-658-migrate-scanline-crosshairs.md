---
id: task-641-658-migrate-scanline-crosshairs
type: TASK
title: Migrate Scanline and Corner Crosshairs
status: ACTIVE
owner_persona: coder
created_at: '2026-10-03'
updated_at: '2026-10-07'
depends_on: []
jules_session_id: '3372251900426299702'
pr_number: null
parent: story-527-641-migrate-decorations
tags:
  - react
  - components
rejection_count: 2
rejection_reason: ''
notes: ''
locks: []
---

# Migrate Scanline and Corner Crosshairs

## Objective
Migrate the `ScanlineOverlay` and `CornerCrosshairs` components from the main application to the `@dexhelper/ui` package.

## Acceptance Criteria
- [ ] Move `ScanlineOverlay` and `CornerCrosshairs` from `src/components/` to `packages/ui/src/components/`.
- [ ] Export both components in `packages/ui/src/index.ts`.
- [ ] Update all import paths in the main application to use `@dexhelper/ui` instead of relative paths for these components.
- [ ] Ensure Vitest tests for these components are also moved and continue to pass.

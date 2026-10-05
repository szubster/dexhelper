---
id: task-641-658-migrate-scanline-crosshairs
type: TASK
title: Migrate Scanline and Corner Crosshairs
status: READY
confidence_score: 100
owner_persona: coder
created_at: '2026-10-03'
updated_at: '2026-10-05'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-527-641-migrate-decorations
tags:
  - react
  - components
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Migrate Scanline and Corner Crosshairs

## Objective
Migrate the `ScanlineOverlay` and `CornerCrosshairs` components from the main application to the `@dexhelper/ui` package.

## Acceptance Criteria
- [x] Move `ScanlineOverlay` and `CornerCrosshairs` from `src/components/` to `packages/ui/src/components/`.
- [x] Export both components in `packages/ui/src/index.ts`.
- [x] Update all import paths in the main application to use `@dexhelper/ui` instead of relative paths for these components.
- [x] Ensure Vitest tests for these components are also moved and continue to pass.

---
id: task-641-676-migrate-scanline-crosshairs-v2
type: TASK
title: Migrate Scanline and Corner Crosshairs V2
status: READY
owner_persona: coder
created_at: '2026-10-10'
updated_at: '2026-10-10'
depends_on:
  - research-641-675-investigate-migration-failures
jules_session_id: null
parent: story-527-641-migrate-decorations
tags:
  - react
  - components
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Migrate Scanline and Corner Crosshairs V2

## Objective
Migrate the `ScanlineOverlay` and `CornerCrosshairs` components to the `@dexhelper/ui` package based on findings from the research phase.

## Acceptance Criteria
- [ ] Move `ScanlineOverlay` and `CornerCrosshairs` from `src/components/` to `packages/ui/src/components/`.
- [ ] Export both components in `packages/ui/src/index.ts`.
- [ ] Update import paths in the main application.
- [ ] Ensure Vitest tests pass.

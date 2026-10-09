---
id: task-641-674-migrate-scanline-crosshairs-retry
type: TASK
title: Migrate Scanline and Corner Crosshairs Retry
status: PENDING
owner_persona: coder
created_at: '2026-10-09'
updated_at: '2026-10-09'
depends_on:
  - research-641-673-investigate-scanline-crosshairs-failure
jules_session_id: null
pr_number: null
parent: story-527-641-migrate-decorations
tags:
  - react
  - components
rejection_count: 0
rejection_reason: ""
notes: ""
locks: []
---

# Migrate Scanline and Corner Crosshairs Retry

## Objective
Migrate the ScanlineOverlay and CornerCrosshairs components to the @dexhelper/ui package, incorporating findings from the research task.

## Acceptance Criteria
- [ ] Move ScanlineOverlay and CornerCrosshairs to packages/ui/src/components/.
- [ ] Export both components in packages/ui/src/index.ts.
- [ ] Update all import paths in the main application.
- [ ] Ensure Vitest tests for these components pass.

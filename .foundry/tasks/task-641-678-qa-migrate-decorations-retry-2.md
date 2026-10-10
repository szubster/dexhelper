---
id: task-641-678-qa-migrate-decorations-retry-2
type: TASK
title: QA Migrate Visual Decorators Retry 2
status: READY
owner_persona: qa
created_at: '2026-10-10'
updated_at: '2026-10-10'
depends_on:
  - task-641-676-migrate-scanline-crosshairs-retry
  - task-641-677-migrate-hexstream-telemetry-retry-2
jules_session_id: null
pr_number: null
parent: story-527-641-migrate-decorations
tags:
  - react
  - components
  - qa
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# QA Migrate Visual Decorators Retry 2

## Objective
Verify the successful migration of decorative UI components (`ScanlineOverlay`, `CornerCrosshairs`, `HexStreamDecoration`, `TelemetryDecoration`) to the `@dexhelper/ui` package, applying findings from research-641-675.

## Acceptance Criteria
- [ ] Verify components are exported from `@dexhelper/ui` and imported correctly.
- [ ] Verify no visual regressions.
- [ ] Inspect UI to ensure overlays display correctly.
- [ ] Ensure `pnpm lint` and `pnpm test` pass.

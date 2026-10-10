---
id: task-641-678-qa-migrate-decorations-v2
type: TASK
title: QA Migrate Visual Decorators V2
status: READY
owner_persona: qa
created_at: '2026-10-10'
updated_at: '2026-10-10'
depends_on:
  - task-641-676-migrate-scanline-crosshairs-v2
  - task-641-677-migrate-hexstream-telemetry-v2
jules_session_id: null
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

# QA Migrate Visual Decorators V2

## Objective
Verify the successful migration of decorative UI components (`ScanlineOverlay`, `CornerCrosshairs`, `HexStreamDecoration`, `TelemetryDecoration`) to the `@dexhelper/ui` package.

## Acceptance Criteria
- [ ] Verify components are exported from `@dexhelper/ui` and imported cleanly.
- [ ] Verify no visual regressions.
- [ ] Ensure `pnpm run lint` and `pnpm run test` pass.

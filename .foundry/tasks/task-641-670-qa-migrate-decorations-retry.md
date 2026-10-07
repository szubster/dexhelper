---
id: task-641-670-qa-migrate-decorations-retry
type: TASK
title: QA Migrate Visual Decorators (Retry)
status: READY
owner_persona: qa
created_at: '2026-10-07'
updated_at: '2026-10-07'
depends_on:
  - task-641-658-migrate-scanline-crosshairs
  - task-641-669-migrate-hexstream-telemetry-retry
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

# QA Migrate Visual Decorators (Retry)

## Objective
Verify the successful migration of decorative UI components (`ScanlineOverlay`, `CornerCrosshairs`, `HexStreamDecoration`, `TelemetryDecoration`) to the `@dexhelper/ui` package.

## Acceptance Criteria
- [ ] Verify that the components are correctly exported from `@dexhelper/ui` and imported cleanly in the main application.
- [ ] Verify that no visual regressions or styling issues were introduced during the migration.
- [ ] Run the application and inspect the UI to ensure the decorative overlays continue to display correctly.
- [ ] Ensure `pnpm run lint` and `pnpm run test` pass.

---
id: task-641-660-qa-migrate-decorations
type: TASK
title: QA Migrate Visual Decorators
status: PENDING
owner_persona: qa
created_at: '2026-10-03'
updated_at: '2026-10-03'
depends_on:
  - task-641-658-migrate-scanline-crosshairs
  - task-641-659-migrate-hexstream-telemetry
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

# QA Migrate Visual Decorators

## Objective
Verify the successful migration of decorative UI components (`ScanlineOverlay`, `CornerCrosshairs`, `HexStreamDecoration`, `TelemetryDecoration`) to the `@dexhelper/ui` package.

## Acceptance Criteria
- [ ] Verify that the components are correctly exported from `@dexhelper/ui` and imported cleanly in the main application.
- [ ] Verify that no visual regressions or styling issues were introduced during the migration.
- [ ] Run the application and inspect the UI to ensure the decorative overlays continue to display correctly.
- [ ] Ensure `pnpm run lint` and `pnpm run test` pass.

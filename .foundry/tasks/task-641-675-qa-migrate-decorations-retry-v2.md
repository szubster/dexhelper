---
id: task-641-675-qa-migrate-decorations-retry-v2
type: TASK
title: QA Migrate Visual Decorators Retry V2
status: CANCELLED
owner_persona: qa
created_at: '2026-10-09'
updated_at: '2026-10-10'
depends_on:
  - task-641-674-migrate-scanline-crosshairs-retry
  - task-641-669-migrate-hexstream-telemetry-retry
jules_session_id: null
parent: story-527-641-migrate-decorations
tags:
  - react
  - components
  - qa
rejection_count: 0
rejection_reason: >-
  Cancelled due to permanent failure of dependency:
  research-641-668-investigate-hexstream-telemetry-failure
notes: ''
locks: []
---

# QA Migrate Visual Decorators Retry V2

## Objective
Verify the successful migration of decorative UI components to the @dexhelper/ui package.

## Acceptance Criteria
- [ ] Verify that the components are exported from @dexhelper/ui and imported in the main application.
- [ ] Verify that no visual regressions or styling issues were introduced.
- [ ] Inspect the UI to ensure the decorative overlays display correctly.
- [ ] Ensure lint and tests pass.

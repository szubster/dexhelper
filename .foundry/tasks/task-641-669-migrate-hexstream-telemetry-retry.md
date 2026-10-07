---
id: task-641-669-migrate-hexstream-telemetry-retry
type: TASK
title: Migrate HexStream and Telemetry Decorations (Retry)
status: READY
owner_persona: coder
created_at: '2026-10-07'
updated_at: '2026-10-07'
depends_on:
  - research-641-668-investigate-hexstream-migration-failure
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

# Migrate HexStream and Telemetry Decorations (Retry)

## Objective
Migrate the `HexStreamDecoration` and `TelemetryDecoration` components from the main application to the `@dexhelper/ui` package, applying the findings from `research-641-668-investigate-hexstream-migration-failure`.

## Acceptance Criteria
- [ ] Move `HexStreamDecoration` and `TelemetryDecoration` from `src/components/` to `packages/ui/src/components/`.
- [ ] Export both components in `packages/ui/src/index.ts`.
- [ ] Update all import paths in the main application to use `@dexhelper/ui` instead of relative paths for these components.
- [ ] Ensure Vitest tests for these components are also moved and continue to pass.

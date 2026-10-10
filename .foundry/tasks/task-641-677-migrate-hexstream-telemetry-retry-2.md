---
id: task-641-677-migrate-hexstream-telemetry-retry-2
type: TASK
title: Migrate HexStream and Telemetry Decorations Retry 2
status: READY
owner_persona: coder
created_at: '2026-10-10'
updated_at: '2026-10-10'
depends_on:
  - research-641-675-investigate-decorator-migration-failures
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

# Migrate HexStream and Telemetry Decorations Retry 2

## Objective
Migrate the `HexStreamDecoration` and `TelemetryDecoration` components to the `@dexhelper/ui` package, applying findings from research-641-675.

## Acceptance Criteria
- [ ] Move `HexStreamDecoration` and `TelemetryDecoration` to `packages/ui/src/components/`.
- [ ] Export both components in `packages/ui/src/index.ts`.
- [ ] Update all import paths in the main application.
- [ ] Ensure Vitest tests pass.

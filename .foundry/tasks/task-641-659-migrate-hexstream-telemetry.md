---
id: task-641-659-migrate-hexstream-telemetry
type: TASK
title: Migrate HexStream and Telemetry Decorations
status: ACTIVE
owner_persona: coder
created_at: '2026-10-03'
updated_at: '2026-10-05'
depends_on: []
jules_session_id: '589396924663383746'
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

# Migrate HexStream and Telemetry Decorations

## Objective
Migrate the `HexStreamDecoration` and `TelemetryDecoration` components from the main application to the `@dexhelper/ui` package.

## Acceptance Criteria
- [ ] Move `HexStreamDecoration` and `TelemetryDecoration` from `src/components/` to `packages/ui/src/components/`.
- [ ] Export both components in `packages/ui/src/index.ts`.
- [ ] Update all import paths in the main application to use `@dexhelper/ui` instead of relative paths for these components.
- [ ] Ensure Vitest tests for these components are also moved and continue to pass.

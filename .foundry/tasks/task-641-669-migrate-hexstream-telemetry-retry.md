---
id: task-641-669-migrate-hexstream-telemetry-retry
type: TASK
title: Migrate HexStream and Telemetry Decorations Retry
status: CANCELLED
owner_persona: coder
created_at: '2026-10-06'
updated_at: '2026-10-10'
depends_on:
  - research-641-668-investigate-hexstream-telemetry-failure
jules_session_id: null
parent: story-527-641-migrate-decorations
tags:
  - react
  - components
rejection_count: 0
rejection_reason: >-
  Cancelled due to permanent failure of dependency:
  research-641-668-investigate-hexstream-telemetry-failure
notes: ''
locks: []
---

# Migrate HexStream and Telemetry Decorations Retry

## Objective
Migrate the HexStreamDecoration and TelemetryDecoration components to the @dexhelper/ui package, incorporating findings from the research task.

## Acceptance Criteria
- [ ] Move HexStreamDecoration and TelemetryDecoration to packages/ui/src/components/.
- [ ] Export both components in packages/ui/src/index.ts.
- [ ] Update all import paths in the main application.
- [ ] Ensure Vitest tests for these components pass.

---
id: task-560-567-telemetry-utility
type: TASK
title: Implement Telemetry Utility
status: READY
owner_persona: coder
created_at: '2026-09-10'
updated_at: '2026-09-10'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-530-560-telemetry-metrics-impl
tags:
  - foundry
  - orchestrator
  - telemetry
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Task: Implement Telemetry Utility

## Objective
Implement a tracking utility `trackCycleDetectionFailure` for cycle detection failures.

## Scope
1. Implement `trackCycleDetectionFailure(cycleNodes: string[])` in `.github/scripts/dag-utils.ts` and export it.
2. The utility should log the cycles to a telemetry file (e.g. `.foundry/telemetry/cycle-detection.log`) in an append-only, non-blocking manner.
3. Ensure it fails gracefully without throwing errors if the filesystem operations fail.

## Acceptance Criteria
- [ ] Implement `trackCycleDetectionFailure` in `.github/scripts/dag-utils.ts`.
- [ ] Ensure the utility exports correctly.
- [ ] Ensure the utility logs correctly and fails gracefully.
- [ ] Add tests for the utility to ensure it behaves as expected.

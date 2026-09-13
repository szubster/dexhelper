---
id: task-560-569-qa-telemetry-metrics
type: TASK
title: QA Telemetry Metrics Implementation
status: READY
owner_persona: qa
created_at: '2026-09-10'
updated_at: '2026-09-10'
depends_on:
  - task-560-568-orchestrator-integration
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

# Task: QA Telemetry Metrics Implementation

## Objective
Verify the implementation of telemetry tracking for cycle detection failures in the Foundry Orchestrator.

## Scope
1. Verify `trackCycleDetectionFailure` exists in `.github/scripts/dag-utils.ts` and logs to `.foundry/telemetry/cycle-detection.log` in an append-only, non-blocking manner.
2. Verify Phase 3.9 and Phase 3.10 in `.github/scripts/foundry-orchestrator.ts` invoke the utility correctly.
3. Verify the orchestrator fails gracefully if logging fails.
4. Review the tests for the telemetry utility.

## Acceptance Criteria
- [ ] Verify `trackCycleDetectionFailure` correctly logs cycles without blocking.
- [ ] Verify Phase 3.9 uses the function correctly.
- [ ] Verify Phase 3.10 uses the function correctly.
- [ ] Verify graceful failure on filesystem issues.
- [ ] Ensure all tests pass.

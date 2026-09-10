---
id: story-530-560-telemetry-metrics-impl
type: STORY
title: Orchestrator Telemetry Metrics Implementation
status: READY
owner_persona: tech_lead
created_at: '2026-09-07'
updated_at: '2026-09-10'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-346-530-orchestrator-telemetry-metrics
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

# Story: Orchestrator Telemetry Metrics Implementation

## Objective
Implement telemetry tracking for cycle detection failures in the Foundry Orchestrator (\`.github/scripts/foundry-orchestrator.ts\`).

## Scope
1. Implement a tracking utility \`trackCycleDetectionFailure(cycleNodes: string[])\` in \`.github/scripts/dag-utils.ts\` or directly in \`.github/scripts/foundry-orchestrator.ts\`. This utility should log the cycles to a telemetry file, e.g. \`.foundry/telemetry/cycle-detection.log\`, in an append-only, non-blocking manner.
2. In \`.github/scripts/foundry-orchestrator.ts\` Phase 3.9 (CIRCULAR DEPENDENCY DETECTION), invoke the tracking utility when a circular dependency is detected.
3. In \`.github/scripts/foundry-orchestrator.ts\` Phase 3.10 (HIERARCHICAL DEADLOCK DETECTION), invoke the tracking utility when a hierarchical deadlock is detected.
4. Ensure the orchestrator fails gracefully and continues operation without crashing if the telemetry logging fails.

## Acceptance Criteria
- [x] Break down into Tasks to implement telemetry tracking logic.
- [ ] Ensure \`trackCycleDetectionFailure\` is implemented and exports a function for telemetry logging.
- [ ] Ensure Phase 3.9 uses the new telemetry function.
- [ ] Ensure Phase 3.10 uses the new telemetry function.
- [ ] Provide tests verifying that telemetry correctly appends to the log without failing the orchestrator if filesystem issues occur.
- [ ] task-560-567-telemetry-utility
- [ ] task-560-568-orchestrator-integration
- [ ] task-560-569-qa-telemetry-metrics

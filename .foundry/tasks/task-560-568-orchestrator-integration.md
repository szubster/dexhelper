---
id: task-560-568-orchestrator-integration
type: TASK
title: Integrate Telemetry Utility into Orchestrator
status: READY
owner_persona: coder
created_at: '2026-09-10'
updated_at: '2026-09-10'
depends_on:
  - task-560-567-telemetry-utility
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

# Task: Integrate Telemetry Utility into Orchestrator

## Objective
Integrate the telemetry tracking utility into the Orchestrator cycle detection phases.

## Scope
1. In `.github/scripts/foundry-orchestrator.ts` Phase 3.9 (CIRCULAR DEPENDENCY DETECTION), invoke the tracking utility when a circular dependency is detected.
2. In `.github/scripts/foundry-orchestrator.ts` Phase 3.10 (HIERARCHICAL DEADLOCK DETECTION), invoke the tracking utility when a hierarchical deadlock is detected.

## Acceptance Criteria
- [ ] Ensure `.github/scripts/foundry-orchestrator.ts` uses the new telemetry function in Phase 3.9.
- [ ] Ensure `.github/scripts/foundry-orchestrator.ts` uses the new telemetry function in Phase 3.10.

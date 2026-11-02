---
id: story-530-561-telemetry-metrics-e2e
type: STORY
title: Orchestrator Telemetry Metrics Integration and E2E Verification
status: READY
owner_persona: tech_lead
created_at: '2026-09-07'
updated_at: '2026-11-01'
depends_on:
  - story-530-560-telemetry-metrics-impl
jules_session_id: null
pr_number: null
parent: epic-346-530-orchestrator-telemetry-metrics
tags:
  - foundry
  - orchestrator
  - telemetry
  - e2e
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
locks: []
---

# Story: Orchestrator Telemetry Metrics Integration and E2E Verification

## Objective
Verify the integration of telemetry metrics for cycle detection and hierarchical deadlocks in the Foundry Orchestrator.

## Scope
1. Implement integration tests to verify the telemetry functionality in the orchestrator pipeline.
2. Confirm the telemetry file (\`.foundry/telemetry/cycle-detection.log\`) is successfully created and correctly logs failures.

## Acceptance Criteria
- [x] Break down into Tasks to write integration and E2E tests for telemetry.
- [x] Tests verify cycle telemetry is appended correctly.
- [x] Tests verify hierarchical deadlock telemetry is appended correctly.
- [x] task-561-690-telemetry-metrics-e2e-coder
- [x] task-561-691-telemetry-metrics-e2e-qa

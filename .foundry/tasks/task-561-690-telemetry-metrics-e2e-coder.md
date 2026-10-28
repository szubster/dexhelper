---
id: task-561-690-telemetry-metrics-e2e-coder
type: TASK
title: Write E2E Integration Tests for Orchestrator Telemetry Metrics
status: READY
owner_persona: coder
created_at: '2026-10-16T02:33:42.224Z'
updated_at: '2026-10-28'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-530-561-telemetry-metrics-e2e
tags:
  - foundry
  - orchestrator
  - telemetry
  - e2e
  - tests
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
locks: []
---

# Task: Write E2E Integration Tests for Orchestrator Telemetry Metrics

## Objective
Implement e2e/integration tests in `packages/foundry/foundry-orchestrator.e2e.test.ts` (or similar suitable e2e test file for the orchestrator) to verify that cycle and deadlock telemetry is correctly appended.

## Acceptance Criteria
- [ ] Implement an e2e test that sets up a temporary directory, creates a cycle dependency, runs the orchestrator (or the core cycle detection logic), and verifies `.foundry/telemetry/cycle-detection.log` is created and appended correctly.
- [ ] Implement an e2e test that sets up a temporary directory, creates a hierarchical deadlock dependency, runs the orchestrator, and verifies the telemetry log is appended correctly.

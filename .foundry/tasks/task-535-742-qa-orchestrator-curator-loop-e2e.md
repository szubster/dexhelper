---
id: task-535-742-qa-orchestrator-curator-loop-e2e
type: TASK
title: QA Orchestrator Curator Loop E2E Tests
status: READY
owner_persona: qa
created_at: '2026-10-18'
updated_at: '2026-10-18'
depends_on:
  - task-535-741-orchestrator-curator-loop-e2e-tests
jules_session_id: null
parent: story-531-535-orchestrator-curator-loop-e2e
tags:
  - orchestrator
  - curator
  - e2e
  - testing
  - qa
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# QA Orchestrator Curator Loop E2E Tests

## Summary
QA verification for the implementation of the E2E tests for the Orchestrator Curator Loop feature.

## Requirements
- Verify that `task-535-740` and `task-535-741` have correctly implemented the necessary DAG state mocks and E2E test scenarios.
- Execute the tests in `packages/foundry/` (e.g. `npx vitest`) and ensure they pass consistently.
- Review the implemented tests to ensure all DAG Orchestrator logic branches related to Curator triggering, state transitions, and idea re-verification are covered.
- Check that the test fixtures correctly replicate valid schema structures to satisfy the Orchestrator's constraints.
- If verification fails, correctly reject the implementation tasks, increment rejection count, update status, and journal findings before aborting the run (per Triggering Transient Rejections policy).

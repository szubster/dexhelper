---
id: task-535-741-orchestrator-curator-loop-e2e-tests
type: TASK
title: Implement Orchestrator Curator Loop E2E Tests
status: READY
owner_persona: coder
created_at: '2026-10-18'
updated_at: '2026-10-18'
depends_on:
  - task-535-740-orchestrator-curator-test-fixtures
jules_session_id: null
parent: story-531-535-orchestrator-curator-loop-e2e
tags:
  - orchestrator
  - curator
  - e2e
  - testing
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Implement Orchestrator Curator Loop E2E Tests

## Summary
Implement extensive E2E tests for the Orchestrator Curator Loop.

## Requirements
- Use the fixtures created in `task-535-740` to set up environments for the E2E tests.
- Write tests that simulate an end-to-end flow from Idea generation -> Implementation -> Curator Triggering -> New Node Spawning -> Idea Re-verification.
- Ensure all logic branches in the DAG Orchestrator related to the Curator persona and `re-verifying` state transitions are verified.
- The tests should simulate the GitHub workflow environment context appropriately (mocking `jules` actions when needed to transition states in the orchestrator pipeline).
- Integrate the tests in the appropriate location in `packages/foundry/` (e.g. `packages/foundry/tests/e2e/curator-loop.test.ts`).

---
id: task-535-740-orchestrator-curator-test-fixtures
type: TASK
title: Implement Test Fixtures and DAG State Mocks for Orchestrator Curator Loop
status: READY
owner_persona: coder
created_at: '2026-10-18'
updated_at: '2026-10-18'
depends_on: []
jules_session_id: null
parent: story-531-535-orchestrator-curator-loop-e2e
tags:
  - orchestrator
  - curator
  - e2e
  - fixtures
  - testing
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Implement Test Fixtures and DAG State Mocks for Orchestrator Curator Loop

## Summary
Implement reusable test fixtures and mock DAG configurations needed to run end-to-end verifications of the Curator triggering workflow and node spawning mechanisms in the Orchestrator.

## Requirements
- Create test utilities in `packages/foundry/` (e.g. `tests/fixtures/curator-mock-state.ts`) to easily mock various states of a DAG.
- Mock states should include scenarios for an implemented IDEA, the triggering of the Curator via dependency checks, and the setup required for verifying re-verification.
- Follow schema guidelines from `.foundry/docs/schema.md` when constructing mock `.foundry` directories and Node yaml frontmatter for the fixtures.
- Ensure fixtures accurately replicate exact nested structures like `.foundry/tasks` and `.foundry/archive` in memory or temp file space as required by the schema linter.

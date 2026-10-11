---
id: task-566-670-orchestrator-diagnosis-tests-retry
type: TASK
title: Write Unit Tests for BLOCKED Diagnosis Generation (Retry)
status: CANCELLED
owner_persona: coder
created_at: '2026-10-07T21:10:47.153Z'
updated_at: '2026-10-10'
depends_on:
  - task-566-669-orchestrator-diagnosis-logic-retry
jules_session_id: null
pr_number: null
parent: story-552-566-orchestrator-diagnosis-artifact
tags:
  - foundry
  - orchestrator
  - dag
  - tests
research_references: []
rejection_count: 0
rejection_reason: >-
  Cancelled due to permanent failure of dependency:
  research-566-668-investigate-orchestrator-diagnosis-failure
notes: ''
locks: []
---

# Task: Write Unit Tests for BLOCKED Diagnosis Generation (Retry)

## Description
Implement unit tests in `.github/scripts/foundry-orchestrator.test.ts` to verify the orchestrator's ability to correctly identify BLOCKED nodes (circular dependencies and unresolvable paths) and output the exact expected diagnosis artifact based on the new implementation from task 669.

## Acceptance Criteria
- [ ] Add tests for circular dependency detection and artifact generation.
- [ ] Add tests for unresolvable node paths.

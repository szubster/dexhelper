---
id: task-566-682-orchestrator-diagnosis-tests-retry-v3
type: TASK
title: Update Tests for Orchestrator BLOCKED Diagnosis (Retry v3)
status: PENDING
owner_persona: coder
created_at: '2026-10-15T18:29:01.995Z'
updated_at: '2026-10-15'
depends_on:
  - task-566-681-orchestrator-diagnosis-logic-retry-v3
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
rejection_reason: ''
notes: ''
locks: []
---

# Task: Update Tests for Orchestrator BLOCKED Diagnosis (Retry v3)

## Description
Update the unit tests for the Foundry DAG Orchestrator to cover the new `BLOCKED` state detection and artifact generation logic implemented in task 681.

## Acceptance Criteria
- [ ] Update `.github/scripts/foundry-orchestrator.test.ts` to test BLOCKED diagnosis artifact generation.
- [ ] Ensure all orchestrator tests pass.

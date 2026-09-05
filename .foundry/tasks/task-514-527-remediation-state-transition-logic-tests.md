---
id: task-514-527-remediation-state-transition-logic-tests
type: TASK
title: Unit Test Remediation State Transition Logic
status: READY
owner_persona: coder
created_at: '2026-09-03'
updated_at: '2026-09-03'
depends_on:
  - task-514-526-remediation-state-transition-logic-impl
jules_session_id: null
pr_number: null
parent: story-330-514-remediation-state-transition-logic
tags:
  - foundry
  - orchestrator
  - maintenance
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Unit Test Remediation State Transition Logic

## Description
Write robust unit tests for the zombie node remediation integration in `.github/scripts/foundry-heartbeat.ts`. The tests should cover the transition of nodes from `ACTIVE` to `FAILED` safely to prevent DAG deadlocks.

## Acceptance Criteria
- [ ] Update `.github/scripts/foundry-heartbeat.test.ts` to cover the zombie node remediation logic.

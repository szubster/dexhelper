---
id: task-514-619-remediation-state-transition-logic-tests-v2
type: TASK
title: Unit Test Remediation State Transition Logic (v2)
status: PENDING
owner_persona: coder
created_at: '2026-09-23'
updated_at: '2026-09-23'
depends_on:
  - task-514-618-remediation-state-transition-logic-impl-v2
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
locks: []
---

# Unit Test Remediation State Transition Logic (v2)

## Description
Write robust unit tests for the zombie node remediation integration in `.github/scripts/foundry-heartbeat.ts` implemented in `task-514-618-remediation-state-transition-logic-impl-v2`. The tests should cover the transition of nodes from `ACTIVE` to `FAILED` safely to prevent DAG deadlocks.

## Acceptance Criteria
- [ ] Update `.github/scripts/foundry-heartbeat.test.ts` to cover the zombie node remediation logic.
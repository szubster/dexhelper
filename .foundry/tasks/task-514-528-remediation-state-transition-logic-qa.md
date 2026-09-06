---
id: task-514-528-remediation-state-transition-logic-qa
type: TASK
title: QA Remediation State Transition Logic
status: PENDING
owner_persona: qa
created_at: '2026-09-03'
updated_at: '2026-09-05'
depends_on:
  - task-514-527-remediation-state-transition-logic-tests
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

# QA Remediation State Transition Logic

## Description
Verify the integration of the zombie node remediation logic. Check that when a zombie session is detected, the corresponding markdown node safely transitions from `ACTIVE` to `FAILED` with the appropriate rejection reason.

## Acceptance Criteria
- [ ] Validate that zombie nodes are successfully transitioned from `ACTIVE` to `FAILED` during the heartbeat pass.
- [ ] Ensure that unit test coverage in `foundry-heartbeat.test.ts` comprehensively verifies this behavior.

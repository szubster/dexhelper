---
id: task-514-618-remediation-state-transition-logic-impl-v2
type: TASK
title: Implement Remediation State Transition Logic (v2)
status: PENDING
owner_persona: coder
created_at: '2026-09-23'
updated_at: '2026-09-23'
depends_on:
  - research-514-617-investigate-remediation-failure
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

# Implement Remediation State Transition Logic (v2)

## Description
Based on the findings from the research node `research-514-617-investigate-remediation-failure`, integrate the `remediateZombieNode` logic (from `.github/scripts/remediate-zombie.ts`) into the heartbeat engine (`.github/scripts/foundry-heartbeat.ts`). Ensure that when a zombie node is detected, its status is safely transitioned from `ACTIVE` to `FAILED` to prevent DAG deadlocks.

## Acceptance Criteria
- [ ] Integrate `remediateZombieNode` in `.github/scripts/foundry-heartbeat.ts`.
- [ ] Ensure the transition of zombie nodes from `ACTIVE` to `FAILED` is robust and follows the recommendations from the research task.
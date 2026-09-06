---
id: task-514-526-remediation-state-transition-logic-impl
type: TASK
title: Implement Remediation State Transition Logic
status: ACTIVE
owner_persona: coder
created_at: '2026-09-03'
updated_at: '2026-09-05'
depends_on: []
jules_session_id: '9369237786729708912'
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

# Implement Remediation State Transition Logic

## Description
Integrate the `remediateZombieNode` logic (from `.github/scripts/remediate-zombie.ts`) into the heartbeat engine (`.github/scripts/foundry-heartbeat.ts`). When a zombie node is detected (e.g. session terminated without PR or session not found), transition its status from `ACTIVE` to `FAILED` safely to prevent DAG deadlocks.

## Acceptance Criteria
- [ ] Integrate `remediateZombieNode` in `.github/scripts/foundry-heartbeat.ts` for transitioning zombie nodes from `ACTIVE` to `FAILED`.

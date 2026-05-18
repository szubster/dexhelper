---
id: task-066-106-implement-prless-detection
type: TASK
title: Implement PR-less Detection in Heartbeat
status: COMPLETED
owner_persona: coder
created_at: '2026-05-18'
updated_at: '2026-05-18'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-033-066-heartbeat-prless-detection
tags:
  - foundry
  - dag
  - orchestrator
  - heartbeat
rejection_count: 0
rejection_reason: ''
notes: ''
---

# TASK: Implement PR-less Detection in Heartbeat

## Objective
Update the `foundry-heartbeat.ts` script to correctly parse the Jules API session state and detect when a session is in the `COMPLETED` state but has no associated pull request.

## Context
As part of making the session completion robust for the "Empty PR" policy (ADR 011), the heartbeat script needs to stop blindly failing sessions that are `COMPLETED` according to the API but lack a PR.

## Acceptance Criteria
- [x] Heartbeat script correctly parses Jules session state even without a PR.
- [x] When API state is `COMPLETED` and PR is missing, the script identifies this as a "PR-less completion" instead of a crash.

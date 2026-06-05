---
id: story-033-066-heartbeat-prless-detection
type: STORY
title: Detect PR-less COMPLETED Sessions in Heartbeat
status: COMPLETED
owner_persona: story_owner
created_at: '2026-05-18'
updated_at: '2026-05-18'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-025-033-robust-session-completion
tags:
  - foundry
  - dag
  - orchestrator
  - heartbeat
rejection_count: 0
rejection_reason: ''
notes: ''
---

# STORY: Detect PR-less COMPLETED Sessions in Heartbeat

## Objective
Update the `foundry-heartbeat.ts` script to correctly parse the Jules API session state and detect when a session is in the `COMPLETED` state but has no associated pull request, without automatically assuming the session has failed.

## Context
As part of making the session completion robust for the "Empty PR" policy (ADR 011), the heartbeat script needs to stop blindly failing sessions that are `COMPLETED` according to the API but lack a PR. The first step is simply detecting this state properly so downstream logic can apply Acceptance Criteria validations.

## Acceptance Criteria
- [x] Heartbeat script correctly parses Jules session state even without a PR.
- [x] When API state is `COMPLETED` and PR is missing, the script identifies this as a "PR-less completion" instead of a crash.

## Downstream Nodes
- TASK: `.foundry/tasks/task-066-106-implement-prless-detection.md`
- TASK: `.foundry/tasks/task-066-107-qa-prless-detection.md`

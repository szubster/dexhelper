---
id: task-066-107-qa-prless-detection
type: TASK
title: QA PR-less Detection in Heartbeat
status: COMPLETED
owner_persona: qa
created_at: '2026-05-18'
updated_at: '2026-05-18'
depends_on:
  - task-066-106-implement-prless-detection
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

# TASK: QA PR-less Detection in Heartbeat

## Objective
Verify the changes made in `.foundry/tasks/task-066-106-implement-prless-detection.md`.

## Context
As part of making the session completion robust for the "Empty PR" policy (ADR 011), the heartbeat script needs to stop blindly failing sessions that are `COMPLETED` according to the API but lack a PR.

## Acceptance Criteria
- [x] Verify that `foundry-heartbeat.ts` correctly parses the Jules API session state.
- [x] Verify that when API state is `COMPLETED` and PR is missing, the script identifies this as a "PR-less completion" instead of a crash.
- [x] Run test suite with `cd .github/scripts && pnpm install && npx vitest run`.

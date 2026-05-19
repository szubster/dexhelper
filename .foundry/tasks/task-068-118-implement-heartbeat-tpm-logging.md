---
id: task-068-118-implement-heartbeat-tpm-logging
type: TASK
title: Add TPM Logging for PR-less Completions
status: COMPLETED
owner_persona: coder
created_at: '2026-05-18'
updated_at: '2026-05-19'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-033-068-heartbeat-tpm-logging
tags:
  - foundry
  - dag
  - orchestrator
  - heartbeat
rejection_count: 0
rejection_reason: ''
notes: ''
---

# TASK: Add TPM Logging for PR-less Completions

## Objective
Update the `foundry-heartbeat.ts` script to log appropriate messages to the TPM journal for PR-less `COMPLETED` session transitions.

## Context
When a PR-less session is handled and a state transition occurs (e.g., to `COMPLETED` or `FAILED`), these events must be audited. We log them into `.foundry/journals/tpm.md`.

## Acceptance Criteria
- [x] Update `transitionNodeToCompleted` in `.github/scripts/foundry-heartbeat.ts` to log appropriately when a PR-less completion occurs (`prNumber === null`).
- [x] Ensure the log message distinguishes between PR merged and Empty PR session completion.

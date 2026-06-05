---
id: story-033-068-heartbeat-tpm-logging
type: STORY
title: Add TPM Logging for PR-less Completions
status: COMPLETED
owner_persona: story_owner
created_at: '2026-05-18'
updated_at: '2026-05-20'
depends_on:
  - story-033-067-heartbeat-state-transitions
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

# STORY: Add TPM Logging for PR-less Completions

## Objective
Update the `foundry-heartbeat.ts` script to log appropriate messages to the TPM journal for PR-less `COMPLETED` session transitions.

## Context
When a PR-less session is handled and a state transition occurs (e.g., to `COMPLETED` or `FAILED`), these events must be audited. We log them into `.foundry/journals/tpm.md`.

## Acceptance Criteria
- [x] Appropriate logs are written to `.foundry/journals/tpm.md` whenever a PR-less session results in a state transition.

## Downstream Nodes
- TASK: `.foundry/tasks/task-068-117-implement-heartbeat-tpm-logging.md`
- TASK: `.foundry/tasks/task-068-118-implement-heartbeat-tpm-logging.md`
- TASK: `.foundry/tasks/task-068-119-qa-heartbeat-tpm-logging.md`
